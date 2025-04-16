import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { RefreshCwIcon, DatabaseIcon, AlertCircleIcon, CheckCircleIcon, ServerIcon, TableIcon } from 'lucide-react';

const fetchDbStatus = async () => {
  // In a real application, you'd call the actual API
  const response = await fetch('/api/admin/db-test', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to test database connection');
  }
  
  return response.json();
};

const DbConnection = () => {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ['dbConnection'],
    queryFn: fetchDbStatus,
    refetchOnWindowFocus: false
  });

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Database Connection</h1>
        <Button onClick={handleRefresh} disabled={isLoading} className="flex items-center gap-2">
          <RefreshCwIcon size={16} className={isLoading ? 'animate-spin' : ''} />
          Refresh
        </Button>
      </div>

      {isLoading && (
        <div className="animate-pulse space-y-4">
          <Card>
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isError && (
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to test database connection'}
          </AlertDescription>
        </Alert>
      )}

      {!isLoading && !isError && data && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Connection Status</CardTitle>
                <Badge variant={data.success ? "success" : "destructive"}>
                  {data.connection.status}
                </Badge>
              </div>
              <CardDescription>Database connection information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <ServerIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Server</p>
                      <p className="text-sm text-muted-foreground">{data.connection.server}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <DatabaseIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Database</p>
                      <p className="text-sm text-muted-foreground">{data.connection.database}</p>
                    </div>
                  </div>
                </div>

                {data.success && (
                  <div>
                    <p className="font-medium">SQL Server Version</p>
                    <p className="text-sm text-muted-foreground">{data.connection.version}</p>
                  </div>
                )}

                {!data.success && data.error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircleIcon className="h-4 w-4" />
                    <AlertTitle>Connection Error</AlertTitle>
                    <AlertDescription>
                      {data.error.message} (Code: {data.error.code})
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>

          {data.success && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Database Statistics</CardTitle>
                  <CardDescription>Overview of database objects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Tables</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{data.stats.tableCount}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Users</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{data.stats.userCount}</div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <TableIcon className="h-5 w-5" />
                    <CardTitle className="text-lg">Database Tables</CardTitle>
                  </div>
                  <CardDescription>First 10 tables in the database</CardDescription>
                </CardHeader>
                <CardContent>
                  {data.tables && data.tables.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Schema</TableHead>
                          <TableHead>Table Name</TableHead>
                          <TableHead className="text-right">Column Count</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.tables.map((table, index) => (
                          <TableRow key={index}>
                            <TableCell>{table.Schema}</TableCell>
                            <TableCell className="font-medium">{table.Table}</TableCell>
                            <TableCell className="text-right">{table.ColumnCount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No tables found in the database
                    </div>
                  )}
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  Showing up to 10 tables from the database
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DbConnection;