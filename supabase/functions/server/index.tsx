import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from "./kv_store.tsx";
import * as authService from './auth-service.tsx';
import * as applicationService from './application-service.tsx';
import * as storageService from './storage-service.tsx';
import * as paymentService from './payment-service.tsx';
import * as notificationService from './notification-service.tsx';

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize storage on server startup
storageService.initializeStorage();

// Create Supabase client for auth operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
);

// Health check endpoint
app.get("/make-server-838179d5/health", (c) => {
  return c.json({ status: "ok" });
});

// ============================================================
// AUTHENTICATION ENDPOINTS
// ============================================================

// Register new user
app.post("/make-server-838179d5/auth/register", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, full_name, phone, national_id, role, district, region } = body;

    if (!email || !password || !full_name) {
      return c.json({ error: 'Missing required fields: email, password, full_name' }, 400);
    }

    const result = await authService.registerUser({
      email,
      password,
      full_name,
      phone,
      national_id,
      role,
      district,
      region,
    });

    return c.json({ success: true, user: result.user });
  } catch (error) {
    console.error('Registration error:', error);
    return c.json({ error: `Registration failed: ${error.message}` }, 500);
  }
});

// Login
app.post("/make-server-838179d5/auth/login", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json({ error: 'Missing email or password' }, 400);
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      console.error('Login error:', error);
      return c.json({ error: `Login failed: ${error?.message || 'Invalid credentials'}` }, 401);
    }

    const profile = await authService.getUserProfile(data.user.id);

    return c.json({
      success: true,
      access_token: data.session.access_token,
      user: data.user,
      profile,
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: `Login failed: ${error.message}` }, 500);
  }
});

// Get user profile
app.get("/make-server-838179d5/profile/:id", async (c) => {
  try {
    const userId = c.req.param('id');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'No authorization token provided' }, 401);
    }

    const { authorized, user } = await authService.checkAuthorization(accessToken);

    if (!authorized || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Users can only view their own profile unless they're admin
    const profile = await authService.getUserProfile(userId);
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }

    const requestingUserProfile = await authService.getUserProfile(user.id);
    if (user.id !== userId && requestingUserProfile?.role !== 'cra_admin') {
      return c.json({ error: 'Forbidden - can only view own profile' }, 403);
    }

    return c.json({ profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return c.json({ error: `Failed to fetch profile: ${error.message}` }, 500);
  }
});

// Update user profile
app.put("/make-server-838179d5/profile/:id", async (c) => {
  try {
    const userId = c.req.param('id');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'No authorization token provided' }, 401);
    }

    const { authorized, user } = await authService.checkAuthorization(accessToken);

    if (!authorized || !user || user.id !== userId) {
      return c.json({ error: 'Unauthorized - can only update own profile' }, 401);
    }

    const updates = await c.req.json();
    const updatedProfile = await authService.updateUserProfile(userId, updates);

    return c.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error('Error updating profile:', error);
    return c.json({ error: `Failed to update profile: ${error.message}` }, 500);
  }
});

// ============================================================
// APPLICATION ENDPOINTS
// ============================================================

// Create new application
app.post("/make-server-838179d5/applications", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'No authorization token provided' }, 401);
    }

    const { authorized, user, profile } = await authService.checkAuthorization(accessToken);

    if (!authorized || !user || !profile) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const applicationData = await c.req.json();

    const application = await applicationService.createApplication({
      ...applicationData,
      applicant_id: user.id,
      applicant_name: profile.full_name,
    });

    // Send notification
    if (application.status === 'submitted') {
      await notificationService.notifyApplicationStatusChange(
        user.id,
        application.id,
        'submitted'
      );
    }

    return c.json({ success: true, application });
  } catch (error) {
    console.error('Error creating application:', error);
    return c.json({ error: `Failed to create application: ${error.message}` }, 500);
  }
});

// Get single application
app.get("/make-server-838179d5/applications/:id", async (c) => {
  try {
    const applicationId = c.req.param('id');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'No authorization token provided' }, 401);
    }

    const { authorized, user, profile } = await authService.checkAuthorization(accessToken);

    if (!authorized || !user || !profile) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const application = await applicationService.getApplication(applicationId);

    if (!application) {
      return c.json({ error: 'Application not found' }, 404);
    }

    // Users can only view their own applications unless they're admin/reviewer
    const isAdmin = profile.role === 'cra_admin' || profile.role === 'cra_reviewer';
    if (application.applicant_id !== user.id && !isAdmin) {
      return c.json({ error: 'Forbidden - can only view own applications' }, 403);
    }

    return c.json({ application });
  } catch (error) {
    console.error('Error fetching application:', error);
    return c.json({ error: `Failed to fetch application: ${error.message}` }, 500);
  }
});

