import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { 
  UsersIcon, 
  FileTextIcon, 
  PackageIcon, 
  BookOpenIcon,
  MessageSquareIcon,
  ActivityIcon
} from 'lucide-react';

const statCards = [
  {
    title: 'Total Users',
    value: '3',
    icon: UsersIcon,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'News Articles',
    value: '0',
    icon: FileTextIcon,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Products',
    value: '0',
    icon: PackageIcon,
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'Projects',
    value: '0',
    icon: BookOpenIcon,
    color: 'bg-amber-100 text-amber-600'
  },
  {
    title: 'Messages',
    value: '0',
    icon: MessageSquareIcon,
    color: 'bg-red-100 text-red-600'
  },
  {
    title: 'Total Visits',
    value: '0',
    icon: ActivityIcon,
    color: 'bg-indigo-100 text-indigo-600'
  }
];

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${card.color}`}>
                <card.icon size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-40 bg-gray-50 rounded-md">
              <p className="text-gray-500">No recent activity to display</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:bg-gray-50">
                <CardContent className="p-4 text-center">
                  <UsersIcon className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">Add User</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:bg-gray-50">
                <CardContent className="p-4 text-center">
                  <FileTextIcon className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">New Article</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:bg-gray-50">
                <CardContent className="p-4 text-center">
                  <PackageIcon className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">Add Product</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:bg-gray-50">
                <CardContent className="p-4 text-center">
                  <BookOpenIcon className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">New Project</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;