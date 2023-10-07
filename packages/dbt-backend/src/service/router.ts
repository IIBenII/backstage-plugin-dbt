import { errorHandler } from '@backstage/backend-common';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';

/**
 * Abstracts the storage provider to allow for different
 * storage providers to be used.
 */
export interface StorageProvider {
  /**
   * Download a file from the storage provider.
   * @param bucket - The name of the storage bucket.
   * @param filePath - The path to the file within the bucket.
   * @returns A Promise that resolves to the file's contents as a Buffer.
   */
  downloadFile(bucket: string, filePath: string): Promise<Buffer>;
}

export interface RouterOptions {
  logger: Logger;
  storageProvider: StorageProvider;
}

/**
 * Creates an Express router for handling storage-related requests.
 * @param options - Configuration options for the router.
 * @returns An Express router that handles storage requests.
 */
export function createRouter(options: RouterOptions): express.Router {
  const { logger, storageProvider } = options;
  const router = Router();
  router.use(express.json());

  async function handleRequest(req: Request, res: Response, type: 'manifest' | 'catalog') {
    const { bucket, kind, name } = req.params;
    const filePath = `${kind}/${name}/${type}.json`;
    const fullPath = `${bucket}/${filePath}`;

    try {
      logger.info(`Get ${type} under ${fullPath}`);
      const contents = await storageProvider.downloadFile(bucket, filePath);
      const result = JSON.parse(contents.toString());
      res.json(result);
    } catch (error: any) {
      logger.error(`Error getting ${type} under ${fullPath}: ${error.message}`);
      res.status(500).json({ error: `Error getting ${type} under ${fullPath}: ${error.message}` });
    }
  }

  router.get('/manifest/:bucket/:kind/:name', async (req: Request, res: Response) => {
    await handleRequest(req, res, 'manifest');
  });

  router.get('/catalog/:bucket/:kind/:name', async (req: Request, res: Response) => {
    await handleRequest(req, res, 'catalog');
  });

  router.use(errorHandler());
  return router;
}
