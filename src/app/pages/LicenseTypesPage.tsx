import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { 
  Sprout, 
  Beaker, 
  FlaskConical, 
  Truck, 
  Globe, 
  Store,
  Clock,
  DollarSign,
  FileCheck
} from 'lucide-react';
import { licenseTypeInfo } from '../data/mockData';
import { LicenseType } from '../types';

export default function LicenseTypesPage() {
  const licenseTypes: { type: LicenseType; icon: typeof Sprout; color: string }[] = [
    { type: 'cultivation', icon: Sprout, color: 'green' },
    { type: 'processing', icon: Beaker, color: 'blue' },
    { type: 'research', icon: FlaskConical, color: 'purple' },
    { type: 'transportation', icon: Truck, color: 'orange' },
    { type: 'export', icon: Globe, color: 'indigo' },
    { type: 'retail', icon: Store, color: 'pink' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Cannabis License Types
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the license type that matches your business objectives. Each license has 
          specific requirements and regulations to ensure compliance and public safety.
        </p>
      </div>

      {/* License Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {licenseTypes.map(({ type, icon: Icon, color }) => {
          const info = licenseTypeInfo[type];
          return (
            <Card key={type} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 text-${color}-700`} />
                  </div>
                  <div className={`px-3 py-1 bg-${color}-50 text-${color}-700 rounded-full text-sm font-medium`}>
                    MWK {info.fee.toLocaleString()}
                  </div>
                </div>
                <CardTitle className="text-2xl">{info.name}</CardTitle>
                <CardDescription className="text-base">{info.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Processing Time */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Processing Time: {info.processingTime}</span>
                  </div>

                  {/* Fee */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>License Fee: MWK {info.fee.toLocaleString()}</span>
                  </div>

                  {/* Requirements */}
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                      <FileCheck className="w-4 h-4" />
                      <span>Requirements:</span>
                    </div>
                    <ul className="space-y-1 ml-6">
                      {info.requirements.map((req, index) => (
                        <li key={index} className="text-sm text-gray-600 list-disc">
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/applicant/new-application" state={{ selectedType: type }}>
                    <Button className="w-full mt-4">
                      Apply for {info.name}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Information */}
      <Card className="bg-[#EBF4EE] border-[#AACFB5]">
        <CardHeader>
          <CardTitle>Important Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-[#C9A84C] font-bold">•</span>
              <span>All licenses are valid for one year from the date of issuance and must be renewed annually.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#C9A84C] font-bold">•</span>
              <span>License holders must comply with all regulations and are subject to periodic inspections.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#C9A84C] font-bold">•</span>
              <span>Additional permits may be required depending on the scope and location of operations.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#C9A84C] font-bold">•</span>
              <span>Processing times are estimates and may vary based on application completeness and review workload.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#C9A84C] font-bold">•</span>
              <span>Fees are non-refundable once the application review process has begun.</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
