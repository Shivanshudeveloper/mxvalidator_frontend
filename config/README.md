# API Configuration

This directory contains centralized configuration for all external API endpoints used in the application.

## 📁 Files

### `api.ts`
Main configuration file containing all API endpoints and request settings.

## 🔧 Configuration Structure

### API_CONFIG

Contains all external API endpoints organized by service:

#### 1. EMAIL_VALIDATION
Email validation and deliverability checking service.

```typescript
API_CONFIG.EMAIL_VALIDATION.VALIDATE_EMAIL
// Returns: "http://92.113.151.118:3000/validatemyemail"
```

**To change:**
```typescript
EMAIL_VALIDATION: {
  BASE_URL: "http://your-new-url.com:3000",
  ENDPOINTS: {
    VALIDATE: "/validatemyemail"
  }
}
```

#### 2. DOMAIN_AUTHENTICITY
Spamhaus domain reputation scoring service.

```typescript
API_CONFIG.DOMAIN_AUTHENTICITY.getDomainUrl("example.com")
// Returns: "https://www.spamhaus.org/api/v1/sia-proxy/api/intel/v2/byobject/domain/example.com/overview"
```

**To change:**
```typescript
DOMAIN_AUTHENTICITY: {
  BASE_URL: "https://your-spamhaus-proxy.com",
  ENDPOINTS: {
    OVERVIEW: "/api/v1/sia-proxy/api/intel/v2/byobject/domain"
  }
}
```

#### 3. DOMAIN_REPUTATION
DNSBL blacklist checking service.

```typescript
API_CONFIG.DOMAIN_REPUTATION.CHECK_BLACKLIST
// Returns: "https://networkingtoolbox.net/api/internal/diagnostics/dnsbl"
```

**To change:**
```typescript
DOMAIN_REPUTATION: {
  BASE_URL: "https://your-dnsbl-service.com",
  ENDPOINTS: {
    DNSBL: "/api/internal/diagnostics/dnsbl"
  }
}
```

### API_REQUEST_CONFIG

Contains common request settings:

#### Timeouts (in milliseconds)
```typescript
TIMEOUTS: {
  EMAIL_VALIDATION: 10000,      // 10 seconds
  DOMAIN_AUTHENTICITY: 20000,   // 20 seconds
  DOMAIN_REPUTATION: 30000      // 30 seconds
}
```

#### Headers
```typescript
HEADERS: {
  JSON: {
    'Content-Type': 'application/json',
  },
  USER_AGENT: 'EmailValidator/1.0'
}
```

## 🚀 Usage

### In API Routes

```typescript
import { API_CONFIG, API_REQUEST_CONFIG } from "@/config/api";

// Email validation
const response = await fetch(API_CONFIG.EMAIL_VALIDATION.VALIDATE_EMAIL, {
  method: "POST",
  headers: API_REQUEST_CONFIG.HEADERS.JSON,
  body: JSON.stringify({ email }),
  signal: AbortSignal.timeout(API_REQUEST_CONFIG.TIMEOUTS.EMAIL_VALIDATION)
});

// Domain authenticity
const url = API_CONFIG.DOMAIN_AUTHENTICITY.getDomainUrl("example.com");
const response = await fetch(url, {
  method: 'GET',
  signal: AbortSignal.timeout(API_REQUEST_CONFIG.TIMEOUTS.DOMAIN_AUTHENTICITY)
});

// Domain reputation
const response = await fetch(API_CONFIG.DOMAIN_REPUTATION.CHECK_BLACKLIST, {
  method: 'POST',
  headers: API_REQUEST_CONFIG.HEADERS.JSON,
  body: JSON.stringify({ target: "example.com" }),
  signal: AbortSignal.timeout(API_REQUEST_CONFIG.TIMEOUTS.DOMAIN_REPUTATION)
});
```

## 🔄 Updating API Endpoints

To update any API endpoint, simply modify the values in `config/api.ts`:

### Example: Change Email Validation URL

**Before:**
```typescript
EMAIL_VALIDATION: {
  BASE_URL: "http://92.113.151.118:3000",
  ...
}
```

**After:**
```typescript
EMAIL_VALIDATION: {
  BASE_URL: "http://new-server.com:8080",
  ...
}
```

That's it! All files importing from this config will automatically use the new URL.

## 🌍 Environment-Based Configuration (Optional)

If you need different URLs for development and production, uncomment and use the `getApiConfig()` function:

```typescript
export const getApiConfig = () => {
  const isDev = process.env.NODE_ENV === 'development';
  
  return {
    EMAIL_VALIDATION_URL: isDev 
      ? 'http://localhost:3000/validatemyemail'
      : 'http://92.113.151.118:3000/validatemyemail',
    DOMAIN_AUTHENTICITY_URL: isDev
      ? 'http://localhost:3001/domain-check'
      : 'https://www.spamhaus.org/api/v1/sia-proxy/api/intel/v2/byobject/domain',
    // ... other URLs
  };
};
```

Then use it in your code:
```typescript
const config = getApiConfig();
const response = await fetch(config.EMAIL_VALIDATION_URL, { ... });
```

## ⚙️ Configuration Best Practices

1. **Never hardcode URLs** - Always import from this config file
2. **Update in one place** - When APIs change, update only `config/api.ts`
3. **Use descriptive names** - Make it clear what each endpoint does
4. **Document changes** - Add comments when making significant updates
5. **Version control** - Commit config changes separately for clarity
6. **Environment variables** - For sensitive data, use `.env` files instead

## 📝 Files Using This Config

Currently used in:
- `/app/api/validate/route.ts` - Main validation API route

## 🔐 Security Notes

- **Never commit sensitive API keys** to this file
- Use environment variables for secrets: `process.env.API_KEY`
- Consider using `.env.local` for local development
- For production, set environment variables in your hosting platform

## 🆘 Troubleshooting

### API not responding
1. Check if the URL in `config/api.ts` is correct
2. Verify timeout settings in `API_REQUEST_CONFIG.TIMEOUTS`
3. Check if the API service is running

### TypeScript errors
1. Ensure all imports use `@/config/api` (@ is alias for root)
2. Run `npm run build` to check for type errors
3. Clear `.next` cache: `rm -rf .next`

---

**Last Updated:** $(date)
**Maintained By:** Development Team