// Get user's applications
app.get("/make-server-838179d5/applications/user/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'No authorization token provided' }, 401);
    }

    const { authorized, user, profile } = await authService.checkAuthorization(accessToken);

    if (!authorized || !user || !profile) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Users can only view their own applications unless they're admin
    if (user.id !== userId && profile.role !== 'cra_admin') {
      return c.json({ error: 'Forbidden - can only view own applications' }, 403);
    }

    const applications = await applicationService.getUserApplications(userId);

    return c.json({ applications });
  } catch (error) {
    console.error('Error fetching user applications:', error);
    return c.json({ error: `Failed to fetch applications: ${error.message}` }, 500);
  }
});

// Update application
app.patch("/make-server-838179d5/applications/:id", async (c) => {
  try {
    const applicationId = c.req.param('id');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'No authorization token provided' }, 401);
    }

    const { authorized, user, profile } = await authService.checkAuthorization(accessToken);

    if (!authorized || !user || !profile) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const application = await applicationService.getApplication(applicationId);

    if (!application) {
      return c.json({ error: 'Application not found' }, 404);
    }

    // Users can only update their own draft applications
    if (application.applicant_id !== user.id) {
      return c.json({ error: 'Forbidden - can only update own applications' }, 403);
    }

    if (application.status !== 'draft' && application.status !== 'submitted') {
      return c.json({ error: 'Cannot update application in current status' }, 400);
    }

    const updates = await c.req.json();
    const updatedApplication = await applicationService.updateApplication(applicationId, updates);

    return c.json({ success: true, application: updatedApplication });
  } catch (error) {
    console.error('Error updating application:', error);
    return c.json({ error: `Failed to update application: ${error.message}` }, 500);
  }
});

// Update application status (Admin only)
app.patch("/make-server-838179d5/applications/:id/status", async (c) => {
  try {
    const applicationId = c.req.param('id');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'No authorization token provided' }, 401);
    }

    const { authorized, user, profile } = await authService.checkAuthorization(
      accessToken,
      ['cra_admin', 'cra_reviewer']
    );

    if (!authorized || !user || !profile) {
      return c.json({ error: 'Unauthorized - admin or reviewer access required' }, 403);
    }

    const { status, comments } = await c.req.json();

    if (!status) {
      return c.json({ error: 'Status is required' }, 400);
    }

    const updatedApplication = await applicationService.updateApplicationStatus(
      applicationId,
      status,
      user.id,
      comments
    );

    // Send notification to applicant
    await notificationService.notifyApplicationStatusChange(
      updatedApplication.applicant_id,
      applicationId,
      status,
      comments
    );

    return c.json({ success: true, application: updatedApplication });
  } catch (error) {
    console.error('Error updating application status:', error);
    return c.json({ error: `Failed to update application status: ${error.message}` }, 500);
  }
});

// ============================================================
// ADMIN ENDPOINTS
// ============================================================

// Get all applications (Admin only)
app.get("/make-server-838179d5/admin/applications", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'No authorization token provided' }, 401);
    }

    const { authorized, profile } = await authService.checkAuthorization(
      accessToken,
      ['cra_admin', 'cra_reviewer']
    );

    if (!authorized || !profile) {
      return c.json({ error: 'Unauthorized - admin access required' }, 403);
    }

    const applications = await applicationService.getAllApplications();

    // Apply filters if provided
    const status = c.req.query('status');
    const licenseType = c.req.query('license_type');

    let filteredApplications = applications;

    if (status) {
      filteredApplications = filteredApplications.filter(app => app.status === status);
    }

    if (licenseType) {
      filteredApplications = filteredApplications.filter(app => app.license_type === licenseType);
    }

    return c.json({ applications: filteredApplications });
  } catch (error) {
    console.error('Error fetching all applications:', error);
    return c.json({ error: `Failed to fetch applications: ${error.message}` }, 500);
  }
});

