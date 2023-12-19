import csv from 'csvtojson';
import path from 'path';
import { URL } from 'url';
import log from '../util/logger.js';
import db from '../../db/model/db.js';

const dirName = new URL('.', import.meta.url).pathname;
const tosPath = path.join(dirName, 'TOSepisodes.csv');
const tngPath = path.join(dirName, 'TNGepisodes.csv');
const ds9Path = path.join(dirName, 'DS9episodes.csv');
const voyPath = path.join(dirName, 'VOYepisodes.csv');
const entPath = path.join(dirName, 'ENTepisodes.csv');

async function createTOS() {
  const tosArray = await csv().fromFile(tosPath);
  const results = await db.tos.bulkCreate(tosArray)
    .catch((error) => {
      log.error(error.message);
      return;
  });

  log.info("TOS episodes inserted: " + results.length);
  return;
};

async function createTNG() {
  const tngArray = await csv().fromFile(tngPath);
  const results = await db.tng.bulkCreate(tngArray)
    .catch((error) => {
      log.error(error.message);
      return;
  });

  log.info("TNG episodes inserted: " + results.length);
  return;
};

async function createDS9() {
  const ds9Array = await csv().fromFile(ds9Path);
  const results = await db.ds9.bulkCreate(ds9Array)
    .catch((error) => {
      log.error(error.message);
      return;
  });

  log.info("DS9 episodes inserted: " + results.length);
  return;
};

async function createVOY() {
  const voyArray = await csv().fromFile(voyPath);
  const results = await db.voy.bulkCreate(voyArray)
    .catch((error) => {
      log.error(error.message);
      return;
  });

  log.info("VOY episodes inserted: " + results.length);
  return;
};

async function createENT() {
  const entArray = await csv().fromFile(entPath);
  const results = await db.ent.bulkCreate(entArray)
    .catch((error) => {
      log.error(error.message);
      return;
  });

  log.info("ENT episodes inserted: " + results.length);
  return;
};

async function initializeDb() {
  await createTOS();
  await createTNG();
  await createDS9();
  await createVOY();
  await createENT();
}

export default initializeDb;
