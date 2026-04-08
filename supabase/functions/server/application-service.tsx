import * as kv from './kv_store.tsx';

export type ApplicationStatus = 
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'pending_payment';

export type LicenseType = 
  | 'cultivation'
  | 'processing'
  | 'research'
  | 'transportation'
  | 'export'
  | 'retail';

export interface Application {
  id: string;
  applicant_id: string;
  applicant_name: string;
  cooperative_id?: string;
  license_type: LicenseType;
  category: 'medicinal' | 'industrial_hemp';
  status: ApplicationStatus;
  
  // Business details
  business_name: string;
  business_address: string;
  contact_person: string;
  email: string;
  phone: string;
  
  // Land/Location details
  land_size_hectares?: number;
  gps_coordinates?: string;
  district: string;
  region: string;
  plot_size?: string;
  intended_purpose: string;
  
  // Dates and review
  created_at: string;
  submitted_at?: string;
  reviewed_at?: string;
  reviewed_by?: string;
  reviewer_comments?: string;
  approved_date?: string;
  
  // Payment
  payment_status?: 'pending' | 'completed' | 'failed';
  payment_amount?: number;
  application_fee_usd?: number;
  
  // License
  license_number?: string;
  expiry_date?: string;
  
  // Documents
  documents: ApplicationDocument[];
}

export interface ApplicationDocument {
  id: string;
  application_id: string;
  document_type: 'national_id' | 'site_plan' | 'land_title' | 'environmental_clearance' | 'other';
  file_name: string;
  file_url: string;
  file_size?: string;
  uploaded_at: string;
}

// License type definitions with fees
export const LICENSE_TYPES = {
  cultivation: {
    name: 'Cultivation License',
    category: ['medicinal', 'industrial_hemp'],
    application_fee_usd: 500,
    annual_fee_usd: 2000,
    description: 'License for growing cannabis plants'
  },
  processing: {
    name: 'Processing License',
    category: ['medicinal', 'industrial_hemp'],
    application_fee_usd: 750,
    annual_fee_usd: 3000,
    description: 'License for processing cannabis products'
  },
  research: {
    name: 'Research License',
    category: ['medicinal'],
    application_fee_usd: 300,
    annual_fee_usd: 1500,
    description: 'License for cannabis research activities'
  },
  transportation: {
    name: 'Transportation License',
    category: ['medicinal', 'industrial_hemp'],
    application_fee_usd: 400,
    annual_fee_usd: 1800,
    description: 'License for transporting cannabis products'
  },
  export: {
    name: 'Export License',
    category: ['medicinal', 'industrial_hemp'],
    application_fee_usd: 1000,
    annual_fee_usd: 5000,
    description: 'License for exporting cannabis products'
  },
  retail: {
    name: 'Retail License',
    category: ['medicinal'],
    application_fee_usd: 600,
    annual_fee_usd: 2500,
    description: 'License for retail sale of cannabis products'
  }
};

