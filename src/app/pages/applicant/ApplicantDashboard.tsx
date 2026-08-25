import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Eye,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import { currentUser, mockApplications, getLicenseDisplayName } from '../../data/mockData';
import { ApplicationStatus } from '../../types';

export default function ApplicantDashboard() {
  const userApplications = mockApplications.filter(app => app.applicantId === currentUser.id);

  const getStatusBadge = (status: ApplicationStatus) => {
    const statusConfig = {
      draft: { label: 'Draft', variant: 'secondary' as const, icon: FileText },
      submitted: { label: 'Submitted', variant: 'default' as const, icon: Clock },
      under_review: { label: 'Under Review', variant: 'default' as const, icon: Clock },
      approved: { label: 'Approved', variant: 'default' as const, icon: CheckCircle },
      rejected: { label: 'Rejected', variant: 'destructive' as const, icon: XCircle },
      pending_payment: { label: 'Pending Payment', variant: 'default' as const, icon: CreditCard },
      active: { label: 'Active', variant: 'default' as const, icon: CheckCircle }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const stats = {
    total: userApplications.length,
    pending: userApplications.filter(a => ['submitted', 'under_review'].includes(a.status)).length,
    approved: userApplications.filter(a => a.status === 'approved').length,
    active: userApplications.filter(a => a.status === 'active').length
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1B4D2E 0%, #2D6A4F 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Applicant Dashboard</h1>
              <p className="mt-1" style={{ color: '#C9A84C' }}>Welcome back, {currentUser.name}</p>
            </div>
            <Link to="/applicant/new-application">
              <Button size="lg" style={{ backgroundColor: "#C9A84C", color: "#1B4D2E" }} className="">
                <Plus className="w-5 h-5 mr-2" />
                New Application
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Applications
              </CardTitle>
              <FileText className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
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
              <div className="text-3xl font-bold text-orange-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Approved
              </CardTitle>
              <CheckCircle className="w-4 h-4 text-[#EBF4EE]0" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2D6A4F]">{stats.approved}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Licenses
              </CardTitle>
              <CheckCircle className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.active}</div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {userApplications.some(app => app.status === 'pending_payment') && (
          <Card className="mb-8 bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-900 mb-1">Payment Required</h3>
                  <p className="text-sm text-yellow-800">
                    You have applications pending payment. Complete payment to proceed with license issuance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {userApplications.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                <p className="text-gray-600 mb-6">Get started by submitting your first license application</p>
                <Link to="/applicant/new-application">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Application
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto w-full"><Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>License Type</TableHead>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.id}</TableCell>
                      <TableCell className="font-medium">{getLicenseDisplayName(app.licenseType)}</TableCell>
                      <TableCell>{app.businessName}</TableCell>
                      <TableCell>{getStatusBadge(app.status)}</TableCell>
                      <TableCell>{app.submittedDate}</TableCell>
                      <TableCell className="text-right">
                        <Link to={`/applicant/application/${app.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table></div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
