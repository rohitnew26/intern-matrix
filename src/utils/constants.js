// Constants
// API Constants
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const GOOGLE_SHEETS_API_URL = import.meta.env.VITE_GOOGLE_SHEETS_API_URL || '';

// Certificate Verification Status
export const VERIFICATION_STATUS = {
  VERIFIED: 'verified',
  NOT_FOUND: 'not_found',
  INVALID: 'invalid',
  ERROR: 'error'
};

// Routes
export const ROUTES = {
  HOME: '/',
  VERIFY_CERTIFICATE: '/verify-certificate'
};