export async function createApplication(applicationData: Partial<Application>) {
  try {
    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    
    const licenseTypeInfo = LICENSE_TYPES[applicationData.license_type as LicenseType];
    
    const application: Application = {
      id,
      applicant_id: applicationData.applicant_id!,
      applicant_name: applicationData.applicant_name!,
      cooperative_id: applicationData.cooperative_id,
      license_type: applicationData.license_type as LicenseType,
      category: applicationData.category || 'medicinal',
      status: applicationData.status || 'draft',
      business_name: applicationData.business_name || '',
      business_address: applicationData.business_address || '',
      contact_person: applicationData.contact_person || '',
      email: applicationData.email || '',
      phone: applicationData.phone || '',
      land_size_hectares: applicationData.land_size_hectares,
      gps_coordinates: applicationData.gps_coordinates,
      district: applicationData.district || '',
      region: applicationData.region || '',
      plot_size: applicationData.plot_size,
      intended_purpose: applicationData.intended_purpose || '',
      created_at: timestamp,
      submitted_at: applicationData.status === 'submitted' ? timestamp : undefined,
      documents: applicationData.documents || [],
      application_fee_usd: licenseTypeInfo?.application_fee_usd,
      payment_status: 'pending',
    };

    await kv.set(`application:${id}`, application);
    
    // Add to user's application list
    const userApps = await kv.get<string[]>(`user:${application.applicant_id}:applications`) || [];
    userApps.push(id);
    await kv.set(`user:${application.applicant_id}:applications`, userApps);
    
    // Add to global application list
    const allApps = await kv.get<string[]>('applications:all') || [];
    allApps.push(id);
    await kv.set('applications:all', allApps);

    return application;
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
}

export async function getApplication(applicationId: string) {
  try {
    const application = await kv.get<Application>(`application:${applicationId}`);
    return application;
  } catch (error) {
    console.error('Error fetching application:', error);
    throw error;
  }
}

export async function getUserApplications(userId: string) {
  try {
    const appIds = await kv.get<string[]>(`user:${userId}:applications`) || [];
    const applications = await Promise.all(
      appIds.map(id => kv.get<Application>(`application:${id}`))
    );
    return applications.filter(app => app !== null);
  } catch (error) {
    console.error('Error fetching user applications:', error);
    throw error;
  }
}

export async function getAllApplications() {
  try {
    const appIds = await kv.get<string[]>('applications:all') || [];
    const applications = await Promise.all(
      appIds.map(id => kv.get<Application>(`application:${id}`))
    );
    return applications.filter(app => app !== null);
  } catch (error) {
    console.error('Error fetching all applications:', error);
    throw error;
  }
}

export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus,
  reviewerId?: string,
  reviewerComments?: string
) {
  try {
    const application = await kv.get<Application>(`application:${applicationId}`);
    if (!application) {
      throw new Error('Application not found');
    }

    const updates: Partial<Application> = {
      status,
      reviewed_at: new Date().toISOString(),
      reviewed_by: reviewerId,
      reviewer_comments: reviewerComments,
    };

    if (status === 'approved') {
      // Generate license number: CRA/MM-YYYY/###
      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      const sequence = await getNextLicenseSequence();
      updates.license_number = `CRA/${month}-${year}/${String(sequence).padStart(3, '0')}`;
      updates.approved_date = now.toISOString();
      
      // Set expiry date (1 year from approval)
      const expiryDate = new Date(now);
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      updates.expiry_date = expiryDate.toISOString();
    }

    const updatedApplication = {
      ...application,
      ...updates,
    };

    await kv.set(`application:${applicationId}`, updatedApplication);
    
    return updatedApplication;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
}

export async function updateApplication(applicationId: string, updates: Partial<Application>) {
  try {
    const application = await kv.get<Application>(`application:${applicationId}`);
    if (!application) {
      throw new Error('Application not found');
    }

    const updatedApplication = {
      ...application,
      ...updates,
      id: application.id, // Ensure ID doesn't change
      applicant_id: application.applicant_id, // Ensure applicant ID doesn't change
    };

    await kv.set(`application:${applicationId}`, updatedApplication);
    return updatedApplication;
  } catch (error) {
    console.error('Error updating application:', error);
    throw error;
  }
}

async function getNextLicenseSequence(): Promise<number> {
  const currentSeq = await kv.get<number>('license:sequence') || 0;
  const nextSeq = currentSeq + 1;
  await kv.set('license:sequence', nextSeq);
  return nextSeq;
}

export async function addApplicationDocument(
  applicationId: string,
  document: Omit<ApplicationDocument, 'id' | 'application_id' | 'uploaded_at'>
) {
  try {
    const application = await kv.get<Application>(`application:${applicationId}`);
    if (!application) {
      throw new Error('Application not found');
    }

    const newDoc: ApplicationDocument = {
      id: crypto.randomUUID(),
      application_id: applicationId,
      uploaded_at: new Date().toISOString(),
      ...document,
    };

    application.documents.push(newDoc);
    await kv.set(`application:${applicationId}`, application);

    return newDoc;
  } catch (error) {
    console.error('Error adding application document:', error);
    throw error;
  }
}
