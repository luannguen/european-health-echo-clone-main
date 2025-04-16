-- Script tạo bảng auth_logs
-- Lưu trữ nhật ký hoạt động xác thực và phân quyền

CREATE TABLE auth_logs (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NULL,
    username NVARCHAR(100) NULL,
    action NVARCHAR(50) NOT NULL,
    success BIT NOT NULL DEFAULT 0,
    details NVARCHAR(1000) NULL,
    ip_address VARCHAR(45) NULL,
    user_agent NVARCHAR(512) NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_AuthLogs_Users FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tạo index để tìm kiếm theo user_id và thời gian
CREATE INDEX IX_AuthLogs_UserId ON auth_logs(user_id);
CREATE INDEX IX_AuthLogs_Time ON auth_logs(created_at);
CREATE INDEX IX_AuthLogs_Action ON auth_logs(action, created_at);
