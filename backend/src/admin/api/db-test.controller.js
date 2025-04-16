const dbManager = require('../../lib/db-manager');

/**
 * Test database connection
 * Returns database connection status and information
 */
const testConnection = async (req, res) => {
  try {
    console.log('Testing database connection from admin API...');
    
    // Initialize connection pool
    await dbManager.init();
    
    // Get SQL Server version
    const versionResult = await dbManager.executeQuery('SELECT @@VERSION AS Version');
    
    // Get database information
    const dbInfo = await dbManager.executeQuery(`
      SELECT 
        DB_NAME() AS DatabaseName,
        (SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE') AS TableCount,
        (SELECT COUNT(*) FROM sys.database_principals WHERE type_desc = 'SQL_USER') AS UserCount
    `);
    
    // Get a list of tables
    const tablesResult = await dbManager.executeQuery(`
      SELECT TOP 10
        t.TABLE_SCHEMA AS [Schema],
        t.TABLE_NAME AS [Table],
        (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = t.TABLE_SCHEMA AND TABLE_NAME = t.TABLE_NAME) AS ColumnCount
      FROM INFORMATION_SCHEMA.TABLES t
      WHERE t.TABLE_TYPE = 'BASE TABLE'
      ORDER BY t.TABLE_NAME
    `);
    
    // Return success response with database information
    res.json({
      success: true,
      connection: {
        status: 'connected',
        server: dbManager.connectionConfig.server,
        database: dbInfo.recordset[0].DatabaseName,
        version: versionResult.recordset[0].Version.split('\n')[0]
      },
      stats: {
        tableCount: dbInfo.recordset[0].TableCount,
        userCount: dbInfo.recordset[0].UserCount
      },
      tables: tablesResult.recordset
    });
  } catch (error) {
    console.error('Database connection test failed:', error);
    
    // Return error response
    res.status(500).json({
      success: false,
      connection: {
        status: 'failed',
        server: dbManager.connectionConfig.server,
        database: dbManager.connectionConfig.database
      },
      error: {
        message: error.message,
        code: error.code || 'UNKNOWN'
      }
    });
  }
};

module.exports = {
  testConnection
};