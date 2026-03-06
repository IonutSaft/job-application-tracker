/**
 * Application constants and configuration
 */

// Status options for job applications
export const APPLICATION_STATUSES = {
  APPLIED: "APPLIED",
  INTERVIEWING: "INTERVIEWING",
  OFFER: "OFFER",
  REJECTED: "REJECTED",
} as const;

// Status display labels and colors
export const STATUS_CONFIG = {
  APPLIED: {
    label: "Applied",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    borderColor: "border-blue-300",
  },
  INTERVIEWING: {
    label: "Interviewing",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
    borderColor: "border-purple-300",
  },
  OFFER: {
    label: "Offer",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    borderColor: "border-green-300",
  },
  REJECTED: {
    label: "Rejected",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
    borderColor: "border-red-300",
  },
} as const;

// Pagination
export const ITEMS_PER_PAGE = 12;

// Storage limits
export const STORAGE_LIMITS = {
  MAX_TOTAL_USERS: 50,
  MAX_APPLICATIONS_PER_USER: 100,
} as const;

// Form validation
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  MIN_PASSWORD_LENGTH: 8,
};

// API configuration
export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    SIGNIN: "/api/auth/signin",
    SIGNOUT: "/api/auth/signout",
  },
  APPLICATIONS: {
    LIST: "/api/applications",
    CREATE: "/api/applications",
    GET: (id: string) => `/api/applications/${id}`,
    UPDATE: (id: string) => `/api/applications/${id}`,
    DELETE: (id: string) => `/api/applications/${id}`,
  },
};

// Error messages
export const ERROR_MESSAGES = {
  INVALID_EMAIL: "Please enter a valid email address",
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} characters`,
  EMAIL_ALREADY_EXISTS: "This email is already registered",
  INVALID_CREDENTIALS: "Invalid email or password",
  REQUIRED_FIELD: "This field is required",
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
  USER_LIMIT_REACHED: `Registration is currently closed as the maximum number of users (${STORAGE_LIMITS.MAX_TOTAL_USERS}) has been reached.`,
  APPLICATION_LIMIT_REACHED: `You have reached the maximum limit of ${STORAGE_LIMITS.MAX_APPLICATIONS_PER_USER} applications.`,
};
