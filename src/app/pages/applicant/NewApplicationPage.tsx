import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Progress } from '../../components/ui/progress';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, Upload, Check, ChevronRight } from 'lucide-react';
import { LicenseType } from '../../types';
import { licenseTypeInfo } from '../../data/mockData';

// ─── Fee schedule structure ──────────────────────────────────────────────────
// Each category has a label and its specific sub-options (i), (ii), etc.

const LICENCE_CATEGORIES = [
  {
    id: 'cultivate-sale',
    label: '(1) Cultivate and Sale',
    options: [
      { value: 'cultivate-sale-medicinal', label: '(i) Medicinal Cannabis',  fee: '$8,500' },
      { value: 'cultivate-sale-hemp',      label: '(ii) Industrial Hemp',     fee: '$1,200' },
    ],
  },
  {
    id: 'process',
    label: '(2) Process',
    options: [
      { value: 'process-medicinal', label: '(i) Medicinal Cannabis', fee: '$8,500' },
      { value: 'process-hemp',      label: '(ii) Industrial Hemp',   fee: '$3,000' },
    ],
  },
  {
    id: 'distribute',
    label: '(3) Distribute (Transport, Wholesale & Retail)',
    options: [
      { value: 'distribute-medicinal', label: '(i) Medicinal Cannabis', fee: '$2,380' },
      { value: 'distribute-hemp',      label: '(ii) Industrial Hemp',   fee: '$1,680' },
    ],
  },
  {
    id: 'storage',
    label: '(4) Storage (Warehousing)',
    options: [
      { value: 'storage-medicinal', label: '(i) Medicinal Cannabis', fee: '$500' },
      { value: 'storage-hemp',      label: '(ii) Industrial Hemp',   fee: '$500' },
    ],
  },
  {
    id: 'amendment',
    label: '(5) Licence Amendment: Change of Location / Responsible Person / Board',
    options: [
      { value: 'amendment-medicinal', label: '(i) Medicinal Cannabis', fee: '$1,700' },
      { value: 'amendment-hemp',      label: '(ii) Industrial Hemp',   fee: '$600'   },
    ],
  },
];

