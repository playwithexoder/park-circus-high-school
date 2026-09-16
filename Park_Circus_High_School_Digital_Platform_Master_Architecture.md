# PARK CIRCUS HIGH SCHOOL

# Digital School Platform Master Specification

**Version:** 1.0\
**Status:** Master architecture baseline\
**Purpose:** This document is the controlling specification for any AI,
developer, designer, QA engineer or DevOps agent working on the school
platform.

------------------------------------------------------------------------

## 0. NON-NEGOTIABLE AI RULES

This is a real school project, not a fictional demo.

### Never invent information

Never invent or assume:

-   school history
-   achievements
-   awards
-   rankings
-   affiliations
-   fees
-   admission rules
-   student numbers
-   staff names
-   teacher profiles
-   facilities
-   examination results
-   opening hours
-   official email addresses
-   official social accounts
-   government relationships
-   policies
-   certificates
-   statistics
-   notices
-   events

If information is unknown, keep it unknown.

Use:

> Information pending verification.

or keep the field unpublished.

### Never create fake operational data

Never seed production with fictional:

-   students
-   teachers
-   parents
-   marks
-   attendance
-   notices
-   admissions
-   certificates
-   documents

Development/demo data must be clearly synthetic.

### Never silently change production

Do not modify without explicit authorization:

-   production database
-   schema
-   RLS
-   authentication
-   roles
-   storage
-   DNS
-   domains
-   deployments
-   production data
-   existing integrations

Before destructive or high-impact work, stop and request approval.

### Never treat the frontend as security

Hiding a button is not authorization.

Every sensitive operation must be protected server-side and, where
appropriate, at the database/storage layer.

### Never claim compliance without evidence

Do not claim:

-   GIGW certified
-   STQC certified
-   government approved
-   secure
-   fully compliant

unless the corresponding evidence/audit/certification exists.

### Human approval

Official school information must remain under authorized human control.
AI may assist with drafts, formatting, summaries or translations, but
must not publish official information without the approved workflow.

------------------------------------------------------------------------

# 1. VERIFIED SCHOOL INFORMATION REGISTER

All official facts, identifiers, and contact details must be sourced from the **Verified School Information Register** (`Verified_School_Information_Register.md`).

This register acts as the single source of truth and classifies information based on its verification status:
1. Government verified
2. School verified
3. Historical
4. Pending verification
5. Do not publish

**CRITICAL RULE:** Do not publish any information classified as "Pending verification" (such as legacy physical signboard data) or "Do not publish". 

Only data that is explicitly "Government verified" (e.g., from Banglar Shiksha, WBCHSE, WBBSE, Ministry of Education) or "School verified" by authorized leadership may be exposed on the public platform.

------------------------------------------------------------------------

# 2. PRODUCT VISION

Build a complete **Digital School Operating Platform**, not merely a
brochure website.

The platform should contain:

1.  Public school website
2.  Content management
3.  Notice management
4.  Event/calendar management
5.  Download/document center
6.  Admissions
7.  Digital forms
8.  Form builder
9.  Workflow/approval engine
10. Student portal
11. Guardian/parent portal
12. Teacher portal
13. Office/admin portal
14. Management portal
15. Attendance
16. Academics
17. Assignments
18. Examinations
19. Results
20. Certificates
21. Document management
22. Notifications
23. Requests/service desk
24. Reporting
25. Audit
26. Search
27. Accessibility
28. Mobile/PWA support
29. Secure storage
30. Future multi-school capability

The platform should provide sophisticated capabilities at a cost
appropriate for a school.

------------------------------------------------------------------------

# 3. CORE ARCHITECTURE DECISION

## Use a Modular Monolith

Do not begin with microservices.

Initial architecture:

``` text
One application
One primary PostgreSQL database
Object storage
Background jobs
Strict internal modules
Central authorization
Central audit
Central notifications
Central observability
```

The code must still have strong module boundaries so that a future
high-scale component can be extracted if necessary.

### Why

Avoid premature:

-   Kubernetes
-   Kafka
-   Elasticsearch/OpenSearch
-   Redis
-   service mesh
-   dozens of microservices
-   separate authentication infrastructure

Introduce them only when real measured requirements justify them.

------------------------------------------------------------------------

# 4. HIGH-LEVEL ARCHITECTURE

``` text
Internet
   |
TLS / CDN / WAF
   |
Next.js Application
   |
+-- Public Website
+-- Student Portal
+-- Guardian Portal
+-- Teacher Portal
+-- Office Portal
+-- Management Portal
   |
Authentication
   |
Authorization
   |
Application Services
   |
+---------------- Platform Kernel ----------------+
| Identity | Permissions | Audit | Jobs | Events |
| Files | Notifications | Validation | Settings |
| Search | Localization | Observability | Errors |
+--------------------------------------------------+
   |
Domain Modules
   |
+-- Students
+-- Guardians
+-- Staff
+-- Academics
+-- Attendance
+-- Exams
+-- Admissions
+-- Forms
+-- Workflows
+-- Notices
+-- Documents
+-- Certificates
+-- Events
+-- Communication
+-- Reports
   |
Domain Events / Outbox
   |
Background Workers
   |
PostgreSQL + Object Storage
```

------------------------------------------------------------------------

# 5. ARCHITECTURAL LAYERS

## Layer 0: Infrastructure

-   hosting
-   TLS
-   DNS
-   CDN
-   WAF
-   PostgreSQL
-   object storage
-   deployment
-   monitoring

## Layer 1: Platform Kernel

-   identity
-   authorization
-   school/tenant context
-   audit
-   validation
-   events
-   jobs
-   notifications
-   files
-   settings
-   feature flags
-   localization
-   observability
-   error handling

## Layer 2: Domain Modules

Each module owns its business rules and data access.

## Layer 3: Application Workflows

Examples:

-   admission approval
-   certificate approval
-   notice publication
-   result publication
-   document verification

## Layer 4: API / Server Actions

All business authorization and validation occurs here.

## Layer 5: UI

Role-specific portals and public website.

------------------------------------------------------------------------

# 6. TECHNOLOGY BASELINE

Recommended:

### Frontend

-   Next.js
-   TypeScript
-   App Router
-   Tailwind CSS or equivalent tokenized styling
-   accessible component system

### Database

-   PostgreSQL

### Backend

-   Next.js server-side application layer
-   server actions and route handlers where appropriate
-   domain/application services

### Auth

-   managed authentication
-   secure sessions
-   MFA for privileged users where practical

### Storage

-   object storage
-   private storage for sensitive documents
-   signed URLs for controlled downloads

### Jobs

-   managed queue/background job mechanism
-   retries
-   dead-letter handling
-   idempotency

### CI/CD

-   Git
-   GitHub Actions or equivalent
-   preview environments
-   staging
-   production approval

### Observability

-   structured logs
-   error monitoring
-   metrics
-   trace-ready architecture
-   audit logs

------------------------------------------------------------------------

# 7. NEXT.JS RULES

If Next.js is used:

-   use Server Components where appropriate
-   minimize unnecessary Client Components
-   keep secrets server-side
-   authorize Server Actions
-   use Route Handlers appropriately
-   optimize images
-   use metadata APIs
-   generate sitemap/robots for public pages
-   use production builds for performance testing
-   measure Core Web Vitals
-   avoid unnecessary client JavaScript

The current official Next.js production guidance covers rendering, data
fetching/caching, accessibility, security, metadata/SEO, TypeScript,
production builds and Core Web Vitals.

------------------------------------------------------------------------

# 8. SUPABASE/POSTGRESQL RULES

If Supabase is used:

-   PostgreSQL is the system of record
-   use migrations
-   protect exposed data with RLS
-   test RLS
-   keep service-role credentials server-only
-   use private storage for sensitive documents
-   do not rely on frontend filtering
-   do not use Auth alone as database authorization

