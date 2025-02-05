import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'

// Khởi tạo một đối tượng mongoDatabaseInstance ban đầu là null (vì chưa connect)
let mongoDatabaseInstance = null

// Khởi tạo một đối tượng mongoClientInstance để connet tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // Lưu ý: ServerApi có từ phiên bản MongoDB 5.0.0 trở lên, có thể không cần dùng đến, nó là một dạng Stable API.
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// Kết nối tới Database
export const CONNECT_DB = async () => {
  // Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()

  // Kết nối thành công thì lấy ra Database theo tên và gán ngược nó lại vào biến mongoDatabaseInstance
  mongoDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// Function GET_DB có nhiệm vụ export ra  Database Instance sau khi đã connet thành công tới MongoDB để sử dụng ở nhiều nơi khác nhau trong code.
// Lưu ý phải đảm bảo chỉ luôn gọi GET_DB sau khi đã kết nối thành công tới MongoDB
export const GET_DB = () => {
  if (!mongoDatabaseInstance) throw new Error('Must connect to Database first')
  return mongoDatabaseInstance
}

// Đóng kết nối tới Database
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}
