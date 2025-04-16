-- SQL Script để tạo bảng users với cấu trúc phù hợp
-- Kiểm tra xem bảng users đã tồn tại chưa
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    -- Tạo bảng users nếu chưa tồn tại
    CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        username NVARCHAR(100) NOT NULL,
        email NVARCHAR(255) NOT NULL,
        password NVARCHAR(255) NOT NULL,
        full_name NVARCHAR(255),
        role NVARCHAR(50) NOT NULL DEFAULT 'customer',
        is_active BIT NOT NULL DEFAULT 1,
        last_login DATETIME,
        created_at DATETIME NOT NULL DEFAULT GETDATE(),
        updated_at DATETIME NOT NULL DEFAULT GETDATE()
    );

    -- Thêm các ràng buộc duy nhất
    ALTER TABLE users ADD CONSTRAINT UQ_users_username UNIQUE (username);
    ALTER TABLE users ADD CONSTRAINT UQ_users_email UNIQUE (email);
    
    -- Thêm ràng buộc cho cột role
    ALTER TABLE users ADD CONSTRAINT CK_users_role CHECK (role IN ('customer', 'admin', 'editor'));

    PRINT 'Đã tạo bảng users thành công';
END
ELSE
BEGIN
    -- Kiểm tra xem cột is_active đã tồn tại chưa
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE name = 'is_active' AND object_id = OBJECT_ID('users'))
    BEGIN
        -- Thêm cột is_active nếu chưa tồn tại
        ALTER TABLE users ADD is_active BIT NOT NULL DEFAULT 1;
        PRINT 'Đã thêm cột is_active vào bảng users';
    END

    -- Kiểm tra và thêm các cột khác nếu cần
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE name = 'role' AND object_id = OBJECT_ID('users'))
    BEGIN
        ALTER TABLE users ADD role NVARCHAR(50) NOT NULL DEFAULT 'customer';
        PRINT 'Đã thêm cột role vào bảng users';
    END

    IF NOT EXISTS (SELECT * FROM sys.columns WHERE name = 'full_name' AND object_id = OBJECT_ID('users'))
    BEGIN
        ALTER TABLE users ADD full_name NVARCHAR(255);
        PRINT 'Đã thêm cột full_name vào bảng users';
    END

    IF NOT EXISTS (SELECT * FROM sys.columns WHERE name = 'last_login' AND object_id = OBJECT_ID('users'))
    BEGIN
        ALTER TABLE users ADD last_login DATETIME;
        PRINT 'Đã thêm cột last_login vào bảng users';
    END

    IF NOT EXISTS (SELECT * FROM sys.columns WHERE name = 'created_at' AND object_id = OBJECT_ID('users'))
    BEGIN
        ALTER TABLE users ADD created_at DATETIME NOT NULL DEFAULT GETDATE();
        PRINT 'Đã thêm cột created_at vào bảng users';
    END

    IF NOT EXISTS (SELECT * FROM sys.columns WHERE name = 'updated_at' AND object_id = OBJECT_ID('users'))
    BEGIN
        ALTER TABLE users ADD updated_at DATETIME NOT NULL DEFAULT GETDATE();
        PRINT 'Đã thêm cột updated_at vào bảng users';
    END
    
    -- Check for role constraint and add if it doesn't exist
    IF NOT EXISTS (SELECT * FROM sys.check_constraints WHERE name = 'CK_users_role' AND parent_object_id = OBJECT_ID('users'))
    BEGIN
        ALTER TABLE users ADD CONSTRAINT CK_users_role CHECK (role IN ('customer', 'admin', 'editor'));
        PRINT 'Đã thêm ràng buộc cho cột role vào bảng users';
    END

    PRINT 'Đã cập nhật bảng users thành công';
END