Current Supabase documentation describes RLS as database-level granular
authorization and recommends enabling RLS for exposed tables that
require protection.

------------------------------------------------------------------------

# 9. SCHOOL/TENANT ARCHITECTURE

Even if the initial deployment contains one school, make the system
tenant-aware.

Core concept:

``` text
school
  |
  +-- users
  +-- students
  +-- guardians
  +-- staff
  +-- academics
  +-- forms
  +-- workflows
  +-- notices
```

Sensitive domain records should carry `school_id` where appropriate.

Never trust a `school_id` supplied by the browser.

Derive authorization from the authenticated user and server-side
membership.

------------------------------------------------------------------------

# 10. PLATFORM KERNEL

Recommended structure:

``` text
platform/
  identity/
  authorization/
  school-context/
  audit/
  events/
  jobs/
  notifications/
  files/
  validation/
  search/
  settings/
  feature-flags/
  localization/
  observability/
  errors/
```

Do not duplicate authentication, permissions, notifications or audit
logic in every module.

------------------------------------------------------------------------

# 11. IDENTITY

One authenticated identity can have relationships such as:

``` text
User
 |
 +-- Staff Profile
 +-- Teacher Profile
 +-- Student Profile
 +-- Guardian Profile
```

Only create relationships that actually exist.

Potential roles:

``` text
SUPER_ADMIN
SCHOOL_ADMIN
HEAD
OFFICE_STAFF
TEACHER
STUDENT
GUARDIAN
LIBRARIAN
ACCOUNTING_STAFF
```

Actual school roles must be confirmed.

------------------------------------------------------------------------

# 12. AUTHORIZATION MODEL

Use:

``` text
RBAC
+
Relationship-based authorization
+
Server-side authorization
+
PostgreSQL RLS
+
Storage authorization
```

### Example

A teacher may access students assigned to their classes, not every
student.

A guardian may access linked children, not arbitrary students.

A student may access their own permitted records.

------------------------------------------------------------------------

# 13. PERMISSIONS

Use explicit permissions such as:

``` text
students.view
students.create
students.update
students.archive

attendance.view
attendance.mark
attendance.correct
attendance.approve

marks.view
marks.enter
marks.edit
marks.submit
marks.approve
marks.publish

notices.create
notices.edit
notices.review
notices.publish
notices.archive

forms.create
forms.publish
forms.review
forms.approve

documents.view
documents.upload
documents.verify
documents.download

users.manage
roles.manage
settings.manage
```

Do not scatter permission logic through hundreds of UI components.

Use a centralized authorization service.

------------------------------------------------------------------------

# 14. DATABASE DOMAIN MODEL

Potential schema groups:

``` text
identity
  users
  user_roles
  roles
  permissions
  role_permissions

school
  schools
  academic_years
  campuses
  settings

people
  students
  guardians
  student_guardians
  staff
  staff_assignments

academics
  classes
  sections
  subjects
  enrollments
  class_subjects
  timetable

attendance
  attendance_sessions
  attendance_records
  attendance_corrections

examinations
  exams
  exam_subjects
  marks
  grade_rules
  report_cards

admissions
  applications
  application_documents
  admission_decisions

forms
  forms
  form_versions
  form_fields
  form_rules
  form_submissions
  form_answers

workflows
  workflow_definitions
  workflow_versions
  workflow_instances
  workflow_tasks
  workflow_actions

content
  pages
  notices
  notice_versions
  events
  media_assets
  downloads

documents
  documents
  document_versions
  certificates
  certificate_requests

communication
  notifications
  notification_templates
  notification_deliveries

audit
  audit_events

jobs
  jobs
  job_attempts
  outbox_events
```

Do not create every table automatically. Build only what requirements
justify.

------------------------------------------------------------------------

# 15. DATABASE RULES

Use:

-   foreign keys
-   unique constraints
-   check constraints
-   not-null constraints where appropriate
-   indexes based on real queries
-   transactions
-   timestamps
-   controlled status values

Do not use a giant generic table such as:

``` text
school_data
misc_data
everything
```

Do not store critical relational data entirely in JSON.

------------------------------------------------------------------------

# 16. DATABASE ACCESS

Use:

``` text
UI
 |
Application Action/Service
 |
Authorization
 |
Domain Logic
 |
Repository/Data Access
 |
PostgreSQL
```

Avoid raw database queries scattered throughout UI components.

------------------------------------------------------------------------

# 17. DATA INTEGRITY

The database should enforce facts that must always be true.

Examples:

-   admission number uniqueness
-   certificate number uniqueness
-   valid foreign keys
-   valid state combinations
-   valid relationships

Do not rely solely on frontend validation.

------------------------------------------------------------------------

# 18. CONTENT GOVERNANCE

Every public official content record should support:

``` text
DRAFT
PENDING_REVIEW
VERIFIED
PUBLISHED
EXPIRED
ARCHIVED
REJECTED
```

Potential metadata:

``` text
created_by
verified_by
verified_at
approved_by
approved_at
published_at
expires_at
review_due_at
```

Only approved/published content may appear publicly.

------------------------------------------------------------------------

# 19. NO FALSE PUBLIC CONTENT

The public website must never contain invented:

-   history
-   achievements
-   staff
-   fees
-   results
-   facilities
-   rankings
-   statistics
-   policies
-   affiliations

Unknown information remains unpublished.

------------------------------------------------------------------------

# 20. PUBLIC WEBSITE

Potential structure:

``` text
Home
About
School Information
Academics
Admissions
Notices
Events
Downloads
Gallery
Contact
Policies
Accessibility
Privacy
Website Information
```

Actual navigation should be approved by the school.

------------------------------------------------------------------------

# 21. PUBLIC HOMEPAGE

Prioritize:

1.  school identity
2.  important notices
3.  current actions
4.  upcoming events
5.  verified school information
6.  useful downloads
7.  contact/location
8.  accessibility

Avoid fake counters and marketing claims.

------------------------------------------------------------------------

# 22. NOTICE SYSTEM

Features:

-   create draft
-   edit
-   review
-   approve
-   publish now
-   schedule
-   expire
-   archive
-   version history
-   attachments
-   categories
-   search
-   audit

Potential categories are configurable.

------------------------------------------------------------------------

# 23. NOTICE WORKFLOW

``` text
Draft
 |
Submit for review
 |
Review
 +--> Reject
 |
Approve
 |
Publish now / Schedule
 |
Public
 |
Expire / Archive
```

The actual approval hierarchy must come from the school.

------------------------------------------------------------------------

# 24. EVENT SYSTEM

Potential fields:

``` text
title
description
date
time
location
category
visibility
organizer
attachments
status
```

Do not publish an event without appropriate authorization.

------------------------------------------------------------------------

# 25. DOWNLOAD CENTER

Potential categories:

-   admissions
-   academic
-   examination
-   forms
-   policies
-   notices
-   circulars

Every published file should have:

-   title
-   description
-   date
-   version
-   file type
-   file size
-   visibility

------------------------------------------------------------------------

# 26. MEDIA MANAGEMENT

Media records should support:

-   title
-   description
-   alt text
-   category
-   visibility
-   uploader
-   upload date

Student images must follow school authorization and privacy policy.

------------------------------------------------------------------------

# 27. FORM ENGINE

Forms must be reusable and versioned.

Core entities:

``` text
forms
form_versions
form_fields
form_rules
form_submissions
form_answers
form_submission_documents
```

------------------------------------------------------------------------

# 28. FORM FIELD TYPES

Potential:

-   text
-   textarea
-   number
-   email
-   phone
-   date
-   time
-   select
-   multi-select
-   radio
-   checkbox
-   file
-   image
-   signature
-   repeatable group
-   student selector
-   guardian selector
-   class selector

