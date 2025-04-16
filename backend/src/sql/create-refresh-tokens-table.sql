-- Script tạo bảng refresh_tokens
-- Lưu trữ refresh tokens để sử dụng cho việc refresh access tokens

CREATE TABLE refresh_tokens (
    id INT IDENTITY(1,1) PRIMARY KEY,
    token VARCHAR(255) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    expiry_date DATETIME NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    last_used_at DATETIME NULL,
    is_revoked BIT NOT NULL DEFAULT 0,
    revoked_at DATETIME NULL,
    user_agent NVARCHAR(512) NULL,
    CONSTRAINT FK_RefreshTokens_Users FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tạo index để tìm kiếm nhanh theo token và user_id
CREATE INDEX IX_RefreshTokens_Token ON refresh_tokens(token);
CREATE INDEX IX_RefreshTokens_UserId ON refresh_tokens(user_id);
CREATE INDEX IX_RefreshTokens_Expiry ON refresh_tokens(expiry_date);

-- Tạo index kết hợp để tìm kiếm token hợp lệ
CREATE INDEX IX_RefreshTokens_Valid ON refresh_tokens(token, is_revoked, expiry_date);
