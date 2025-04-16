# TÀI LIỆU KIẾN TRÚC HỆ THỐNG VRC ADMIN

## 1. TỔNG QUAN KIẾN TRÚC

Hệ thống được phát triển theo mô hình **Microservices**, với mỗi service chịu trách nhiệm cho một chức năng cụ thể và có thể hoạt động độc lập. Backend được xây dựng bằng Node.js với Express, kết nối với SQL Server.

### 1.1. Các lớp kiến trúc

1. **API Layer**: Xử lý HTTP requests và responses
   - Routes: Định nghĩa các endpoints
   - Controllers: Xử lý logic điều khiển và gọi services

2. **Service Layer**: Xử lý logic nghiệp vụ 
   - Services: Thực hiện các thao tác nghiệp vụ phức tạp
   - Tách biệt logic nghiệp vụ khỏi tầng API

3. **Data Access Layer**: Tương tác với cơ sở dữ liệu
   - Repositories: Thực hiện các thao tác CRUD
   - Database Service: Quản lý kết nối và truy vấn

4. **Authentication & Authorization Layer**: 
   - Middleware: Xác thực và phân quyền người dùng
   - JWT: Quản lý token xác thực
   - Micro-modules: Phân chia thành các module nhỏ chuyên biệt

## 2. DANH SÁCH SERVICES

### 2.1. Database Service (`db.service.js`)

**Chức năng chính:**
- Quản lý kết nối đến SQL Server
- Cung cấp pool connections để tối ưu hiệu suất 
- Thực thi các truy vấn SQL
- Khởi tạo cấu trúc bảng trong CSDL
- Kiểm tra sức khỏe kết nối tự động
- Tự động kết nối lại khi mất kết nối

**Phương thức chính:**
- `init()`: Khởi tạo kết nối đến database
- `executeQuery()`: Thực thi truy vấn SQL
- `beginTransaction()`: Bắt đầu transaction
- `checkAndCreateTables()`: Kiểm tra và tạo các bảng cần thiết
- `getStatus()`: Lấy trạng thái kết nối

### 2.2. User Service (`user.service.js`)

**Chức năng chính:**
- Quản lý người dùng trong hệ thống
- Xác thực người dùng (login)
- Thêm, sửa, xóa, tìm kiếm người dùng
- Quản lý mật khẩu và thông tin người dùng

**Phương thức chính:**
- `authenticate()`: Xác thực đăng nhập
- `createUser()`: Tạo người dùng mới
- `getUsers()`: Lấy danh sách người dùng
- `getUserById()`: Tìm người dùng theo ID
- `updateUser()`: Cập nhật thông tin người dùng
- `deleteUser()`: Xóa người dùng
- `changePassword()`: Đổi mật khẩu

### 2.3. Role Service (`role.service.js`)

**Chức năng chính:**
- Quản lý vai trò người dùng
- Kiểm tra và xác thực vai trò
- Kiểm tra quyền hạn người dùng

**Phương thức chính:**
- `getAllRoles()`: Lấy tất cả vai trò có trong hệ thống
- `getDefaultRoles()`: Lấy danh sách vai trò mặc định
- `validateRole()`: Kiểm tra tính hợp lệ của vai trò
- `getUsersByRole()`: Lấy danh sách người dùng theo vai trò
- `checkUserRole()`: Kiểm tra vai trò của người dùng

### 2.4. Password Reset Service (`password-reset.service.js`)

**Chức năng chính:**
- Xử lý quy trình đặt lại mật khẩu
- Tạo và xác thực token reset password
- Quản lý trạng thái token

**Phương thức chính:**
- `createResetToken()`: Tạo token đặt lại mật khẩu
- `validateToken()`: Xác thực tính hợp lệ của token
- `resetPassword()`: Thực hiện đặt lại mật khẩu
- `cleanupExpiredTokens()`: Xóa token hết hạn
- `deleteUserTokens()`: Xóa token của người dùng cụ thể

### 2.5. Authentication Service (middleware/auth.js)

