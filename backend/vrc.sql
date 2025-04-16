-- VRC Database Schema
-- Vietnamese Refrigeration Company (VRC)
-- Created: April 8, 2025
-- SQL Server 2019 Version - Fixed Foreign Keys

USE master;
GO

-- Create the database if it doesn't exist
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'VRC')
BEGIN
    CREATE DATABASE VRC
    COLLATE Vietnamese_CI_AS;
END
GO

USE VRC;
GO

-- -----------------------------------------------------
-- STEP 1: CREATE ALL TABLES WITHOUT FOREIGN KEY CONSTRAINTS
-- -----------------------------------------------------

-- Table users
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[users] (
        [id] INT NOT NULL IDENTITY(1,1),
        [username] NVARCHAR(100) NOT NULL,
        [email] NVARCHAR(100) NOT NULL,
        [password] NVARCHAR(255) NOT NULL,
        [full_name] NVARCHAR(150) NOT NULL,
        [phone] NVARCHAR(20) NULL,
        [role] NVARCHAR(20) NOT NULL CONSTRAINT DF_users_role DEFAULT 'customer',
        [avatar] NVARCHAR(255) NULL,
        [created_at] DATETIME2(0) NOT NULL CONSTRAINT DF_users_created_at DEFAULT GETDATE(),
        [updated_at] DATETIME2(0) NOT NULL CONSTRAINT DF_users_updated_at DEFAULT GETDATE(),
        CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED ([id] ASC),
        CONSTRAINT [CK_users_role] CHECK ([role] IN ('admin', 'editor', 'customer'))
    );

    CREATE UNIQUE NONCLUSTERED INDEX [IX_users_email] ON [dbo].[users] ([email] ASC);
    CREATE UNIQUE NONCLUSTERED INDEX [IX_users_username] ON [dbo].[users] ([username] ASC);
END
GO

-- Table categories
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[categories]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[categories] (
        [id] INT NOT NULL IDENTITY(1,1),
        [name] NVARCHAR(100) NOT NULL,
        [slug] NVARCHAR(120) NOT NULL,
        [description] NVARCHAR(MAX) NULL,
        [parent_id] INT NULL,
        [image] NVARCHAR(255) NULL,
        [order] INT NOT NULL CONSTRAINT DF_categories_order DEFAULT 0,
        [created_at] DATETIME2(0) NOT NULL CONSTRAINT DF_categories_created_at DEFAULT GETDATE(),
        [updated_at] DATETIME2(0) NOT NULL CONSTRAINT DF_categories_updated_at DEFAULT GETDATE(),
        CONSTRAINT [PK_categories] PRIMARY KEY CLUSTERED ([id] ASC)
    );

    CREATE UNIQUE NONCLUSTERED INDEX [IX_categories_slug] ON [dbo].[categories] ([slug] ASC);
    CREATE NONCLUSTERED INDEX [IX_categories_parent] ON [dbo].[categories] ([parent_id] ASC);
END
GO

-- Table tags
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tags]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[tags] (
        [id] INT NOT NULL IDENTITY(1,1),
        [name] NVARCHAR(50) NOT NULL,
        [slug] NVARCHAR(60) NOT NULL,
        [created_at] DATETIME2(0) NOT NULL CONSTRAINT DF_tags_created_at DEFAULT GETDATE(),
        [updated_at] DATETIME2(0) NOT NULL CONSTRAINT DF_tags_updated_at DEFAULT GETDATE(),
        CONSTRAINT [PK_tags] PRIMARY KEY CLUSTERED ([id] ASC)
    );

    CREATE UNIQUE NONCLUSTERED INDEX [IX_tags_slug] ON [dbo].[tags] ([slug] ASC);
END
GO

-- Table news
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[news]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[news] (
        [id] INT NOT NULL IDENTITY(1,1),
        [title] NVARCHAR(255) NOT NULL,
        [slug] NVARCHAR(300) NOT NULL,
        [content] NVARCHAR(MAX) NOT NULL,
        [excerpt] NVARCHAR(MAX) NULL,
        [image] NVARCHAR(255) NULL,
        [publish_date] DATE NOT NULL,
        [author_id] INT NOT NULL,
        [category_id] INT NOT NULL,
        [location] NVARCHAR(255) NULL,
        [organizer] NVARCHAR(150) NULL,
        [views] INT NOT NULL CONSTRAINT DF_news_views DEFAULT 0,
        [featured] BIT NOT NULL CONSTRAINT DF_news_featured DEFAULT 0,
        [status] NVARCHAR(20) NOT NULL CONSTRAINT DF_news_status DEFAULT 'published',
        [created_at] DATETIME2(0) NOT NULL CONSTRAINT DF_news_created_at DEFAULT GETDATE(),
        [updated_at] DATETIME2(0) NOT NULL CONSTRAINT DF_news_updated_at DEFAULT GETDATE(),
        CONSTRAINT [PK_news] PRIMARY KEY CLUSTERED ([id] ASC),
        CONSTRAINT [CK_news_status] CHECK ([status] IN ('published', 'draft', 'archived'))
    );

    CREATE UNIQUE NONCLUSTERED INDEX [IX_news_slug] ON [dbo].[news] ([slug] ASC);
    CREATE NONCLUSTERED INDEX [IX_news_author] ON [dbo].[news] ([author_id] ASC);
    CREATE NONCLUSTERED INDEX [IX_news_category] ON [dbo].[news] ([category_id] ASC);
