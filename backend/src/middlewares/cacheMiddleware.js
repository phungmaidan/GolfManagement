import apicache from 'apicache'
import { env } from '~/config/environment'
const cache = apicache.middleware

// Cấu hình cache mặc định 5 phút
const caching = cache(env.CACHE_LIFE, (req, res) => res.statusCode === 200)

export const cacheMiddleware = { caching }