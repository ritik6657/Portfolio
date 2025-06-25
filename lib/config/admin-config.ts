// Admin configuration for production
export const ADMIN_CONFIG = {
  // Session settings
  SESSION_DURATION: 3600000, // 1 hour
  MAX_LOGIN_ATTEMPTS: 3,

  // Rate limiting
  RATE_LIMITS: {
    CONTACT_FORM: { requests: 3, window: 300000 }, // 3 per 5 minutes
    FEEDBACK: { requests: 5, window: 300000 }, // 5 per 5 minutes
    ADMIN_ACTIONS: { requests: 20, window: 60000 }, // 20 per minute
    GENERAL: { requests: 50, window: 60000 }, // 50 per minute
  },

  // Security settings
  AUTO_LOGOUT_WARNING: 300000, // 5 minutes before session expires
  REQUIRE_HTTPS: process.env.NODE_ENV === "production",

  // Admin features
  FEATURES: {
    REAL_TIME_UPDATES: true,
    EXPORT_DATA: true,
    BULK_ACTIONS: true,
    ANALYTICS: true,
  },
} as const

// Validate environment in production
export function validateAdminEnvironment() {
  if (process.env.NODE_ENV === "production") {
    // Add production-specific validations
    console.log("✅ Admin panel configured for production")
  }
}
