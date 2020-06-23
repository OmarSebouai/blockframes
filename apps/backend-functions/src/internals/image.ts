import { tmpdir } from 'os';
import { join, dirname, basename, extname } from 'path';
import * as admin from 'firebase-admin';
import { ensureDir, remove } from 'fs-extra';
import sharp from 'sharp';
import { getImgSize, imgSizeDirectory, ImgSizeDirectory } from '@blockframes/media/+state/media.firestore.ts';


export async function resize(ref: string) {

  if (filePathElements.length !== 5) {
    throw new Error('unhandled filePath:' + filePath);
  }

  const [collection, id, fieldToUpdate, uploadedSize, fileName] = filePathElements;

  if (uploadedSize !== 'original') {
    return false;
  }

  const directory = dirname(filePath);
  const workingDir = join(tmpdir(), 'tmpFiles');
  const tmpFileName = ` ${Math.random().toString(36).substring(7)}-${new Date().getTime()}.webp`;
  const tmpFilePath = join(workingDir, tmpFileName);
  // Ensure directory exists with fs.ensureDir
  await ensureDir(workingDir);

  const bucket = admin.storage().bucket();
  const originalImage = bucket.file(ref);
  const [ exists ] = await originalImage.exists();

  if (!exists) {
    throw new Error(`Resize Error : The image to resize (${ref}) does not exists!`);
  }

  await originalImage.download({ destination: tmpFilePath });

  // Define the sizes (here width) depending of the image format (defined by the directory)
  const sizes = getImgSize(ref);
  const path = dirname(ref);
  const fileName = basename(ref);

  // Iterate on each item of sizes array to generate all wanted resized images
  const uploadPromises = imgSizeDirectory.map(async key => {

      const currentSize = sizes[key as ImgSizeDirectory];

      if (currentSize === 0) {
        throw new Error(`Resize Error : Cannot resize image ${ref} for size ${currentSize} because width is 0`);
      }

      const resizedImgName = fileName;
      const resizedImgPath = join(workingDir, `${key}_${resizedImgName}`);

        // In this condition, we need to resize the image
        const destination = join(path.replace('original', key), resizedImgName);
        // Use sharp to resize : take a path, resize to wanted size, save file to a new path
        await sharp(tmpFilePath)
          .resize(currentSize)
          .toFile(resizedImgPath);

        // Then upload the resized image on the bucket
        await bucket.upload(resizedImgPath, { destination });
    }
  );

  const uploadFallback = async () => {

    const fallbackImgName = basename(fileName, extname(fileName)) + '.png';
    const fallbackImgPath = join(workingDir, `fallback_${fallbackImgName}`);
    const storageDestination = join(path.replace('original', 'fallback'), fallbackImgName);

    await sharp(tmpFilePath).png().toFile(fallbackImgPath);

    await bucket.upload(fallbackImgPath, { destination: storageDestination });
  }

  uploadPromises.push(uploadFallback());

  await Promise.all(uploadPromises);

  // Delete the temporary working directory after successfully uploading the resized images with fs.remove
  return remove(workingDir);
}

export async function onFileDeletion(data: functions.storage.ObjectMetadata) {

  // TODO here we might need to handle deletion of other file types (issue#3017)

  // If the type of the data is not an image, exit the function
  if (!data.contentType?.includes('image')) {
    console.log(`File ${data.contentType} is not an image, exiting function`);
    return false;
  }

  // we don't want to execute this function on the watermark
  if (data.contentType === 'image/svg+xml') {
    console.log('File is an SVG image, exiting function');
    return false;
  }

  // Get all the needed information from the data (bucket, path, file name and directory)
  const bucket = admin.storage().bucket(data.bucket);
  const filePath = data.name;

  if (filePath === undefined) {
    throw new Error('undefined data.name!');
  }

  const filePathElements = filePath.split('/');

  if (filePathElements.length !== 5) {
    throw new Error('unhandled filePath:' + filePath);
  }

  const [collection, id, fieldToUpdate, uploadedSize, fileName] = filePathElements;

  try {
    // Clean document that reference this image
    const docData: any = await getDocument(`${collection}/${id}`);
    // Cleaning references only if current document ref is the one linked into DB
    const oldImgRef = get(docData, fieldToUpdate);
    if (oldImgRef.ref === data.name) {
      const value = { ref: '', urls: {} };
      const updated = set(docData, fieldToUpdate, value);
      const docRef = db.collection(collection).doc(id);
      await docRef.update(updated);
    }
  } catch (e) {
    console.log(`Error while updating image references in document "${collection}/${id}" : ${e.message}`);
  }

  // By filtering out the uploadedSize path, we make sure, that we don't try to delete an already deleted image
  imgSizeDirectory.filter(sizeDir => sizeDir !== uploadedSize)
    .forEach(async (sizeDir: ImgSizeDirectory) => {
      // if sizeDir is 'fallback' we convert file name from 'image.webp' to 'image.png'
      const imageFileName = sizeDir !== 'fallback' ? fileName : basename(fileName, extname(fileName)) + '.png'
      const path = `${collection}/${id}/${fieldToUpdate}/${sizeDir}/${imageFileName}`;
      const [exists] = await bucket.file(path).exists();
      if (exists) {
        await bucket.file(path).delete();
        return true;
      } else {
        // if file does not exist everything is fine since we where trying to delete it
        return false;
      }
    });
  return false;
}