// Get analytics/reports (Admin only)
app.get("/make-server-838179d5/admin/reports", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'No authorization token provided' }, 401);
    }

    const { authorized, profile } = await authService.checkAuthorization(
      accessToken,
      ['cra_admin']
    );

    if (!authorized || !profile) {
      return c.json({ error: 'Unauthorized - admin access required' }, 403);
    }

    const applications = await applicationService.getAllApplications();

    // Calculate statistics
    const stats = {
      totalApplications: applications.length,
      byStatus: {
        draft: applications.filter(a => a.status === 'draft').length,
        submitted: applications.filter(a => a.status === 'submitted').length,
        under_review: applications.filter(a => a.status === 'under_review').length,
        approved: applications.filter(a => a.status === 'approved').length,
        rejected: applications.filter(a => a.status === 'rejected').length,
        pending_payment: applications.filter(a => a.status === 'pending_payment').length,
      },
      byLicenseType: {
        cultivation: applications.filter(a => a.license_type === 'cultivation').length,
        processing: applications.filter(a => a.license_type === 'processing').length,
        research: applications.filter(a => a.license_type === 'research').length,
        transportation: applications.filter(a => a.license_type === 'transportation').length,
        export: applications.filter(a => a.license_type === 'export').length,
        retail: applications.filter(a => a.license_type === 'retail').length,
      },
      totalRevenue: applications
        .filter(a => a.payment_status === 'completed')
        .reduce((sum, a) => sum + (a.payment_amount || 0), 0),
      activeLicenses: applications.filter(a => a.status === 'approved').length,
    };

    return c.json({ stats });
  } catch (error) {
    console.error('Error generating reports:', error);
    return c.json({ error: `Failed to generate reports: ${error.message}` }, 500);
  }
});

// Get all licensed producers (Admin only)
app.get("/make-server-838179d5/admin/licensees", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'No authorization token provided' }, 401);
    }

    const { authorized, profile } = await authService.checkAuthorization(
      accessToken,
      ['cra_admin', 'cra_reviewer']
    );

    if (!authorized || !profile) {
      return c.json({ error: 'Unauthorized - admin access required' }, 403);
    }

    const applications = await applicationService.getAllApplications();
    const approvedApplications = applications.filter(a => a.status === 'approved');

    return c.json({ licensees: approvedApplications });
  } catch (error) {
    console.error('Error fetching licensees:', error);
    return c.json({ error: `Failed to fetch licensees: ${error.message}` }, 500);
  }
});

// ============================================================
// PAYMENT ENDPOINTS
// ============================================================

// Create payment
app.post("/make-server-838179d5/payments", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'No authorization token provided' }, 401);
    }

    const { authorized, user } = await authService.checkAuthorization(accessToken);

    if (!authorized || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { application_id, amount_usd, payment_method } = await c.req.json();

    if (!application_id || !amount_usd || !payment_method) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const payment = await paymentService.createPayment({
      application_id,
      user_id: user.id,
      amount_usd,
      payment_method,
    });

    return c.json({ success: true, payment });
  } catch (error) {
    console.error('Error creating payment:', error);
    return c.json({ error: `Failed to create payment: ${error.message}` }, 500);
  }
});

// Process payment
app.post("/make-server-838179d5/payments/:id/process", async (c) => {
  try {
    const paymentId = c.req.param('id');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'No authorization token provided' }, 401);
    }

    const { authorized, user } = await authService.checkAuthorization(accessToken);

    if (!authorized || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const paymentDetails = await c.req.json();
    const payment = await paymentService.processPayment(paymentId, paymentDetails);

    // Update application payment status
    await applicationService.updateApplication(payment.application_id, {
      payment_status: 'completed',
      payment_amount: payment.amount_usd,
    });

    return c.json({ success: true, payment });
  } catch (error) {
    console.error('Error processing payment:', error);
    return c.json({ error: `Failed to process payment: ${error.message}` }, 500);
  }
});

// Get payment by application ID
app.get("/make-server-838179d5/payments/application/:applicationId", async (c) => {
  try {
    const applicationId = c.req.param('applicationId');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'No authorization token provided' }, 401);
    }

    const { authorized, user, profile } = await authService.checkAuthorization(accessToken);

    if (!authorized || !user || !profile) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const application = await applicationService.getApplication(applicationId);

    if (!application) {
      return c.json({ error: 'Application not found' }, 404);
    }

    // Check access rights
    const isAdmin = profile.role === 'cra_admin' || profile.role === 'cra_reviewer';
    if (application.applicant_id !== user.id && !isAdmin) {
      return c.json({ error: 'Forbidden' }, 403);
    }

    const payment = await paymentService.getPaymentByApplicationId(applicationId);

    return c.json({ payment });
  } catch (error) {
    console.error('Error fetching payment:', error);
    return c.json({ error: `Failed to fetch payment: ${error.message}` }, 500);
  }
});

