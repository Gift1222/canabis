import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Search, Download, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { mockApplications } from '../../data/mockData';

export default function AdminLicensesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const activeLicenses = mockApplications.filter(
    app => app.status === 'approved' || app.status === 'active'
  );

  const filteredLicenses = activeLicenses.filter(license =>
    license.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    license.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    license.licenseNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 60 && daysUntilExpiry > 0;
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1B4D2E 0%, #2D6A4F 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">License Management</h1>
              <p className="mt-1" style={{ color: "#C9A84C" }}>View and manage all active licenses</p>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Licenses
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Licenses
              </CardTitle>
              <CheckCircle className="w-4 h-4 text-[#EBF4EE]0" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2D6A4F]">{activeLicenses.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Expiring Soon
              </CardTitle>
              <AlertCircle className="w-4 h-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {activeLicenses.filter(l => isExpiringSoon(l.expiryDate)).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                License Revenue
              </CardTitle>
              <FileText className="w-4 h-4 text-[#2D6A4F]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2D6A4F]">
                MWK {(activeLicenses.reduce((sum, l) => sum + (l.paymentAmount || 0), 0) / 1000000).toFixed(1)}M
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by license number, business name, or application ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Expiring Soon Alert */}
        {activeLicenses.filter(l => isExpiringSoon(l.expiryDate)).length > 0 && (
          <Card className="mb-6 bg-orange-50 border-orange-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-orange-900 mb-1">Licenses Expiring Soon</h3>
                  <p className="text-sm text-orange-800">
                    {activeLicenses.filter(l => isExpiringSoon(l.expiryDate)).length} license(s) will expire within 60 days. 
                    Contact license holders to initiate renewal process.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Licenses Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Active Licenses</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto w-full"><Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License Number</TableHead>
                  <TableHead>Business Name</TableHead>
                  <TableHead>License Type</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLicenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                      No licenses found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLicenses.map((license) => (
                    <TableRow key={license.id}>
                      <TableCell className="font-medium">
                        {license.licenseNumber || 'Pending'}
                      </TableCell>
                      <TableCell>{license.businessName}</TableCell>
                      <TableCell className="capitalize">
                        {license.licenseType.replace('_', ' ')}
                      </TableCell>
                      <TableCell>{license.approvedDate || 'N/A'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {license.expiryDate}
                          {isExpiringSoon(license.expiryDate) && (
                            <Badge className="bg-orange-100 text-orange-700 text-xs">
                              Expiring Soon
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-[#D5EBD9] text-[#1B4D2E]">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
