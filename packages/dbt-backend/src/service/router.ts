import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';

const { Storage } = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();


export interface RouterOptions {
  logger: Logger;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;

  const router = Router();
  router.use(express.json());

  router.get('/manifest/:bucket/:kind/:name', async (req, response) => {
    const file_path = `${req.params.kind}/${req.params.name}/manifest.json`
    logger.info(`Get manifest under ${req.params.bucket}/${req.params.kind}/${req.params.name}/manifest.json`)
    const contents = await storage.bucket(req.params.bucket).file(file_path).download();
    const result = JSON.parse(contents.toString())
    response.json(result);
  });

  router.get('/catalog/:bucket/:kind/:name', async (req, response) => {
    const file_path = `${req.params.kind}/${req.params.name}/catalog.json`
    logger.info(`Get catalog under ${req.params.bucket}/${req.params.kind}/${req.params.name}/catalog.json`)
    const contents = await storage.bucket(req.params.bucket).file(file_path).download();
    const result = JSON.parse(contents.toString())
    response.json(result);
  });

  router.use(errorHandler());
  return router;
}