END
GO

-- Table news_tags
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[news_tags]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[news_tags] (
        [news_id] INT NOT NULL,
        [tag_id] INT NOT NULL,
        CONSTRAINT [PK_news_tags] PRIMARY KEY CLUSTERED ([news_id] ASC, [tag_id] ASC)
    );

    CREATE NONCLUSTERED INDEX [IX_news_tags_tag] ON [dbo].[news_tags] ([tag_id] ASC);
END
GO

-- Table comments
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[comments]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[comments] (
        [id] INT NOT NULL IDENTITY(1,1),
        [news_id] INT NOT NULL,
        [user_id] INT NULL,
        [parent_id] INT NULL,
        [author_name] NVARCHAR(100) NULL,
        [author_email] NVARCHAR(100) NULL,
        [content] NVARCHAR(MAX) NOT NULL,
        [status] NVARCHAR(20) NOT NULL CONSTRAINT DF_comments_status DEFAULT 'pending',
        [created_at] DATETIME2(0) NOT NULL CONSTRAINT DF_comments_created_at DEFAULT GETDATE(),
        [updated_at] DATETIME2(0) NOT NULL CONSTRAINT DF_comments_updated_at DEFAULT GETDATE(),
        CONSTRAINT [PK_comments] PRIMARY KEY CLUSTERED ([id] ASC),
        CONSTRAINT [CK_comments_status] CHECK ([status] IN ('approved', 'pending', 'spam'))
    );

    CREATE NONCLUSTERED INDEX [IX_comments_news] ON [dbo].[comments] ([news_id] ASC);
    CREATE NONCLUSTERED INDEX [IX_comments_user] ON [dbo].[comments] ([user_id] ASC);
    CREATE NONCLUSTERED INDEX [IX_comments_parent] ON [dbo].[comments] ([parent_id] ASC);
END
GO

-- Table products
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[products]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[products] (
        [id] INT NOT NULL IDENTITY(1,1),
        [name] NVARCHAR(255) NOT NULL,
        [slug] NVARCHAR(300) NOT NULL,
        [description] NVARCHAR(MAX) NULL,
        [specifications] NVARCHAR(MAX) NULL,
        [features] NVARCHAR(MAX) NULL,
        [category_id] INT NOT NULL,
        [image] NVARCHAR(255) NULL,
        [status] NVARCHAR(20) NOT NULL CONSTRAINT DF_products_status DEFAULT 'active',
        [created_at] DATETIME2(0) NOT NULL CONSTRAINT DF_products_created_at DEFAULT GETDATE(),
        [updated_at] DATETIME2(0) NOT NULL CONSTRAINT DF_products_updated_at DEFAULT GETDATE(),
        CONSTRAINT [PK_products] PRIMARY KEY CLUSTERED ([id] ASC),
        CONSTRAINT [CK_products_status] CHECK ([status] IN ('active', 'inactive'))
    );

    CREATE UNIQUE NONCLUSTERED INDEX [IX_products_slug] ON [dbo].[products] ([slug] ASC);
    CREATE NONCLUSTERED INDEX [IX_products_category] ON [dbo].[products] ([category_id] ASC);
END
GO

-- Table product_images
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[product_images]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[product_images] (
        [id] INT NOT NULL IDENTITY(1,1),
        [product_id] INT NOT NULL,
        [image_path] NVARCHAR(255) NOT NULL,
        [alt_text] NVARCHAR(255) NULL,
        [order] INT NOT NULL CONSTRAINT DF_product_images_order DEFAULT 0,
        CONSTRAINT [PK_product_images] PRIMARY KEY CLUSTERED ([id] ASC)
    );

    CREATE NONCLUSTERED INDEX [IX_product_images_product] ON [dbo].[product_images] ([product_id] ASC);
END
GO

