Tôi sẽ hướng dẫn bạn cách chạy từng loại test khác nhau:

1. **Chạy tất cả các test một lần**:
```bash
npm test
```
Lệnh này sẽ chạy tất cả các test và hiển thị kết quả trong terminal.

2. **Chạy test với chế độ watch (theo dõi thay đổi)**:
```bash
npm run test:watch
```
- Lệnh này sẽ chạy test và theo dõi các thay đổi trong code
- Bạn có thể:
  - Nhấn `a` để chạy tất cả các test
  - Nhấn `f` để chạy các test thất bại
  - Nhấn `p` để lọc theo tên file
  - Nhấn `t` để lọc theo tên test
  - Nhấn `q` để thoát

3. **Chạy test với báo cáo coverage**:
```bash
npm run test:coverage
```
Lệnh này sẽ:
- Chạy tất cả các test
- Tạo báo cáo coverage trong thư mục `coverage`
- Hiển thị tỷ lệ coverage cho:
  - Branches (các nhánh điều kiện)
  - Functions (các hàm)
  - Lines (các dòng code)
  - Statements (các câu lệnh)

4. **Chạy test trong môi trường CI**:
```bash
npm run test:ci
```
Lệnh này sẽ:
- Chạy test trong môi trường CI
- Tạo báo cáo coverage
- Tạo báo cáo JUnit XML (hữu ích cho các hệ thống CI/CD)

5. **Chạy một test file cụ thể**:
```bash
npm test src/test/auth.test.js
```

6. **Chạy một test case cụ thể**:
```bash
npm test -t "should login successfully with valid credentials"
```

7. **Chạy test với verbose mode**:
```bash
npm test -- --verbose
```

8. **Chạy test và bỏ qua cache**:
```bash
npm test -- --no-cache
```

Các lệnh test sẽ kiểm tra:
- API endpoint `/api/v1/auth/login`
- Các trường hợp thành công:
  - Đăng nhập với thông tin hợp lệ
  - Set cookies đúng cách
- Các trường hợp thất bại:
  - Sai mật khẩu
  - Thiếu trường bắt buộc
  - Định dạng username không hợp lệ

Lưu ý:
1. Đảm bảo database test đã được tạo và cấu hình đúng trong `.env.test`
2. Các mock data đã được cấu hình đúng trong `src/test/mocks/user.mock.js`
3. Các dependencies đã được cài đặt đầy đủ
4. Môi trường test đã được setup đúng trong `src/test/setup.js`

Bạn có muốn tôi giải thích thêm về bất kỳ phần nào không?
