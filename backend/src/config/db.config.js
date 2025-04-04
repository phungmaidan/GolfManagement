/* eslint-disable no-undef */
/* eslint-disable no-console */
import { Sequelize } from 'sequelize'
import { env } from './environment.config.js'

const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER,
  env.DB_PASSWORD,
  {
    host: env.DB_HOST,
    dialect: 'mssql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: env.NODE_ENV === 'development' ? console.log : false
  }
)

export default sequelize