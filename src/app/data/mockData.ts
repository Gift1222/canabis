import { 
  LicenseApplication, 
  Announcement, 
  DashboardStats, 
  ComplianceInspection,
  User 
} from '../types';

export const currentUser: User = {
  id: 'user-001',
  name: 'John Banda',
  email: 'john.banda@example.mw',
  role: 'applicant',
  organization: 'Malawi Green Farms Ltd',
  phone: '+265 999 123 456'
};

export const adminUser: User = {
  id: 'admin-001',
  name: 'Grace Phiri',
  email: 'grace.phiri@cra.gov.mw',
  role: 'admin',
  organization: 'Cannabis Regulatory Authority',
  phone: '+265 888 654 321'
};

export const mockApplications: LicenseApplication[] = [
  {
    id: 'CRA/06-2021/001',
    applicantId: 'user-001',
    applicantName: 'John Banda',
    licenseType: 'cultivate-sale-medicinal',
    status: 'under_review',
    submittedDate: '2026-03-15',
    businessName: 'Malawi Green Farms Ltd',
    businessAddress: 'Plot 45, Lilongwe District, Central Region',
    contactPerson: 'John Banda',
    email: 'john.banda@example.mw',
    phone: '+265 999 123 456',
    plotSize: '50 hectares',
    intendedPurpose: 'Medical cannabis cultivation for export',
    documents: [
      {
        id: 'doc-001',
        name: 'Business Registration Certificate',
        type: 'PDF',
        uploadDate: '2026-03-14',
        size: '2.4 MB'
      },
      {
        id: 'doc-002',
        name: 'Land Title Deed',
        type: 'PDF',
        uploadDate: '2026-03-14',
        size: '1.8 MB'
      },
      {
        id: 'doc-003',
        name: 'Environmental Impact Assessment',
        type: 'PDF',
        uploadDate: '2026-03-15',
        size: '5.2 MB'
      }
    ],
    paymentStatus: 'pending',
    paymentAmount: 8500
  },
  {
    id: 'CRA/06-2021/002',
    applicantId: 'user-002',
    applicantName: 'Sarah Mwale',
    licenseType: 'process-medicinal',
    status: 'approved',
    submittedDate: '2026-02-20',
    reviewedDate: '2026-03-01',
    approvedDate: '2026-03-05',
    expiryDate: '2027-03-05',
    businessName: 'Shire Valley Cannabis Processing',
    businessAddress: 'Industrial Area, Blantyre',
    contactPerson: 'Sarah Mwale',
    email: 'sarah.mwale@svcp.mw',
    phone: '+265 888 234 567',
    intendedPurpose: 'Processing of cannabis for pharmaceutical products',
    documents: [
      {
        id: 'doc-004',
        name: 'GMP Certificate',
        type: 'PDF',
        uploadDate: '2026-02-19',
        size: '1.5 MB'
      },
      {
        id: 'doc-005',
        name: 'Business License',
        type: 'PDF',
        uploadDate: '2026-02-19',
        size: '0.9 MB'
      }
    ],
    reviewNotes: 'All requirements met. Facility inspection passed.',
    reviewerId: 'admin-001',
    paymentStatus: 'completed',
    paymentAmount: 8500,
    licenseNumber: 'CRA-PROC-2026-002'
  },
  {
    id: 'CRA/06-2021/003',
    applicantId: 'user-003',
    applicantName: 'James Kamanga',
    licenseType: 'medical-research-medicinal',
    status: 'submitted',
    submittedDate: '2026-03-28',
    businessName: 'Malawi University Research Institute',
    businessAddress: 'University Campus, Zomba',
    contactPerson: 'Dr. James Kamanga',
    email: 'j.kamanga@unima.mw',
    phone: '+265 777 345 678',
    intendedPurpose: 'Research on medicinal properties of cannabis',
    documents: [
      {
        id: 'doc-006',
        name: 'Research Proposal',
        type: 'PDF',
        uploadDate: '2026-03-27',
        size: '3.1 MB'
      },
      {
        id: 'doc-007',
        name: 'Institutional Approval',
        type: 'PDF',
        uploadDate: '2026-03-27',
        size: '1.2 MB'
      }
    ],
    paymentStatus: 'pending',
    paymentAmount: 850
  },
  {
    id: 'CRA/06-2021/004',
    applicantId: 'user-004',
    applicantName: 'Peter Nkhoma',
    licenseType: 'import-export',
    status: 'pending_payment',
    submittedDate: '2026-03-10',
    reviewedDate: '2026-03-20',
    businessName: 'Global Agri Exports Ltd',
    businessAddress: 'Kamuzu International Airport Area, Lilongwe',
    contactPerson: 'Peter Nkhoma',
    email: 'p.nkhoma@globalagri.mw',
    phone: '+265 991 456 789',
    intendedPurpose: 'Export of processed cannabis products to Europe',
    documents: [
      {
        id: 'doc-008',
        name: 'Export License Application',
        type: 'PDF',
        uploadDate: '2026-03-09',
        size: '2.7 MB'
      },
      {
        id: 'doc-009',
        name: 'International Trade Certificate',
        type: 'PDF',
        uploadDate: '2026-03-09',
        size: '1.4 MB'
      }
    ],
    reviewNotes: 'Approved pending payment of fees',
    reviewerId: 'admin-001',
    paymentStatus: 'pending',
    paymentAmount: 1500
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-001',
    title: 'New Cannabis Cultivation Regulations 2026',
    content: 'The Cannabis Regulatory Authority announces updated regulations for cannabis cultivation. All applicants must comply with the new environmental standards effective April 1, 2026.',
    publishDate: '2026-03-20',
    category: 'regulation'
  },
  {
    id: 'ann-002',
    title: 'Application Processing Times',
    content: 'Due to high demand, current processing times for new applications are 4-6 weeks. We appreciate your patience.',
    publishDate: '2026-03-25',
    category: 'notice'
  },
  {
    id: 'ann-003',
    title: 'License Renewal Deadline Approaching',
    content: 'All license holders with licenses expiring in Q2 2026 are reminded to submit renewal applications at least 60 days before expiry.',
    publishDate: '2026-03-28',
    category: 'alert'
  },
  {
    id: 'ann-004',
    title: 'DCLIS System Upgrade',
    content: 'The Digital Cannabis Licensing System has been upgraded with new features including improved document management and payment tracking.',
    publishDate: '2026-03-31',
    category: 'update'
  }
];

