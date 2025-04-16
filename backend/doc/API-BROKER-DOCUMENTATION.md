# TÀI LIỆU HƯỚNG DẪN SỬ DỤNG API BROKER

## 1. GIỚI THIỆU

API Broker là một lớp trung gian (middleware) trong kiến trúc frontend để quản lý tập trung tất cả các API calls từ ứng dụng đến backend. API Broker phối hợp chặt chẽ với hệ thống backend microservices để đảm bảo tính nhất quán và bảo mật trong giao tiếp giữa client và server.

### 1.1. Mục tiêu

- **Tập trung hóa quản lý API**: Tất cả API calls được xử lý qua một điểm trung tâm
- **Tách biệt logic**: UI components không cần biết chi tiết về endpoint URLs, headers, hoặc cấu trúc request
- **Dễ bảo trì**: Thay đổi API chỉ cần được cập nhật tại một nơi duy nhất
- **Mở rộng tính năng**: Dễ dàng bổ sung middleware, caching, logging, retry logic

### 1.2. Mô hình hoạt động

```
UI Components → Controllers → API Broker → Backend APIs
```

Luồng xử lý dữ liệu:
1. **UI Components**: Hiển thị dữ liệu và tương tác với người dùng
2. **Controllers**: Xử lý logic nghiệp vụ và điều phối dữ liệu
3. **API Broker**: Quản lý và thực hiện các API calls
4. **Backend APIs**: Endpoint microservices xử lý dữ liệu

## 2. CẤU TRÚC API BROKER

### 2.1. Cấu trúc thư mục

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

### 2.2. Thành phần chính

#### 2.2.1. API Broker Class (`api-broker.ts`)

Lớp chính quản lý tất cả các API calls. Cung cấp các phương thức cho từng loại API request.

```typescript
interface ApiBrokerInterface {
  getUsers(params?: Record<string, any>): Promise<any>;
  getUserById(id: number): Promise<any>;
  createUser(userData: any): Promise<any>;
  updateUser(id: number, userData: any): Promise<any>;
  deleteUser(id: number): Promise<any>;
  // Các phương thức API khác...
}

class ApiBroker implements ApiBrokerInterface {
  private callApi: Function;
  
  constructor(callApiFunction: Function) {
    this.callApi = callApiFunction;
  }
  
  // Triển khai các phương thức API...
}
```

#### 2.2.2. useApiBroker Hook (`useApiBroker.ts`)

React hook để các components có thể dễ dàng sử dụng API Broker.

```typescript
export const useApiBroker = () => {
  const { callApi } = useApi();
  return useMemo(() => new ApiBroker(callApi), [callApi]);
};
```

#### 2.2.3. Controllers (`UserController.ts`, ...)

Lớp trung gian giữa UI và API Broker, xử lý logic nghiệp vụ.

```typescript
export const useUserController = () => {
  const apiBroker = useApiBroker();
  
  const getUsers = async (params) => {
    try {
      return await apiBroker.getUsers(params);
    } catch (error) {
      // Xử lý lỗi
    }
  };
  
  // Các phương thức khác...
  
  return { getUsers, ... };
};
```

## 3. HƯỚNG DẪN SỬ DỤNG

### 3.1. Cài đặt một API mới

#### Bước 1: Bổ sung endpoint URL trong `api-url.service.ts`

```typescript
export const API_ENDPOINTS = {
  // Các endpoints hiện có
  PROJECTS: {
    LIST: '/api/projects',
    DETAIL: '/api/projects/:id',
    CREATE: '/api/projects'
  }
};
```

#### Bước 2: Thêm phương thức API vào API Broker

```typescript
// Trong api-broker.ts
class ApiBroker implements ApiBrokerInterface {
  // Các phương thức hiện có
  
  // Thêm phương thức mới
  async getProjects(params?: Record<string, any>) {
    return this.callApi(API_ENDPOINTS.PROJECTS.LIST, {}, params);
  }
  
  async getProjectById(id: number) {
    return this.callApi(API_ENDPOINTS.PROJECTS.DETAIL, { id });
  }
  
  async createProject(projectData: any) {
    return this.callApi(API_ENDPOINTS.PROJECTS.CREATE, {}, {}, {
      method: 'POST',
      body: projectData
    });
  }
}
```

#### Bước 3: Tạo Controller cho API mới

```typescript
// Trong ProjectController.ts
export const useProjectController = () => {
  const apiBroker = useApiBroker();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const getProjects = async (params = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiBroker.getProjects(params);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to fetch projects');
      toast({
        title: "Error",
        description: err.message || "Failed to fetch projects",
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Thêm các phương thức khác...
  
  return { getProjects, isLoading, error };
};
```

#### Bước 4: Sử dụng Controller trong UI Component

```tsx
const ProjectList = () => {
  const { getProjects, isLoading } = useProjectController();
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const result = await getProjects();
        setProjects(result.data);
      } catch (error) {
        console.error('Failed to load projects:', error);
      }
    };
    
    loadProjects();
  }, [getProjects]);
  
  // Render UI...
};
```

