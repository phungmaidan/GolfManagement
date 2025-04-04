# README.md

--- MIÊU TẢ DỰ ÁN
1. Công nghệ sử dụng: 
• Backend: Node.js với Express.js, Sequelize (theo cách database-first) và SQL Server. 
• Quản lý package: Yarn. 
• Realtime: Socket.IO để gửi thông báo booking mới. 
• Xác thực: JWT (có refresh token) để bảo vệ API và phân quyền. 
• Caching và concurrency: Redis để lưu cache dữ liệu tạm thời (như danh sách sân golf) và dùng lock để tránh xung đột dữ liệu khi có nhiều request đặt lịch cùng lúc. 
• Validate dữ liệu: Joi để validate input từ request. 
• Logging: Winston để log lỗi và hoạt động hệ thống. 
• Rate limiting: Express-rate-limit để bảo vệ API khỏi spam request. 

2. Kiến trúc chương trình: 
• MVCS (Model - View - Controller - Service): 
    • Controller xử lý request và trả response. 
    • Service chứa logic nghiệp vụ. 
    • Model (theo cách database-first) được sinh ra từ cấu trúc database có sẵn qua Sequelize CLI. 
    • Middleware: 
        • Auth middleware cho JWT. 
        • Validation middleware cho Joi.

3. Yêu cầu chính của hệ thống: 
    1. Xử lý booking với các trạng thái: pending, confirmed, cancelled. 
    2. Tránh xung đột dữ liệu khi nhiều người đặt cùng một sân golf qua Redis lock hoặc giải pháp tương tự. 
    3. Gửi thông báo realtime qua Socket.IO khi có booking mới. 
    4. Tối ưu hiệu năng với Redis cache (cho các dữ liệu ít thay đổi như danh sách sân golf) và connection pooling của Sequelize. 
    5. Bảo vệ hệ thống khỏi spam request bằng rate limiting. 
    6. Có sử dụng cookies để dùng cho đăng nhập, xác thực.
    7. Sử dụng cách khai báo thư viện là import thay vì require.
    8. Response cho client mã Status Code bằng package http-status-codes.
    9. Sử dụng thêm các package phụ trợ lodash, moment, cross-env, dotenv, eslint, uuid, @babel/core @babel/cli @babel/preset-env, sequelize-auto sequelize-cli, http-status-codes, async-exit-hook, bcryptjs, cookie-parser, cors, cross-env, dotenv, redis, helmet, compression.
    10. Tách Route thành thư mục route chuyên xử lý các route, chia thành các thư.
    11. Có tài liệu hướng dẫn đầy đủ cách cài đặt, chạy chương trình

4. Quy tắc viết code: 
    • Áp dụng Clean Code và nguyên tắc SOLID để code dễ đọc, dễ bảo trì. 
    • Sử dụng Winston để log lỗi và hoạt động của hệ thống. 
    • Tích hợp Swagger để tạo tài liệu API. 
    • Khi ổn định, bổ sung Jest để viết unit test cho service và controller. 

5. Mong muốn từ AI: 
    • Thiết kế kiến trúc chương trình theo mô hình MVCS, đồng thời đảm bảo phù hợp với việc sử dụng Sequelize theo cách database-first.
    • Hướng dẫn tích hợp các công nghệ đã nêu, đặc biệt Redis (cache và lock), Socket.IO, JWT, Joi, Winston, và Express-rate-limit.
    • Gợi ý các giải pháp đơn giản và dễ hiểu để tránh xung đột dữ liệu khi xử lý nhiều request đồng thời.
    • Cung cấp best practices cho bảo mật, tối ưu hiệu năng, và quản lý mã nguồn khi sử dụng Sequelize theo cách database-first.
    • Cung cấp example cho từng công nghệ: sequelize database-first, jest, redis.

--- CẤU TRÚC THƯ MỤC
golf-booking-api/
├── node_modules/                # Thư viện của dự án
├── src/                         # Mã nguồn dự án
│   ├── config/                  # Cấu hình hệ thống
│   │   ├── db.config.js         # Cấu hình database
│   │   ├── redis.config.js      # Cấu hình Redis
│   │   ├── jwt.config.js        # Cấu hình JWT
│   │   └── logger.config.js     # Cấu hình Winston logger
│   ├── controllers/             # Các controller
│   │   ├── booking.controller.js
│   │   ├── course.controller.js
│   │   └── auth.controller.js
│   ├── services/                # Các service (chứa logic nghiệp vụ)
│   │   ├── booking.service.js
│   │   ├── course.service.js
│   │   └── auth.service.js
│   ├── models/                  # Các model từ Sequelize
│   │   ├── index.js             # Export tất cả các model
│   │   ├── booking.model.js
│   │   ├── course.model.js
│   │   └── user.model.js
│   ├── routes/                  # Các route xử lý api
│   │   ├── v1/                  # Export tất cả các model
│   │   │     ├── index.js       # Khai báo các route
│   │   │     ├── booking.route.js
│   │   │     ├── course.route.js
│   │   │     └── user.route.js
│   │   └── v2/                  # Route này tạm bỏ trống, để sau này phát triển
│   ├── middlewares/             # Middleware
│   │   ├── auth.middleware.js
│   │   ├── validation.middleware.js
│   │   ├── error.middleware.js
│   │   └── rate-limit.middleware.js
│   ├── utils/                   # Các tiện ích
│   │   ├── redis.utils.js       # Tiện ích làm việc với Redis
│   │   ├── socket.utils.js      # Tiện ích Socket.IO
│   │   └── response.utils.js    # Tiện ích format response
│   ├── validations/             # Schema validation với Joi
│   │   ├── booking.validation.js
│   │   └── auth.validation.js
│   ├── sockets/                 # Quản lý Socket.IO
│   │   └── booking.socket.js    # Sự kiện socket cho booking
│   ├── test/
│   └── app.js                   # Khởi tạo Express app
├── .env                         # Biến môi trường
├── .env.example                 # Mẫu file biến môi trường
├── package.json                 # Thông tin dự án và dependencies
├── yarn.lock                    # Yarn lock file
└── server.js                    # Entry point khởi động