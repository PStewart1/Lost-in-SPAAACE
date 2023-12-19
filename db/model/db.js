import { Sequelize } from 'sequelize';
import { sequelize } from '../mysql.config.js';
import Tng from './tng.js';
import Tos from './tos.js';
import Ds9 from './ds9.js';
import Voy from './voy.js';
import Ent from './ent.js';
import log from '../../src/util/logger.js';

// connect to database
await sequelize.authenticate()
  .then(() => {
    log.info('Database connected successfully.');
  })
  .catch((error) => {
    log.error('Unable to connect to database:', error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tos = Tos;
db.tng = Tng;
db.ds9 = Ds9;
db.voy = Voy;
db.ent = Ent;
await db.sequelize.sync({ force: false }).then(() => {
  log.info('Db sync complete');
});

export default db;
