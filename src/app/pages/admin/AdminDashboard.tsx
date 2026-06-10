import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Users,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { mockStats, mockApplications } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const recentApplications = mockApplications.slice(0, 5);

  const applicationsByType = [
    { name: 'Cultivation', value: mockApplications.filter(a => a.licenseType === 'cultivation').length },
    { name: 'Processing', value: mockApplications.filter(a => a.licenseType === 'processing').length },
    { name: 'Research', value: mockApplications.filter(a => a.licenseType === 'research').length },
    { name: 'Export', value: mockApplications.filter(a => a.licenseType === 'export').length },
    { name: 'Transport', value: mockApplications.filter(a => a.licenseType === 'transportation').length },
    { name: 'Retail', value: mockApplications.filter(a => a.licenseType === 'retail').length },
  ].filter(item => item.value > 0);

  const applicationsByMonth = [
    { month: 'Jan', count: 8 },
    { month: 'Feb', count: 12 },
    { month: 'Mar', count: 15 },
    { month: 'Apr', count: 10 },
    { month: 'May', count: 0 },
    { month: 'Jun', count: 0 },
  ];

  const COLORS = ['#1B4D2E', '#C9A84C', '#3A7D44', '#A8892A', '#2D6A4F', '#F5EDD6'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B4D2E] to-[#0F2A19] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-[#D5EBD9] mt-1">Cannabis Regulatory Authority - System Overview</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link to="/admin/applications">
            <Button className="w-full h-auto py-4 bg-[#2D6A4F] hover:bg-[#1B4D2E]" size="lg">
              <div className="text-center">
                <FileText className="w-6 h-6 mx-auto mb-2" />
                <div>Review Applications</div>
              </div>
            </Button>
          </Link>
          <Link to="/admin/licenses">
            <Button className="w-full h-auto py-4 bg-[#2D6A4F] hover:bg-[#1B4D2E]" size="lg">
              <div className="text-center">
                <CheckCircle className="w-6 h-6 mx-auto mb-2" />
                <div>Manage Licenses</div>
              </div>
            </Button>
          </Link>
          <Link to="/admin/compliance">
            <Button className="w-full h-auto py-4 bg-[#C9A84C] hover:bg-[#A8892A]" size="lg">
              <div className="text-center">
                <AlertCircle className="w-6 h-6 mx-auto mb-2" />
                <div>Compliance</div>
              </div>
            </Button>
          </Link>
          <Link to="/admin/analytics">
            <Button className="w-full h-auto py-4 bg-[#3A7D44] hover:bg-[#2D6A4F]" size="lg">
              <div className="text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-2" />
                <div>Analytics</div>
              </div>
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Applications
              </CardTitle>
              <FileText className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockStats.totalApplications}</div>
              <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Review
              </CardTitle>
              <Clock className="w-4 h-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{mockStats.pendingReview}</div>
              <p className="text-xs text-gray-500 mt-1">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Licenses
              </CardTitle>
              <CheckCircle className="w-4 h-4 text-[#EBF4EE]0" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2D6A4F]">{mockStats.activeLicenses}</div>
              <p className="text-xs text-gray-500 mt-1">{mockStats.expiringLicenses} expiring soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Revenue (YTD)
              </CardTitle>
              <DollarSign className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2D6A4F]">
                MWK {(mockStats.revenue / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-gray-500 mt-1">From license fees</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Applications by Month</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={applicationsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1B4D2E" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Applications by License Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={applicationsByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => entry && entry.name ? `${entry.name}: ${entry.value}` : ''}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {applicationsByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Applications</CardTitle>
            <Link to="/admin/applications">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map(app => (
                <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-medium">{app.id}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        app.status === 'submitted' || app.status === 'under_review'
                          ? 'bg-yellow-100 text-yellow-700'
                          : app.status === 'approved'
                          ? 'bg-[#D5EBD9] text-[#1B4D2E]'
                          : app.status === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {app.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{app.businessName}</p>
                    <p className="text-xs text-gray-500 capitalize">{app.licenseType} • {app.submittedDate}</p>
                  </div>
                  <Link to={`/admin/application/${app.id}`}>
                    <Button size="sm">Review</Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
