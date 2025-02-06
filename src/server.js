/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/sqldb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import cors from 'cors'
import { corsOptions } from './config/cors'
import cookieParser from 'cookie-parser'

const START_SERVER = () => {
  const app = express()

  // Fix cái vụ Cache from disk của ExpressJS
  // https://stackoverflow.com/a/53240717/8324172
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })

  // Cấu hình Cookie Parser
  app.use(cookieParser())

  // Xử lý CORS
  app.use(cors(corsOptions))

  // Enable req.body json data
  app.use(express.json())

  // Use APIs V1
  app.use('/v1', APIs_V1)

  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  if (env.BUILD_MODE === 'production') {
    // Môi trường Production (cụ thể hiện tại là đang support Render.com)
    app.listen(process.env.PORT, () => {
      console.log(`3. Server is running at Port: ${process.env.PORT}/`)
    })
  } else {
    // Môi trường Local Dev
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(`3. Server is running at http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}/`)
    })
  }

  // Thực hiện cleanup trước khi dừng server
  exitHook(() => {
    console.log('4. Server is shutting down...')
    CLOSE_DB()
    console.log('5. Disconnected from SQL Server')
  })
}

// Chỉ khi kết nối tới Database thành công thì mới Start Server Back-end lên
// Immediately-invoked / Anonymous Async Functions (IIFE)
(async () => {
  try {
    console.log('1. Connecting to SQL Server...')
    await CONNECT_DB()
    console.log('2. Connected to SQL Server!')

    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// // Chỉ khi kết nối tới Database thành công thì mới Start Server Back-end lên
// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB Cloud Atlas!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })
