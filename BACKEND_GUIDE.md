# DCLIS Backend Integration Guide

## Overview

The Digital Cannabis Licensing & Information System (DCLIS) now includes a complete backend powered by **Supabase**, providing:

- **Authentication**: JWT-based auth with role-based access control
- **Database**: Key-value store for users, applications, payments, and licenses
- **Storage**: Secure document uploads (national IDs, site plans, certificates)
- **Real-time notifications**: Status updates for applications
- **RESTful API**: Complete CRUD operations for all entities

---

## Backend Architecture

### Tech Stack
- **Deno Runtime** with Supabase Edge Functions
- **Hono** web framework for API routes
- **Supabase Auth** for user authentication
- **Supabase Storage** for file uploads
- **Key-Value Store** for data persistence

### User Roles
1. **farmer** - Individual cannabis farmer/applicant
2. **cooperative_rep** - Representative of a farming cooperative
3. **cra_reviewer** - CRA staff member who reviews applications
4. **cra_admin** - CRA administrator with full system access

---

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get access token
- `GET /profile/:id` - Get user profile
- `PUT /profile/:id` - Update user profile

### Applications
- `POST /applications` - Create new license application
- `GET /applications/:id` - Get single application
- `GET /applications/user/:userId` - Get user's applications
- `PATCH /applications/:id` - Update application (draft only)
- `PATCH /applications/:id/status` - Update status (admin only)

### Admin
- `GET /admin/applications` - Get all applications with filters
- `GET /admin/reports` - Get analytics and statistics
- `GET /admin/licensees` - Get all approved licenses

### Payments
- `POST /payments` - Create payment record
- `POST /payments/:id/process` - Process payment
- `GET /payments/application/:applicationId` - Get payment details

### Documents
- `POST /applications/:id/documents` - Upload document
- `GET /documents/:applicationId/:fileName/url` - Get signed URL

### Notifications
- `GET /notifications` - Get user notifications
- `PATCH /notifications/:id/read` - Mark as read
- `PATCH /notifications/read-all` - Mark all as read

### Public
- `GET /license-types` - Get license types and fees
- `GET /health` - Health check

---

## Getting Started

### 1. Register a New User

**Frontend**: Click "Register" button or visit `/register`

**Fields Required**:
- Full Name
- Email Address
- Password (min 6 characters)
- Phone Number (optional)
- National ID (optional)
- User Type (farmer, cooperative_rep, cra_reviewer, cra_admin)
- District & Region

**API Call**:
```typescript
const response = await authAPI.register({
  email: "john.banda@example.mw",
  password: "SecurePass123",
  full_name: "John Banda",
  phone: "+265 999 123 456",
  national_id: "MWI123456789",
  role: "farmer",
  district: "Lilongwe",
  region: "central"
});
```

### 2. Login

**Frontend**: Click "Login" button or visit `/login`

**API Call**:
```typescript
const response = await authAPI.login(
  "john.banda@example.mw",
  "SecurePass123"
);
// Returns access_token and user profile
```

### 3. Create License Application

**Frontend**: Navigate to `/applicant/new-application`

**Steps**:
1. Select License Type (Cultivation, Processing, Research, etc.)
2. Fill Business Information
3. Provide Land/Location Details
4. Upload Required Documents
5. Review and Submit

**API Call**:
```typescript
const application = await applicationAPI.create({
  license_type: "cultivation",
  category: "medicinal",
  business_name: "Green Farms Ltd",
  business_address: "Plot 123, Lilongwe",
  contact_person: "John Banda",
  email: "john@greenfarms.mw",
  phone: "+265 999 123 456",
  district: "Lilongwe",
  region: "central",
  land_size_hectares: 5,
  gps_coordinates: "-13.9833, 33.7833",
  intended_purpose: "Medical cannabis cultivation",
  status: "submitted"
});
```

### 4. Upload Documents

**Document Types**:
- `national_id` - National ID card/passport
- `site_plan` - Farm/facility site plan
- `land_title` - Land ownership documents
- `environmental_clearance` - Environmental permit
- `other` - Additional supporting documents

**API Call**:
```typescript
const document = await applicationAPI.uploadDocument(
  applicationId,
  fileObject,
  "national_id"
);
// Returns document with signed URL (valid 24 hours)
```

### 5. Make Payment

**Frontend**: Payment page appears after application review

**Payment Methods**:
- Mobile Money (TNM Mpamba, Airtel Money)
- Debit Card
- Bank Transfer

**API Call**:
```typescript
// Create payment
const payment = await paymentAPI.create({
  application_id: "app-123",
  amount_usd: 500,
  payment_method: "mobile_money"
});

// Process payment
await paymentAPI.process(payment.id, {
  transaction_reference: "TXN-12345",
  receipt_url: "https://..."
});
```

### 6. Admin Review (CRA Staff)

**Frontend**: Navigate to `/admin/dashboard` or `/admin/applications`

**Status Options**:
- `under_review` - Application is being reviewed
- `approved` - Application approved, license issued
- `rejected` - Application rejected with comments
- `pending_payment` - Waiting for payment

**API Call**:
```typescript
await applicationAPI.updateStatus(
  applicationId,
  "approved",
  "All requirements met. License approved."
);
// Automatically generates license number: CRA/03-2026/001
```

---

## License Types & Fees

