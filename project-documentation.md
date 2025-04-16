
# TÀI LIỆU TỔNG HỢP DỰ ÁN

## 1. TỔNG QUAN KIẾN TRÚC

### 1.1. Giới thiệu

Dự án được phát triển theo mô hình **Fullstack Web Application** với:
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn-ui
- **Backend**: Node.js với Express + Microservices

Hệ thống được phát triển theo mô hình **Microservices**, với mỗi service chịu trách nhiệm cho một chức năng cụ thể và có thể hoạt động độc lập. Backend kết nối với SQL Server để lưu trữ dữ liệu.

### 1.2. Các lớp kiến trúc

#### 1.2.1. Backend

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

#### 1.2.2. Frontend

1. **Presentation Layer**: Giao diện người dùng
   - Pages: Các trang của ứng dụng
   - Components: Các thành phần UI tái sử dụng

2. **Domain Services Layer**: Xử lý logic nghiệp vụ phía client
   - Centralize Business Logic: Tập trung xử lý logic nghiệp vụ
   - Separate Concerns: Tách biệt logic nghiệp vụ khỏi UI

3. **Controllers Layer**: Quản lý state và gọi Domain Services
   - Điều phối dữ liệu giữa UI và Domain Services

4. **API Broker Layer**: Quản lý tương tác với Backend APIs
   - Gọi API endpoints
   - Xử lý error handling, authentication

## 2. CƠ SỞ DỮ LIỆU

### 2.1. Cấu hình kết nối

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

### 2.2. Quản lý kết nối

Kết nối cơ sở dữ liệu được quản lý bởi `DbService` (trong `src/core/services/db.service.js`), cung cấp các chức năng:

- Kết nối và duy trì connection pool
- Tự động kết nối lại khi mất kết nối
- Kiểm tra sức khỏe kết nối định kỳ (health check)
- Khởi tạo cấu trúc bảng khi khởi động

### 2.3. Cấu trúc cơ sở dữ liệu

#### 2.3.1. Bảng `users`

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

#### 2.3.2. Bảng `password_reset_tokens`

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

#### 2.3.3. Bảng Refresh Tokens

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

#### 2.3.4. Bảng Revoked Tokens

Lưu trữ các JWT token đã bị thu hồi (blacklist).

| Tên trường | Kiểu dữ liệu | Mô tả |
|------------|--------------|-------|
| id | INT | Khóa chính, tự tăng |
| token | VARCHAR(2000) | Token đã bị thu hồi |
| user_id | INT | Khóa ngoại đến bảng Users |
| expiry_date | DATETIME | Thời gian hết hạn |
| revoked_at | DATETIME | Thời gian thu hồi |

#### 2.3.5. Bảng Auth Logs

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

### 2.4. Khởi tạo cơ sở dữ liệu

Cơ sở dữ liệu được khởi tạo tự động khi khởi động server thông qua phương thức `checkAndCreateTables()` trong `DbService`. 

Script SQL để tạo các bảng được lưu trong thư mục `src/sql`:
- `create-users-table.sql`: Tạo bảng users
- `create-password-reset-table.sql`: Tạo bảng password_reset_tokens
- `create-auth-logs-table.sql`: Tạo bảng auth_logs
- `create-refresh-tokens-table.sql`: Tạo bảng refresh_tokens
- `create-revoked-tokens-table.sql`: Tạo bảng revoked_tokens

Các script này có logic kiểm tra sự tồn tại của bảng và cột trước khi thực hiện, để tránh lỗi khi chạy nhiều lần.

### 2.5. Thực hiện truy vấn

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

## 3. BACKEND MICROSERVICES

### 3.1. Database Service (`db.service.js`)

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

### 3.2. User Service (`user.service.js`)

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

### 3.3. Role Service (`role.service.js`)

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

### 3.4. Authentication System (Micro-modules)

#### 3.4.1. Token Service (`token.service.js`)

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

#### 3.4.2. Authentication Service (`authentication.service.js`)

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

#### 3.4.3. Authorization Service (`authorization.service.js`)

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

#### 3.4.4. Auth Events Module (`auth-events.js`)

