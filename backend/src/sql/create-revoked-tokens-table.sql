-- Script tạo bảng revoked_tokens
-- Lưu trữ các JWT token đã bị thu hồi (blacklist)

CREATE TABLE revoked_tokens (
    id INT IDENTITY(1,1) PRIMARY KEY,
    token VARCHAR(2000) NOT NULL,
    user_id INT NULL,
    expiry_date DATETIME NOT NULL,
    revoked_at DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_RevokedTokens_Users FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tạo index để tìm kiếm nhanh theo token
CREATE INDEX IX_RevokedTokens_Token ON revoked_tokens(token);
-- Tạo index để tự động dọn dẹp token hết hạn
CREATE INDEX IX_RevokedTokens_Expiry ON revoked_tokens(expiry_date);