// ============================================================
// DOCUMENT UPLOAD ENDPOINTS
// ============================================================

// Upload document
app.post("/make-server-838179d5/applications/:id/documents", async (c) => {
  try {
    const applicationId = c.req.param('id');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'No authorization token provided' }, 401);
    }

    const { authorized, user } = await authService.checkAuthorization(accessToken);

    if (!authorized || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const application = await applicationService.getApplication(applicationId);

    if (!application) {
      return c.json({ error: 'Application not found' }, 404);
    }

    if (application.applicant_id !== user.id) {
      return c.json({ error: 'Forbidden - can only upload to own applications' }, 403);
    }

    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const documentType = formData.get('document_type') as string;

    if (!file || !documentType) {
      return c.json({ error: 'File and document_type are required' }, 400);
    }

    const fileData = new Uint8Array(await file.arrayBuffer());
    const uploadResult = await storageService.uploadDocument(
      applicationId,
      file.name,
      fileData,
      file.type
    );

    const signedUrl = await storageService.getSignedUrl(uploadResult.fullPath, 86400); // 24 hours

    const document = await applicationService.addApplicationDocument(applicationId, {
      document_type: documentType as any,
      file_name: file.name,
      file_url: uploadResult.fullPath,
      file_size: `${(file.size / 1024).toFixed(2)} KB`,
    });

    return c.json({
      success: true,
      document: {
        ...document,
        signed_url: signedUrl,
      },
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    return c.json({ error: `Failed to upload document: ${error.message}` }, 500);
  }
});

// Get signed URL for document
app.get("/make-server-838179d5/documents/:applicationId/:fileName/url", async (c) => {
  try {
    const applicationId = c.req.param('applicationId');
    const fileName = c.req.param('fileName');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'No authorization token provided' }, 401);
    }

    const { authorized, user, profile } = await authService.checkAuthorization(accessToken);

    if (!authorized || !user || !profile) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const application = await applicationService.getApplication(applicationId);

    if (!application) {
      return c.json({ error: 'Application not found' }, 404);
    }

    // Check access rights
    const isAdmin = profile.role === 'cra_admin' || profile.role === 'cra_reviewer';
    if (application.applicant_id !== user.id && !isAdmin) {
      return c.json({ error: 'Forbidden' }, 403);
    }

    // Find the file path in application documents
    const doc = application.documents.find(d => d.file_url.includes(fileName));
    if (!doc) {
      return c.json({ error: 'Document not found' }, 404);
    }

    const signedUrl = await storageService.getSignedUrl(doc.file_url, 3600); // 1 hour

    return c.json({ signed_url: signedUrl });
  } catch (error) {
    console.error('Error getting document URL:', error);
    return c.json({ error: `Failed to get document URL: ${error.message}` }, 500);
  }
});

// ============================================================
// NOTIFICATION ENDPOINTS
// ============================================================

// Get user notifications
app.get("/make-server-838179d5/notifications", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'No authorization token provided' }, 401);
    }

    const { authorized, user } = await authService.checkAuthorization(accessToken);

    if (!authorized || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const notifications = await notificationService.getUserNotifications(user.id);
    const unreadCount = await notificationService.getUnreadNotificationCount(user.id);

    return c.json({ notifications, unreadCount });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return c.json({ error: `Failed to fetch notifications: ${error.message}` }, 500);
  }
});

// Mark notification as read
app.patch("/make-server-838179d5/notifications/:id/read", async (c) => {
  try {
    const notificationId = c.req.param('id');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'No authorization token provided' }, 401);
    }

    const { authorized, user } = await authService.checkAuthorization(accessToken);

    if (!authorized || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const notification = await notificationService.markNotificationAsRead(notificationId);

    return c.json({ success: true, notification });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return c.json({ error: `Failed to mark notification as read: ${error.message}` }, 500);
  }
});

// Mark all notifications as read
app.patch("/make-server-838179d5/notifications/read-all", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) {
      return c.json({ error: 'No authorization token provided' }, 401);
    }

    const { authorized, user } = await authService.checkAuthorization(accessToken);

    if (!authorized || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    await notificationService.markAllNotificationsAsRead(user.id);

    return c.json({ success: true });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return c.json({ error: `Failed to mark notifications as read: ${error.message}` }, 500);
  }
});

// ============================================================
// LICENSE TYPES INFO
// ============================================================

// Get license types and fees
app.get("/make-server-838179d5/license-types", (c) => {
  return c.json({ license_types: applicationService.LICENSE_TYPES });
});

Deno.serve(app.fetch);