**Chức năng chính:**
- Quản lý sự kiện liên quan đến xác thực và phân quyền
- Cung cấp cơ chế pub/sub cho các hoạt động xác thực
- Phát sự kiện để các module khác có thể phản ứng

**Phương thức chính:**
- `emit()`: Phát sự kiện xác thực
- `on()`: Đăng ký lắng nghe sự kiện
- `off()`: Hủy đăng ký lắng nghe sự kiện

#### 3.4.5. Token Repository (`token.repository.js`)

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

### 3.5. Password Reset Service (`password-reset.service.js`)

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

## 4. FRONTEND ARCHITECTURE

### 4.1. API Broker Layer

API Broker là một lớp trung gian (middleware) trong kiến trúc frontend để quản lý tập trung tất cả các API calls từ ứng dụng đến backend. API Broker phối hợp chặt chẽ với hệ thống backend microservices để đảm bảo tính nhất quán và bảo mật trong giao tiếp giữa client và server.

#### 4.1.1. Mục tiêu

- **Tập trung hóa quản lý API**: Tất cả API calls được xử lý qua một điểm trung tâm
- **Tách biệt logic**: UI components không cần biết chi tiết về endpoint URLs, headers, hoặc cấu trúc request
- **Dễ bảo trì**: Thay đổi API chỉ cần được cập nhật tại một nơi duy nhất
- **Mở rộng tính năng**: Dễ dàng bổ sung middleware, caching, logging, retry logic

#### 4.1.2. Mô hình hoạt động

```
UI Components → Controllers → API Broker → Backend APIs
```

Luồng xử lý dữ liệu:
1. **UI Components**: Hiển thị dữ liệu và tương tác với người dùng
2. **Controllers**: Xử lý logic nghiệp vụ và điều phối dữ liệu
3. **API Broker**: Quản lý và thực hiện các API calls
4. **Backend APIs**: Endpoint microservices xử lý dữ liệu

#### 4.1.3. Cấu trúc thư mục

```
src/
  admin/
    services/
      api-broker.ts            # Core API Broker class
      api-url.service.ts       # Định nghĩa endpoint URLs
    hooks/
      useApiBroker.ts          # Hook để UI components sử dụng API Broker
      useApi.ts                # Hook gốc để sử dụng callApi
    controllers/
      UserController.ts        # Controller cho User Management
      ...
```

#### 4.1.4. Xử lý lỗi

**Nguyên tắc xử lý lỗi**

1. **Tập trung xử lý lỗi ở Controller**: Controller cần xử lý và format lỗi, hiển thị thông báo thích hợp
2. **Giữ API Broker thuần túy**: API Broker chỉ throw lỗi, không xử lý
3. **Sử dụng toast để thông báo**: Hiển thị thông báo lỗi qua toast system
4. **Ghi log lỗi**: Lưu lại thông tin lỗi để debug

```typescript
// Trong Controller
try {
  await apiBroker.updateUser(id, data);
} catch (error) {
  // 1. Log lỗi
  console.error("API Error:", error);
  
  // 2. Format thông báo lỗi
  const message = formatErrorMessage(error);
  
  // 3. Hiển thị thông báo
  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  });
  
  // 4. Throw lại lỗi đã được xử lý
  throw new FormattedError(message, error);
}
```

### 4.2. Domain Services Layer

Domain Services layer là một thành phần kiến trúc mạnh mẽ nằm giữa Controllers và API Broker. Nó tập trung tất cả logic nghiệp vụ, xác thực bảo mật, và các hoạt động workflow phức tạp vào một nơi, làm cho ứng dụng dễ bảo trì, kiểm thử, và bảo mật hơn.

#### 4.2.1. Mục đích

