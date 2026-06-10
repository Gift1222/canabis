import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Progress } from '../../components/ui/progress';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, Upload, Check } from 'lucide-react';
import { LicenseType } from '../../types';
import { licenseTypeInfo } from '../../data/mockData';

// ─── Map new LicenseTypesPage IDs → mockData keys ────────────────────────────
// The LicenseTypesPage uses descriptive IDs from the fee schedule.
// This map normalises them to the keys that exist in licenseTypeInfo.
const ID_TO_INFO_KEY: Record<string, LicenseType> = {
  // Licence IDs (from LicenseTypesPage)
  'cultivate-sale':    'cultivation',
  'process':           'processing',
  'distribute':        'transportation',
  'storage':           'transportation',
  'amendment':         'cultivation',
  // Permit IDs (from LicenseTypesPage)
  'administer':        'research',
  'stock-sell':        'retail',
  'medical-research':  'research',
  'breeding-research': 'research',
  'lab-test':          'research',
  'import-export':     'export',
  // Legacy dropdown values (still used inside this page's <Select>)
  'cultivation':       'cultivation',
  'processing':        'processing',
  'research':          'research',
  'transportation':    'transportation',
  'export':            'export',
  'retail':            'retail',
};

// ─── All selectable types for the dropdown ────────────────────────────────────
const LICENCE_OPTIONS = [
  { value: 'cultivation',    label: 'Cultivate & Sale — Medicinal Cannabis / Industrial Hemp' },
  { value: 'processing',     label: 'Process — Medicinal Cannabis / Industrial Hemp' },
  { value: 'transportation', label: 'Distribute (Transport, Wholesale & Retail)' },
  { value: 'storage',        label: 'Storage (Warehousing)' },
  { value: 'amendment',      label: 'Licence Amendment (Change of Location / Person / Board)' },
];

const PERMIT_OPTIONS = [
  { value: 'administer',       label: 'Administer Cannabis Drugs' },
  { value: 'stock-sell',       label: 'Stock, Sell & Distribute Cannabis Drugs' },
  { value: 'medical-research', label: 'Conduct Medical Research & Clinical Trials' },
  { value: 'breeding-research',label: 'Conduct Breeding & Agronomy Research' },
  { value: 'lab-test',         label: 'Conduct Laboratory Test on Cannabis' },
  { value: 'import-export',    label: 'Import (Seed) or Export Cannabis Products' },
];

// ─── Safe info lookup — never crashes ────────────────────────────────────────
function getInfo(typeId: string) {
  const key = ID_TO_INFO_KEY[typeId];
  return key ? licenseTypeInfo[key] : null;
}

