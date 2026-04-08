import { useParams, useNavigate, Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import {
  ArrowLeft,
  FileText,
  Download,
  CreditCard,
  CheckCircle,
  Clock,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import { mockApplications, licenseTypeInfo } from '../../data/mockData';
import { ApplicationStatus } from '../../types';
import { toast } from 'sonner';

export default function ApplicationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const application = mockApplications.find(app => app.id === id);

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">Application not found</p>
            <Button onClick={() => navigate('/applicant/dashboard')}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: ApplicationStatus) => {
    const statusConfig = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-700' },
      submitted: { label: 'Submitted', className: 'bg-blue-100 text-blue-700' },
      under_review: { label: 'Under Review', className: 'bg-yellow-100 text-yellow-700' },
      approved: { label: 'Approved', className: 'bg-[#D5EBD9] text-[#1B4D2E]' },
      rejected: { label: 'Rejected', className: 'bg-red-100 text-red-700' },
      pending_payment: { label: 'Pending Payment', className: 'bg-orange-100 text-orange-700' },
      active: { label: 'Active License', className: 'bg-[#D5EBD9] text-[#1B4D2E]' }
    };

    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handlePayment = () => {
    toast.success('Payment processed successfully!', {
      description: 'Your license will be issued shortly.'
    });
  };

  const timeline = [
    {
      date: application.submittedDate,
      label: 'Application Submitted',
      completed: true
    },
    {
      date: application.reviewedDate || 'Pending',
      label: 'Under Review',
      completed: !!application.reviewedDate
    },
    {
      date: application.approvedDate || 'Pending',
      label: application.status === 'rejected' ? 'Rejected' : 'Approved',
      completed: !!application.approvedDate || application.status === 'rejected'
    },
    {
      date: application.expiryDate || 'Pending',
      label: 'License Active',
      completed: application.status === 'active'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/applicant/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Application {application.id}</h1>
              <p className="text-gray-600 mt-1">{application.businessName}</p>
            </div>
            {getStatusBadge(application.status)}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Application Details */}
            <Card>
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">License Type</p>
                    <p className="font-medium capitalize">{application.licenseType.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Application Fee</p>
                    <p className="font-medium">
                      MWK {application.paymentAmount?.toLocaleString() || 'N/A'}
                    </p>
                  </div>
                  {application.licenseNumber && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">License Number</p>
                      <p className="font-medium">{application.licenseNumber}</p>
                    </div>
                  )}
                  {application.expiryDate && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Expiry Date</p>
                      <p className="font-medium">{application.expiryDate}</p>
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-gray-500 mb-1">Intended Purpose</p>
                  <p className="text-gray-900">{application.intendedPurpose}</p>
                </div>
              </CardContent>
            </Card>

            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
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
                {application.plotSize && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Plot Size</p>
                      <p className="font-medium">{application.plotSize}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {application.documents.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Review Notes */}
            {application.reviewNotes && (
              <Card className={application.status === 'rejected' ? 'bg-red-50 border-red-200' : 'bg-[#EBF4EE] border-[#AACFB5]'}>
                <CardHeader>
                  <CardTitle>Review Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{application.reviewNotes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Application Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          item.completed ? 'bg-[#D5EBD9]' : 'bg-gray-100'
                        }`}>
                          {item.completed ? (
                            <CheckCircle className="w-5 h-5 text-[#2D6A4F]" />
                          ) : (
                            <Clock className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        {index < timeline.length - 1 && (
                          <div className={`w-0.5 h-12 ${item.completed ? 'bg-[#AACFB5]' : 'bg-gray-200'}`} />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <p className={`font-medium text-sm ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Card */}
            {application.status === 'pending_payment' && (
              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4">
                    Your application has been approved. Complete payment to receive your license.
                  </p>
                  <div className="bg-white p-3 rounded-lg mb-4">
                    <p className="text-sm text-gray-600">Amount Due</p>
                    <p className="text-2xl font-bold text-gray-900">
                      MWK {application.paymentAmount?.toLocaleString()}
                    </p>
                  </div>
                  <Button className="w-full" onClick={handlePayment}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay Now
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* License Info */}
            {application.status === 'approved' || application.status === 'active' && (
              <Card className="bg-[#EBF4EE] border-[#AACFB5]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#2D6A4F]" />
                    License Approved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4">
                    Congratulations! Your license has been approved.
                  </p>
                  {application.licenseNumber && (
                    <div className="bg-white p-3 rounded-lg mb-4">
                      <p className="text-sm text-gray-600">License Number</p>
                      <p className="text-lg font-bold text-gray-900">
                        {application.licenseNumber}
                      </p>
                    </div>
                  )}
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download License Certificate
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