Domain Services layer phục vụ các mục đích sau:
1. **Tập trung logic nghiệp vụ**: Tất cả các quy tắc nghiệp vụ, xác thực, và các hoạt động phức tạp được định nghĩa ở một nơi
2. **Tách biệt các mối quan tâm**: Components UI tập trung vào trình bày, Controllers xử lý trạng thái UI, và Domain Services xử lý các hoạt động nghiệp vụ
3. **Cải thiện bảo mật**: Tất cả các kiểm tra bảo mật được thực hiện nhất quán ở cấp domain
4. **Tăng cường khả năng kiểm thử**: Logic nghiệp vụ có thể dễ dàng được kiểm thử độc lập với components UI
5. **Chuẩn hóa xử lý lỗi**: Tất cả các hoạt động nghiệp vụ trả về kết quả chuẩn hóa với thông tin lỗi chi tiết

#### 4.2.2. Kiến trúc

```
UI Components → Controllers → Domain Services → API Broker → Backend APIs
```

#### 4.2.3. Thành phần

1. **BaseDomainService**: Giao diện nền tảng cho tất cả các domain services
   - Cung cấp kiểm tra quyền
   - Chuẩn hóa xử lý kết quả
   - Định nghĩa các hoạt động chung

2. **Domain-Specific Services**:
   - **UserDomainService**: Xử lý logic nghiệp vụ liên quan đến người dùng
   - **RoleDomainService**: Xử lý logic nghiệp vụ liên quan đến vai trò
   - (Các domain services khác có thể được thêm vào khi cần)

3. **DomainOperationResult**: Một kiểu kết quả chuẩn hóa cho tất cả các hoạt động domain
   - Bao gồm trạng thái thành công/thất bại
   - Chứa dữ liệu định kiểu khi thành công
   - Cung cấp thông tin lỗi chi tiết khi cần
   - Bao gồm lỗi xác thực đầu vào cho các lỗi xác thực đầu vào

#### 4.2.4. Triển khai

```typescript
export interface BaseDomainService {
  canPerformOperation(operationName: string, data?: any): Promise<boolean>;
  getAvailableOperations(): Promise<string[]>;
}

export interface DomainOperationResult<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  validationErrors?: Record<string, string[]>;
}

// Ví dụ
export class UserDomainServiceImpl extends BaseDomainServiceImpl implements UserDomainService {
  // Phương thức logic nghiệp vụ
  async createUser(userData: Partial<User>): Promise<DomainOperationResult<User>> {
    // Kiểm tra quyền
    if (!(await this.canPerformOperation(UserOperations.CREATE_USER))) {
      return this.createErrorResult('PERMISSION_DENIED', 'No permission to create users');
    }
    
    // Xác thực dữ liệu
    const validation = await this.validateUserData(userData);
    if (!validation.isValid) {
      return this.createValidationErrorResult(validation.errors);
    }
    
    // Thực hiện hoạt động
    try {
      const result = await this.apiBroker.createUser(userData);
      return this.createSuccessResult(result);
    } catch (error) {
      return this.createErrorResult('API_ERROR', error.message);
    }
  }
}
```

### 4.3. Controllers Layer

Controllers là lớp trung gian kết nối UI Components với Domain Services. Chúng quản lý trạng thái UI và điều phối dữ liệu, đồng thời xử lý tương tác người dùng.

#### 4.3.1. Mục đích

- Quản lý trạng thái UI (loading, error, data)
- Gọi các phương thức từ Domain Services
- Xử lý logic giao diện

#### 4.3.2. Triển khai

```typescript
export const useUserController = () => {
  const userDomainService = useUserDomainService();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const createUser = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await userDomainService.createUser(userData);
      
      if (!result.success) {
        setError(result.error?.message || 'An error occurred');
        return null;
      }
      
      return result.data;
    } finally {
      setIsLoading(false);
    }
  };
  
  return { createUser, isLoading, error };
};
```

### 4.4. UI Components

Các components UI được tổ chức theo hệ thống thư mục dựa trên chức năng:

```
src/
  components/          # Shared components
    ui/                # shadcn-ui components
    layouts/           # Layout components
    header/            # Header components
  pages/               # Page components
    products/          # Product pages
    projects/          # Project pages
    ...
  admin/               # Admin UI components
    pages/             # Admin pages
    components/        # Admin-specific components
```

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

### 7.1. Kiểm thử Backend

Quy trình test tự động cho hệ thống Backend:

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

### 7.2. Kiểm thử Frontend

