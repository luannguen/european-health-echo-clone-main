# Tài liệu cơ sở dữ liệu (Database Documentation)

Tài liệu này mô tả cấu trúc và cấu hình cơ sở dữ liệu của dự án. Hãy tham khảo tài liệu này khi làm việc với backend.

## Cấu hình kết nối

Hệ thống sử dụng SQL Server với cấu hình sau (được định nghĩa trong `src/config.js`):

```javascript
{
  server: process.env.DB_SERVER || 'vrcorp.vn',
  database: process.env.DB_NAME || 'vie43864_vrc',
  user: process.env.DB_USER || 'vie43864_user',
  password: process.env.DB_PASSWORD || 'YiBo%4BiFo@0SaSi',
  options: {
    enableArithAbort: true,
    trustServerCertificate: true,
    encrypt: false
  }
}
```

Thông tin kết nối có thể được ghi đè bằng biến môi trường:
- `DB_SERVER`: Địa chỉ server
- `DB_NAME`: Tên cơ sở dữ liệu
- `DB_USER`: Tên người dùng
- `DB_PASSWORD`: Mật khẩu

## Quản lý kết nối

Kết nối cơ sở dữ liệu được quản lý bởi `DbService` (trong `src/core/services/db.service.js`), cung cấp các chức năng:

- Kết nối và duy trì connection pool
- Tự động kết nối lại khi mất kết nối
- Kiểm tra sức khỏe kết nối định kỳ (health check)
- Khởi tạo cấu trúc bảng khi khởi động

## Cấu trúc cơ sở dữ liệu

### Bảng `users`

Lưu trữ thông tin người dùng hệ thống.

| Cột | Kiểu dữ liệu | Mô tả |
|-----|--------------|-------|
| id | INT (IDENTITY) | Khóa chính, tự tăng |
| username | NVARCHAR(100) | Tên đăng nhập (duy nhất) |
| email | NVARCHAR(255) | Email người dùng (duy nhất) |
| password | NVARCHAR(255) | Mật khẩu đã mã hóa |
| full_name | NVARCHAR(255) | Họ tên đầy đủ |
| role | NVARCHAR(50) | Vai trò: 'customer', 'admin', hoặc 'editor' |
| is_active | BIT | Trạng thái kích hoạt (1=active, 0=inactive) |
| last_login | DATETIME | Thời điểm đăng nhập gần nhất |
| created_at | DATETIME | Thời điểm tạo tài khoản |
| updated_at | DATETIME | Thời điểm cập nhật gần nhất |

**Ràng buộc:**
- `username` và `email` phải là duy nhất
- `role` chỉ được phép là 'customer', 'admin', hoặc 'editor'

### Bảng `password_reset_tokens`

Lưu trữ token đặt lại mật khẩu.

| Cột | Kiểu dữ liệu | Mô tả |
|-----|--------------|-------|
| id | INT (IDENTITY) | Khóa chính, tự tăng |
| user_id | INT | ID người dùng (khóa ngoại liên kết với bảng users) |
| token | NVARCHAR(100) | Token để gửi trong email |
| token_hash | NVARCHAR(255) | Giá trị token đã được mã hóa lưu trữ |
| expires_at | DATETIME | Thời điểm hết hạn của token |
| created_at | DATETIME | Thời điểm tạo token |
| used | BIT | Trạng thái sử dụng (1=đã sử dụng, 0=chưa sử dụng) |

**Ràng buộc:**
- Liên kết khóa ngoại với bảng `users`
- Có chỉ mục trên cột `token_hash` để tìm kiếm nhanh hơn

## Khởi tạo cơ sở dữ liệu

Cơ sở dữ liệu được khởi tạo tự động khi khởi động server thông qua phương thức `checkAndCreateTables()` trong `DbService`. 

Script SQL để tạo các bảng được lưu trong thư mục `src/sql`:
- `create-users-table.sql`: Tạo bảng users
- `create-password-reset-table.sql`: Tạo bảng password_reset_tokens

Các script này có logic kiểm tra sự tồn tại của bảng và cột trước khi thực hiện, để tránh lỗi khi chạy nhiều lần.

## Thực hiện truy vấn

Để thực hiện truy vấn đến cơ sở dữ liệu, sử dụng các phương thức của `DbService`:

