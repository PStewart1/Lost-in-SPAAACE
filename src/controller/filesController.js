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
  if ((await db.tos.findAll({})).length > 0) {
    log.info("TOS episodes already exist in database");
    return;
  }
  const tosArray = await csv().fromFile(tosPath);
  tosArray.forEach((episode) => {
    episode.series = 'The Original Series';
  });
  const results = await db.tos.bulkCreate(tosArray)
    .catch((error) => {
      log.error(error.message);
      return;
  });

  log.info("TOS episodes inserted: " + results.length);
  return;
};

async function createTNG() {
  if ((await db.tng.findAll({})).length > 0) {
    log.info("TNG episodes already exist in database");
    return;
  }
  const tngArray = await csv().fromFile(tngPath);
  tngArray.forEach((episode) => {
    episode.series = 'The Next Generation';
  });
  const results = await db.tng.bulkCreate(tngArray)
    .catch((error) => {
      log.error(error.message);
      return;
  });

  log.info("TNG episodes inserted: " + results.length);
  return;
};

async function createDS9() {
  if ((await db.ds9.findAll({})).length > 0) {
    log.info("DS9 episodes already exist in database");
    return;
  }
  const ds9Array = await csv().fromFile(ds9Path);
  ds9Array.forEach((episode) => {
    episode.series = 'Deep Space Nine';
  });
  const results = await db.ds9.bulkCreate(ds9Array)
    .catch((error) => {
      log.error(error.message);
      return;
  });

  log.info("DS9 episodes inserted: " + results.length);
  return;
};

async function createVOY() {
  if ((await db.voy.findAll({})).length > 0) {
    log.info("VOY episodes already exist in database");
    return;
  }
  const voyArray = await csv().fromFile(voyPath);
  voyArray.forEach((episode) => {
    episode.series = 'Voyager';
  });
  const results = await db.voy.bulkCreate(voyArray)
    .catch((error) => {
      log.error(error.message);
      return;
  });

  log.info("VOY episodes inserted: " + results.length);
  return;
};

async function createENT() {
  if ((await db.ent.findAll({})).length > 0) {
    log.info("ENT episodes already exist in database");
    return;
  }
  const entArray = await csv().fromFile(entPath);
  entArray.forEach((episode) => {
    episode.series = 'Enterprise';
  });
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
