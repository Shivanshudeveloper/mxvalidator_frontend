import { NextRequest, NextResponse } from "next/server";
import { API_CONFIG, API_REQUEST_CONFIG } from "@/config/api";

interface AuthenticityData {
  whois: any;
  score: number | null;
  dimensions: any;
}

interface ReputationData {
  listedCount: number;
  totalChecked: number;
  cleanCount: number;
  errorCount: number;
  isClean: boolean;
}

const checkDomainReputation = async (domainName: string): Promise<ReputationData | null> => {
  try {
    console.log(`🔍 Checking domain reputation for: ${domainName}`);
    
    const response = await fetch(API_CONFIG.DOMAIN_REPUTATION.CHECK_BLACKLIST, {
      method: 'POST',
      headers: API_REQUEST_CONFIG.HEADERS.JSON,
      body: JSON.stringify({ target: domainName }),
      signal: AbortSignal.timeout(API_REQUEST_CONFIG.TIMEOUTS.DOMAIN_REPUTATION)
    });

    if (!response.ok) {
      console.warn(`⚠️ DNSBL API returned ${response.status} for ${domainName}`);
      return null;
    }

    const data = await response.json();
    
    if (!data.summary) {
      console.warn(`⚠️ Invalid DNSBL response format for ${domainName}`);
      return null;
    }

    const reputationData: ReputationData = {
      listedCount: data.summary.listedCount || 0,
      totalChecked: data.summary.totalChecked || 0,
      cleanCount: data.summary.cleanCount || 0,
      errorCount: data.summary.errorCount || 0,
      isClean: (data.summary.listedCount || 0) === 0
    };

    console.log(`✅ Domain reputation check completed for ${domainName} (Listed: ${reputationData.listedCount})`);
    return reputationData;

  } catch (error) {
    console.error(`❌ Failed to check domain reputation for ${domainName}:`, error);
    return null;
  }
};

const checkDomainAuthenticity = async (domainName: string): Promise<AuthenticityData | null> => {
  try {
    console.log(`🔍 Checking domain authenticity for: ${domainName}`);
    
    const apiUrl = API_CONFIG.DOMAIN_AUTHENTICITY.getDomainUrl(domainName);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'User-Agent': API_REQUEST_CONFIG.HEADERS.USER_AGENT,
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(API_REQUEST_CONFIG.TIMEOUTS.DOMAIN_AUTHENTICITY)
    });

    if (!response.ok) {
      console.warn(`⚠️ Spamhaus API returned ${response.status} for ${domainName}`);
      return null;
    }

    const data = await response.json();
    
    // Validate that we have actual data from the API
    if (!data || typeof data !== 'object') {
      console.warn(`⚠️ Invalid response format from Spamhaus for ${domainName}`);
      return null;
    }
    
    // Extract only the fields we care about - be careful with score 0 (neutral reputation)
    const authenticityData: AuthenticityData = {
      whois: data.whois || null,
      score: (typeof data.score === 'number') ? data.score : null,
      dimensions: data.dimensions || null
    };

    // Only return data if we have at least one valid field
    const hasValidData = authenticityData.whois || 
                        (typeof authenticityData.score === 'number') || 
                        authenticityData.dimensions;
    
    if (!hasValidData) {
      console.warn(`⚠️ No valid data returned from Spamhaus for ${domainName}`);
      return null;
    }

    console.log(`✅ Domain authenticity check completed for ${domainName} (Score: ${authenticityData.score})`);
    return authenticityData;

  } catch (error) {
    console.error(`❌ Failed to check domain authenticity for ${domainName}:`, error);
    return null;
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Extract domain from email
    const domain = email.split('@')[1];

    // Run all validations in parallel
    const [validationResponse, authenticityData, reputationData] = await Promise.all([
      fetch(API_CONFIG.EMAIL_VALIDATION.VALIDATE_EMAIL, {
        method: "POST",
        headers: API_REQUEST_CONFIG.HEADERS.JSON,
        body: JSON.stringify({ email }),
        signal: AbortSignal.timeout(API_REQUEST_CONFIG.TIMEOUTS.EMAIL_VALIDATION)
      }),
      checkDomainAuthenticity(domain),
      checkDomainReputation(domain)
    ]);

    if (!validationResponse.ok) {
      throw new Error("Failed to validate email");
    }

    const validationData = await validationResponse.json();

    // Combine all results
    const responseData = {
      ...validationData,
      domain_authenticity: authenticityData,
      domain_reputation: reputationData
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error validating email:", error);
    return NextResponse.json(
      { error: "Failed to validate email" },
      { status: 500 }
    );
  }
}