export default function NewApplicationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const preSelectedType = location.state?.selectedType as string | undefined;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    licenseType: preSelectedType || '',
    businessName: '',
    businessAddress: '',
    contactPerson: '',
    email: '',
    phone: '',
    plotSize: '',
    intendedPurpose: '',
    documents: [] as File[],
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;
  const selectedInfo = formData.licenseType ? getInfo(formData.licenseType) : null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, documents: [...prev.documents, ...newFiles] }));
      toast.success(`${newFiles.length} file(s) uploaded successfully`);
    }
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    toast.success('Application submitted successfully!', {
      description: 'You will receive a confirmation email shortly.',
    });
    setTimeout(() => navigate('/applicant/dashboard'), 1500);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.licenseType !== '';
      case 2: return !!(formData.businessName && formData.businessAddress && formData.contactPerson);
      case 3: return !!(formData.email && formData.phone && formData.intendedPurpose);
      case 4: return formData.documents.length > 0;
      default: return false;
    }
  };

  // Friendly display label for the selected type
  const selectedLabel =
    [...LICENCE_OPTIONS, ...PERMIT_OPTIONS].find(o => o.value === formData.licenseType)?.label
    ?? formData.licenseType;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F9F6' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1B4D2E 0%, #2D6A4F 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-white">New Licence Application</h1>
          <p className="mt-1" style={{ color: '#C9A84C' }}>Complete all steps to submit your application</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              {['Licence Type', 'Business Info', 'Contact Details', 'Documents'].map((label, i) => (
                <span key={label} className={currentStep >= i + 1 ? 'text-[#2D6A4F] font-medium' : ''}>
                  {label}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Step 1: Licence Type ── */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Licence or Permit Type</CardTitle>
              <CardDescription>
                Choose the type of cannabis licence or permit you wish to apply for
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="licenseType">Licence / Permit Type *</Label>
                <Select
                  value={formData.licenseType}
                  onValueChange={(value) => handleInputChange('licenseType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a licence or permit type" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Licences group */}
                    <div className="px-2 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Licences
                    </div>
                    {LICENCE_OPTIONS.map(o => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                    {/* Permits group */}
                    <div className="px-2 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider mt-1 border-t">
                      Permits
                    </div>
                    {PERMIT_OPTIONS.map(o => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Info card — only shown when a type is selected AND info exists */}
              {formData.licenseType && selectedInfo && (
                <Card className="bg-[#EBF4EE] border-[#AACFB5]">
                  <CardHeader>
                    <CardTitle className="text-lg" style={{ color: '#1B4D2E' }}>
                      {selectedLabel}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      <strong>Description:</strong> {selectedInfo.description}
                    </p>
                    <p className="text-gray-700">
                      <strong>Processing Time:</strong> {selectedInfo.processingTime}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Fallback card for types not in licenseTypeInfo */}
              {formData.licenseType && !selectedInfo && (
                <Card className="bg-[#F5EDD6] border-[#E8D5A3]">
                  <CardContent className="pt-4 text-sm text-gray-700">
                    <strong style={{ color: '#1B4D2E' }}>{selectedLabel}</strong>
                    <p className="mt-1">Please proceed through the steps to submit your application. A CRA officer will contact you with specific requirements for this type.</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        )}

        {/* ── Step 2: Business Information ── */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Provide details about your business entity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="Enter your registered business name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessAddress">Business Address *</Label>
                <Textarea
                  id="businessAddress"
                  value={formData.businessAddress}
                  onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                  placeholder="Full business address including district and region"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  placeholder="Name of primary contact person"
                />
              </div>
              {(formData.licenseType === 'cultivation' || formData.licenseType === 'cultivate-sale') && (
                <div className="space-y-2">
                  <Label htmlFor="plotSize">Plot Size (hectares)</Label>
                  <Input
                    id="plotSize"
                    value={formData.plotSize}
                    onChange={(e) => handleInputChange('plotSize', e.target.value)}
                    placeholder="e.g., 50 hectares"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* ── Step 3: Contact Details ── */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
              <CardDescription>How can we reach you regarding this application?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.mw"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+265 999 123 456"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="intendedPurpose">Intended Purpose *</Label>
                <Textarea
                  id="intendedPurpose"
                  value={formData.intendedPurpose}
                  onChange={(e) => handleInputChange('intendedPurpose', e.target.value)}
                  placeholder="Describe the intended use and purpose of this licence..."
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Step 4: Documents ── */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>Upload all required documents for your application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Requirements list — only if info exists */}
              {selectedInfo && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-yellow-900 mb-2">Required Documents:</h4>
                  <ul className="space-y-1 text-sm text-yellow-800">
                    {selectedInfo.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-0.5">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Generic requirements when no info available */}
              {!selectedInfo && formData.licenseType && (
                <div className="bg-[#EBF4EE] border border-[#AACFB5] rounded-lg p-4 mb-4">
                  <h4 className="font-medium mb-2" style={{ color: '#1B4D2E' }}>Typical Required Documents:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {['Business Registration Certificate', 'National ID of applicant', 'Proof of premises / facility', 'Any relevant professional certifications'].map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span style={{ color: '#C9A84C' }}>•</span>{r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#2D6A4F] transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium mb-2">Click to upload documents</p>
                  <p className="text-sm text-gray-500">PDF, DOC, DOCX, JPG, PNG up to 10MB each</p>
                </label>
              </div>

              {formData.documents.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-700">Uploaded Documents:</h4>
                  {formData.documents.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-[#2D6A4F]" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeDocument(index)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext} disabled={!canProceed()}
              style={{ backgroundColor: '#1B4D2E', color: 'white' }}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canProceed()}
              style={{ backgroundColor: '#1B4D2E', color: 'white' }}>
              <Check className="w-4 h-4 mr-2" />
              Submit Application
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