**Chức năng chính:**
- Xác thực người dùng thông qua JWT token
- Kiểm tra và phân quyền người dùng
- Bảo vệ các API endpoint

**Phương thức chính:**
- `authenticate()`: Middleware xác thực người dùng
- `authorize()`: Middleware kiểm tra quyền hạn
- `generateToken()`: Tạo JWT token mới
- `verifyToken()`: Xác thực token

## 3. HỆ THỐNG XÁC THỰC VÀ PHÂN QUYỀN MỚI (AUTH MICRO-MODULES)

Hệ thống xác thực và phân quyền được tái cấu trúc thành các micro-modules độc lập, giúp dễ bảo trì và mở rộng.

### 3.1. Token Service (`token.service.js`)

**Chức năng chính:**
- Quản lý toàn bộ JWT access tokens và refresh tokens
- Tạo, xác thực và thu hồi token
- Xử lý các vấn đề liên quan đến token lifecycle

**Phương thức chính:**
- `generateAccessToken()`: Tạo JWT access token mới
- `generateRefreshToken()`: Tạo refresh token mới
- `verifyAccessToken()`: Xác thực JWT access token
- `getUserIdFromRefreshToken()`: Lấy user ID từ refresh token
- `revokeAccessToken()`: Thu hồi access token
- `removeRefreshToken()`: Xóa refresh token
- `isTokenRevoked()`: Kiểm tra token đã bị thu hồi chưa
- `isTokenExpired()`: Kiểm tra token đã hết hạn chưa

### 3.2. Authentication Service (`authentication.service.js`)

**Chức năng chính:**
- Quản lý quy trình đăng nhập, đăng ký, đăng xuất
- Xác thực người dùng và token
- Quản lý phiên làm việc

**Phương thức chính:**
- `login()`: Xác thực người dùng và tạo token
- `verify()`: Xác thực token và trả về thông tin người dùng
- `refresh()`: Làm mới access token bằng refresh token
- `logout()`: Đăng xuất và vô hiệu hóa token
- `logoutAllDevices()`: Đăng xuất khỏi tất cả thiết bị
- `register()`: Đăng ký người dùng mới
- `changePassword()`: Đổi mật khẩu người dùng

### 3.3. Authorization Service (`authorization.service.js`)

**Chức năng chính:**
- Kiểm tra quyền truy cập và phân quyền
- Quản lý vai trò và quyền hạn
- Xác thực quyền sở hữu tài nguyên

**Phương thức chính:**
- `hasRole()`: Kiểm tra người dùng có vai trò cần thiết
- `isAdmin()`: Kiểm tra người dùng có phải là admin
- `isOwner()`: Kiểm tra quyền sở hữu tài nguyên
- `hasAccess()`: Kiểm tra quyền truy cập dựa trên vai trò hoặc quyền sở hữu
- `logAuthorizationActivity()`: Ghi log hoạt động phân quyền

### 3.4. Auth Events Module (`auth-events.js`)

**Chức năng chính:**
- Quản lý sự kiện liên quan đến xác thực và phân quyền
- Cung cấp cơ chế pub/sub cho các hoạt động xác thực
- Phát sự kiện để các module khác có thể phản ứng

**Phương thức chính:**
- `emit()`: Phát sự kiện xác thực
- `on()`: Đăng ký lắng nghe sự kiện
- `off()`: Hủy đăng ký lắng nghe sự kiện

### 3.5. Token Repository (`token.repository.js`)

**Chức năng chính:**
- Lưu trữ và quản lý tokens trong database
- Tương tác với CSDL để lưu trữ refresh token và token đã thu hồi
- Ghi log hoạt động xác thực

**Phương thức chính:**
- `saveRefreshToken()`: Lưu refresh token vào database
- `findRefreshToken()`: Tìm refresh token trong database
- `revokeRefreshToken()`: Thu hồi refresh token
- `revokeAllUserRefreshTokens()`: Thu hồi tất cả refresh tokens của một user
- `saveRevokedToken()`: Lưu token đã bị thu hồi vào database
- `isTokenRevoked()`: Kiểm tra token có bị thu hồi không
- `cleanupExpiredTokens()`: Xóa các token hết hạn
- `saveAuthActivity()`: Lưu hoạt động xác thực vào database

