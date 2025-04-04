# CalendarOne - Backend

## Giới Thiệu
CalendarOne là một hệ thống quản lý đặt lịch sân golf với nhiều tính năng bao gồm đặt lịch realtime, quản lý khách hàng, và báo cáo tích hợp.

## Công Nghệ Sử Dụng
- **Backend Framework**: Node.js với Express.js
- **ORM**: Sequelize (database-first approach) với SQL Server
- **Quản lý Package**: Yarn
- **Realtime Communication**: Socket.IO
- **Xác thực**: JWT (với refresh token)
- **Caching & Concurrency**: Redis
- **Data Validation**: Joi
- **Logging**: Winston
- **Rate Limiting**: Express-rate-limit
- **Bảo mật bổ sung**: Helmet, CORS, Compression
- **Module Syntax**: ES6+ (import/export)
- **Transpiling**: Babel
- **Testing**: Jest
- **Development Tools**: ESLint, Nodemon
- **Thư viện bổ trợ**: Lodash, Moment, UUID, HTTP Status Codes, Async Exit Hook, bcryptjs, Cookie Parser

## Kiến Trúc Chương Trình
Dự án được tổ chức theo mô hình **MVCS (Model-View-Controller-Service)**:

- **Controllers**: Xử lý request và response
- **Services**: Chứa logic nghiệp vụ
- **Models**: Ánh xạ từ cấu trúc database (database-first)
- **Middlewares**: Xử lý authentication, validation, error handling, và rate limiting

## Cấu Trúc Thư Mục
```
backend/
├── babel.config.js              # Cấu hình Babel
├── golf-booking-architecture.svg # Sơ đồ kiến trúc hệ thống
├── jsconfig.json                # Cấu hình JavaScript
├── package.json                 # Thông tin dự án và dependencies
├── README.md                    # Tài liệu hướng dẫn (file này)
├── server.js                    # Entry point khởi động
├── logs/                        # Lưu trữ log files
│   ├── combined.log
│   └── error.log
├── seeders/                     # Dữ liệu khởi tạo
│   └── 20250324100057-demo.js
└── src/                         # Mã nguồn dự án
    ├── app.js                   # Khởi tạo Express app
    ├── config/                  # Cấu hình hệ thống
    │   ├── db.config.js         # Cấu hình database
    │   ├── environment.config.js # Cấu hình môi trường
    │   ├── jwt.config.js        # Cấu hình JWT
    │   ├── logger.config.js     # Cấu hình Winston logger
    │   └── redis.config.js      # Cấu hình Redis
    ├── controllers/             # Các controller
    │   ├── auth.controller.js
    │   ├── booking.controller.js
    │   └── guest.controller.js
    ├── middlewares/             # Middleware
    │   ├── auth.middleware.js
    │   ├── error.middleware.js
    │   ├── rate-limit.middleware.js
    │   └── validation.middleware.js
    ├── models/                  # Các model từ Sequelize
    │   ├── index.js             # Export tất cả các model
    │   ├── com/                 # Common models
    │   │   ├── comCourseDetail.js
    │   │   ├── comCourseMaintenance.js
    │   │   ├── comCourseMaster.js
    │   │   ├── comGuest.js
    │   │   ├── comGuestAcount.js
    │   │   └── comGuestType.js
    │   ├── example/             # Mẫu models
    │   │   ├── booking.model.js
    │   │   ├── course.model.js
    │   │   └── user.model.js
    │   ├── fre/                 # Booking models
    │   │   ├── freBlockBooking.js
    │   │   ├── freBookingDetails.js
    │   │   ├── freBookingMaster.js
    │   │   ├── freBookingNumber.js
    │   │   ├── freFlightStatus.js
    │   │   ├── freTeeTimeDetails.js
    │   │   ├── freTeeTimeMaster.js
    │   │   ├── freTemplateDetails.js
    │   │   ├── freTemplateMaster.js
    │   │   └── freTemplateOfDay.js
    │   ├── mrm/                 # Member management models
    │   │   ├── mrmCommonCode.js
    │   │   └── mrmPersonalInfo.js
    │   └── sys/                 # System models
    │       ├── sysOnItem.js
    │       ├── sysOnModule.js
    │       ├── sysOnParameter.js
    │       ├── sysOnUser.js
    │       ├── sysOnUserGroup.js
    │       └── sysOnUserGroupMenu.js
    ├── routes/                  # Các route xử lý API
    │   ├── v1/                  # API version 1
    │   │   ├── auth.route.js
    │   │   ├── booking.route.js
    │   │   ├── guest.route.js
    │   │   └── index.js         # Tổng hợp route
    │   └── v2/                  # API version 2 (future)
    ├── services/                # Các service (chứa logic nghiệp vụ)
    │   ├── auth/                # Authentication services
    │   │   ├── index.js
    │   │   ├── guest/
    │   │   │   └── login.js
    │   │   ├── staff/
    │   │   │   └── login.js
    │   │   └── token/
    │   │       ├── generate-token.js
    │   │       └── refresh-token.js
    │   └── booking/             # Booking services
    │       ├── index.js
    │       ├── general/
    │       │   ├── comCourseMasterService.js
    │       │   ├── comGuestService.js
    │       │   ├── comGuestTypeService.js
    │       │   ├── freBlockBookingService.js
    │       │   ├── freBookingDetailsService.js
    │       │   ├── freBookingMasterService.js
    │       │   └── freBookingNumberService.js
    │       ├── guest/
    │       └── staff/
    ├── sockets/                 # Quản lý Socket.IO
    │   └── booking.socket.js
    ├── test/                    # Unit tests
    │   ├── auth.test.js
    │   ├── README.md
    │   ├── setup.js
    │   └── mocks/
    │       └── user.mock.js
    ├── utils/                   # Các tiện ích
    │   ├── apiError.utils.js    # Xử lý lỗi API
    │   ├── constant.utils.js    # Các hằng số
    │   ├── formatter.utils.js   # Format dữ liệu
    │   ├── redis.utils.js       # Redis utilities
    │   ├── response.utils.js    # Format response
    │   └── socket.utils.js      # Socket.IO utilities
    └── validations/             # Schema validation
        ├── auth/
        │   ├── index.js
        │   └── login.js
        ├── booking/
        │   ├── get-courses-by-date.js
        │   ├── get-module-items-by-type.js
        │   ├── index.js
        │   └── upsert-booking.js
        └── guest/
            ├── index.js
            └── searchGuestByName.js
```

