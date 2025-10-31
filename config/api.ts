/**
 * API Configuration
 * 
 * Centralized configuration for all external API endpoints.
 * Update these URLs as needed without changing multiple files.
 */

export const API_CONFIG = {
  /**
   * Email Validation API
   * Validates email addresses and checks deliverability
   */
  EMAIL_VALIDATION: {
    BASE_URL: "http://YOUR-NEW-URL:PORT", // ← Change this to your new URL
    ENDPOINTS: {
      VALIDATE: "/validatemyemail"
    },
    // Full URL
    get VALIDATE_EMAIL() {
      return `${this.BASE_URL}${this.ENDPOINTS.VALIDATE}`;
    }
  },

  /**
   * Domain Authenticity API (Spamhaus)
   * Checks domain reputation score
   */
  DOMAIN_AUTHENTICITY: {
    BASE_URL: "https://www.spamhaus.org",
    ENDPOINTS: {
      OVERVIEW: "/api/v1/sia-proxy/api/intel/v2/byobject/domain"
    },
    // Generate URL for specific domain
    getDomainUrl(domain: string) {
      return `${this.BASE_URL}${this.ENDPOINTS.OVERVIEW}/${domain}/overview`;
    }
  },

  /**
   * Domain Reputation API (DNSBL)
   * Checks if domain is blacklisted
   */
  DOMAIN_REPUTATION: {
    BASE_URL: "https://networkingtoolbox.net",
    ENDPOINTS: {
      DNSBL: "/api/internal/diagnostics/dnsbl"
    },
    // Full URL
    get CHECK_BLACKLIST() {
      return `${this.BASE_URL}${this.ENDPOINTS.DNSBL}`;
    }
  }
};

/**
 * API Request Configuration
 * Common settings for API requests
 */
export const API_REQUEST_CONFIG = {
  /**
   * Timeout settings (in milliseconds)
   */
  TIMEOUTS: {
    EMAIL_VALIDATION: 10000,      // 10 seconds
    DOMAIN_AUTHENTICITY: 20000,   // 20 seconds
    DOMAIN_REPUTATION: 30000      // 30 seconds
  },

  /**
   * Common headers
   */
  HEADERS: {
    JSON: {
      'Content-Type': 'application/json',
    },
    USER_AGENT: 'EmailValidator/1.0'
  }
};