Only implement what the school actually needs.

------------------------------------------------------------------------

# 29. FORM VERSIONING

Published versions become immutable.

Example:

``` text
Admission Form
  |
  +-- V1
  +-- V2
```

Existing submissions retain their original form version.

------------------------------------------------------------------------

# 30. FORM STATES

Potential:

``` text
DRAFT
SUBMITTED
UNDER_REVIEW
ACTION_REQUIRED
APPROVED
REJECTED
COMPLETED
WITHDRAWN
```

Actual states are configurable by workflow.

------------------------------------------------------------------------

# 31. LONG FORM UX

Support:

-   autosave
-   draft
-   resume later
-   progress
-   validation summary
-   document uploads
-   final review
-   receipt/reference number

Do not save every keystroke to the server. Use sensible debouncing/local
draft storage.

------------------------------------------------------------------------

# 32. IDEMPOTENT FORM SUBMISSION

Double-clicking submit or retrying after a timeout must not create
duplicate official submissions.

Use an idempotency key/request identifier.

------------------------------------------------------------------------

# 33. WORKFLOW ENGINE

Create reusable workflow infrastructure:

``` text
workflow_definitions
workflow_versions
workflow_instances
workflow_tasks
workflow_actions
```

A workflow should define:

-   states
-   transitions
-   permitted actors
-   validation
-   approval
-   rejection
-   notifications
-   audit
-   retry behavior

------------------------------------------------------------------------

# 34. STATE MACHINE

Do not allow arbitrary status updates.

Bad:

``` text
PATCH status=approved
```

Better:

``` text
POST /resource/:id/approve
```

The server verifies whether approval is legal from the current state.

------------------------------------------------------------------------

# 35. REQUEST CENTER

Provide a unified request system for services such as:

-   certificate request
-   document request
-   correction request
-   appointment request
-   other school-approved services

Each request gets:

``` text
request_number
status
submitted_at
current_stage
assigned_to
last_updated_at
```

------------------------------------------------------------------------

# 36. REQUEST TIMELINE

Display an appropriate timeline:

``` text
Submitted
 |
Under Review
 |
Action Required
 |
Approved
 |
Completed
```

Do not expose internal notes to unauthorized users.

------------------------------------------------------------------------

# 37. STUDENT MODULE

Potential:

-   profile
-   admission
-   enrollment
-   guardian relationships
-   attendance
-   timetable
-   assignments
-   examinations
-   results
-   documents
-   requests
-   notices
-   notifications

Access must be tightly scoped.

------------------------------------------------------------------------

# 38. GUARDIAN PORTAL

Potential:

-   linked children
-   attendance
-   notices
-   results
-   forms
-   requests
-   documents
-   appointments
-   notifications

A guardian can have multiple linked children if the school permits it.

------------------------------------------------------------------------

# 39. TEACHER PORTAL

Potential:

-   assigned classes
-   timetable
-   attendance
-   assignments
-   marks
-   notices
-   student information required for teaching
-   requests
-   workflow tasks
-   notifications

Teachers do not automatically get unrestricted student access.

------------------------------------------------------------------------

# 40. OFFICE PORTAL

Potential:

-   admissions
-   students
-   forms
-   document verification
-   certificates
-   notices
-   requests
-   reports
-   workflows
-   authorized bulk operations

------------------------------------------------------------------------

# 41. MANAGEMENT PORTAL

Potential:

-   approvals
-   dashboards
-   pending work
-   admissions
-   attendance overview
-   academic overview
-   staff overview
-   reports
-   audit
-   settings within assigned permissions

Prioritize actionable information over decorative charts.

------------------------------------------------------------------------

# 42. ATTENDANCE

Potential model:

``` text
attendance_session
  |
  +-- class
  +-- section
  +-- date
  +-- period
  +-- marked_by
       |
       +-- attendance_records
```

Potential statuses:

``` text
PRESENT
ABSENT
LATE
EXCUSED
```

Only use statuses approved by the school.

------------------------------------------------------------------------

# 43. ATTENDANCE CORRECTIONS

Do not silently rewrite historical attendance.

Use:

``` text
correction request
reason
authorization
audit
```

Actual approval rules come from school policy.

------------------------------------------------------------------------

# 44. ACADEMICS

Potential:

-   academic years
-   classes
-   sections
-   subjects
-   enrollments
-   timetable
-   assignments

Never hardcode one academic year.

------------------------------------------------------------------------

# 45. EXAMINATIONS

Potential:

``` text
exam
exam_subject
marks
grade_rules
report_card
```

Marks lifecycle:

``` text
ENTERED
SUBMITTED
VERIFIED
APPROVED
PUBLISHED
```

Actual states may vary.

------------------------------------------------------------------------

# 46. MARKS SECURITY

Marks are sensitive.

Require:

-   role authorization
-   scope authorization
-   audit
-   history
-   controlled editing
-   submission
-   approval
-   publication separation

------------------------------------------------------------------------

# 47. ADMISSIONS

Potential:

``` text
DRAFT
SUBMITTED
DOCUMENT_REVIEW
ELIGIBILITY_REVIEW
DECISION
APPROVED
REJECTED
ENROLLED
```

Do not invent admission criteria.

------------------------------------------------------------------------

# 48. ADMISSION DOCUMENTS

Use:

-   private storage
-   file validation
-   size limits
-   safe filenames/object paths
-   malware scanning where feasible
-   review status
-   audit

Never trust the file extension alone.

------------------------------------------------------------------------

# 49. BULK IMPORT

Safe workflow:

``` text
Upload
 |
Parse
 |
Validate
 |
Preview
 |
Fix errors
 |
Confirm
 |
Background import
 |
Result report
```

Example output:

``` text
500 rows
482 valid
12 duplicates
6 invalid
```

Never directly insert spreadsheet rows into production.

------------------------------------------------------------------------

# 50. EXPORTS

Exports require authorization and should be audited.

Large exports should be generated asynchronously.

Private exports should expire.

------------------------------------------------------------------------

# 51. DOCUMENT MANAGEMENT

Support:

-   metadata
-   upload
-   versioning
-   verification
-   access control
-   download
-   archive
-   expiry
-   audit

------------------------------------------------------------------------

# 52. PRIVATE STORAGE

Sensitive documents must not live in public buckets.

Examples:

-   student documents
-   admission documents
-   staff documents
-   private certificates
-   internal administration files

Use private storage plus authorized signed access.

------------------------------------------------------------------------

# 53. CERTIFICATE SYSTEM

Potential:

``` text
Request
 |
Eligibility verification
 |
Approval
 |
PDF generation
 |
Secure storage
 |
Verification code
 |
QR verification
 |
Notification
```

The public verification endpoint must reveal only minimum approved
information.

------------------------------------------------------------------------

# 54. FILE HASH

For important generated files, consider storing a checksum such as
SHA-256.

This can support integrity verification.

------------------------------------------------------------------------

# 55. NOTIFICATION SYSTEM

Central service:

``` text
Domain Event
 |
Notification Service
 +-- In-app
 +-- Email
 +-- SMS (if later approved)
 +-- Push (if later approved)
```

Do not call external providers directly from every module.

------------------------------------------------------------------------

# 56. NOTIFICATION STATES

``` text
PENDING
PROCESSING
SENT
FAILED
RETRYING
CANCELLED
```

Use idempotency to avoid duplicate delivery.

------------------------------------------------------------------------

# 57. NOTIFICATION TEMPLATES

Support:

-   version
-   language
-   subject
-   body
-   variables

Example:

``` text
{{student_name}}
{{request_number}}
{{notice_title}}
```

Sanitize rich content.

------------------------------------------------------------------------

# 58. BACKGROUND JOBS

Use background jobs for:

-   PDF generation
-   reports
-   bulk import
-   email
-   notifications
-   image processing
-   document processing
-   indexing
-   large exports

Do not make a normal browser request wait for a multi-minute operation.

------------------------------------------------------------------------

# 59. JOB STATES

``` text
PENDING
PROCESSING
COMPLETED
FAILED
RETRYING
CANCELLED
DEAD_LETTER
```

Store:

``` text
attempt_count
last_error
started_at
completed_at
```

------------------------------------------------------------------------

# 60. RETRIES

Retry transient failures.

Do not retry invalid input indefinitely.

Use exponential backoff.

------------------------------------------------------------------------

# 61. DEAD LETTER QUEUE

Repeated failures must become visible.

Admin should be able to:

-   inspect
-   retry
-   cancel
-   resolve

------------------------------------------------------------------------

# 62. TRANSACTIONAL OUTBOX

For important domain events:

``` text
Database transaction
 |
 +-- domain change
 +-- outbox event
```

Then a worker processes the event.

This avoids:

``` text
database succeeded
event lost
```

------------------------------------------------------------------------

# 63. IDEMPOTENCY

Use idempotency for:

-   submissions
-   approvals
-   certificate generation
-   bulk imports
-   notifications
-   webhooks
-   scheduled publishing

------------------------------------------------------------------------

# 64. CONCURRENCY

Use optimistic locking where multiple users can edit the same record.

Example:

``` text
version = 7
```

If another user already saved version 8, reject the stale update and
require reload.

Never silently overwrite.

------------------------------------------------------------------------

# 65. EVENTS

Potential domain events:

``` text
StudentCreated
AdmissionSubmitted
AdmissionApproved
AttendanceMarked
AttendanceCorrected
MarksSubmitted
ResultPublished
NoticeApproved
NoticePublished
FormSubmitted
WorkflowApproved
CertificateGenerated
```

Events should have stable/versioned schemas.

------------------------------------------------------------------------

# 66. EVENT CONSUMERS

Consumers must tolerate:

-   duplicate events
-   retries
-   delays
-   possible out-of-order delivery

Use idempotent processing.

------------------------------------------------------------------------

# 67. EVENT LOOP PROTECTION

Prevent:

``` text
A -> B -> A -> B
```

automation loops.

Automations need:

-   event guards
-   rate limits
-   maximum retries
-   kill switch where appropriate

------------------------------------------------------------------------

# 68. SEARCH

Start with PostgreSQL search.

All search results must respect authorization.

Do not add a dedicated search engine until actual scale requires it.

------------------------------------------------------------------------

# 69. REPORTING

Reports must respect user permissions.

Small reports may run synchronously.

Large reports:

``` text
request
 |
job
 |
generate
 |
store
 |
notify
```

------------------------------------------------------------------------

# 70. AUDIT

Audit important business actions:

``` text
student.created
student.updated
student.archived
attendance.marked
attendance.corrected
marks.entered
marks.approved
marks.published
notice.created
notice.approved
notice.published
document.uploaded
document.downloaded
certificate.generated
role.assigned
role.removed
```

Audit records must not be editable by normal users.

------------------------------------------------------------------------

# 71. APPLICATION LOGS

Use structured logs.

Never log:

-   passwords
-   OTPs
-   access tokens
-   private document contents
-   unnecessary sensitive personal data

------------------------------------------------------------------------

# 72. REQUEST ID

Every request should have a correlation ID.

Example:

``` text
req_01ABC...
```

Propagate it through:

-   logs
-   jobs
-   events
-   notifications
-   audit

------------------------------------------------------------------------

# 73. ERROR HANDLING

User:

``` text
We could not complete this request.
Please try again.

Reference: ERR-2026-00123
```

Logs:

``` text
full diagnostic context
```

Never expose stack traces or database errors to users.

------------------------------------------------------------------------

# 74. NO SILENT FAILURES

Never swallow errors.

Every failure must be:

-   handled
-   recorded
-   surfaced appropriately
-   retried if transient
-   monitored

------------------------------------------------------------------------

# 75. DATABASE RLS

For protected tables:

-   enable RLS
-   define explicit policies
-   test SELECT
-   test INSERT
-   test UPDATE
-   test DELETE

Test both allow and deny cases.

------------------------------------------------------------------------

# 76. RLS TEST MATRIX

At minimum test:

``` text
Super Admin -> permitted scope
School Admin -> school scope
Head -> school scope
Teacher -> assigned scope
Student -> own scope
Guardian -> linked child scope
Anonymous -> public only
Other school -> denied
Unrelated student -> denied
```

------------------------------------------------------------------------

# 77. STORAGE AUTHORIZATION

Storage must independently enforce access.

Do not assume database RLS automatically protects object storage.

------------------------------------------------------------------------

# 78. SIGNED URL RULE

Private files should use short-lived controlled access.

A random filename or hidden URL is not authorization.

------------------------------------------------------------------------

# 79. PUBLIC/PRIVATE BOUNDARY

Public website must read from controlled published content.

It must not query raw private/admin tables and filter in the browser.

------------------------------------------------------------------------

# 80. PRIVATE DATA MINIMIZATION

Return only fields the role actually needs.

Example:

Teacher attendance screen may need:

``` text
student_id
display_name
attendance_status
```

It may not need:

``` text
guardian_phone
private_address
private_documents
```

------------------------------------------------------------------------

# 81. AUTHENTICATION SECURITY

Implement:

-   secure sessions
-   password security through managed auth
-   rate limiting
-   recovery protection
-   session revocation
-   MFA for privileged accounts where practical

------------------------------------------------------------------------

# 82. ACCOUNT RECOVERY

Do not reveal whether an account exists unnecessarily.

Reset tokens must be:

-   unguessable
-   short-lived
-   single-use

------------------------------------------------------------------------

# 83. PRIVILEGED ACCOUNTS

Protect:

-   Super Admin
-   School Admin
-   Head
-   other privileged staff

Use stronger authentication and audit.

------------------------------------------------------------------------

# 84. ROLE ESCALATION

Users cannot:

-   change their own role
-   grant themselves admin
-   grant themselves another school
-   bypass approval

Role assignment must be separately authorized.

------------------------------------------------------------------------

# 85. SEPARATION OF DUTIES

Where required by school policy:

``` text
submitter != approver
```

This can apply to:

-   admissions
-   marks
-   certificates
-   notices
-   permission changes

Only implement where actual policy requires it.

------------------------------------------------------------------------

# 86. STAFF OFFBOARDING

Deactivation should:

``` text
disable account
revoke sessions
remove active assignments
preserve historical records
audit
```

Do not delete historical identity records unnecessarily.

------------------------------------------------------------------------

# 87. STUDENT LIFECYCLE

Potential:

``` text
ACTIVE
TRANSFERRED
GRADUATED
WITHDRAWN
INACTIVE
```

Actual statuses must be approved by the school.

------------------------------------------------------------------------

# 88. ACADEMIC YEAR TRANSITION

Never overwrite previous academic years.

Keep:

``` text
current
previous
future
```

where required.

------------------------------------------------------------------------

# 89. PROMOTION

If required:

``` text
previous enrollment
 |
promotion
 |
new enrollment
```

Historical attendance/results remain linked to the correct academic
year.

------------------------------------------------------------------------

# 90. BULK PROMOTION

Use:

``` text
preview
validate
conflict report
approve
background job
result report
audit
```

------------------------------------------------------------------------

# 91. LOCALIZATION

Architecture should support:

-   English
-   Bengali
-   Urdu

Actual language publication should be school-approved.

Do not machine-translate official notices and publish automatically.

------------------------------------------------------------------------

# 92. RTL

Urdu requires real RTL support.

Test:

-   navigation
-   forms
-   tables
-   cards
-   icons
-   calendars
-   mixed English/Urdu
-   numbers