-- Table projects
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[projects]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[projects] (
        [id] INT NOT NULL IDENTITY(1,1),
        [title] NVARCHAR(255) NOT NULL,
        [slug] NVARCHAR(300) NOT NULL,
        [description] NVARCHAR(MAX) NULL,
        [content] NVARCHAR(MAX) NULL,
        [client] NVARCHAR(100) NULL,
        [location] NVARCHAR(255) NULL,
        [year] INT NULL,
        [featured_image] NVARCHAR(255) NULL,
        [project_type] NVARCHAR(20) NOT NULL,
        [status] NVARCHAR(20) NOT NULL CONSTRAINT DF_projects_status DEFAULT 'completed',
        [created_at] DATETIME2(0) NOT NULL CONSTRAINT DF_projects_created_at DEFAULT GETDATE(),
        [updated_at] DATETIME2(0) NOT NULL CONSTRAINT DF_projects_updated_at DEFAULT GETDATE(),
        CONSTRAINT [PK_projects] PRIMARY KEY CLUSTERED ([id] ASC),
        CONSTRAINT [CK_projects_project_type] CHECK ([project_type] IN ('commercial', 'industrial', 'residential')),
        CONSTRAINT [CK_projects_status] CHECK ([status] IN ('completed', 'ongoing', 'upcoming'))
    );

    CREATE UNIQUE NONCLUSTERED INDEX [IX_projects_slug] ON [dbo].[projects] ([slug] ASC);
END
GO

-- Table project_images
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[project_images]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[project_images] (
        [id] INT NOT NULL IDENTITY(1,1),
        [project_id] INT NOT NULL,
        [image_path] NVARCHAR(255) NOT NULL,
        [alt_text] NVARCHAR(255) NULL,
        [order] INT NOT NULL CONSTRAINT DF_project_images_order DEFAULT 0,
        CONSTRAINT [PK_project_images] PRIMARY KEY CLUSTERED ([id] ASC)
    );

    CREATE NONCLUSTERED INDEX [IX_project_images_project] ON [dbo].[project_images] ([project_id] ASC);
END
GO

-- Table services
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[services]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[services] (
        [id] INT NOT NULL IDENTITY(1,1),
        [name] NVARCHAR(255) NOT NULL,
        [slug] NVARCHAR(300) NOT NULL,
        [short_description] NVARCHAR(500) NULL,
        [description] NVARCHAR(MAX) NULL,
        [icon] NVARCHAR(255) NULL,
        [image] NVARCHAR(255) NULL,
        [parent_id] INT NULL,
        [order] INT NOT NULL CONSTRAINT DF_services_order DEFAULT 0,
        [created_at] DATETIME2(0) NOT NULL CONSTRAINT DF_services_created_at DEFAULT GETDATE(),
        [updated_at] DATETIME2(0) NOT NULL CONSTRAINT DF_services_updated_at DEFAULT GETDATE(),
        CONSTRAINT [PK_services] PRIMARY KEY CLUSTERED ([id] ASC)
    );

    CREATE UNIQUE NONCLUSTERED INDEX [IX_services_slug] ON [dbo].[services] ([slug] ASC);
    CREATE NONCLUSTERED INDEX [IX_services_parent] ON [dbo].[services] ([parent_id] ASC);
END
GO

-- Table technologies
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[technologies]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[technologies] (
        [id] INT NOT NULL IDENTITY(1,1),
        [name] NVARCHAR(255) NOT NULL,
        [slug] NVARCHAR(300) NOT NULL,
        [description] NVARCHAR(MAX) NULL,
        [image] NVARCHAR(255) NULL,
        [order] INT NOT NULL CONSTRAINT DF_technologies_order DEFAULT 0,
        [created_at] DATETIME2(0) NOT NULL CONSTRAINT DF_technologies_created_at DEFAULT GETDATE(),
        [updated_at] DATETIME2(0) NOT NULL CONSTRAINT DF_technologies_updated_at DEFAULT GETDATE(),
        CONSTRAINT [PK_technologies] PRIMARY KEY CLUSTERED ([id] ASC)
    );

    CREATE UNIQUE NONCLUSTERED INDEX [IX_technologies_slug] ON [dbo].[technologies] ([slug] ASC);
END
GO

-- Table testimonials
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[testimonials]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[testimonials] (
        [id] INT NOT NULL IDENTITY(1,1),
        [client_name] NVARCHAR(100) NOT NULL,
        [client_title] NVARCHAR(100) NULL,
        [client_company] NVARCHAR(150) NULL,
        [testimonial] NVARCHAR(MAX) NOT NULL,
        [client_image] NVARCHAR(255) NULL,
        [rating] TINYINT NULL,
        [order] INT NOT NULL CONSTRAINT DF_testimonials_order DEFAULT 0,
        [active] BIT NOT NULL CONSTRAINT DF_testimonials_active DEFAULT 1,
        [created_at] DATETIME2(0) NOT NULL CONSTRAINT DF_testimonials_created_at DEFAULT GETDATE(),
        [updated_at] DATETIME2(0) NOT NULL CONSTRAINT DF_testimonials_updated_at DEFAULT GETDATE(),
        CONSTRAINT [PK_testimonials] PRIMARY KEY CLUSTERED ([id] ASC)
    );