### 3.6. AuthService Tổng hợp (`auth.service.js`)

**Chức năng chính:**
- Facade service kết hợp tất cả các micro-modules ở trên
- Cung cấp API đơn giản để sử dụng trong ứng dụng
- Tối ưu hóa và điều phối hoạt động giữa các modules

**Phương thức chính:**
- `login()`: Xác thực người dùng và tạo token
- `register()`: Đăng ký người dùng mới
- `verifyToken()`: Xác thực token và trả về thông tin người dùng
- `refreshToken()`: Làm mới access token bằng refresh token
- `logout()`: Đăng xuất và vô hiệu hóa token
- `logoutAllDevices()`: Đăng xuất khỏi tất cả thiết bị
- `changePassword()`: Đổi mật khẩu người dùng
- `requestPasswordReset()`: Yêu cầu đặt lại mật khẩu
- `resetPassword()`: Đặt lại mật khẩu bằng token reset
- `checkRole()`: Kiểm tra người dùng có vai trò cần thiết
- `checkOwnership()`: Kiểm tra quyền sở hữu tài nguyên
- `getUserAuthHistory()`: Lấy lịch sử hoạt động xác thực

## 4. CẤU TRÚC CƠ SỞ DỮ LIỆU

### 4.1. Bảng `users`

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

### 4.2. Bảng `password_reset_tokens`

| Cột | Kiểu dữ liệu | Mô tả |
|-----|--------------|-------|
| id | INT (IDENTITY) | Khóa chính, tự tăng |
| user_id | INT | ID người dùng (khóa ngoại liên kết với bảng users) |
| token | NVARCHAR(100) | Token để gửi trong email |
| token_hash | NVARCHAR(255) | Giá trị token đã được mã hóa lưu trữ |
| expires_at | DATETIME | Thời điểm hết hạn của token |
| created_at | DATETIME | Thời điểm tạo token |
| used | BIT | Trạng thái sử dụng (1=đã sử dụng, 0=chưa sử dụng) |

### 4.3. Bảng Refresh Tokens

Lưu trữ refresh tokens để sử dụng cho việc refresh access tokens.

| Tên trường | Kiểu dữ liệu | Mô tả |
|------------|--------------|-------|
| id | INT | Khóa chính, tự tăng |
| token | VARCHAR(255) | Token giá trị, unique |
| user_id | INT | Khóa ngoại đến bảng Users |
| expiry_date | DATETIME | Thời gian hết hạn |
| created_at | DATETIME | Thời gian tạo |
| last_used_at | DATETIME | Thời gian sử dụng cuối |
| is_revoked | BIT | Trạng thái thu hồi |
| revoked_at | DATETIME | Thời gian thu hồi |
| user_agent | NVARCHAR(512) | Thông tin thiết bị |

### 4.4. Bảng Revoked Tokens

Lưu trữ các JWT token đã bị thu hồi (blacklist).

| Tên trường | Kiểu dữ liệu | Mô tả |
|------------|--------------|-------|
| id | INT | Khóa chính, tự tăng |
| token | VARCHAR(2000) | Token đã bị thu hồi |
| user_id | INT | Khóa ngoại đến bảng Users |
| expiry_date | DATETIME | Thời gian hết hạn |
| revoked_at | DATETIME | Thời gian thu hồi |

### 4.5. Bảng Auth Logs

Lưu trữ nhật ký hoạt động xác thực và phân quyền.

| Tên trường | Kiểu dữ liệu | Mô tả |
|------------|--------------|-------|
| id | INT | Khóa chính, tự tăng |
| user_id | INT | Khóa ngoại đến bảng Users |
| username | NVARCHAR(100) | Tên đăng nhập |
| action | NVARCHAR(50) | Hành động (login, logout...) |
| success | BIT | Thành công hay thất bại |
| details | NVARCHAR(1000) | Chi tiết bổ sung |
| ip_address | VARCHAR(45) | Địa chỉ IP |
| user_agent | NVARCHAR(512) | Thông tin trình duyệt/thiết bị |
| created_at | DATETIME | Thời gian thực hiện |