------------------------------------------------------------------------

# 93. DATE/TIME

Use server/database time for official operations.

Configure the school's canonical timezone.

Scheduled content must use timezone-aware timestamps.

------------------------------------------------------------------------

# 94. ACCESSIBILITY

Target WCAG 2.1 AA.

Requirements:

-   semantic HTML
-   keyboard access
-   focus indicators
-   accessible names
-   contrast
-   alt text
-   heading hierarchy
-   form error association
-   screen-reader support
-   skip links
-   reduced motion
-   accessible tables
-   RTL support

GIGW 3.0 explicitly includes WCAG 2.1 Level AA accessibility
requirements.

------------------------------------------------------------------------

# 95. GIGW 3.0

Use current official GIGW 3.0 as a reference for:

-   quality
-   accessibility
-   cybersecurity
-   lifecycle management
-   risk mitigation
-   content governance

The official GIGW portal is the authoritative source for current
requirements.

Do not claim certification without an actual certification process.

------------------------------------------------------------------------

# 96. SECURITY BASELINE

Use:

-   OWASP ASVS
-   OWASP Top 10
-   GIGW 3.0
-   relevant CERT-In guidance
-   least privilege
-   defense in depth

------------------------------------------------------------------------

# 97. SECURITY HEADERS

Configure where appropriate:

-   CSP
-   HSTS
-   X-Content-Type-Options
-   Referrer-Policy
-   Permissions-Policy
-   frame protections

Test them against the actual application.

------------------------------------------------------------------------

# 98. INPUT SECURITY

Protect against:

-   SQL injection
-   XSS
-   CSRF where applicable
-   SSRF
-   path traversal
-   malicious file upload
-   object-level authorization bypass
-   mass assignment
-   unsafe redirects

------------------------------------------------------------------------

# 99. FILE SECURITY

Validate:

-   size
-   MIME
-   extension
-   content where feasible
-   filename

Never execute uploaded files.

Use generated object keys.

------------------------------------------------------------------------

# 100. RICH TEXT SECURITY

If notices use rich text:

-   sanitize HTML
-   allow only approved tags/attributes
-   block script execution
-   block unsafe URL schemes
-   sanitize embedded content

------------------------------------------------------------------------

# 101. SECRETS

Never put:

-   database passwords
-   service-role keys
-   API secrets
-   signing keys

in client-side code.

Never commit secrets to Git.

------------------------------------------------------------------------

# 102. DEPENDENCY SECURITY

Use:

-   lockfiles
-   vulnerability scanning
-   controlled updates
-   minimal dependencies
-   review before adding packages

Do not add packages for trivial functionality.

------------------------------------------------------------------------

# 103. SUPPLY CHAIN

Secure:

-   CI actions
-   dependencies
-   build artifacts
-   release process

Use pinned versions/SHAs where appropriate.

------------------------------------------------------------------------

# 104. ENVIRONMENTS

Use:

``` text
LOCAL
DEVELOPMENT
PREVIEW
STAGING
PRODUCTION
```

Do not experiment directly in production.

------------------------------------------------------------------------

# 105. MIGRATIONS

Every schema change is version-controlled.

Never edit applied migration history to rewrite production reality.

Use a new migration.

------------------------------------------------------------------------

# 106. PRODUCTION CHANGE MANAGEMENT

Preferred:

``` text
inspect
 |
plan
 |
migration
 |
preview
 |
test
 |
review
 |
backup verification
 |
production
```

------------------------------------------------------------------------

# 107. BACKUPS

Plan separately for:

-   PostgreSQL
-   object storage
-   source code
-   configuration
-   migrations

A database backup does not automatically mean uploaded files are backed
up.

------------------------------------------------------------------------

# 108. DISASTER RECOVERY

Define with the school:

-   RPO
-   RTO
-   backup frequency
-   recovery procedure

Do not invent legal/operational retention values.

Test restoration periodically.

------------------------------------------------------------------------

# 109. OBSERVABILITY

Implement:

### Logs

What happened?

### Metrics

How much/how often?

### Traces

Where did the request spend time?

### Errors

What failed?

### Audit

Who performed the important business action?

Do not mix these concepts.

------------------------------------------------------------------------

# 110. HEALTH ENDPOINTS

Provide:

``` text
/health
/ready
```

Do not expose secrets or detailed infrastructure information.

------------------------------------------------------------------------

# 111. MONITORING

Potential alerts:

-   database unavailable
-   high error rate
-   job backlog
-   notification failures
-   storage failures
-   unusual authentication failures
-   latency spikes

Use measured thresholds.

------------------------------------------------------------------------

# 112. PERFORMANCE

Prioritize:

-   fast public pages
-   optimized images
-   minimal JavaScript
-   server-side data access
-   pagination
-   caching where safe
-   database indexes
-   lazy loading

Measure Core Web Vitals.

------------------------------------------------------------------------

# 113. CACHING

Public content can be cached.

Private student/guardian/teacher data must not accidentally become
shared cache.

Document caching behavior per route.

------------------------------------------------------------------------

# 114. PUBLIC SEO

Public pages should support:

-   titles
-   descriptions
-   canonical URLs
-   Open Graph
-   sitemap
-   robots
-   structured data where appropriate

Do not index private portals.

------------------------------------------------------------------------

# 115. PUBLIC/PRIVATE ROUTES

Public:

``` text
/
 /about
 /notices
 /events
 /admissions
 /contact
```

Private:

``` text
/portal
/student
/guardian
/teacher
/admin
```

Private routes require authentication and authorization.

------------------------------------------------------------------------

# 116. RESPONSIVE DESIGN

Support:

-   desktop
-   laptop
-   tablet
-   mobile

Design mobile forms carefully for lower-end devices.

------------------------------------------------------------------------

# 117. PWA

A PWA can provide:

-   installability
-   cached application shell
-   faster repeat access
-   selected offline features

Do not claim full offline support unless implemented and tested.

------------------------------------------------------------------------

# 118. LONG-FORM OFFLINE/DRAFT

For long forms:

``` text
typing
 |
local draft
 |
network lost
 |
data preserved
 |
network returns
 |
safe sync
```

Conflict resolution must be explicit.

------------------------------------------------------------------------

# 119. DESIGN SYSTEM

Create reusable components:

``` text
Button
Input
Select
Textarea
Checkbox
Radio
DatePicker
Dialog
Drawer
Tabs
Table
DataTable
Pagination
Badge
Alert
Toast
Card
Timeline
Status
FileUploader
ApprovalPanel
LoadingState
ErrorState
EmptyState
```

Every component must support accessibility.

------------------------------------------------------------------------

# 120. DESIGN TOKENS

Centralize:

-   color
-   typography
-   spacing
-   radius
-   shadows
-   breakpoints
-   focus
-   motion

Avoid random per-page styles.

------------------------------------------------------------------------

# 121. VISUAL DIRECTION

The public website should feel:

-   modern
-   trustworthy
-   educational
-   professional
-   institutional
-   welcoming

Avoid excessive:

-   3D
-   animation
-   glass effects
-   gradients
-   decorative dashboards

Clarity comes first.

------------------------------------------------------------------------

# 122. ADMIN UX

Admin pages should prioritize:

``` text
What needs attention?
What is pending?
What failed?
What is overdue?
What is upcoming?
```

Avoid dashboards filled with meaningless charts.

------------------------------------------------------------------------

# 123. TASK QUEUES

Provide role-specific queues:

``` text
My Tasks
Pending Approval
Needs Review
Action Required
Failed
Overdue
Completed
```

------------------------------------------------------------------------

# 124. EMPTY STATES

Never show blank screens.

Use useful messages such as:

> No pending requests.

Do not create fake records to make a dashboard look populated.

------------------------------------------------------------------------

# 125. LOADING STATES

