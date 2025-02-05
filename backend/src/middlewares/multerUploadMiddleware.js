import multer from 'multer'
import { LIMIT_COMMON_FILE_SIZE, ALLOW_COMMON_FILE_TYPES } from '~/utils/validators'
/** Hầu hết những thứ bên dưới đều có ở docs của multer
* https://www.npmjs.com/package/multer
*/

// Function Kiểm tra loại file nào được chấp nhận
const customFileFilter = (req, file, callback) => {
  //console.log('🚀 ~ constcustomFileFilter ~ file:', file)

  // Đối với multer, kiểm tra thì sử dụng mimetype
  if (!ALLOW_COMMON_FILE_TYPES.includes(file.mimetype)) {
    const errMessage = 'File type is invalid. Only accept jpg, jpeg and png'
    return callback(errMessage, null)
  }
  // Nếu như kiểu file hợp lệ:
  return callback(null, true)
}

// Khởi tạo function upload được bọc bởi multer
const upload = multer({
  limits: { fileSize: LIMIT_COMMON_FILE_SIZE },
  fileFilter: customFileFilter
})

export const multerUploadMiddleware = { upload }
