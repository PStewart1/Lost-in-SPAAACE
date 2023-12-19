import {sequelize} from '../mysql.config.js';
import { DataTypes } from 'sequelize';


const Ent = sequelize.define('ent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  season: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  episode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  airdate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false
});

export default Ent;