Every async operation needs:

-   loading
-   success
-   failure

Long jobs should display job status.

Never fake a percentage.

------------------------------------------------------------------------

# 126. CONFIRMATION UX

For important actions explain the consequence.

Example:

``` text
Publish this notice?

Publishing will make it visible on the public website.

[Cancel] [Publish]
```

------------------------------------------------------------------------

# 127. PUBLIC CONTENT PREVIEW

Authorized users should preview drafts before publication.

Preview must remain private.

------------------------------------------------------------------------

# 128. CONTENT DIFF

Important content should support version comparison:

``` text
Version 1
vs
Version 2
```

This helps reviewers catch changes.

------------------------------------------------------------------------

# 129. CONTENT SOURCE

For important public facts optionally store:

``` text
source_type
source_reference
verified_by
verified_at
```

Use authoritative school/government documentation.

------------------------------------------------------------------------

# 130. CONTENT REVIEW DATES

Important pages should support a review date.

Example:

``` text
Admissions information
Review before next academic cycle
```

Do not automatically rewrite stale content.

------------------------------------------------------------------------

# 131. BROKEN LINK MONITORING

Periodically check:

-   internal links
-   documents
-   external links

Report failures to administrators.

------------------------------------------------------------------------

# 132. DOWNLOAD VALIDATION

Before publication verify:

-   file exists
-   file opens
-   correct title
-   correct version
-   correct visibility

------------------------------------------------------------------------

# 133. PUBLIC GALLERY

Potential:

-   albums
-   event association
-   captions
-   dates
-   alt text
-   moderation

Do not automatically expose student images.

------------------------------------------------------------------------

# 134. CONTACT INFORMATION

Only publish verified:

-   address
-   phone
-   email
-   hours
-   social links

If not verified, leave unpublished.

------------------------------------------------------------------------

# 135. GOVERNMENT/EXTERNAL INTEGRATIONS

Never assume an integration exists.

Any integration must be:

-   explicitly required
-   officially documented
-   authorized
-   tested
-   secured

Do not create fake government verification.

------------------------------------------------------------------------

# 136. PAYMENT

Do not add fees/payment functionality unless required.

If later added, use:

-   separate payment domain
-   idempotency
-   transaction records
-   webhook verification
-   reconciliation
-   audit

Never store raw card information.

------------------------------------------------------------------------

# 137. AI FEATURES

AI is optional.

Safe possible uses:

-   drafting
-   summarization
-   search assistance
-   translation drafts
-   classification assistance
-   formatting
-   internal productivity

AI must not automatically:

-   change marks
-   change attendance
-   approve admissions
-   grant permissions
-   publish official notices
-   invent school facts

------------------------------------------------------------------------

# 138. AI DATA PROTECTION

Do not send sensitive student/staff information to external AI services
without appropriate approval, data minimization and a suitable
processing arrangement.

------------------------------------------------------------------------

# 139. FEATURE FLAGS

Use feature flags for controlled rollout.

Examples:

``` text
parent_portal
online_admissions
certificate_requests
library
online_results
ai_assistant
```

Feature flags do not replace authorization.

------------------------------------------------------------------------

# 140. ADMIN CONFIGURATION

Configurable:

-   school profile
-   academic year
-   categories
-   form templates
-   workflows
-   notifications
-   enabled modules
-   localization

Not normally configurable by ordinary admins:

-   RLS
-   service credentials
-   security bypasses
-   audit disabling
-   unrestricted role escalation

------------------------------------------------------------------------

# 141. API DESIGN

Prefer explicit business actions.

Examples:

``` text
POST /admissions/:id/submit
POST /admissions/:id/approve
POST /admissions/:id/reject

POST /notices/:id/submit
POST /notices/:id/approve
POST /notices/:id/publish

POST /certificates/:id/approve
POST /certificates/:id/generate
```

Avoid arbitrary generic mutation endpoints.

------------------------------------------------------------------------

# 142. API VALIDATION

Every request must validate:

-   authentication
-   authorization
-   schema
-   relationships
-   business rules
-   limits
-   state

Never trust:

``` text
school_id
role
status
price
student_id
class_id
```

from the client.

------------------------------------------------------------------------

# 143. PAGINATION

All large collections must paginate.

Do not load thousands of records into the browser.

------------------------------------------------------------------------

# 144. DATABASE INDEXING

Indexes should be based on actual query patterns.

Examples:

``` text
students(school_id, admission_number)
students(school_id, class_id, section_id)
attendance_records(student_id, date)
notices(status, publish_at)
events(event_date)
form_submissions(form_id, created_at)
workflow_tasks(assigned_to, status)
```

Do not create every possible index.

------------------------------------------------------------------------

# 145. TRANSACTIONS

Use database transactions for atomic core operations.

Example:

``` text
BEGIN
 create enrollment
 update admission
 create outbox event
COMMIT
```

External notifications should generally be asynchronous.

------------------------------------------------------------------------

# 146. SOFT DELETE/ARCHIVE

Use archive/deactivation for official records where history matters.

Hard delete should be rare, controlled and policy-driven.

------------------------------------------------------------------------

# 147. HISTORICAL SNAPSHOTS

Official documents may need immutable snapshots.

Example:

A certificate generated in 2026 must not change because a student's
profile was edited in 2027.

------------------------------------------------------------------------

# 148. DOCUMENT TEMPLATES

Templates should be versioned.

Example:

``` text
Certificate Template V1
Certificate Template V2
```

Generated documents retain template version metadata.

------------------------------------------------------------------------

# 149. PDF GENERATION

Generated PDFs must:

-   support Unicode
-   correctly render Bengali and Urdu
-   be readable
-   preserve layout
-   support accessibility where required
-   contain verification metadata where appropriate

------------------------------------------------------------------------

# 150. EMAIL

Use a provider adapter:

``` text
Notification Service
 |
Email Adapter
 |
Provider
```

Do not hardcode a provider into admission logic.

------------------------------------------------------------------------

# 151. EXTERNAL FAILURE

If email fails after admission approval:

``` text
Admission = approved
Email = retrying
```

Do not roll back the core admission merely because a secondary
notification failed.

------------------------------------------------------------------------

# 152. TIMEOUTS

All external calls require reasonable timeouts.

Never allow a provider to hang a user request indefinitely.

------------------------------------------------------------------------

# 153. DEGRADED MODE

Secondary failures should not take down core school operations.

Example:

Email unavailable:

-   admission still works
-   in-app notification may be recorded
-   email enters retry queue

------------------------------------------------------------------------

# 154. INCIDENT RESPONSE

For suspected data/security incidents:

1.  contain
2.  revoke access where necessary
3.  preserve evidence
4.  assess impact
5.  follow applicable incident process
6.  document
7.  remediate

Do not hide failures.

------------------------------------------------------------------------

# 155. DATA MINIMIZATION

For every personal field ask:

``` text
Why is this required?
Who needs it?
How long is it retained?
Can it be avoided?
```

------------------------------------------------------------------------

# 156. DATA RETENTION

Do not invent retention periods.

Determine them from:

-   school policy
-   applicable law
-   government/board requirements
-   operational requirements

------------------------------------------------------------------------

# 157. PRIVACY BY DEFAULT

Default visibility should be minimum necessary.

Do not fetch private data merely because the user has a broad role.

------------------------------------------------------------------------

# 158. PUBLIC DATA MODEL

Prefer controlled public views/services.

Example:

``` text
published_notice_view
```

rather than exposing raw admin tables.

------------------------------------------------------------------------

# 159. PRIVATE DATA MODEL

Return only fields required for the task.

------------------------------------------------------------------------

# 160. ADMIN EXPORTS

Large exports require:

-   authorization
-   audit
-   secure generation
-   expiration
-   access control

------------------------------------------------------------------------