END
GO

-- Table contact_messages
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[contact_messages]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[contact_messages] (
        [id] INT NOT NULL IDENTITY(1,1),
        [name] NVARCHAR(100) NOT NULL,
        [email] NVARCHAR(100) NOT NULL,
        [phone] NVARCHAR(20) NULL,
        [company] NVARCHAR(150) NULL,
        [subject] NVARCHAR(255) NOT NULL,
        [message] NVARCHAR(MAX) NOT NULL,
        [service_interest] NVARCHAR(100) NULL,
        [read_status] BIT NOT NULL CONSTRAINT DF_contact_messages_read_status DEFAULT 0,
        [created_at] DATETIME2(0) NOT NULL CONSTRAINT DF_contact_messages_created_at DEFAULT GETDATE(),
        [updated_at] DATETIME2(0) NOT NULL CONSTRAINT DF_contact_messages_updated_at DEFAULT GETDATE(),
        CONSTRAINT [PK_contact_messages] PRIMARY KEY CLUSTERED ([id] ASC)
    );
END
GO

-- Table faqs
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[faqs]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[faqs] (
        [id] INT NOT NULL IDENTITY(1,1),
        [question] NVARCHAR(255) NOT NULL,
        [answer] NVARCHAR(MAX) NOT NULL,
        [category] NVARCHAR(50) NULL,
        [order] INT NOT NULL CONSTRAINT DF_faqs_order DEFAULT 0,
        [active] BIT NOT NULL CONSTRAINT DF_faqs_active DEFAULT 1,
        [created_at] DATETIME2(0) NOT NULL CONSTRAINT DF_faqs_created_at DEFAULT GETDATE(),
        [updated_at] DATETIME2(0) NOT NULL CONSTRAINT DF_faqs_updated_at DEFAULT GETDATE(),
        CONSTRAINT [PK_faqs] PRIMARY KEY CLUSTERED ([id] ASC)
    );
END
GO

-- Table team_members
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[team_members]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[team_members] (
        [id] INT NOT NULL IDENTITY(1,1),
        [name] NVARCHAR(100) NOT NULL,
        [position] NVARCHAR(100) NOT NULL,
        [bio] NVARCHAR(MAX) NULL,
        [image] NVARCHAR(255) NULL,
        [email] NVARCHAR(100) NULL,
        [phone] NVARCHAR(20) NULL,
        [linkedin] NVARCHAR(255) NULL,
        [order] INT NOT NULL CONSTRAINT DF_team_members_order DEFAULT 0,
        [active] BIT NOT NULL CONSTRAINT DF_team_members_active DEFAULT 1,
        [created_at] DATETIME2(0) NOT NULL CONSTRAINT DF_team_members_created_at DEFAULT GETDATE(),
        [updated_at] DATETIME2(0) NOT NULL CONSTRAINT DF_team_members_updated_at DEFAULT GETDATE(),
        CONSTRAINT [PK_team_members] PRIMARY KEY CLUSTERED ([id] ASC)
    );
END
GO

-- Table partners
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[partners]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[partners] (
        [id] INT NOT NULL IDENTITY(1,1),
        [name] NVARCHAR(100) NOT NULL,
        [logo] NVARCHAR(255) NOT NULL,
        [website] NVARCHAR(255) NULL,
        [description] NVARCHAR(MAX) NULL,
        [order] INT NOT NULL CONSTRAINT DF_partners_order DEFAULT 0,
        [active] BIT NOT NULL CONSTRAINT DF_partners_active DEFAULT 1,
        [created_at] DATETIME2(0) NOT NULL CONSTRAINT DF_partners_created_at DEFAULT GETDATE(),
        [updated_at] DATETIME2(0) NOT NULL CONSTRAINT DF_partners_updated_at DEFAULT GETDATE(),
        CONSTRAINT [PK_partners] PRIMARY KEY CLUSTERED ([id] ASC)
    );
END
GO

