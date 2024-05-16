import { S3 } from 'aws-sdk';
import { StorageProvider } from './router';

/**
 * AwsS3StorageProvider is a class that provides functionality for downloading files
 * from Amazon S3 storage using the AWS SDK.
 */
export class AwsS3StorageProvider implements StorageProvider {
  private s3 = new S3();

  /**
   * Downloads a file from Amazon S3 storage.
   * @param bucket - The name of the S3 bucket.
   * @param filePath - The path to the file within the bucket.
   * @returns A Promise that resolves to the file's contents as a Buffer.
   */
  async downloadFile(bucket: string, filePath: string): Promise<Buffer> {
    const params = { Bucket: bucket, Key: filePath };
    const { Body } = await this.s3.getObject(params).promise();
    return Body as Buffer;
  }
}