### 3.2. Xử lý yêu cầu phức tạp

#### Truyền tham số

```typescript
// Lấy dữ liệu với phân trang và tìm kiếm
const result = await apiBroker.getUsers({
  page: 1,
  pageSize: 10,
  search: "admin",
  role: "editor"
});
```

#### Xử lý thiết lập header tùy chỉnh

```typescript
// Trong api-broker.ts
async uploadFile(fileData: FormData) {
  return this.callApi(API_ENDPOINTS.FILES.UPLOAD, {}, {}, {
    method: 'POST',
    body: fileData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
```

#### Xử lý transactions với nhiều API calls

```typescript
// Trong ProjectController.ts
const createProjectWithTeam = async (projectData, teamMembers) => {
  setIsLoading(true);
  setError(null);
  try {
    // Tạo project
    const project = await apiBroker.createProject(projectData);
    
    // Thêm thành viên vào project
    for (const member of teamMembers) {
      await apiBroker.addProjectMember(project.id, member);
    }
    
    return project;
  } catch (err) {
    setError(err.message);
    toast({
      title: "Error",
      description: err.message,
      variant: "destructive",
    });
    throw err;
  } finally {
    setIsLoading(false);
  }
};
```

## 4. QUY TẮC VÀ CONVENTIONS

### 4.1. Đặt tên

#### API Endpoints

- Sử dụng chữ HOA và gạch dưới cho tên constants: `USER`, `PROJECTS`
- Sử dụng chữ HOA cho action: `LIST`, `DETAIL`, `CREATE`, `UPDATE`
- Sử dụng đường dẫn REST tiêu chuẩn: `/api/users`, `/api/users/:id`

```typescript
export const API_ENDPOINTS = {
  USERS: {
    LIST: '/api/users',
    DETAIL: '/api/users/:id',
    CREATE: '/api/users',
    ROLES: '/api/users/roles'
  }
};
```

#### Phương thức API Broker

- Sử dụng camelCase cho tên phương thức
- Bắt đầu bằng động từ: `get`, `create`, `update`, `delete`
- Tên rõ ràng về chức năng: `getUsers`, `getUserById`, `updateUserStatus`

```typescript
async getUsers(params?: Record<string, any>) { ... }
async getUserById(id: number) { ... }
async createUser(userData: any) { ... }
```

#### Controllers

- Sử dụng hook pattern: `useUserController`, `useProjectController`
- Trả về object với các phương thức và state: `{ getUsers, isLoading, error }`
- Tên phương thức tuân theo quy tắc tương tự API Broker

### 4.2. Xử lý lỗi

#### Nguyên tắc xử lý lỗi

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

### 4.3. Phân trang và Filtering

Quy ước tham số cho phân trang và lọc dữ liệu:

```typescript
// Tham số phân trang
{
  page: number;       // Số trang hiện tại
  pageSize: number;   // Số mục trên mỗi trang
}

// Tham số tìm kiếm
{
  search: string;     // Từ khóa tìm kiếm
  sortBy: string;     // Trường sắp xếp
  sortDir: 'asc' | 'desc';   // Thứ tự sắp xếp
  filters: Record<string, any>;  // Các điều kiện lọc
}
```

### 4.4. Cấu trúc Response

Tiêu chuẩn hóa cấu trúc response data:

```typescript
// Cấu trúc response cho danh sách
{
  data: any[];             // Mảng dữ liệu
  pagination: {            // Thông tin phân trang
    currentPage: number;   // Trang hiện tại
    totalPages: number;    // Tổng số trang
    totalItems: number;    // Tổng số mục
    pageSize: number;      // Số mục trên mỗi trang
  }
}

// Cấu trúc response cho chi tiết
{
  data: any;               // Dữ liệu đối tượng
}
```

## 5. BEST PRACTICES

### 5.1. Tránh Lặp Code

- Sử dụng generic methods trong API Broker để giảm code trùng lặp
- Tạo các helper functions để tái sử dụng logic xử lý API chung

```typescript
// Generic get method
async get<T>(endpoint: string, pathParams = {}, queryParams = {}) {
  return this.callApi<T>(endpoint, pathParams, queryParams);
}

// Generic post method
async post<T>(endpoint: string, body: any, pathParams = {}) {
  return this.callApi<T>(endpoint, pathParams, {}, {
    method: 'POST',
    body
  });
}
```

### 5.2. Tối ưu Performance

#### Caching

Triển khai caching để giảm số lượng API calls:

```typescript
// Trong api-broker.ts
private cache = new Map<string, {data: any, timestamp: number}>();
private cacheTTL = 60000; // 1 phút

async getUsersWithCache(params?: Record<string, any>) {
  const cacheKey = `users:${JSON.stringify(params)}`;
  const cached = this.cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
    return cached.data;
  }
  
  const result = await this.callApi(API_ENDPOINTS.USERS.LIST, {}, params);
  this.cache.set(cacheKey, { data: result, timestamp: Date.now() });
  return result;
}
```

