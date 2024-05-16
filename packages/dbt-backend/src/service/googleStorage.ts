import { Storage } from '@google-cloud/storage';
import { StorageProvider } from './router';

/**
 * GoogleStorageProvider is a class that provides functionality for downloading files
 * from Google Cloud Storage.
 */
export class GoogleStorageProvider implements StorageProvider {
  private storage = new Storage();

  /**
   * Downloads a file from Google Cloud Storage.
   * @param bucket - The name of the storage bucket.
   * @param filePath - The path to the file within the bucket.
   * @returns A Promise that resolves to the file's contents as a Buffer.
   */
  async downloadFile(bucket: string, filePath: string): Promise<Buffer> {
    const [contents] = await this.storage.bucket(bucket).file(filePath).download();
    return contents;
  }
}