-- Table events
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[events]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[events] (
        [id] INT NOT NULL IDENTITY(1,1),
        [title] NVARCHAR(255) NOT NULL,
        [slug] NVARCHAR(300) NOT NULL,
        [description] NVARCHAR(MAX) NULL,
        [content] NVARCHAR(MAX) NULL,
        [start_date] DATETIME2(0) NOT NULL,
        [end_date] DATETIME2(0) NULL,
        [location] NVARCHAR(255) NULL,
        [organizer] NVARCHAR(150) NULL,
        [image] NVARCHAR(255) NULL,
        [registration_link] NVARCHAR(255) NULL,
        [status] NVARCHAR(20) NOT NULL,
        [created_at] DATETIME2(0) NOT NULL CONSTRAINT DF_events_created_at DEFAULT GETDATE(),
        [updated_at] DATETIME2(0) NOT NULL CONSTRAINT DF_events_updated_at DEFAULT GETDATE(),
        CONSTRAINT [PK_events] PRIMARY KEY CLUSTERED ([id] ASC),
        CONSTRAINT [CK_events_status] CHECK ([status] IN ('upcoming', 'ongoing', 'past'))
    );

    CREATE UNIQUE NONCLUSTERED INDEX [IX_events_slug] ON [dbo].[events] ([slug] ASC);
END
GO

-- Table settings
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[settings]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[settings] (
        [id] INT NOT NULL IDENTITY(1,1),
        [setting_key] NVARCHAR(50) NOT NULL,
        [setting_value] NVARCHAR(MAX) NULL,
        [setting_group] NVARCHAR(50) NOT NULL CONSTRAINT DF_settings_setting_group DEFAULT 'general',
        [created_at] DATETIME2(0) NOT NULL CONSTRAINT DF_settings_created_at DEFAULT GETDATE(),
        [updated_at] DATETIME2(0) NOT NULL CONSTRAINT DF_settings_updated_at DEFAULT GETDATE(),
        CONSTRAINT [PK_settings] PRIMARY KEY CLUSTERED ([id] ASC)
    );

    CREATE UNIQUE NONCLUSTERED INDEX [IX_settings_key] ON [dbo].[settings] ([setting_key] ASC);
END
GO

-- -----------------------------------------------------
-- STEP 2: CREATE TRIGGERS FOR UPDATING TIMESTAMPS
-- -----------------------------------------------------

-- Trigger to update updated_at timestamp on users
CREATE OR ALTER TRIGGER [dbo].[trg_users_update]
ON [dbo].[users]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[users]
    SET [updated_at] = GETDATE()
    FROM [dbo].[users] u
    INNER JOIN inserted i ON u.id = i.id;
END
GO

-- Trigger to update updated_at timestamp on categories
CREATE OR ALTER TRIGGER [dbo].[trg_categories_update]
ON [dbo].[categories]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[categories]
    SET [updated_at] = GETDATE()
    FROM [dbo].[categories] c
    INNER JOIN inserted i ON c.id = i.id;
END
GO

-- Trigger to update updated_at timestamp on tags
CREATE OR ALTER TRIGGER [dbo].[trg_tags_update]
ON [dbo].[tags]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[tags]
    SET [updated_at] = GETDATE()
    FROM [dbo].[tags] t
    INNER JOIN inserted i ON t.id = i.id;
END
GO

-- Trigger to update updated_at timestamp on news
CREATE OR ALTER TRIGGER [dbo].[trg_news_update]
ON [dbo].[news]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[news]
    SET [updated_at] = GETDATE()
    FROM [dbo].[news] n
    INNER JOIN inserted i ON n.id = i.id;
END
GO

-- Trigger to update updated_at timestamp on comments
CREATE OR ALTER TRIGGER [dbo].[trg_comments_update]
ON [dbo].[comments]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[comments]
    SET [updated_at] = GETDATE()
    FROM [dbo].[comments] c
    INNER JOIN inserted i ON c.id = i.id;
END
GO

-- Trigger to update updated_at timestamp on products
CREATE OR ALTER TRIGGER [dbo].[trg_products_update]
ON [dbo].[products]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[products]
    SET [updated_at] = GETDATE()
    FROM [dbo].[products] p
    INNER JOIN inserted i ON p.id = i.id;
END
GO

-- Trigger to update updated_at timestamp on projects
CREATE OR ALTER TRIGGER [dbo].[trg_projects_update]
ON [dbo].[projects]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[projects]
    SET [updated_at] = GETDATE()
    FROM [dbo].[projects] p
    INNER JOIN inserted i ON p.id = i.id;
END
GO

-- Trigger to update updated_at timestamp on services
CREATE OR ALTER TRIGGER [dbo].[trg_services_update]
ON [dbo].[services]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[services]
    SET [updated_at] = GETDATE()
    FROM [dbo].[services] s
    INNER JOIN inserted i ON s.id = i.id;
END
GO

-- Trigger to update updated_at timestamp on technologies
CREATE OR ALTER TRIGGER [dbo].[trg_technologies_update]
ON [dbo].[technologies]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[technologies]
    SET [updated_at] = GETDATE()
    FROM [dbo].[technologies] t
    INNER JOIN inserted i ON t.id = i.id;
END
GO

