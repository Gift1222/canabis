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
    id: 'APP-2026-001',
    applicantId: 'user-001',
    applicantName: 'John Banda',
    licenseType: 'cultivation',
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
    paymentAmount: 500000
  },
  {
    id: 'APP-2026-002',
    applicantId: 'user-002',
    applicantName: 'Sarah Mwale',
    licenseType: 'processing',
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
    paymentAmount: 750000,
    licenseNumber: 'CRA-PROC-2026-002'
  },
  {
    id: 'APP-2026-003',
    applicantId: 'user-003',
    applicantName: 'James Kamanga',
    licenseType: 'research',
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
    paymentAmount: 150000
  },
  {
    id: 'APP-2026-004',
    applicantId: 'user-004',
    applicantName: 'Peter Nkhoma',
    licenseType: 'export',
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
    paymentAmount: 1000000
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
    licenseId: 'APP-2026-002',
    licensee: 'Shire Valley Cannabis Processing',
    inspectionDate: '2026-03-01',
    inspector: 'Inspector M. Banda',
    status: 'completed',
    findings: 'Facility meets all GMP standards. No violations found.',
    nextInspection: '2026-09-01'
  },
  {
    id: 'insp-002',
    licenseId: 'APP-2026-001',
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
  revenue: 15750000
};

export const licenseTypeInfo = {
  cultivation: {
    name: 'Cultivation License',
    description: 'For growing cannabis plants for medical or industrial purposes',
    fee: 500000,
    requirements: [
      'Valid business registration',
      'Land title deed or lease agreement',
      'Environmental impact assessment',
      'Security plan',
      'Agricultural background of key personnel'
    ],
    processingTime: '4-6 weeks'
  },
  processing: {
    name: 'Processing License',
    description: 'For processing cannabis into pharmaceutical or industrial products',
    fee: 750000,
    requirements: [
      'GMP certification',
      'Business license',
      'Facility inspection certificate',
      'Quality control procedures',
      'Staff qualifications documentation'
    ],
    processingTime: '6-8 weeks'
  },
  research: {
    name: 'Research License',
    description: 'For academic or scientific research on cannabis',
    fee: 150000,
    requirements: [
      'Research proposal',
      'Institutional approval',
      'Principal investigator credentials',
      'Ethics committee approval',
      'Research facility details'
    ],
    processingTime: '3-4 weeks'
  },
  transportation: {
    name: 'Transportation License',
    description: 'For transporting cannabis products within Malawi',
    fee: 300000,
    requirements: [
      'Transport company registration',
      'Vehicle details and registration',
      'Security measures documentation',
      'Driver background checks',
      'Insurance coverage'
    ],
    processingTime: '2-3 weeks'
  },
  export: {
    name: 'Export License',
    description: 'For exporting cannabis products internationally',
    fee: 1000000,
    requirements: [
      'Export license application',
      'International trade certificate',
      'Destination country authorization',
      'Product quality certificates',
      'Customs clearance documentation'
    ],
    processingTime: '8-10 weeks'
  },
  retail: {
    name: 'Retail License',
    description: 'For retail sale of approved cannabis products',
    fee: 400000,
    requirements: [
      'Retail business license',
      'Premises inspection certificate',
      'Staff training certificates',
      'Age verification system',
      'Storage and security plan'
    ],
    processingTime: '4-5 weeks'
  }
};