```javascript
// Ví dụ thực hiện truy vấn SELECT
const results = await dbService.executeQuery('SELECT * FROM users WHERE is_active = 1');

// Ví dụ thực hiện truy vấn với tham số
const user = await dbService.executeQuery(
  'SELECT * FROM users WHERE username = @username',
  { username: 'admin' }
);

// Ví dụ thực hiện truy vấn trong transaction
const transaction = await dbService.beginTransaction();
try {
  await dbService.executeQuery('INSERT INTO users (...) VALUES (...)', params, transaction);
  await transaction.commit();
} catch (error) {
  await transaction.rollback();
  throw error;
}
```

## Các dịch vụ liên quan đến cơ sở dữ liệu

Hệ thống sử dụng mẫu thiết kế Repository và Service để tương tác với cơ sở dữ liệu:

- **Repositories**: Chịu trách nhiệm cho các thao tác CRUD trực tiếp với cơ sở dữ liệu
  - `base.repository.js`: Repository cơ sở với các phương thức chung
  - `user.repository.js`: Repository cho thao tác với bảng users

- **Services**: Xử lý logic nghiệp vụ và sử dụng các repository
  - `db.service.js`: Quản lý kết nối cơ sở dữ liệu
  - `user.service.js`: Dịch vụ quản lý người dùng
  - `role.service.js`: Dịch vụ quản lý vai trò
  - `password-reset.service.js`: Dịch vụ đặt lại mật khẩu

## Kiến trúc Microservices

Dự án được thiết kế theo kiến trúc microservices, với mỗi service đảm nhận một chức năng cụ thể. Các microservice chính bao gồm:

1. **Database Service** (db.service.js)
   - Quản lý kết nối và truy vấn cơ sở dữ liệu
   - Cung cấp kết nối pool và transaction
   - Tự động tái kết nối và kiểm tra sức khỏe

2. **Authentication Service**
   - Xác thực người dùng và tạo JWT token
   - Quản lý đăng nhập/đăng xuất
   - Kiểm tra quyền truy cập

3. **User Service** (user.service.js)
   - Quản lý người dùng (tạo, cập nhật, xóa, tìm kiếm)
   - Lưu trữ thông tin người dùng an toàn
   - Tích hợp với Role Service

4. **Role Management Service** (role.service.js)
   - Quản lý vai trò người dùng
   - Kiểm tra và xác thực vai trò
   - Cung cấp danh sách vai trò hợp lệ

5. **Password Reset Service** (password-reset.service.js)
   - Quản lý quá trình đặt lại mật khẩu
   - Tạo và xác thực token đặt lại mật khẩu

## Kiểm tra các Microservice

Để kiểm tra hoạt động của các microservice, sử dụng file test sau:

```
node backend/src/tests/api-test.js
```

File `api-test.js` thực hiện các bước kiểm tra sau:
1. Khởi động server API trên cổng 3001
2. Kiểm tra xác thực (Authentication Service)
3. Kiểm tra các API quản lý vai trò (Role Management Service)
4. Kiểm tra các API quản lý người dùng (User Service)
   - Lấy danh sách người dùng
   - Tạo người dùng mới
   - Cập nhật vai trò người dùng
   - Xóa người dùng

Các file test khác:
- `user-api.test.js`: Test cụ thể cho User Service
- `role-management.test.js`: Test cụ thể cho Role Management Service 
- `full-api-test.js`: Test toàn diện cho tất cả API endpoints

> **Lưu ý**: Các file test này sẽ thay đổi dữ liệu trong cơ sở dữ liệu, nên cẩn thận khi chạy trong môi trường sản xuất.

## Kiểm tra kết nối cơ sở dữ liệu

Khi cần kiểm tra kết nối cơ sở dữ liệu, sử dụng file test sau:

```
node backend/src/test-db-service.js
```

File `test-db-service.js` thực hiện các bước kiểm tra sau:
1. Kiểm tra kết nối cơ bản đến cơ sở dữ liệu
2. Hiển thị thông tin về cơ sở dữ liệu (tên DB, phiên bản server)
3. Liệt kê các bảng trong cơ sở dữ liệu và cấu trúc của chúng
4. Kiểm tra giao dịch (transaction)

> **Lưu ý**: File này chỉ thực hiện truy vấn đọc và không thay đổi dữ liệu. An toàn để chạy trong môi trường sản xuất.
