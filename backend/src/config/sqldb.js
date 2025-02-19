/* eslint-disable no-console */
import sql from 'mssql'
import { env } from './environment.js'

const config = {
  user: env.SQL_USER,
  password: env.SQL_PASSWORD,
  server: env.SQL_SERVER,
  database: env.SQL_DATABASE,
  port: parseInt(env.SQL_PORT, 10),
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
}

let sqlDatabaseInstance = null

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log('2. Connected to SQL Server!')
    sqlDatabaseInstance = pool
    return pool
  })
  .catch((err) => {
    console.error('--Database Connection Failed: ', err)
    throw err
  })

export const CONNECT_DB = async () => {
  await poolPromise
}

export const GET_DB = () => {
  if (!sqlDatabaseInstance) throw new Error('--Must connect to Database first')
  return sqlDatabaseInstance
}

export const CLOSE_DB = async () => {
  if (sqlDatabaseInstance) {
    await sqlDatabaseInstance.close()
    sqlDatabaseInstance = null
  }
}
