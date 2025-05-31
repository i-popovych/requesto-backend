import enrichment from 'src/config/enrichment';
import app from './app';
import auth from './auth';
import database from './database';
import emails from './emails';
import notifications from './notifications';
import openAi from './open-ai';

export const configGlobal = [
  app,
  database,
  auth,
  openAi,
  notifications,
  emails,
  enrichment,
];