export const mockInspections: ComplianceInspection[] = [
  {
    id: 'insp-001',
    licenseId: 'CRA/06-2021/002',
    licensee: 'Shire Valley Cannabis Processing',
    inspectionDate: '2026-03-01',
    inspector: 'Inspector M. Banda',
    status: 'completed',
    findings: 'Facility meets all GMP standards. No violations found.',
    nextInspection: '2026-09-01'
  },
  {
    id: 'insp-002',
    licenseId: 'CRA/06-2021/001',
    licensee: 'Malawi Green Farms Ltd',
    inspectionDate: '2026-04-15',
    inspector: 'Inspector L. Chirwa',
    status: 'scheduled',
    nextInspection: '2026-04-15'
  }
];

export const mockStats: DashboardStats = {
  totalApplications: 47,
  pendingReview: 12,
  approved: 28,
  rejected: 3,
  activeLicenses: 25,
  expiringLicenses: 4,
  revenue: 157500
};

export const licenseTypeInfo = {
  // ── LICENCES ───────────────────────────────────────────────────────────────
  'cultivate-sale-medicinal': { name: 'Cultivate & Sale — Medicinal Cannabis', description: 'Licence to cultivate and sell Medicinal Cannabis across the full cultivation value chain.', fee: '$8,500', requirements: ['Land ownership or lease agreement', 'Environmental Impact Assessment', 'Business Registration Certificate', 'Security plan for cultivation site', 'Proof of financial capacity'], processingTime: '30–45 working days' },
  'cultivate-sale-hemp':      { name: 'Cultivate & Sale — Industrial Hemp',    description: 'Licence to cultivate and sell Industrial Hemp crops.', fee: '$1,200', requirements: ['Land ownership or lease agreement', 'Environmental Impact Assessment', 'Business Registration Certificate', 'Security plan for cultivation site', 'Proof of financial capacity'], processingTime: '30–45 working days' },

  'process-medicinal': { name: 'Process — Medicinal Cannabis', description: 'Licence to process raw Medicinal Cannabis into finished or semi-finished products.', fee: '$8,500', requirements: ['Certified processing facility with GMP compliance', 'Qualified technical personnel', 'Waste management plan', 'Quality control procedures', 'Business Registration Certificate'], processingTime: '30–45 working days' },
  'process-hemp':      { name: 'Process — Industrial Hemp',    description: 'Licence to process Industrial Hemp into finished or semi-finished products.', fee: '$3,000', requirements: ['Certified processing facility with GMP compliance', 'Qualified technical personnel', 'Waste management plan', 'Quality control procedures', 'Business Registration Certificate'], processingTime: '30–45 working days' },

  'distribute-medicinal': { name: 'Distribute — Medicinal Cannabis (Transport, Wholesale & Retail)', description: 'Licence covering distribution of Medicinal Cannabis including transportation, wholesale and retail.', fee: '$2,380', requirements: ['Approved distribution or retail premises', 'Registered vehicles with tracking (for transport)', 'Storage and security protocols', 'Product traceability records', 'Business Registration Certificate'], processingTime: '21–30 working days' },
  'distribute-hemp':      { name: 'Distribute — Industrial Hemp (Transport, Wholesale & Retail)',    description: 'Licence covering distribution of Industrial Hemp including transportation, wholesale and retail.', fee: '$1,680', requirements: ['Approved distribution or retail premises', 'Registered vehicles with tracking (for transport)', 'Storage and security protocols', 'Product traceability records', 'Business Registration Certificate'], processingTime: '21–30 working days' },

  'storage-medicinal': { name: 'Storage / Warehousing — Medicinal Cannabis', description: 'Licence to operate a secure warehousing facility for Medicinal Cannabis stock.', fee: '$500', requirements: ['Approved and secured warehouse premises', 'Inventory management system', 'Fire safety compliance certificate', 'Access control and CCTV records', 'Business Registration Certificate'], processingTime: '21–30 working days' },
  'storage-hemp':      { name: 'Storage / Warehousing — Industrial Hemp',    description: 'Licence to operate a secure warehousing facility for Industrial Hemp stock.', fee: '$500', requirements: ['Approved and secured warehouse premises', 'Inventory management system', 'Fire safety compliance certificate', 'Access control and CCTV records', 'Business Registration Certificate'], processingTime: '21–30 working days' },

  'amendment-medicinal': { name: 'Licence Amendment — Medicinal Cannabis (Change of Location / Person / Board)', description: 'Amendment to an existing Medicinal Cannabis licence following a change of location, responsible person or board.', fee: '$1,700', requirements: ['Copy of current valid licence', 'Written reason for amendment', 'Supporting documents for the change', 'Updated business registration (if applicable)'], processingTime: '14–21 working days' },
  'amendment-hemp':      { name: 'Licence Amendment — Industrial Hemp (Change of Location / Person / Board)',    description: 'Amendment to an existing Industrial Hemp licence following a change of location, responsible person or board.', fee: '$600', requirements: ['Copy of current valid licence', 'Written reason for amendment', 'Supporting documents for the change', 'Updated business registration (if applicable)'], processingTime: '14–21 working days' },

  // ── PERMITS ────────────────────────────────────────────────────────────────
  'administer-private-hospital': { name: 'Administer Cannabis Drugs — Private Hospitals', description: 'Permit for private healthcare facilities to administer approved cannabis-based pharmaceutical drugs to patients.', fee: '$425', requirements: ['Hospital registration certificate', 'Relevant medical staff qualifications', 'Drug storage and dispensing protocols', 'Patient consent procedures'], processingTime: '14–21 working days' },
  'administer-government':       { name: 'Administer Cannabis Drugs — Government',         description: 'Permit for government healthcare facilities to administer approved cannabis-based pharmaceutical drugs to patients.', fee: '$170', requirements: ['Government facility authorisation', 'Relevant medical staff qualifications', 'Drug storage and dispensing protocols', 'Patient consent procedures'], processingTime: '14–21 working days' },

  'stock-sell-private-pharmacy': { name: 'Stock, Sell & Distribute Cannabis Drugs — Private Pharmacies', description: 'Permit for private pharmacies to stock, dispense and distribute approved cannabis pharmaceutical products.', fee: '$170', requirements: ['Pharmacy registration certificate', 'Pharmacist qualifications', 'Secure drug storage facilities', 'Record-keeping system'], processingTime: '14–21 working days' },
  'stock-sell-govt-pharmacy':    { name: 'Stock, Sell & Distribute Cannabis Drugs — Government Pharmacies', description: 'Permit for government pharmacies to stock, dispense and distribute approved cannabis pharmaceutical products.', fee: '$85', requirements: ['Government pharmacy authorisation', 'Pharmacist qualifications', 'Secure drug storage facilities', 'Record-keeping system'], processingTime: '14–21 working days' },

  'medical-research-medicinal': { name: 'Medical Research & Clinical Trials — Medicinal Cannabis', description: 'Permit to conduct clinical trials or formal medical research involving Medicinal Cannabis.', fee: '$850', requirements: ['Research proposal and protocol', 'Institutional ethics committee approval', 'Principal investigator credentials', 'Research facility details', 'Participant consent framework'], processingTime: '21–30 working days' },
  'medical-research-hemp':      { name: 'Medical Research & Clinical Trials — Industrial Hemp',    description: 'Permit to conduct clinical trials or formal medical research involving Industrial Hemp.', fee: '$600', requirements: ['Research proposal and protocol', 'Institutional ethics committee approval', 'Principal investigator credentials', 'Research facility details', 'Participant consent framework'], processingTime: '21–30 working days' },

  'breeding-research-medicinal': { name: 'Breeding & Agronomy Research — Medicinal Cannabis', description: 'Permit for plant breeding, variety development and agronomy field research on Medicinal Cannabis crops.', fee: '$850', requirements: ['Research proposal', 'Accredited research institution letter', 'Qualified plant scientist on team', 'Secure research plot or greenhouse', 'Data management and reporting plan'], processingTime: '21–30 working days' },
  'breeding-research-hemp':      { name: 'Breeding & Agronomy Research — Industrial Hemp',    description: 'Permit for plant breeding, variety development and agronomy field research on Industrial Hemp crops.', fee: '$600', requirements: ['Research proposal', 'Accredited research institution letter', 'Qualified plant scientist on team', 'Secure research plot or greenhouse', 'Data management and reporting plan'], processingTime: '21–30 working days' },

  'lab-test-medicinal': { name: 'Laboratory Test on Cannabis — Medicinal Cannabis', description: 'Permit for certified laboratories to conduct testing and analysis of Medicinal Cannabis samples.', fee: '$170', requirements: ['Laboratory accreditation certificate', 'Qualified laboratory personnel', 'Chain of custody procedures', 'Equipment calibration records', 'Test reporting protocols'], processingTime: '14–21 working days' },
  'lab-test-hemp':      { name: 'Laboratory Test on Cannabis — Industrial Hemp',    description: 'Permit for certified laboratories to conduct testing and analysis of Industrial Hemp samples.', fee: '$120', requirements: ['Laboratory accreditation certificate', 'Qualified laboratory personnel', 'Chain of custody procedures', 'Equipment calibration records', 'Test reporting protocols'], processingTime: '14–21 working days' },

  'import-export': { name: 'Import (Seed) or Export (Semi/Fully Processed Cannabis Products)', description: 'Permit to import cannabis seeds into Malawi or export semi-processed and fully processed cannabis products internationally. Fee is 1.5% of the total consignment value.', fee: '1.5% of Consignment Value', requirements: ['Import/export permit application', 'International trade certificate', 'Destination or origin country authorisation', 'Product quality and laboratory certificates', 'Customs clearance documentation', 'Consignment value declaration'], processingTime: '30–45 working days' },
};

/**
 * Safely returns a human-readable display name for any licenseType value.
 * Use this everywhere you need to display a license type — especially in
 * charts and tables — to avoid "Cannot read properties of undefined" crashes.
 *
 * @example
 * getLicenseDisplayName('cultivate-sale-medicinal')
 * // → "Cultivate & Sale — Medicinal Cannabis"
 *
 * getLicenseDisplayName('unknown-key')
 * // → "unknown-key"  (safe fallback, no crash)
 */
export function getLicenseDisplayName(type: string): string {
  const info = licenseTypeInfo[type as keyof typeof licenseTypeInfo];
  return info?.name ?? type;
}