-- Trigger to update updated_at timestamp on testimonials
CREATE OR ALTER TRIGGER [dbo].[trg_testimonials_update]
ON [dbo].[testimonials]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[testimonials]
    SET [updated_at] = GETDATE()
    FROM [dbo].[testimonials] t
    INNER JOIN inserted i ON t.id = i.id;
END
GO

-- Trigger to update updated_at timestamp on contact_messages
CREATE OR ALTER TRIGGER [dbo].[trg_contact_messages_update]
ON [dbo].[contact_messages]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[contact_messages]
    SET [updated_at] = GETDATE()
    FROM [dbo].[contact_messages] m
    INNER JOIN inserted i ON m.id = i.id;
END
GO

-- Trigger to update updated_at timestamp on faqs
CREATE OR ALTER TRIGGER [dbo].[trg_faqs_update]
ON [dbo].[faqs]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[faqs]
    SET [updated_at] = GETDATE()
    FROM [dbo].[faqs] f
    INNER JOIN inserted i ON f.id = i.id;
END
GO

-- Trigger to update updated_at timestamp on team_members
CREATE OR ALTER TRIGGER [dbo].[trg_team_members_update]
ON [dbo].[team_members]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[team_members]
    SET [updated_at] = GETDATE()
    FROM [dbo].[team_members] t
    INNER JOIN inserted i ON t.id = i.id;
END
GO

-- Trigger to update updated_at timestamp on partners
CREATE OR ALTER TRIGGER [dbo].[trg_partners_update]
ON [dbo].[partners]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[partners]
    SET [updated_at] = GETDATE()
    FROM [dbo].[partners] p
    INNER JOIN inserted i ON p.id = i.id;
END
GO

-- Trigger to update updated_at timestamp on events
CREATE OR ALTER TRIGGER [dbo].[trg_events_update]
ON [dbo].[events]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[events]
    SET [updated_at] = GETDATE()
    FROM [dbo].[events] e
    INNER JOIN inserted i ON e.id = i.id;
END
GO

-- Trigger to update updated_at timestamp on settings
CREATE OR ALTER TRIGGER [dbo].[trg_settings_update]
ON [dbo].[settings]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[settings]
    SET [updated_at] = GETDATE()
    FROM [dbo].[settings] s
    INNER JOIN inserted i ON s.id = i.id;
END
GO

-- -----------------------------------------------------
-- STEP 3: INSERT SAMPLE DATA
-- -----------------------------------------------------

-- Sample Data: Basic settings
INSERT INTO [dbo].[settings] ([setting_key], [setting_value], [setting_group])
VALUES
('site_title', N'VRC - Tổng công ty Kỹ thuật lạnh Việt Nam', 'general'),
('site_description', N'Chuyên cung cấp giải pháp và dịch vụ về hệ thống lạnh, điều hòa không khí cho các doanh nghiệp và cá nhân', 'general'),
('contact_email', 'contact@vrc.com.vn', 'contact'),
('contact_phone', '+84 28 1234 5678', 'contact'),
('contact_address', N'123 Nguyễn Văn Linh, Quận 7, TP.HCM', 'contact'),
('social_facebook', 'https://facebook.com/vrc-vietnam', 'social'),
('social_linkedin', 'https://linkedin.com/company/vrc-vietnam', 'social'),
('social_youtube', 'https://youtube.com/channel/vrc-vietnam', 'social'),
('social_zalo', 'https://zalo.me/vrc-vietnam', 'social');
GO

-- Sample Data: Categories
INSERT INTO [dbo].[categories] ([name], [slug], [description])
VALUES
(N'Triển lãm', 'trien-lam', N'Các triển lãm và sự kiện ngành lạnh'),
(N'Hội thảo', 'hoi-thao', N'Hội thảo chuyên ngành về công nghệ lạnh'),
(N'Đào tạo', 'dao-tao', N'Chương trình đào tạo kỹ thuật viên lạnh'),
(N'Ra mắt sản phẩm', 'ra-mat-san-pham', N'Sự kiện giới thiệu sản phẩm mới'),
(N'Diễn đàn', 'dien-dan', N'Diễn đàn trao đổi chuyên môn');
GO

-- Sample Data: Tags
INSERT INTO [dbo].[tags] ([name], [slug])
VALUES
(N'Triển lãm', 'trien-lam'),
(N'Điều hòa', 'dieu-hoa'),
(N'Công nghệ làm lạnh', 'cong-nghe-lam-lanh'),
(N'Tiết kiệm năng lượng', 'tiet-kiem-nang-luong'),
(N'Công nghệ mới', 'cong-nghe-moi'),
(N'Hệ thống lạnh', 'he-thong-lanh');
GO

