import {sequelize} from '../mysql.config.js';
import { DataTypes } from 'sequelize';


const Voy = sequelize.define('voy', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  series: {
    type: DataTypes.STRING,
    allowNull: false,
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

export default Voy;