const PERMIT_CATEGORIES = [
  {
    id: 'administer',
    label: '(1) Administer Cannabis Drugs',
    options: [
      { value: 'administer-private-hospital', label: '(i) Private Hospitals',  fee: '$425' },
      { value: 'administer-government',       label: '(ii) Government',         fee: '$170' },
    ],
  },
  {
    id: 'stock-sell',
    label: '(2) Stock, Sell & Distribute Cannabis Drugs',
    options: [
      { value: 'stock-sell-private-pharmacy', label: '(i) Private Pharmacies',    fee: '$170' },
      { value: 'stock-sell-govt-pharmacy',    label: '(ii) Government Pharmacies', fee: '$85'  },
    ],
  },
  {
    id: 'medical-research',
    label: '(3) Conduct Medical Research & Clinical Trials',
    options: [
      { value: 'medical-research-medicinal', label: '(i) Medicinal Cannabis', fee: '$850' },
      { value: 'medical-research-hemp',      label: '(ii) Industrial Hemp',   fee: '$600' },
    ],
  },
  {
    id: 'breeding-research',
    label: '(4) Conduct Breeding & Agronomy Research',
    options: [
      { value: 'breeding-research-medicinal', label: '(i) Medicinal Cannabis', fee: '$850' },
      { value: 'breeding-research-hemp',      label: '(ii) Industrial Hemp',   fee: '$600' },
    ],
  },
  {
    id: 'lab-test',
    label: '(5) Conduct Laboratory Test on Cannabis to Conduct Research',
    options: [
      { value: 'lab-test-medicinal', label: '(i) Medical Cannabis',  fee: '$170' },
      { value: 'lab-test-hemp',      label: '(ii) Industrial Hemp',  fee: '$120' },
    ],
  },
  {
    id: 'import-export',
    label: '(6) Import (Seed) or Export (Semi or Fully Processed Cannabis Products)',
    options: [
      { value: 'import-export', label: 'Fee: 1.5% of Consignment Value', fee: '1.5% of Consignment Value' },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getInfo(typeId: string) {
  return (licenseTypeInfo as any)[typeId] ?? null;
}

function findOption(value: string) {
  for (const cat of [...LICENCE_CATEGORIES, ...PERMIT_CATEGORIES]) {
    const opt = cat.options.find(o => o.value === value);
    if (opt) return { cat, opt };
  }
  return null;
}

// ─── Step 1 inner component ──────────────────────────────────────────────────
function LicenceTypeSelector({
  applicationType,
  setApplicationType,
  selectedCategory,
  setSelectedCategory,
  selectedSubType,
  setSelectedSubType,
}: {
  applicationType: 'licence' | 'permit' | '';
  setApplicationType: (v: 'licence' | 'permit') => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedSubType: string;
  setSelectedSubType: (v: string) => void;
}) {
  const categories = applicationType === 'licence' ? LICENCE_CATEGORIES : PERMIT_CATEGORIES;
  const activeCategory = categories.find(c => c.id === selectedCategory);
  const info = selectedSubType ? getInfo(selectedSubType) : null;
  const option = selectedSubType ? findOption(selectedSubType) : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Licence or Permit Type</CardTitle>
        <CardDescription>
          Choose whether you are applying for a Licence or a Permit, then select your specific type
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* ── Step 1a: Licence vs Permit ── */}
        <div>
          <Label className="text-sm font-semibold mb-3 block" style={{ color: '#1B4D2E' }}>
            Application Type *
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {(['licence', 'permit'] as const).map(type => (
              <button
                key={type}
                onClick={() => { setApplicationType(type); setSelectedCategory(''); setSelectedSubType(''); }}
                className="p-4 rounded-xl border-2 text-left transition-all"
                style={{
                  borderColor: applicationType === type ? '#1B4D2E' : '#D5EBD9',
                  backgroundColor: applicationType === type ? '#EBF4EE' : 'white',
                }}
              >
                <div className="font-bold capitalize" style={{ color: '#1B4D2E' }}>{type}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {type === 'licence'
                    ? 'Cultivate, process, distribute, store or amend'
                    : 'Administer, research, lab test or import/export'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Step 1b: Category ── */}
        {applicationType && (
          <div>
            <Label className="text-sm font-semibold mb-3 block" style={{ color: '#1B4D2E' }}>
              {applicationType === 'licence' ? 'Licence' : 'Permit'} Category *
            </Label>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setSelectedSubType(''); }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 text-left transition-all"
                  style={{
                    borderColor: selectedCategory === cat.id ? '#1B4D2E' : '#E5E7EB',
                    backgroundColor: selectedCategory === cat.id ? '#EBF4EE' : 'white',
                  }}
                >
                  <span className="text-sm font-medium" style={{ color: '#1B4D2E' }}>{cat.label}</span>
                  <ChevronRight className="w-4 h-4 shrink-0" style={{ color: selectedCategory === cat.id ? '#1B4D2E' : '#9CA3AF' }} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 1c: Sub-type (i) / (ii) ── */}
        {activeCategory && (
          <div>
            <Label className="text-sm font-semibold mb-3 block" style={{ color: '#1B4D2E' }}>
              Select Specific Type *
            </Label>
            <div className="space-y-2">
              {activeCategory.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedSubType(opt.value)}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 text-left transition-all"
                  style={{
                    borderColor: selectedSubType === opt.value ? '#C9A84C' : '#E5E7EB',
                    backgroundColor: selectedSubType === opt.value ? '#F5EDD6' : 'white',
                  }}
                >
                  <span className="text-sm font-medium text-gray-800">{opt.label}</span>
                  <span
                    className="text-sm font-bold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: selectedSubType === opt.value ? '#C9A84C' : '#EBF4EE',
                      color: selectedSubType === opt.value ? '#1B4D2E' : '#2D6A4F',
                    }}
                  >
                    {opt.fee}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Info summary card ── */}
        {selectedSubType && (
          <div className="rounded-xl p-4" style={{ backgroundColor: '#EBF4EE', border: '1px solid #AACFB5' }}>
            <div className="text-sm font-bold mb-2" style={{ color: '#1B4D2E' }}>
              {info?.name ?? option?.opt.label}
            </div>
            {info && (
              <div className="space-y-1 text-sm text-gray-700">
                <p>{info.description}</p>
                <p className="mt-2">
                  <strong>Fee:</strong>{' '}
                  <span style={{ color: '#A8892A', fontWeight: 700 }}>{info.fee}</span>
                  {'  ·  '}
                  <strong>Processing Time:</strong> {info.processingTime}
                </p>
              </div>
            )}
          </div>
        )}

      </CardContent>
    </Card>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function NewApplicationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const preSelected = location.state?.selectedType as string | undefined;

  // Determine pre-selected category and sub-type from LicenseTypesPage
  const preFound = preSelected ? findOption(preSelected) : null;
  const preAppType: 'licence' | 'permit' | '' = preFound
    ? LICENCE_CATEGORIES.some(c => c.id === preFound.cat.id) ? 'licence' : 'permit'
    : '';

  const [currentStep, setCurrentStep]           = useState(1);
  const [applicationType, setApplicationType]   = useState<'licence' | 'permit' | ''>(preAppType);
  const [selectedCategory, setSelectedCategory] = useState(preFound?.cat.id ?? '');
  const [selectedSubType, setSelectedSubType]   = useState(preSelected ?? '');

  const [formData, setFormData] = useState({
    businessName: '',
    businessAddress: '',
    contactPerson: '',
    email: '',
    phone: '',
    intendedPurpose: '',
    documents: [] as File[],
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;
  const info = selectedSubType ? getInfo(selectedSubType) : null;

  const handleInputChange = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, documents: [...prev.documents, ...newFiles] }));
      toast.success(`${newFiles.length} file(s) uploaded successfully`);
    }
  };

  const removeDocument = (index: number) =>
    setFormData(prev => ({ ...prev, documents: prev.documents.filter((_, i) => i !== index) }));

  const handleNext = () => { if (currentStep < totalSteps) { setCurrentStep(s => s + 1); window.scrollTo(0, 0); } };
  const handlePrevious = () => { if (currentStep > 1) { setCurrentStep(s => s - 1); window.scrollTo(0, 0); } };

  const handleSubmit = () => {
    toast.success('Application submitted successfully!', { description: 'You will receive a confirmation email shortly.' });
    setTimeout(() => navigate('/applicant/dashboard'), 1500);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!(applicationType && selectedCategory && selectedSubType);
      case 2: return !!(formData.businessName && formData.businessAddress && formData.contactPerson);
      case 3: return !!(formData.email && formData.phone && formData.intendedPurpose);
      case 4: return formData.documents.length > 0;
      default: return false;
    }
  };

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
        {/* Progress */}
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
                <span key={label} className={currentStep >= i + 1 ? 'font-medium' : ''}
                  style={{ color: currentStep >= i + 1 ? '#1B4D2E' : undefined }}>
                  {label}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Step 1 ── */}
        {currentStep === 1 && (
          <LicenceTypeSelector
            applicationType={applicationType}
            setApplicationType={setApplicationType}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubType={selectedSubType}
            setSelectedSubType={setSelectedSubType}
          />
        )}

        {/* ── Step 2: Business Info ── */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Provide details about your business entity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input id="businessName" value={formData.businessName}
                  onChange={e => handleInputChange('businessName', e.target.value)}
                  placeholder="Enter your registered business name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessAddress">Business Address *</Label>
                <Textarea id="businessAddress" value={formData.businessAddress}
                  onChange={e => handleInputChange('businessAddress', e.target.value)}
                  placeholder="Full business address including district and region" rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input id="contactPerson" value={formData.contactPerson}
                  onChange={e => handleInputChange('contactPerson', e.target.value)}
                  placeholder="Name of primary contact person" />
              </div>
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
                <Input id="email" type="email" value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.mw" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" value={formData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  placeholder="+265 999 123 456" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="intendedPurpose">Intended Purpose *</Label>
                <Textarea id="intendedPurpose" value={formData.intendedPurpose}
                  onChange={e => handleInputChange('intendedPurpose', e.target.value)}
                  placeholder="Describe the intended use and purpose of this licence..." rows={5} />
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
              {info?.requirements && (
                <div className="rounded-lg p-4" style={{ backgroundColor: '#F5EDD6', border: '1px solid #E8D5A3' }}>
                  <h4 className="font-semibold mb-2 text-sm" style={{ color: '#1B4D2E' }}>
                    Required Documents for: {info.name}
                  </h4>
                  <ul className="space-y-1.5">
                    {info.requirements.map((req: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span style={{ color: '#C9A84C', fontWeight: 700 }}>•</span>{req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#2D6A4F] transition-colors">
                <input type="file" id="file-upload" multiple onChange={handleFileUpload}
                  className="hidden" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
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
                        <Check className="w-5 h-5" style={{ color: '#2D6A4F' }} />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeDocument(index)}>Remove</Button>
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
            <ArrowLeft className="w-4 h-4 mr-2" />Previous
          </Button>
          {currentStep < totalSteps ? (
            <Button onClick={handleNext} disabled={!canProceed()}
              style={{ backgroundColor: '#1B4D2E', color: 'white' }}>
              Next<ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canProceed()}
              style={{ backgroundColor: '#1B4D2E', color: 'white' }}>
              <Check className="w-4 h-4 mr-2" />Submit Application
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
