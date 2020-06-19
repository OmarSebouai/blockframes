import { ImgRef, OldImgRef } from "@blockframes/utils/media/media.model";
import { isSafari } from '@blockframes/utils/safari-banner/safari.utils';

const formats = {
  avatar: {
    height: 100,
    width: 100
  },
  banner: {
    height: 1080,
    width: 1920
  },
  poster: {
    height: 160,
    width: 120
  }
} as const;

export type Formats = keyof typeof formats;

export function getRatio(format: Formats) {
  const { height, width } = format[format];
  return width/height;
}

// @todo(#3063) Remove this verifier
export function isOldImgRef(ref: ImgRef | OldImgRef): ref is OldImgRef {
  return 'url' in ref;
} 

// @todo(#3063) Update this function to unsupport oldImgRef
export function getMediaUrl(ref: ImgRef | OldImgRef) {
  if (ref) {
    if (isOldImgRef(ref)) {
      return ref.url;
    } else {
      return isSafari() ? ref.urls.fallback : ref.urls.original;
    }
  }
}

/** Used this only for background to let the browser deal with that with picture */
export function getAssetPath(asset: string, theme: 'dark' | 'light', type: 'images' | 'logo' = 'images') {
  const format = asset.split('.').pop();
  if (format === 'webp') {
    return isSafari()
      ? `assets/${type}/${theme}-fallback/${asset.replace('.webp', '.png')}`
      : `assets/${type}/${theme}/${asset}`
  } else {
    return`assets/${type}/${theme}/${asset}`;
  }
}