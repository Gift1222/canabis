import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Search, Filter, Eye, Download } from 'lucide-react';
import { mockApplications, getLicenseDisplayName } from '../../data/mockData';
import { ApplicationStatus, LicenseType } from '../../types';

export default function AdminApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = 
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesType = typeFilter === 'all' || app.licenseType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    const statusConfig = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-700' },
      submitted: { label: 'Submitted', className: 'bg-[#EBF4EE] text-[#1B4D2E]' },
      under_review: { label: 'Under Review', className: 'bg-yellow-100 text-yellow-700' },
      approved: { label: 'Approved', className: 'bg-[#D5EBD9] text-[#1B4D2E]' },
      rejected: { label: 'Rejected', className: 'bg-red-100 text-red-700' },
      pending_payment: { label: 'Pending Payment', className: 'bg-orange-100 text-orange-700' },
      active: { label: 'Active', className: 'bg-[#D5EBD9] text-[#1B4D2E]' }
    };

    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1B4D2E 0%, #2D6A4F 100%)" }}>
        <div className="w-full px-4 sm:px-6 lg:px-10 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">All Applications</h1>
              <p className="mt-1" style={{ color: "#C9A84C" }}>Review and manage license applications</p>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-10 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search by ID, business name, or applicant..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="pending_payment">Pending Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="cultivation">Cultivation</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="export">Export</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{filteredApplications.length}</span> of{' '}
            <span className="font-medium">{mockApplications.length}</span> applications
          </p>
        </div>

        {/* Applications Table */}
        <Card className="w-full shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto w-full">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-gray-50/75">
                    <TableHead className="font-semibold text-gray-900 py-3.5 px-4">Application ID</TableHead>
                    <TableHead className="font-semibold text-gray-900 py-3.5 px-4">Applicant</TableHead>
                    <TableHead className="font-semibold text-gray-900 py-3.5 px-4">Business Name</TableHead>
                    <TableHead className="font-semibold text-gray-900 py-3.5 px-4">License Type</TableHead>
                    <TableHead className="font-semibold text-gray-900 py-3.5 px-4">Status</TableHead>
                    <TableHead className="font-semibold text-gray-900 py-3.5 px-4">Submitted</TableHead>
                    <TableHead className="text-right font-semibold text-gray-900 py-3.5 px-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                        No applications found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredApplications.map((app) => (
                      <TableRow key={app.id} className="hover:bg-gray-50/60 transition-colors">
                        <TableCell className="font-semibold text-[#1B4D2E] py-4 px-4">{app.id}</TableCell>
                        <TableCell className="py-4 px-4 font-medium text-gray-900">{app.applicantName}</TableCell>
                        <TableCell className="py-4 px-4 text-gray-700">{app.businessName}</TableCell>
                        <TableCell className="py-4 px-4 text-gray-700">
                          {getLicenseDisplayName(app.licenseType)}
                        </TableCell>
                        <TableCell className="py-4 px-4">{getStatusBadge(app.status)}</TableCell>
                        <TableCell className="py-4 px-4 text-gray-600 text-sm">{app.submittedDate}</TableCell>
                        <TableCell className="text-right py-4 px-4">
                          <Link to={`/admin/application/${app.id}`}>
                            <Button variant="outline" size="sm" className="hover:bg-[#EBF4EE] hover:text-[#1B4D2E] border-gray-300">
                              <Eye className="w-4 h-4 mr-2" />
                              Review
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