#### Debouncing

Sử dụng debounce cho các user actions thay đổi nhanh:

```typescript
// Trong SearchComponent
const debouncedSearch = useCallback(
  debounce((term) => {
    getUsers({ search: term });
  }, 300),
  [getUsers]
);

const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
  debouncedSearch(e.target.value);
};
```

### 5.3. Xử lý Authentication

API Broker nên xử lý token refresh và authentication errors:

```typescript
// Trong api-broker.ts
async callWithAuth<T>(endpoint: string, ...args: any[]) {
  try {
    return await this.callApi<T>(endpoint, ...args);
  } catch (error) {
    if (error.status === 401) {
      // Token hết hạn, thử refresh token
      await this.refreshAuthToken();
      // Thử lại request sau khi refresh token
      return this.callApi<T>(endpoint, ...args);
    }
    throw error;
  }
}
```

### 5.4. Monitoring và Logging

Triển khai logging để giám sát API calls:

```typescript
// Trong API Broker trung gian
const logApiCall = (endpoint, method, startTime) => {
  const duration = Date.now() - startTime;
  console.log(`[API] ${method} ${endpoint} - ${duration}ms`);
  
  // Có thể gửi logging data đến service monitoring
  if (duration > 1000) {
    logSlowApiCall(endpoint, method, duration);
  }
};

async callApi<T>(...args) {
  const startTime = Date.now();
  try {
    const result = await this._callApi<T>(...args);
    logApiCall(args[0], args[3]?.method || 'GET', startTime);
    return result;
  } catch (error) {
    logApiError(args[0], args[3]?.method || 'GET', error);
    throw error;
  }
}
```

## 6. TÍCH HỢP VỚI BACKEND MICROSERVICES

API Broker được thiết kế để làm việc hiệu quả với backend microservices của VRC Admin.

### 6.1. Microservices Map

```
Frontend API Broker                Backend Microservices
------------------                --------------------
UserApiBroker       →→→           User Service
AuthApiBroker       →→→           Authentication Service
ProjectApiBroker    →→→           Project Service
ProductApiBroker    →→→           Product Service
```

### 6.2. Authentication Flow

1. Login flow:
   - AuthApiBroker.login() → Authentication Service
   - Lưu JWT token nhận được từ server
   - Sử dụng token cho các API calls tiếp theo

2. API calls với token:
   - API Broker tự động thêm token vào request header
   - Backend microservice xác thực token trước khi xử lý request

### 6.3. Error Handling

Mapping giữa HTTP status codes và UI error handling:

| Status Code | Ý nghĩa | Xử lý ở API Broker |
|-------------|---------|-------------------|
| 400 | Bad Request | Throw ValidationError |
| 401 | Unauthorized | Thử refresh token hoặc redirect tới login |
| 403 | Forbidden | Throw PermissionError |
| 404 | Not Found | Throw NotFoundError |
| 500 | Server Error | Throw ServerError |

## 7. VÍ DỤ THỰC TẾ

### 7.1. Quản lý người dùng

```typescript
// Trong UserList.tsx
const UserList = () => {
  const { getUsers, toggleUserStatus, deleteUser } = useUserController();
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10
  });
  
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await getUsers({
          page: pagination.currentPage,
          pageSize: pagination.pageSize
        });
        
        setUsers(result.data);
        setPagination(prev => ({
          ...prev,
          totalPages: result.pagination.totalPages,
          totalItems: result.pagination.totalItems
        }));
      } catch (error) {
        console.error('Failed to load users');
      }
    };
    
    loadUsers();
  }, [pagination.currentPage, pagination.pageSize, getUsers]);
  
  // Xử lý các sự kiện...
};
```

### 7.2. Upload file với progress tracking

```typescript
// Trong FilesApiBroker
async uploadFile(file, onProgress) {
  const formData = new FormData();
  formData.append('file', file);
  
  return this.callApi(API_ENDPOINTS.FILES.UPLOAD, {}, {}, {
    method: 'POST',
    body: formData,
    onProgress // Callback function to track progress
  });
}

// Trong FileController
const uploadFile = async (file) => {
  setUploading(true);
  setProgress(0);
  
  try {
    const result = await apiBroker.uploadFile(file, (progress) => {
      setProgress(progress);
    });
    
    toast({
      title: "Success",
      description: "File uploaded successfully"
    });
    
    return result;
  } catch (error) {
    toast({
      title: "Error", 
      description: error.message || "Upload failed",
      variant: "destructive"
    });
    throw error;
  } finally {
    setUploading(false);
  }
};
```

## 8. TÀI LIỆU THAM KHẢO

- [Backend Architecture Documentation](./backend/doc/kientruc.md)
- [Database Documentation](./backend/doc/DATABASE-DOCUMENTATION.md)
- [React Query Documentation](https://react-query.tanstack.com/docs/overview)
- [Axios Request Config](https://axios-http.com/docs/req_config)
- [REST API Best Practices](https://blog.restcase.com/rest-api-error-codes-101/)