1. **Unit Tests**:
   - `api-broker.test.ts`: Test các phương thức của API Broker
   - Sử dụng Jest cho testing framework

2. **UI Tests**:
   - `LoginUI.test.js`: Test giao diện đăng nhập
   - `UserUI.test.tsx`: Test giao diện quản lý người dùng

3. **Integration Tests**:
   - Test tương tác giữa các components
   - Test luồng hoạt động đầy đủ

## 8. CÔNG CỤ VÀ CÔNG NGHỆ

### 8.1. Backend

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **SQL Server**: Cơ sở dữ liệu
- **JWT**: Xác thực và phân quyền
- **Jest**: Testing framework

### 8.2. Frontend

- **React**: Thư viện UI
- **TypeScript**: Ngôn ngữ lập trình
- **Vite**: Build tool
- **Tailwind CSS**: Framework CSS
- **shadcn-ui**: UI component library
- **React Router**: Routing
- **React Query**: Data fetching

## 9. CẤU TRÚC THƯ MỤC

```
├── backend
│   ├── doc                      # Tài liệu backend
│   ├── mock                     # Mock data/services
│   ├── src
│   │   ├── admin                # API cho Admin UI
│   │   ├── core                 # Core services và repositories
│   │   │   ├── events           # Event handlers
│   │   │   ├── repositories     # Data access layer
│   │   │   └── services         # Business logic services
│   │   ├── lib                  # Utility libraries
│   │   ├── middleware           # Express middleware
│   │   ├── sql                  # SQL scripts
│   │   ├── tests                # Test scripts
│   │   ├── config.js            # Configuration
│   │   └── server.js            # Main server entry point
├── public                       # Public static files
│   ├── assets                   # Asset files (images, etc.)
│   └── lovable-uploads          # Uploaded files
├── src                          # Frontend source code
│   ├── admin                    # Admin UI
│   │   ├── __tests__            # Admin UI tests
│   │   ├── components           # Admin components
│   │   ├── context              # Admin context providers
│   │   ├── controllers          # Admin controllers
│   │   ├── hooks                # Admin custom hooks
│   │   ├── layouts              # Admin layouts
│   │   ├── pages                # Admin pages
│   │   └── services             # Admin services
│   ├── components               # Shared components
│   │   ├── header               # Header components
│   │   ├── layouts              # Layout components
│   │   └── ui                   # UI components
│   ├── hooks                    # Custom hooks
│   ├── lib                      # Utility libraries
│   └── pages                    # Frontend pages
├── package.json                 # Project dependencies
└── vite.config.ts               # Vite configuration
```

## 10. HƯỚNG DẪN CHẠY VÀ KIỂM THỬ

### 10.1. Khởi động ứng dụng

1. **Dev Server**:
   - Chạy `npm run dev` để khởi động frontend dev server
   - Chạy `node ./backend/src/server.js` để khởi động backend server

2. **Full Stack Development**:
   - Sử dụng workflow `Full Stack Dev` để chạy cả frontend và backend cùng lúc

### 10.2. Chạy tests

1. **Database Connection Test**:
   - Chạy `node test-db-connection.js` để kiểm tra kết nối đến database

2. **API Tests**:
   - Chạy `node backend/src/tests/full-api-test.js` để test toàn bộ API

3. **Admin UI Test**:
   - Chạy workflow `Test Admin UI` để xem thông tin test UI admin và login

### 10.3. Thông tin đăng nhập test

- **Username**: admin
- **Password**: Admin@123456

## 11. BEST PRACTICES

1. **Tách biệt mối quan tâm**: Mỗi module chỉ tập trung vào một chức năng cụ thể
2. **Sử dụng Domain Services**: Tập trung logic nghiệp vụ tại một nơi
3. **Validation đầu vào**: Luôn kiểm tra và xác thực dữ liệu đầu vào
4. **Error handling**: Xử lý lỗi một cách nhất quán
5. **Security first**: Ưu tiên bảo mật trong mọi thiết kế và triển khai
6. **DRY (Don't Repeat Yourself)**: Sử dụng các tính năng tái sử dụng để tránh lặp lại code
7. **Testability**: Thiết kế code để dễ dàng test
