-- SQL Script to create password_reset_tokens table
-- Check if the table exists
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'password_reset_tokens')
BEGIN
    -- Create the table if it doesn't exist
    CREATE TABLE password_reset_tokens (
        id INT IDENTITY(1,1) PRIMARY KEY,
        user_id INT NOT NULL,
        token NVARCHAR(100) NOT NULL,
        token_hash NVARCHAR(255) NOT NULL, -- Store hashed token for security
        expires_at DATETIME NOT NULL,
        created_at DATETIME NOT NULL DEFAULT GETDATE(),
        used BIT NOT NULL DEFAULT 0,
        CONSTRAINT FK_password_reset_tokens_user FOREIGN KEY (user_id) REFERENCES users(id)
    );

    -- Add index for faster token lookup
    CREATE INDEX IDX_password_reset_tokens_token_hash ON password_reset_tokens (token_hash);
    
    PRINT 'Created password_reset_tokens table successfully';
END
ELSE
BEGIN
    PRINT 'password_reset_tokens table already exists';
    
    -- Check if the used column exists, add it if not
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE name = 'used' AND object_id = OBJECT_ID('password_reset_tokens'))
    BEGIN
        ALTER TABLE password_reset_tokens ADD used BIT NOT NULL DEFAULT 0;
        PRINT 'Added used column to password_reset_tokens table';
    END
END