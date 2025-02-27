// src/utils/constants.js
let apiRoot = ''
if (process.env.BUILD_MODE === 'dev') {
  // apiRoot = 'http://192.168.0.182:5000'
  // apiRoot = 'http://192.168.1.125:5000',
  apiRoot = 'http://192.168.1.250:5000'
}
if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://project-api-ikuu.onrender.com'
}
//export const API_ROOT = 'http://localhost:5000'
export const API_ROOT = apiRoot

export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12