-- Sample Data: Users
INSERT INTO [dbo].[users] ([username], [email], [password], [full_name], [phone], [role])
VALUES
('admin', 'admin@vrc.com.vn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', N'Admin VRC', '0901234567', 'admin'),
('bantochuc', 'btc@vrc.com.vn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', N'Ban Tổ Chức', '0909876543', 'editor'),
('vrc-editor', 'editor@vrc.com.vn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'VRC', '0987654321', 'editor');
GO

-- -----------------------------------------------------
-- STEP 4: ADD FOREIGN KEY CONSTRAINTS 
-- (Fixed to avoid "cycles or multiple cascade paths" errors)
-- -----------------------------------------------------

-- Add foreign key constraint for categories table (self-referencing)
-- FIXED: Changed ON DELETE SET NULL to ON DELETE NO ACTION
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_categories_parent]') AND parent_object_id = OBJECT_ID(N'[dbo].[categories]'))
BEGIN
    ALTER TABLE [dbo].[categories] WITH CHECK
    ADD CONSTRAINT [FK_categories_parent] FOREIGN KEY([parent_id])
    REFERENCES [dbo].[categories] ([id])
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
END
GO

-- Add foreign key constraints for news table
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_news_author]'))
BEGIN
    ALTER TABLE [dbo].[news] WITH CHECK
    ADD CONSTRAINT [FK_news_author] FOREIGN KEY([author_id])
    REFERENCES [dbo].[users] ([id]);
END
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_news_category]'))
BEGIN
    ALTER TABLE [dbo].[news] WITH CHECK
    ADD CONSTRAINT [FK_news_category] FOREIGN KEY([category_id])
    REFERENCES [dbo].[categories] ([id]);
END
GO

-- Add foreign key constraints for news_tags table
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_news_tags_news]'))
BEGIN
    ALTER TABLE [dbo].[news_tags] WITH CHECK
    ADD CONSTRAINT [FK_news_tags_news] FOREIGN KEY([news_id])
    REFERENCES [dbo].[news] ([id])
    ON DELETE CASCADE;
END
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_news_tags_tag]'))
BEGIN
    ALTER TABLE [dbo].[news_tags] WITH CHECK
    ADD CONSTRAINT [FK_news_tags_tag] FOREIGN KEY([tag_id])
    REFERENCES [dbo].[tags] ([id])
    ON DELETE CASCADE;
END
GO

-- Add foreign key constraints for comments table
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_comments_news]'))
BEGIN
    ALTER TABLE [dbo].[comments] WITH CHECK
    ADD CONSTRAINT [FK_comments_news] FOREIGN KEY([news_id])
    REFERENCES [dbo].[news] ([id])
    ON DELETE CASCADE;
END
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_comments_user]'))
BEGIN
    ALTER TABLE [dbo].[comments] WITH CHECK
    ADD CONSTRAINT [FK_comments_user] FOREIGN KEY([user_id])
    REFERENCES [dbo].[users] ([id])
    ON DELETE SET NULL;
END
GO

-- Add foreign key constraint for comments table (self-referencing)
-- FIXED: Changed ON DELETE CASCADE to ON DELETE NO ACTION
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_comments_parent]'))
BEGIN
    ALTER TABLE [dbo].[comments] WITH CHECK
    ADD CONSTRAINT [FK_comments_parent] FOREIGN KEY([parent_id])
    REFERENCES [dbo].[comments] ([id])
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
END
GO

-- Add foreign key constraints for products table
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_products_category]'))
BEGIN
    ALTER TABLE [dbo].[products] WITH CHECK
    ADD CONSTRAINT [FK_products_category] FOREIGN KEY([category_id])
    REFERENCES [dbo].[categories] ([id]);
END
GO

-- Add foreign key constraints for product_images table
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_product_images_product]'))
BEGIN
    ALTER TABLE [dbo].[product_images] WITH CHECK
    ADD CONSTRAINT [FK_product_images_product] FOREIGN KEY([product_id])
    REFERENCES [dbo].[products] ([id])
    ON DELETE CASCADE;
END
GO

-- Add foreign key constraints for project_images table
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_project_images_project]'))
BEGIN
    ALTER TABLE [dbo].[project_images] WITH CHECK
    ADD CONSTRAINT [FK_project_images_project] FOREIGN KEY([project_id])
    REFERENCES [dbo].[projects] ([id])
    ON DELETE CASCADE;
END
GO

-- Add foreign key constraint for services table (self-referencing)
-- FIXED: Changed ON DELETE SET NULL to ON DELETE NO ACTION
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_services_parent]'))
BEGIN
    ALTER TABLE [dbo].[services] WITH CHECK
    ADD CONSTRAINT [FK_services_parent] FOREIGN KEY([parent_id])
    REFERENCES [dbo].[services] ([id])
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;
END
GO