### 4.6 Bảng Password Reset

Lưu trữ thông tin về các yêu cầu đặt lại mật khẩu.

| Tên trường | Kiểu dữ liệu | Mô tả |
|------------|--------------|-------|
| id | INT | Khóa chính, tự tăng |
| user_id | INT | Khóa ngoại đến bảng Users |
| token | VARCHAR(255) | Token đặt lại mật khẩu |
| expiry_date | DATETIME | Thời gian hết hạn |
| created_at | DATETIME | Thời gian tạo |
| used | BIT | Đã sử dụng chưa |
| used_at | DATETIME | Thời gian sử dụng |

## 5. QUY TRÌNH HOẠT ĐỘNG

### 5.1. Quy trình đăng nhập

1. Client gửi request đến endpoint `/api/auth/login` với username và password
2. User Service kiểm tra thông tin đăng nhập trong database
3. Nếu hợp lệ, tạo JWT token và trả về client
4. Client lưu token và sử dụng trong các request tiếp theo

### 5.2. Quy trình đặt lại mật khẩu

1. Client gửi request đến `/api/auth/reset-password/request` với email
2. Password Reset Service tạo token và lưu vào database
3. System ghi log token (hoặc gửi email trong môi trường production)
4. Client nhận token và gửi request để xác thực token qua `/api/auth/reset-password/validate/:token`
5. Nếu token hợp lệ, client gửi mật khẩu mới đến `/api/auth/reset-password/reset`
6. Password Reset Service đặt lại mật khẩu và đánh dấu token đã sử dụng

### 5.3. Quy trình quản lý người dùng (dành cho Admin)

1. Admin đăng nhập và nhận JWT token
2. Admin quản lý người dùng thông qua các endpoint `/api/users`
3. Mỗi request đều kèm JWT token trong header
4. Auth Middleware kiểm tra token và quyền hạn trước khi thực hiện
5. User Service thực hiện các thao tác CRUD với database

## 6. BẢO MẬT HỆ THỐNG

### 6.1. Xác thực và phân quyền

- Sử dụng JWT (JSON Web Token) cho xác thực người dùng
- Phân quyền dựa trên vai trò (role-based authorization)
- Middleware `authenticate` kiểm tra token trong mọi request
- Middleware `authorize` kiểm tra quyền hạn dựa trên vai trò

### 6.2. Bảo mật mật khẩu

- Mật khẩu được mã hóa (hash) trước khi lưu vào database
- Token đặt lại mật khẩu được mã hóa và có thời hạn
- Hệ thống tự động dọn dẹp token hết hạn

### 6.3. Bảo mật API

- CORS (Cross-Origin Resource Sharing) được cấu hình đúng cách
- Rate Limiting chống tấn công brute-force
- Validation đầu vào để ngăn chặn SQL injection và XSS

## 7. KIỂM THỬ HỆ THỐNG

Quy trình test tự động cho hệ thống:

1. **Database Service Test**:
   - `test-db-service.js`: Kiểm tra kết nối và truy vấn cơ sở dữ liệu

2. **API Tests**:
   - `user-api.test.js`: Test các API liên quan đến người dùng
   - `role-management.test.js`: Test chức năng quản lý vai trò
   - `password-reset.test.js`: Test quy trình đặt lại mật khẩu
   - `full-api-test.js`: Test tổng hợp toàn bộ API

3. **Password Reset API Test**:
   - Quy trình test toàn diện từ yêu cầu token đến reset password
   - Bao gồm cả các tính năng quản lý token (dành cho admin)

## 8. MÔ HÌNH LUỒNG DỮ LIỆU

1. Client gửi request đến API Layer
2. Middleware xác thực và phân quyền
3. Controller nhận request và gọi đến Service tương ứng
4. Service xử lý logic nghiệp vụ
5. Repository thực hiện các thao tác với database
6. Kết quả được trả về qua Service và Controller
7. API Layer định dạng response và gửi về client
