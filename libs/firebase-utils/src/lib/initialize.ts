import { initializeApp, credential, AppOptions, ServiceAccount } from 'firebase-admin';
import { config } from 'dotenv';
config();


export function initializeFirebase(config: AppOptions, serviceAccout: string) {
  if (!(serviceAccout in process.env)) {
    throw new Error(`Key "${serviceAccout}" does not exist in .env`);
  }
  
  let cert: string | ServiceAccount;
  try {
    // If service account is a stringified json object
    cert = JSON.parse(process.env[serviceAccout])
  } catch (err) {
    // If service account is a path
    cert = process.env[serviceAccout];
  }

  return initializeApp({
    ...config,
    credential: credential.cert(cert)
  });
}