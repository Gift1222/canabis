import { Link } from 'react-router';
import {
  Sprout,
  FlaskConical,
  Truck,
  Warehouse,
  FileEdit,
  Pill,
  ShoppingBag,
  Microscope,
  TestTube,
  Globe,
  DollarSign,
  Clock,
  FileCheck,
  Info,
  ChevronRight,
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const LICENCES = [
  {
    id: 'cultivate-sale',
    number: '1',
    title: 'Cultivate & Sale',
    icon: Sprout,
    description:
      'Licence to cultivate cannabis crops and sell the harvest. Covers the full cultivation value chain from seed to first point of sale.',
    processingTime: '30–45 working days',
    requirements: [
      'Land ownership or lease agreement',
      'Environmental Impact Assessment',
      'Business Registration Certificate',
      'Security plan for cultivation site',
      'Proof of financial capacity',
    ],
    tiers: [
      { label: 'Medicinal Cannabis', fee: '$8,500' },
      { label: 'Industrial Hemp',    fee: '$1,200' },
    ],
  },
  {
    id: 'process',
    number: '2',
    title: 'Process',
    icon: FlaskConical,
    description:
      'Licence to process raw cannabis material into finished or semi-finished products including extraction, drying, packaging, and manufacturing.',
    processingTime: '30–45 working days',
    requirements: [
      'Certified processing facility with GMP compliance',
      'Qualified technical personnel',
      'Waste management plan',
      'Quality control procedures',
      'Business Registration Certificate',
    ],
    tiers: [
      { label: 'Medicinal Cannabis', fee: '$8,500' },
      { label: 'Industrial Hemp',    fee: '$3,000' },
    ],
  },
  {
    id: 'distribute',
    number: '3',
    title: 'Distribute (Transport, Wholesale & Retail)',
    icon: Truck,
    description:
      'Licence covering the distribution of cannabis products — including transportation, wholesale supply to businesses, and retail sale to authorised end users.',
    processingTime: '21–30 working days',
    requirements: [
      'Approved distribution or retail premises',
      'Registered vehicles with tracking (for transport)',
      'Storage and security protocols',
      'Product traceability records',
      'Business Registration Certificate',
    ],
    tiers: [
      { label: 'Medicinal Cannabis', fee: '$2,380' },
      { label: 'Industrial Hemp',    fee: '$1,680' },
    ],
  },
  {
    id: 'storage',
    number: '4',
    title: 'Storage (Warehousing)',
    icon: Warehouse,
    description:
      'Licence to operate a secure cannabis storage or warehousing facility. Required for any business holding cannabis stock on behalf of another licence holder.',
    processingTime: '21–30 working days',
    requirements: [
      'Approved and secured warehouse premises',
      'Inventory management system',
      'Fire safety compliance certificate',
      'Access control and CCTV records',
      'Business Registration Certificate',
    ],
    tiers: [
      { label: 'Medicinal Cannabis', fee: '$500' },
      { label: 'Industrial Hemp',    fee: '$500' },
    ],
  },
  {
    id: 'amendment',
    number: '5',
    title: 'Licence Amendment',
    icon: FileEdit,
    description:
      'Apply to amend an existing licence following a change of operating location, responsible person, or board/ownership structure.',
    processingTime: '14–21 working days',
    requirements: [
      'Copy of current valid licence',
      'Reason for amendment (written)',
      'Supporting documents for the change',
      'Updated business registration (if applicable)',
    ],
    tiers: [
      { label: 'Medicinal Cannabis', fee: '$1,700' },
      { label: 'Industrial Hemp',    fee: '$600' },
    ],
  },
];

const PERMITS = [
  {
    id: 'administer',
    number: '1',
    title: 'Administer Cannabis Drugs',
    icon: Pill,
    description:
      'Permit for healthcare facilities to administer approved cannabis-based pharmaceutical drugs to patients under medical supervision.',
    tiers: [
      { label: 'Private Hospitals',   fee: '$425' },
      { label: 'Government',          fee: '$170' },
    ],
  },
  {
    id: 'stock-sell',
    number: '2',
    title: 'Stock, Sell & Distribute Cannabis Drugs',
    icon: ShoppingBag,
    description:
      'Permit for pharmacies to stock, dispense, and distribute approved cannabis pharmaceutical products to patients.',
    tiers: [
      { label: 'Private Pharmacies',     fee: '$170' },
      { label: 'Government Pharmacies',  fee: '$85'  },
    ],
  },
  {
    id: 'medical-research',
    number: '3',
    title: 'Conduct Medical Research & Clinical Trials',
    icon: Microscope,
    description:
      'Permit to conduct clinical trials or formal medical research involving cannabis or cannabis-derived compounds.',
    tiers: [
      { label: 'Medicinal Cannabis', fee: '$850' },
      { label: 'Industrial Hemp',    fee: '$600' },
    ],
  },
  {
    id: 'breeding-research',
    number: '4',
    title: 'Conduct Breeding & Agronomy Research',
    icon: Sprout,
    description:
      'Permit to conduct plant breeding, variety development, and agronomy field research on cannabis crops.',
    tiers: [
      { label: 'Medicinal Cannabis', fee: '$850' },
      { label: 'Industrial Hemp',    fee: '$600' },
    ],
  },
  {
    id: 'lab-test',
    number: '5',
    title: 'Conduct Laboratory Test on Cannabis',
    icon: TestTube,
    description:
      'Permit for certified laboratories to conduct testing and analysis of cannabis samples for research or compliance verification purposes.',
    tiers: [
      { label: 'Medicinal Cannabis', fee: '$170' },
      { label: 'Industrial Hemp',    fee: '$120' },
    ],
  },
  {
    id: 'import-export',
    number: '6',
    title: 'Import (Seed) or Export (Semi/Fully Processed Products)',
    icon: Globe,
    description:
      'Permit to import cannabis seeds into Malawi or export semi-processed and fully processed cannabis products to international markets.',
    tiers: [
      { label: 'Fee Basis', fee: '1.5% of Consignment Value' },
    ],
    wide: true,
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function FeeTier({ label, fee, wide }: { label: string; fee: string; wide?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-lg ${wide ? 'col-span-2' : ''}`}
      style={{ backgroundColor: '#F5EDD6', border: '1px solid #E8D5A3' }}
    >
      <span className="text-sm font-medium" style={{ color: '#1B4D2E' }}>{label}</span>
      <span className="text-sm font-bold" style={{ color: '#A8892A' }}>{fee}</span>
    </div>
  );
}

function LicenceCard({ item }: { item: typeof LICENCES[0] }) {
  const Icon = item.icon;
  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col"
      style={{ border: '1px solid #D5EBD9', boxShadow: '0 2px 8px rgba(27,77,46,0.08)' }}>
      {/* Card header */}
      <div className="p-5 pb-4" style={{ borderBottom: '1px solid #EBF4EE' }}>
        <div className="flex items-start gap-4 mb-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#EBF4EE' }}>
            <Icon className="w-6 h-6" style={{ color: '#1B4D2E' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: '#1B4D2E', color: '#C9A84C' }}>
                Licence {item.number}
              </span>
            </div>
            <h3 className="text-base font-bold leading-tight" style={{ color: '#1B4D2E' }}>
              {item.title}
            </h3>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
      </div>

      {/* Fee tiers */}
      <div className="px-5 py-4" style={{ backgroundColor: '#FAFCFA', borderBottom: '1px solid #EBF4EE' }}>
        <div className="flex items-center gap-1.5 mb-2">
          <DollarSign className="w-3.5 h-3.5" style={{ color: '#A8892A' }} />
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#A8892A' }}>
            Licence Fees (USD)
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {item.tiers.map(t => <FeeTier key={t.label} label={t.label} fee={t.fee} />)}
        </div>
      </div>

      {/* Requirements */}
      <div className="px-5 py-4 flex-1">
        <div className="flex items-center gap-1.5 mb-2">
          <FileCheck className="w-3.5 h-3.5" style={{ color: '#1B4D2E' }} />
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#1B4D2E' }}>
            Key Requirements
          </span>
        </div>
        <ul className="space-y-1">
          {item.requirements.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: '#C9A84C' }} />
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Processing time + CTA */}
      <div className="px-5 py-4" style={{ borderTop: '1px solid #EBF4EE' }}>
        <div className="flex items-center gap-1.5 mb-3 text-xs text-gray-500">
          <Clock className="w-3.5 h-3.5" />
          Processing time: <span className="font-medium text-gray-700">{item.processingTime}</span>
        </div>
        <Link to="/applicant/new-application" state={{ selectedType: item.id }}>
          <button className="w-full py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#1B4D2E', color: 'white' }}>
            Apply for this Licence
          </button>
        </Link>
      </div>
    </div>
  );
}

function PermitCard({ item }: { item: typeof PERMITS[0] }) {
  const Icon = item.icon;
  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col"
      style={{ border: '1px solid #E8D5A3', boxShadow: '0 2px 8px rgba(168,137,42,0.08)' }}>
      <div className="p-5 pb-4" style={{ borderBottom: '1px solid #F5EDD6' }}>
        <div className="flex items-start gap-4 mb-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#F5EDD6' }}>
            <Icon className="w-6 h-6" style={{ color: '#A8892A' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: '#C9A84C', color: '#1B4D2E' }}>
                Permit {item.number}
              </span>
            </div>
            <h3 className="text-base font-bold leading-tight" style={{ color: '#1B4D2E' }}>
              {item.title}
            </h3>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
      </div>

      {/* Fee tiers */}
      <div className="px-5 py-4 flex-1" style={{ backgroundColor: '#FDFCF7' }}>
        <div className="flex items-center gap-1.5 mb-2">
          <DollarSign className="w-3.5 h-3.5" style={{ color: '#A8892A' }} />
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#A8892A' }}>
            Permit Fees (USD)
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {item.tiers.map(t => (
            <FeeTier key={t.label} label={t.label} fee={t.fee} wide={true} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 py-4" style={{ borderTop: '1px solid #F5EDD6' }}>
        <Link to="/applicant/new-application" state={{ selectedType: item.id }}>
          <button className="w-full py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#C9A84C', color: '#1B4D2E' }}>
            Apply for this Permit
          </button>
        </Link>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LicenseTypesPage() {
  return (
    <div style={{ backgroundColor: '#F7F9F6', minHeight: '100vh' }}>

      {/* Hero header */}
      <div style={{ background: 'linear-gradient(135deg, #1B4D2E 0%, #2D6A4F 100%)' }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Fees Schedule Licensing & Permit Fees
            </h1>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Fees for licenses and permits are dependent on the type of Cannabis enterprise.
              The licenses are awarded for each activity such as cultivation, processing, storage and
              distribution while permits are given on exportation, importation, research and laboratory tests.
              <br/>
              Licenses, including research and laboratory tests permits are valid for a period of twelve months after which it may be
              renewed for another period as may be prescribed by the registrar. Import and export permits are valid
              for a period not exceeding four months. The fees are structured as follows:
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">

        {/* ── SECTION 1: LICENCES ── */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#1B4D2E' }} />
            <h2 className="text-2xl font-bold" style={{ color: '#1B4D2E' }}>Licensing Fees Schedule</h2>
          </div>
          <p className="text-sm text-gray-500 mb-7 ml-4">
            Annual licences authorising core cannabis value chain activities in Malawi.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {LICENCES.map(item => <LicenceCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* ── SECTION 2: PERMITS ── */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#C9A84C' }} />
            <h2 className="text-2xl font-bold" style={{ color: '#1B4D2E' }}>Permit Fees Schedule</h2>
          </div>
          <p className="text-sm text-gray-500 mb-7 ml-4">
            Permits for specific regulated activities including medical use, research, laboratory testing, and import/export.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {PERMITS.map(item => <PermitCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* ── IMPORTANT NOTES ── */}
        <section>
          <div className="rounded-xl p-6" style={{ backgroundColor: '#EBF4EE', border: '1px solid #AACFB5' }}>
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5" style={{ color: '#1B4D2E' }} />
              <h3 className="font-bold text-base" style={{ color: '#1B4D2E' }}>Important Information</h3>
            </div>
            <ul className="space-y-2.5">
              {[
                'All fees are denominated in United States Dollars (USD) as per the CRA Fee Schedule.',
                'All licences are valid for one year from the date of issuance and must be renewed annually.',
                'Licence holders must comply with all CRA regulations and are subject to periodic inspections.',
                'For Import/Export permits, the fee is 1.5% of the total consignment value at the time of application.',
                'Fees are non-refundable once the application review process has commenced.',
                'Additional permits may be required depending on the scope and location of your operations.',
                'Processing times are estimates and may vary based on application completeness and CRA review workload.',
              ].map((note, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span className="mt-0.5 shrink-0 font-bold" style={{ color: '#C9A84C' }}>•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
}