# 161. SUPPORT ACCESS

If developers/support need production access:

-   explicit authorization
-   minimum scope
-   audit
-   temporary access where possible

Do not casually download production student data.

------------------------------------------------------------------------

# 162. DEMO ENVIRONMENT

If a demo exists:

``` text
DEMO ENVIRONMENT
All information is fictional.
```

Do not mix demo data with production.

------------------------------------------------------------------------

# 163. DEVELOPMENT DATA

Use clearly synthetic:

``` text
DEMO STUDENT 001
DEMO TEACHER 001
```

Do not use real school data without authorization.

------------------------------------------------------------------------

# 164. TESTING

Use:

### Unit tests

Business rules.

### Integration tests

Database/service behavior.

### API tests

Authentication/authorization/request validation.

### RLS tests

Database access boundaries.

### E2E tests

Real workflows.

### Accessibility tests

Automated + manual.

### Performance tests

Realistic workloads.

------------------------------------------------------------------------

# 165. CRITICAL E2E TESTS

## Admission

``` text
Applicant
 -> form
 -> documents
 -> submit
 -> review
 -> approval
 -> enrollment
```

## Notice

``` text
Staff
 -> draft
 -> review
 -> approve
 -> publish
 -> public
```

## Attendance

``` text
Teacher
 -> assigned class
 -> mark
 -> submit
 -> guardian/student sees allowed data
```

## Marks

``` text
Teacher
 -> enter
 -> submit
 -> verify
 -> approve
 -> publish
```

## Certificate

``` text
User
 -> request
 -> verify
 -> approve
 -> generate
 -> secure download
```

------------------------------------------------------------------------

# 166. TEST FAILURE SCENARIOS

Explicitly test:

-   double submit
-   network timeout
-   browser refresh
-   duplicate webhook
-   file upload failure
-   email failure
-   unauthorized object ID
-   expired workflow
-   concurrent edit
-   stale form
-   invalid state transition
-   expired signed URL
-   disabled user
-   revoked role
-   wrong school ID
-   malformed upload

------------------------------------------------------------------------

# 167. LOAD TESTING

Test real expected traffic for:

-   admission opening
-   result publication
-   important notices
-   bulk uploads
-   report generation

Do not make unsupported claims about capacity.

------------------------------------------------------------------------

# 168. CI/CD

Every PR should run:

``` text
typecheck
lint
unit tests
integration tests
RLS tests
authorization tests
build
accessibility checks
security checks
```

------------------------------------------------------------------------

# 169. PREVIEW ENVIRONMENT

Every significant change should be reviewable.

Never use unprotected production data in previews.

------------------------------------------------------------------------

# 170. RELEASE PROCESS

``` text
development
 |
preview
 |
review
 |
staging
 |
tests
 |
approval
 |
production
```

------------------------------------------------------------------------

# 171. ROLLBACK

Application deployments should be reversible.

Database changes should use backward-compatible migration patterns where
practical.

------------------------------------------------------------------------

# 172. SAFE MIGRATIONS

Prefer:

``` text
add field
 |
deploy compatible code
 |
backfill
 |
switch usage
 |
remove old field later
```

Avoid:

``` text
drop field
 |
hope application works
```

------------------------------------------------------------------------

# 173. MONOREPO OPTION

If the project grows:

``` text
apps/
  web/

packages/
  ui/
  auth/
  database/
  validation/
  permissions/
  config/
  observability/

modules/
  students/
  admissions/
  attendance/
  exams/
  forms/
  workflows/
  notices/
```

Do not split packages merely for appearance.

------------------------------------------------------------------------

# 174. MODULE RULES

Every module should have:

``` text
domain rules
data access
validation
permissions
events
tests
```

Avoid cross-module database access without an explicit contract.

------------------------------------------------------------------------

# 175. ARCHITECTURE DECISION RECORDS

Maintain ADRs:

``` text
ADR-001 Modular Monolith
ADR-002 PostgreSQL
ADR-003 RLS Strategy
ADR-004 Form Versioning
ADR-005 Workflow Engine
ADR-006 Notification Architecture
ADR-007 File Storage
```

Any major architecture change should have an ADR.

------------------------------------------------------------------------

# 176. AI AGENT DEVELOPMENT PROCESS

Every material feature:

``` text
1. Understand
2. Inspect existing system
3. Identify affected modules
4. Check existing implementation
5. Design data
6. Design permissions
7. Design workflow
8. Identify failure modes
9. Explain plan
10. Request approval if material
11. Implement
12. Test
13. Security/RLS test
14. Accessibility test
15. Production build
16. Report changes
17. Report limitations
```

------------------------------------------------------------------------

# 177. AI MUST NOT

Without explicit approval:

-   reset database
-   drop tables
-   disable RLS
-   alter production roles
-   delete production records
-   publish official content
-   send mass notifications
-   change DNS
-   rotate credentials
-   deploy destructive migrations
-   expose private documents
-   rewrite existing functionality unnecessarily

------------------------------------------------------------------------

# 178. EXISTING SYSTEM PROTECTION

If an existing Supabase/project/backend already exists:

Before changing anything:

1.  inspect schema
2.  inspect policies
3.  inspect triggers
4.  inspect indexes
5.  inspect storage
6.  inspect authentication
7.  inspect application references
8.  create a plan
9.  test in isolation
10. request approval for material changes

------------------------------------------------------------------------

# 179. NO UNAUTHORIZED REWRITE

Do not rewrite a working system merely because another technology looks
newer.

Measure the problem first.

------------------------------------------------------------------------

# 180. DATA MIGRATION

For existing data:

``` text
inventory
 |
mapping
 |
validation
 |
dry run
 |
error report
 |
approval
 |
migration
 |
verification
```

Track:

-   source count
-   migrated count
-   duplicate count
-   rejected count
-   error count

------------------------------------------------------------------------

# 181. REQUIREMENTS DISCOVERY

Before implementing school-specific workflows, confirm:

1.  classes
2.  sections
3.  subjects
4.  academic years
5.  admission process
6.  forms
7.  required documents
8.  approval hierarchy
9.  notice publishing process
10. attendance process
11. marks process
12. result process
13. certificate types
14. notification channels
15. public information
16. private information
17. languages
18. official contacts
19. existing software
20. external integrations
21. backup expectations
22. retention requirements

Unknown answers remain unknown.

------------------------------------------------------------------------

# 182. PRODUCT DESIGN PRINCIPLE

The system should answer:

### Student

"What do I need to do?"

### Guardian

"What is happening with my child?"

### Teacher

"What needs my attention?"

### Office

"Which requests need action?"

### Management

"What requires a decision?"

### Public visitor

"What official information do I need?"

------------------------------------------------------------------------

# 183. DASHBOARD PRINCIPLE

Priority:

1.  urgent
2.  pending
3.  upcoming
4.  recent
5.  informational

Not:

1.  decorative charts
2.  fake statistics
3.  unnecessary animations

------------------------------------------------------------------------

# 184. SINGLE SOURCE OF TRUTH

Avoid repeated manual entry.

Verified student information should be reusable by:

-   attendance
-   academics
-   exams
-   certificates
-   forms
-   reports

with proper authorization.

------------------------------------------------------------------------

# 185. MASTER DATA

Potential master entities:

-   students
-   guardians
-   staff
-   classes
-   sections
-   subjects
-   academic years
-   document types
-   form types
-   notice categories

Manage centrally.

------------------------------------------------------------------------

# 186. DATA DUPLICATION

Do not duplicate the same fact across unrelated tables unless there is a
documented reason.

Historical snapshots are acceptable when needed for official records.

------------------------------------------------------------------------

# 187. SCHOOL BRANDING

Use supplied official logo/assets.

Do not:

-   invent slogans
-   invent mission statements
-   redesign official emblem without approval
-   invent history
-   invent achievements

