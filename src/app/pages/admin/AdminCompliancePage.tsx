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
import { Shield, Calendar, CheckCircle, AlertTriangle, FileText, Download } from 'lucide-react';
import { mockInspections } from '../../data/mockData';

export default function AdminCompliancePage() {
  const upcomingInspections = mockInspections.filter(i => i.status === 'scheduled');
  const completedInspections = mockInspections.filter(i => i.status === 'completed');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1B4D2E 0%, #2D6A4F 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Compliance & Inspections</h1>
              <p className="mt-1" style={{ color: "#C9A84C" }}>Monitor compliance status and schedule inspections</p>
            </div>
            <Button className="bg-[#C9A84C] hover:bg-[#A8892A]">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Inspection
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Inspections
              </CardTitle>
              <Shield className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockInspections.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Scheduled
              </CardTitle>
              <Calendar className="w-4 h-4 text-[#2D6A4F]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2D6A4F]">{upcomingInspections.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Completed
              </CardTitle>
              <CheckCircle className="w-4 h-4 text-[#EBF4EE]0" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2D6A4F]">{completedInspections.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Compliance Rate
              </CardTitle>
              <Shield className="w-4 h-4 text-[#EBF4EE]0" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2D6A4F]">96%</div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Inspections */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Inspections
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingInspections.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p>No upcoming inspections scheduled</p>
              </div>
            ) : (
              <div className="overflow-x-auto w-full"><Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Inspection ID</TableHead>
                    <TableHead>Licensee</TableHead>
                    <TableHead>License ID</TableHead>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Inspector</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingInspections.map((inspection) => (
                    <TableRow key={inspection.id}>
                      <TableCell className="font-medium">{inspection.id}</TableCell>
                      <TableCell>{inspection.licensee}</TableCell>
                      <TableCell>{inspection.licenseId}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {inspection.inspectionDate}
                      </TableCell>
                      <TableCell>{inspection.inspector}</TableCell>
                      <TableCell>
                        <Badge className="bg-[#EBF4EE] text-[#1B4D2E]">Scheduled</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table></div>
            )}
          </CardContent>
        </Card>

        {/* Completed Inspections */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Completed Inspections
            </CardTitle>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto w-full"><Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Inspection ID</TableHead>
                  <TableHead>Licensee</TableHead>
                  <TableHead>License ID</TableHead>
                  <TableHead>Inspection Date</TableHead>
                  <TableHead>Inspector</TableHead>
                  <TableHead>Outcome</TableHead>
                  <TableHead>Next Inspection</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedInspections.map((inspection) => (
                  <TableRow key={inspection.id}>
                    <TableCell className="font-medium">{inspection.id}</TableCell>
                    <TableCell>{inspection.licensee}</TableCell>
                    <TableCell>{inspection.licenseId}</TableCell>
                    <TableCell>{inspection.inspectionDate}</TableCell>
                    <TableCell>{inspection.inspector}</TableCell>
                    <TableCell>
                      <Badge className="bg-[#D5EBD9] text-[#1B4D2E]">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Passed
                      </Badge>
                    </TableCell>
                    <TableCell>{inspection.nextInspection}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table></div>
          </CardContent>
        </Card>

        {/* Inspection Findings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Inspection Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedInspections.map(inspection => (
                  <div key={inspection.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{inspection.licensee}</p>
                        <p className="text-sm text-gray-500">{inspection.inspectionDate}</p>
                      </div>
                      <Badge className="bg-[#D5EBD9] text-[#1B4D2E]">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Passed
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700">{inspection.findings}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-[#2D6A4F] mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Security Requirements</h4>
                    <p className="text-sm text-gray-600">
                      All facilities must maintain 24/7 video surveillance and secure access control systems.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <FileText className="w-5 h-5 text-[#2D6A4F] mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Record Keeping</h4>
                    <p className="text-sm text-gray-600">
                      Maintain accurate records of all inventory, transactions and waste disposal for at least 3 years.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Quality Control</h4>
                    <p className="text-sm text-gray-600">
                      Products must undergo third-party testing for potency and contaminants before sale or distribution.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Calendar className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Inspection Frequency</h4>
                    <p className="text-sm text-gray-600">
                      All licensed facilities are subject to bi-annual inspections and random audits.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
