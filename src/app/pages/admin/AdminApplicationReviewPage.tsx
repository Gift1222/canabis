import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Separator } from '../../components/ui/separator';
import { toast } from 'sonner';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User
} from 'lucide-react';
import { mockApplications, getLicenseDisplayName, licenseTypeInfo } from '../../data/mockData';

export default function AdminApplicationReviewPage() {
  const params = useParams();
  const rawId = params['*'] || params.id || '';
  const decodedId = decodeURIComponent(rawId);
  const navigate = useNavigate();
  const application = mockApplications.find(app => app.id === rawId || app.id === decodedId);
  
  const [reviewNotes, setReviewNotes] = useState(application?.reviewNotes || '');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">Application not found</p>
            <Button onClick={() => navigate('/admin/applications')}>
              Return to Applications
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleApprove = () => {
    setIsProcessing(true);
    setTimeout(() => {
      toast.success('Application approved successfully!', {
        description: `License ${application.id} has been approved and applicant notified.`
      });
      setIsProcessing(false);
      navigate('/admin/applications');
    }, 1500);
  };

  const handleReject = () => {
    if (!reviewNotes.trim()) {
      toast.error('Please provide review notes explaining the rejection');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      toast.success('Application rejected', {
        description: 'Applicant has been notified with feedback.'
      });
      setIsProcessing(false);
      navigate('/admin/applications');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/admin/applications')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Applications
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Review Application</h1>
              <p className="text-gray-600 mt-1">{application.id} - {application.businessName}</p>
            </div>
            <Badge className={
              application.status === 'submitted' || application.status === 'under_review'
                ? 'bg-yellow-100 text-yellow-700'
                : application.status === 'approved'
                ? 'bg-[#D5EBD9] text-[#1B4D2E]'
                : application.status === 'rejected'
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-700'
            }>
              {application.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Applicant Information */}
            <Card>
              <CardHeader>
                <CardTitle>Applicant Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Applicant Name</p>
                    <p className="font-medium">{application.applicantName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{application.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{application.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">License Type</p>
                    <p className="font-medium">{getLicenseDisplayName(application.licenseType)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Submitted Date</p>
                    <p className="font-medium">{application.submittedDate}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Business Name</p>
                    <p className="font-medium">{application.businessName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{application.businessAddress}</p>
                  </div>
                </div>

                {application.plotSize && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Plot Size</p>
                    <p className="font-medium">{application.plotSize}</p>
                  </div>
                )}

                <Separator />

                <div>
                  <p className="text-sm text-gray-500 mb-2">Intended Purpose</p>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {application.intendedPurpose}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Submitted Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {application.documents.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            {doc.type} • {doc.size} • Uploaded {doc.uploadDate}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Review Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Review Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="reviewNotes">
                    Add your review comments and feedback
                  </Label>
                  <Textarea
                    id="reviewNotes"
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Enter detailed review notes, observations and recommendations..."
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500">
                    These notes will be shared with the applicant if the application is rejected.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Decision Panel */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-[#EBF4EE] to-[#D5EBD9] border-[#AACFB5]">
              <CardHeader>
                <CardTitle className="text-blue-900">Application Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Current Status</p>
                  <p className="font-bold text-lg capitalize">
                    {application.status.replace('_', ' ')}
                  </p>
                </div>

                <div className="bg-white p-3 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Application Fee</p>
                  <p className="font-bold text-lg">
                    {licenseTypeInfo[application.licenseType]?.fee || (`$` + application.paymentAmount?.toLocaleString() + ` USD`)}
                  </p>
                </div>

                <div className="bg-white p-3 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Submission Date</p>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {application.submittedDate}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Decision Buttons */}
            {(application.status === 'submitted' || application.status === 'under_review') && (
              <Card>
                <CardHeader>
                  <CardTitle>Make a Decision</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full bg-[#2D6A4F] hover:bg-[#1B4D2E]"
                    size="lg"
                    onClick={handleApprove}
                    disabled={isProcessing}
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Approve Application
                  </Button>

                  <Button
                    className="w-full"
                    variant="destructive"
                    size="lg"
                    onClick={handleReject}
                    disabled={isProcessing}
                  >
                    <XCircle className="w-5 h-5 mr-2" />
                    Reject Application
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Ensure all documents are verified before making a decision
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Reviewer Info */}
            {application.reviewerId && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>
                    <p className="text-gray-500">Reviewer ID</p>
                    <p className="font-medium">{application.reviewerId}</p>
                  </div>
                  {application.reviewedDate && (
                    <div>
                      <p className="text-gray-500">Reviewed On</p>
                      <p className="font-medium">{application.reviewedDate}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download All Documents
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Applicant
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