## Tính Năng Chính
1. **Quản lý Booking**
   - Xử lý booking với trạng thái: pending, confirmed, cancelled
   - Ngăn chặn xung đột dữ liệu khi nhiều người đặt cùng một sân golf (Redis lock)
   - Thông báo realtime qua Socket.IO khi có booking mới

2. **Xác Thực & Bảo Mật**
   - JWT authentication với refresh token
   - Role-based authorization
   - Rate limiting để chống spam request
   - Cookie-based authentication

3. **Hiệu Năng**
   - Redis caching cho dữ liệu tĩnh
   - Connection pooling với Sequelize
   - Compression middleware

## Giải Pháp Phòng Tránh Xung Đột Dữ Liệu
1. **Redis Distributed Locks**:
   - Sử dụng Redis để tạo distributed lock khi xử lý booking
   - Đảm bảo chỉ một request được xử lý tại một thời điểm cho một tài nguyên cụ thể (ví dụ: một khung giờ của sân golf)

2. **Optimistic Concurrency Control**:
   - Sử dụng version/timestamp trên các bản ghi để phát hiện và xử lý xung đột
   - Sequelize hỗ trợ optimistic locking qua trường version

3. **Database Transactions**:
   - Đảm bảo tính toàn vẹn dữ liệu khi thực hiện nhiều thao tác liên quan

## Bảo Mật & Best Practices
1. **Bảo Mật**:
   - Sử dụng Helmet để thiết lập HTTP headers bảo mật
   - Implement CORS policy
   - Rate limiting để chống DoS và brute force
   - Sanitize input từ người dùng với Joi
   - Mã hóa password với bcryptjs
   - Sử dụng secure cookies cho JWT

2. **Logging & Monitoring**:
   - Winston để log lỗi và hoạt động hệ thống
   - Separate logs cho errors và combined operations

3. **Tối Ưu Performance**:
   - Redis caching cho frequently accessed data
   - Connection pooling cho database operations
   - Compression middleware để giảm dung lượng response

## Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### Yêu Cầu Hệ Thống
- Node.js (v14 trở lên)
- SQL Server
- Redis Server

### Cài Đặt
1. Clone repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Cài đặt dependencies:
   ```bash
   yarn install
   ```

3. Cấu hình môi trường:
   - Tạo file .env từ .env.example
   - Cập nhật các thông số kết nối database, Redis, và các cài đặt khác

4. Khởi chạy ứng dụng:
   ```bash
   # Development mode
   yarn dev
   
   # Production mode
   yarn start
   ```

### Chạy Tests
```bash
yarn test
```

## Tài Liệu API
API documentation có thể truy cập tại `/api-docs` sau khi khởi động server.

## Phát Triển & Đóng Góp
1. Tuân thủ quy tắc coding style đã được thiết lập
2. Viết unit tests cho mọi tính năng mới
3. Đảm bảo tất cả tests pass trước khi submit pull request

## License
Copyright © 2024 CalendarOne. All rights reserved.