-- -----------------------------------------------------
-- STEP 5: ADD OPTIMIZED INDEXES FOR DATABASE PERFORMANCE
-- -----------------------------------------------------

-- Indexes cho tìm kiếm
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_users_phone' AND object_id = OBJECT_ID('dbo.users'))
    CREATE NONCLUSTERED INDEX IX_users_phone ON [dbo].[users] ([phone]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_products_name' AND object_id = OBJECT_ID('dbo.products'))
    CREATE NONCLUSTERED INDEX IX_products_name ON [dbo].[products] ([name]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_news_title' AND object_id = OBJECT_ID('dbo.news'))
    CREATE NONCLUSTERED INDEX IX_news_title ON [dbo].[news] ([title]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_comments_author_email' AND object_id = OBJECT_ID('dbo.comments'))
    CREATE NONCLUSTERED INDEX IX_comments_author_email ON [dbo].[comments] ([author_email]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_projects_title' AND object_id = OBJECT_ID('dbo.projects'))
    CREATE NONCLUSTERED INDEX IX_projects_title ON [dbo].[projects] ([title]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_projects_location' AND object_id = OBJECT_ID('dbo.projects'))
    CREATE NONCLUSTERED INDEX IX_projects_location ON [dbo].[projects] ([location]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_projects_client' AND object_id = OBJECT_ID('dbo.projects'))
    CREATE NONCLUSTERED INDEX IX_projects_client ON [dbo].[projects] ([client]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_events_title' AND object_id = OBJECT_ID('dbo.events'))
    CREATE NONCLUSTERED INDEX IX_events_title ON [dbo].[events] ([title]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_events_location' AND object_id = OBJECT_ID('dbo.events'))
    CREATE NONCLUSTERED INDEX IX_events_location ON [dbo].[events] ([location]);

-- Indexes cho lọc theo thời gian, trạng thái
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_news_status_date' AND object_id = OBJECT_ID('dbo.news'))
    CREATE NONCLUSTERED INDEX IX_news_status_date ON [dbo].[news] ([status], [publish_date]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_news_featured' AND object_id = OBJECT_ID('dbo.news'))
    CREATE NONCLUSTERED INDEX IX_news_featured ON [dbo].[news] ([featured]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_events_status_date' AND object_id = OBJECT_ID('dbo.events'))
    CREATE NONCLUSTERED INDEX IX_events_status_date ON [dbo].[events] ([status], [start_date]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_events_end_date' AND object_id = OBJECT_ID('dbo.events'))
    CREATE NONCLUSTERED INDEX IX_events_end_date ON [dbo].[events] ([end_date]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_products_status' AND object_id = OBJECT_ID('dbo.products'))
    CREATE NONCLUSTERED INDEX IX_products_status ON [dbo].[products] ([status]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_projects_status_year' AND object_id = OBJECT_ID('dbo.projects'))
    CREATE NONCLUSTERED INDEX IX_projects_status_year ON [dbo].[projects] ([status], [year]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_projects_type' AND object_id = OBJECT_ID('dbo.projects'))
    CREATE NONCLUSTERED INDEX IX_projects_type ON [dbo].[projects] ([project_type]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_comments_status_date' AND object_id = OBJECT_ID('dbo.comments'))
    CREATE NONCLUSTERED INDEX IX_comments_status_date ON [dbo].[comments] ([status], [created_at]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_testimonials_active' AND object_id = OBJECT_ID('dbo.testimonials'))
    CREATE NONCLUSTERED INDEX IX_testimonials_active ON [dbo].[testimonials] ([active]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_team_members_active' AND object_id = OBJECT_ID('dbo.team_members'))
    CREATE NONCLUSTERED INDEX IX_team_members_active ON [dbo].[team_members] ([active]);

-- Indexes cho phân trang
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_news_page_date' AND object_id = OBJECT_ID('dbo.news'))
    CREATE NONCLUSTERED INDEX IX_news_page_date ON [dbo].[news] ([publish_date], [id]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_products_page_date' AND object_id = OBJECT_ID('dbo.products'))
    CREATE NONCLUSTERED INDEX IX_products_page_date ON [dbo].[products] ([created_at], [id]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_projects_page_year' AND object_id = OBJECT_ID('dbo.projects'))
    CREATE NONCLUSTERED INDEX IX_projects_page_year ON [dbo].[projects] ([year], [id]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_events_page_date' AND object_id = OBJECT_ID('dbo.events'))
    CREATE NONCLUSTERED INDEX IX_events_page_date ON [dbo].[events] ([start_date], [id]);
    
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_comments_page_date' AND object_id = OBJECT_ID('dbo.comments'))
    CREATE NONCLUSTERED INDEX IX_comments_page_date ON [dbo].[comments] ([created_at], [id]);
GO