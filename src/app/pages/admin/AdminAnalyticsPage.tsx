import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { TrendingUp, TrendingDown, DollarSign, FileText, CheckCircle, Clock } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { mockStats as rawStats } from '../../data/mockData';

// Guard against undefined mockStats
const mockStats = rawStats ?? {
  totalApplications: 0,
  approved: 0,
  pendingReview: 0,
  rejected: 0,
  revenue: 0,
};

export default function AdminAnalyticsPage() {
  const applicationTrends = [
    { month: 'Oct 2025', applications: 5, approved: 3, rejected: 1 },
    { month: 'Nov 2025', applications: 8, approved: 6, rejected: 1 },
    { month: 'Dec 2025', applications: 12, approved: 9, rejected: 2 },
    { month: 'Jan 2026', applications: 10, approved: 7, rejected: 1 },
    { month: 'Feb 2026', applications: 15, approved: 11, rejected: 1 },
    { month: 'Mar 2026', applications: 18, approved: 14, rejected: 2 },
  ];

  const revenueData = [
    { month: 'Oct', revenue: 25 },
    { month: 'Nov', revenue: 42 },
    { month: 'Dec', revenue: 58 },
    { month: 'Jan', revenue: 45 },
    { month: 'Feb', revenue: 63 },
    { month: 'Mar', revenue: 75 },
  ];

  const licenseTypeDistribution = [
    { name: 'Cultivation', value: 15, color: '#1B4D2E' },
    { name: 'Processing', value: 10, color: '#C9A84C' },
    { name: 'Research', value: 8, color: '#3A7D44' },
    { name: 'Export', value: 5, color: '#A8892A' },
    { name: 'Transportation', value: 4, color: '#2D6A4F' },
    { name: 'Retail', value: 5, color: '#F5EDD6' },
  ];

  const processingTimeData = [
    { type: 'Research', days: 25 },
    { type: 'Transport', days: 18 },
    { type: 'Cultivation', days: 35 },
    { type: 'Retail', days: 32 },
    { type: 'Processing', days: 45 },
    { type: 'Export', days: 58 },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F9F6' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1B4D2E 0%, #2D6A4F 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Analytics & Reports</h1>
              <p className="mt-1" style={{ color: '#C9A84C' }}>Comprehensive insights and statistics</p>
            </div>
            <Select defaultValue="ytd">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ytd">Year to Date</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-quarter">Last Quarter</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
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
              <div className="flex items-center gap-1 text-sm text-[#2D6A4F] mt-1">
                <TrendingUp className="w-4 h-4" />
                <span>+12% vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Approval Rate
              </CardTitle>
              <CheckCircle className="w-4 h-4 text-[#EBF4EE]0" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2D6A4F]">
                {Math.round((mockStats.approved / mockStats.totalApplications) * 100)}%
              </div>
              <div className="flex items-center gap-1 text-sm text-[#2D6A4F] mt-1">
                <TrendingUp className="w-4 h-4" />
                <span>+3% vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Avg Processing Time
              </CardTitle>
              <Clock className="w-4 h-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">32 days</div>
              <div className="flex items-center gap-1 text-sm text-[#2D6A4F] mt-1">
                <TrendingDown className="w-4 h-4" />
                <span>-5 days improvement</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Revenue
              </CardTitle>
              <DollarSign className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2D6A4F]">
                ${mockStats.revenue.toLocaleString()} USD
              </div>
              <div className="flex items-center gap-1 text-sm text-[#2D6A4F] mt-1">
                <TrendingUp className="w-4 h-4" />
                <span>+18% vs last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Application Trends (6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={applicationTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="applications" stroke="#C9A84C" strokeWidth={2} name="Applications" />
                  <Line type="monotone" dataKey="approved" stroke="#1B4D2E" strokeWidth={2} name="Approved" />
                  <Line type="monotone" dataKey="rejected" stroke="#dc2626" strokeWidth={2} name="Rejected" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends ($ USD Thousands)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#1B4D2E" name="Revenue ($k USD)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Distribution Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>License Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={licenseTypeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => entry && entry.name ? `${entry.name}: ${entry.value}` : ''}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {licenseTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Processing Time by Type (Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={processingTimeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="type" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="days" fill="#C9A84C" name="Days" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Summary Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#EBF4EE] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-[#0F2A19]">Approved Applications</h3>
                  <CheckCircle className="w-5 h-5 text-[#2D6A4F]" />
                </div>
                <p className="text-3xl font-bold text-[#1B4D2E]">{mockStats.approved}</p>
                <p className="text-sm text-[#2D6A4F] mt-1">
                  {Math.round((mockStats.approved / mockStats.totalApplications) * 100)}% of total
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-orange-900">Pending Review</h3>
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-3xl font-bold text-orange-700">{mockStats.pendingReview}</p>
                <p className="text-sm text-orange-600 mt-1">
                  {Math.round((mockStats.pendingReview / mockStats.totalApplications) * 100)}% of total
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-red-900">Rejected Applications</h3>
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-3xl font-bold text-red-700">{mockStats.rejected}</p>
                <p className="text-sm text-red-600 mt-1">
                  {Math.round((mockStats.rejected / mockStats.totalApplications) * 100)}% of total
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