| License Type | Application Fee | Annual Fee | Description |
|-------------|----------------|------------|-------------|
| Cultivation | $500 | $2,000 | Growing cannabis plants |
| Processing | $750 | $3,000 | Processing cannabis products |
| Research | $300 | $1,500 | Cannabis research activities |
| Transportation | $400 | $1,800 | Transporting cannabis |
| Export | $1,000 | $5,000 | Exporting cannabis products |
| Retail | $600 | $2,500 | Retail sale of cannabis |

---

## License Number Format

All approved licenses receive a unique identifier:
```
CRA/MM-YYYY/###
```

Example: `CRA/03-2026/001`
- CRA = Cannabis Regulatory Authority
- 03 = Month (March)
- 2026 = Year
- 001 = Sequential number

---

## Notifications System

Users receive real-time notifications for:
- Application submission confirmation
- Application status changes
- Payment confirmations
- License approval/rejection
- Expiration warnings

**Frontend**: Bell icon in header shows unread count

**API Call**:
```typescript
const { notifications, unreadCount } = await notificationAPI.getAll();
```

---

## Data Storage

All data is stored in Supabase using a key-value pattern:

### Keys Structure:
- `user:{userId}` - User profile
- `user:{userId}:applications` - User's application IDs
- `user:{userId}:payments` - User's payment IDs
- `user:{userId}:notifications` - User's notification IDs
- `application:{applicationId}` - Application data
- `payment:{paymentId}` - Payment data
- `notification:{notificationId}` - Notification data
- `applications:all` - Global list of all application IDs
- `license:sequence` - License number counter

---

## Security Features

### Authentication
- JWT tokens for all authenticated requests
- Tokens stored in localStorage
- Auto-logout on token expiration

### Authorization
- Role-based access control (RBAC)
- Users can only access their own data
- Admins have read access to all applications
- Reviewers can update application status

### Document Storage
- Private Supabase storage bucket
- Signed URLs expire after 1-24 hours
- File size limit: 10MB per document
- Only application owner and admins can access

### Password Security
- Minimum 6 characters required
- Passwords hashed by Supabase Auth
- Email confirmation (auto-confirmed in demo)

---

## Testing the System

### Test Scenario 1: Farmer Application
1. Register as farmer: `farmer@test.mw` / `password123`
2. Login to applicant portal
3. Create cultivation license application
4. Upload national ID and land title
5. Submit application
6. View application status

### Test Scenario 2: Admin Review
1. Register as admin: `admin@cra.gov.mw` / `admin123` (role: cra_admin)
2. Login to admin portal
3. View all pending applications
4. Review application details and documents
5. Approve or reject with comments
6. View analytics dashboard

### Test Scenario 3: Full Workflow
1. Farmer submits application → Status: "submitted"
2. Admin moves to review → Status: "under_review"
3. Admin requests payment → Status: "pending_payment"
4. Farmer makes payment → Payment: "completed"
5. Admin approves → Status: "approved"
6. License number generated: `CRA/03-2026/001`
7. Farmer receives notification

---

## API Client Usage (Frontend)

The frontend includes a complete API client in `/src/app/utils/api.ts`:

```typescript
import { authAPI, applicationAPI, adminAPI, paymentAPI } from './utils/api';

// Authentication
await authAPI.login(email, password);
await authAPI.register(userData);
await authAPI.logout();

// Applications
await applicationAPI.create(data);
await applicationAPI.getUserApplications(userId);
await applicationAPI.updateStatus(id, status, comments);

// Admin
await adminAPI.getAllApplications({ status: 'submitted' });
await adminAPI.getReports();

// Payments
await paymentAPI.create({ application_id, amount_usd, payment_method });
```

---

## Environment Variables

The server automatically accesses these from Supabase:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Public anon key (frontend)
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (backend only)

**Note**: Service role key must NEVER be exposed to the frontend.

---

## Troubleshooting

### Login Issues
- Check email/password combination
- Verify user was registered successfully
- Check browser console for error messages

### Document Upload Fails
- File size must be under 10MB
- Check internet connection
- Ensure you're logged in
- Verify application is in "draft" or "submitted" status

### Application Not Appearing
- Check if you're logged in as the correct user
- Admins: Try filtering by status
- Check browser console for API errors

### 401 Unauthorized Errors
- Token may have expired - try logging in again
- Check if you have permission for the action
- Verify you're accessing your own resources

---

## Production Deployment Notes

### Database Migration
The current system uses a key-value store. For production:
1. Consider migrating to proper Postgres tables
2. Implement database migrations
3. Add indexes for performance
4. Set up automated backups

### Email Notifications
Currently email_confirm is auto-enabled. For production:
1. Configure SMTP in Supabase dashboard
2. Set up email templates
3. Remove `email_confirm: true` from registration

### Payment Integration
Demo uses simulated payments. For production:
1. Integrate with TNM Mpamba API
2. Connect Airtel Money
3. Set up Stripe for card payments
4. Implement webhook handlers

### Security Hardening
1. Add rate limiting on auth endpoints
2. Implement CAPTCHA on registration
3. Enable 2FA for admin accounts
4. Set up audit logging
5. Regular security audits

---

## Support

For issues or questions:
- Email: dev@cra.gov.mw
- Documentation: https://dclis.cra.gov.mw/docs
- Issue Tracker: (Add your repository URL)

---

**Last Updated**: March 31, 2026  
**Version**: 1.0.0  
**License**: Government of Malawi - Cannabis Regulatory Authority