------------------------------------------------------------------------

# 188. PUBLIC CONTENT SOURCE HIERARCHY

Preferred:

1.  official school documents
2.  authorized school representative
3.  authoritative government/board source
4.  verified official records

Do not treat random web pages as authoritative.

------------------------------------------------------------------------

# 189. FINAL PUBLIC CONTENT CHECK

Before publication:

``` text
Is it sourced?
Is it current?
Is it authorized?
Is it necessary?
Is it accessible?
```

If not, do not publish.

------------------------------------------------------------------------

# 190. IMPLEMENTATION PHASES

## Phase 0: Discovery

Verify school information, workflows, roles, data and policies.

## Phase 1: Public Website

Home, school information, notices, events, downloads, contact,
accessibility, privacy.

## Phase 2: Platform Kernel

Auth, roles, permissions, RLS, files, audit, jobs, events,
notifications, settings.

## Phase 3: Content

CMS, notices, events, media, downloads, publication workflow.

## Phase 4: Forms + Workflows

Form builder, versioning, submissions, approvals, workflow engine.

## Phase 5: Portals

Student, guardian, teacher, office, management.

## Phase 6: Attendance + Academics

Classes, sections, subjects, timetable, attendance, assignments.

## Phase 7: Examinations

Marks, verification, approval, results, report cards.

## Phase 8: Documents

Certificates, secure files, QR verification.

## Phase 9: Reporting

Dashboards, exports, scheduled reports.

## Phase 10: Advanced

PWA improvements, advanced search, automation, carefully governed AI,
integrations.

------------------------------------------------------------------------

# 191. DEFINITION OF DONE

A feature is not done because the UI appears.

It is done only when:

-   requirement satisfied
-   database correct
-   authorization correct
-   RLS correct where applicable
-   validation implemented
-   error handling implemented
-   duplicate protection considered
-   audit implemented where needed
-   accessibility checked
-   responsive UI checked
-   tests pass
-   documentation updated
-   production impact understood

------------------------------------------------------------------------

# 192. FEATURE ACCEPTANCE FORMAT

For each feature document:

``` text
Requirement
 |
Domain
 |
Database
 |
API/service
 |
Authorization
 |
UI
 |
Audit
 |
Failure behavior
 |
Tests
```

------------------------------------------------------------------------

# 193. SECURITY ACCEPTANCE EXAMPLE

Requirement:

> Guardian can view their child's attendance.

Must prove:

``` text
Own child -> ALLOW
Unrelated child -> DENY
Other school -> DENY
Anonymous -> DENY
Authorized staff -> according to role
```

------------------------------------------------------------------------

# 194. CONTENT ACCEPTANCE EXAMPLE

Requirement:

> Draft notice must not appear publicly.

Test:

``` text
DRAFT -> private
PENDING_REVIEW -> private
VERIFIED -> private until published
PUBLISHED -> public
EXPIRED -> archive behavior
```

------------------------------------------------------------------------

# 195. FAILURE ACCEPTANCE EXAMPLE

Requirement:

> Email failure must not invalidate admission approval.

Test:

``` text
Admission -> APPROVED
Email -> FAILED/RETRYING
Admission remains approved
```

------------------------------------------------------------------------

# 196. DUPLICATE ACCEPTANCE EXAMPLE

Requirement:

> Double submission must not create duplicate admission.

Test:

``` text
Request 1 -> creates application
Request 2 with same idempotency key -> returns existing application
```

------------------------------------------------------------------------

# 197. CONCURRENCY ACCEPTANCE EXAMPLE

Requirement:

> Two users cannot silently overwrite the same record.

Test:

``` text
User A loads version 5
User B saves version 6
User A attempts version 5 update
-> conflict
```

------------------------------------------------------------------------

# 198. PUBLIC INFORMATION ACCEPTANCE

Requirement:

> Website must not publish unverified information.

Test:

``` text
Draft -> not public
Unverified -> not public
Approved + published -> public
```

------------------------------------------------------------------------

# 199. FINAL ARCHITECTURE

``` text
                 PUBLIC INTERNET
                       |
                  TLS/CDN/WAF
                       |
                 NEXT.JS APP
                       |
        +--------------+--------------+
        |              |              |
      PUBLIC        PORTALS        ADMIN
        |              |              |
        +--------------+--------------+
                       |
                 AUTHENTICATION
                       |
                 AUTHORIZATION
                       |
              PLATFORM KERNEL
                       |
      +----------------+----------------+
      |                |                |
    AUDIT            JOBS            EVENTS
      |                |                |
      +----------------+----------------+
                       |
                DOMAIN MODULES
                       |
    +------+------+------+------+------+
    |      |      |      |      |      |
 Students Exams Forms  Notices Docs Admissions
    |      |      |      |      |      |
    +------+------+------+------+------+
                       |
                    POSTGRES
                       |
              +--------+--------+
              |                 |
          Object Storage      Reports
```

------------------------------------------------------------------------

# 200. FINAL TECHNOLOGY DECISIONS

  Area                   Baseline
  ---------------------- ---------------------------------------------------------
  Architecture           Modular Monolith
  Frontend               Next.js + TypeScript
  Database               PostgreSQL
  Backend                Server-side application services
  Auth                   Managed authentication
  Authorization          RBAC + relationship rules + RLS
  Storage                Object storage
  Forms                  Schema-driven + versioned
  Workflows              Versioned state machine
  Notifications          Central event-driven service
  Jobs                   Background workers
  Reliability            Transactions + idempotency + retries
  Concurrency            Optimistic locking where needed
  Content                Verified publication workflow
  Documents              Private/versioned storage
  Audit                  Append-oriented audit events
  Search                 PostgreSQL initially
  Cache                  Only where measured need exists
  Microservices          Not initially
  Kubernetes             Not initially
  Kafka                  Not initially
  Redis                  Only if justified
  Accessibility          WCAG 2.1 AA target
  Government reference   GIGW 3.0
  Security               OWASP ASVS/Top 10 + applicable CERT-In guidance
  CI/CD                  Git + automated testing + preview + production approval
  Deployment             Staging + production
  Scaling                Extract modules only when needed
  Cost                   Minimal managed infrastructure

------------------------------------------------------------------------

# 201. AUTHORITATIVE REFERENCE POLICY

Technology changes.

When implementation begins, AI agents must consult current official
documentation for:

-   GIGW
-   WCAG
-   OWASP
-   Next.js
-   PostgreSQL
-   Supabase
-   hosting provider
-   authentication provider
-   relevant government/CERT-In guidance

This document defines the architecture and principles. Current vendor
documentation defines current API syntax and provider-specific behavior.

------------------------------------------------------------------------

# 202. MASTER COMMAND TO ANY AI

Treat this document as the controlling architecture baseline.

You are building a real school platform.

**Do not invent facts.**

**Do not fabricate data.**

**Do not expose private information.**

**Do not bypass authorization.**

**Do not silently change production.**

**Do not make destructive changes without approval.**

**Do not claim compliance without evidence.**

**Do not add infrastructure just to look enterprise-grade.**

**Do not replace existing working infrastructure without a documented
reason.**

When requirements are unknown:

``` text
MARK UNKNOWN
ASK
VERIFY
THEN IMPLEMENT
```

When a change affects:

-   architecture
-   database
-   security
-   authorization
-   production
-   public official information

explain the impact before implementation.

When implementation is complete:

``` text
REPORT
TEST
VERIFY
DOCUMENT
```

The objective is not the largest possible application.

The objective is:

> **A secure, accessible, reliable, maintainable and affordable school
> operating platform that can serve this school today and can grow into
> a multi-school platform later without requiring a complete rewrite.**

------------------------------------------------------------------------

# END OF MASTER SPECIFICATION
