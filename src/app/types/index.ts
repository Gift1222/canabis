export type UserRole = 'applicant' | 'admin' | 'inspector';

export type LicenseType =
  // Legacy keys (used by existing mock data)
  | 'cultivation' | 'processing' | 'research' | 'transportation' | 'export' | 'retail'
  // Licence sub-types
  | 'cultivate-sale-medicinal' | 'cultivate-sale-hemp'
  | 'process-medicinal'        | 'process-hemp'
  | 'distribute-medicinal'     | 'distribute-hemp'
  | 'storage-medicinal'        | 'storage-hemp'
  | 'amendment-medicinal'      | 'amendment-hemp'
  // Permit sub-types
  | 'administer-private-hospital' | 'administer-government'
  | 'stock-sell-private-pharmacy' | 'stock-sell-govt-pharmacy'
  | 'medical-research-medicinal'  | 'medical-research-hemp'
  | 'breeding-research-medicinal' | 'breeding-research-hemp'
  | 'lab-test-medicinal'          | 'lab-test-hemp'
  | 'import-export';

export type ApplicationStatus = 
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'pending_payment'
  | 'active';

export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  phone?: string;
}

export interface LicenseApplication {
  id: string;
  applicantId: string;
  applicantName: string;
  licenseType: LicenseType;
  status: ApplicationStatus;
  submittedDate: string;
  reviewedDate?: string;
  approvedDate?: string;
  expiryDate?: string;
  businessName: string;
  businessAddress: string;
  contactPerson: string;
  email: string;
  phone: string;
  plotSize?: string;
  intendedPurpose: string;
  documents: Document[];
  reviewNotes?: string;
  reviewerId?: string;
  paymentStatus?: PaymentStatus;
  paymentAmount?: number;
  licenseNumber?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  url?: string;
}

export interface ComplianceInspection {
  id: string;
  licenseId: string;
  licensee: string;
  inspectionDate: string;
  inspector: string;
  status: 'scheduled' | 'completed' | 'failed';
  findings?: string;
  nextInspection?: string;
}

export interface Payment {
  id: string;
  applicationId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentDate?: string;
  paymentMethod?: string;
  transactionId?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  publishDate: string;
  category: 'regulation' | 'notice' | 'update' | 'alert';
}

export interface DashboardStats {
  totalApplications: number;
  pendingReview: number;
  approved: number;
  rejected: number;
  activeLicenses: number;
  expiringLicenses: number;
  revenue: number;
}
