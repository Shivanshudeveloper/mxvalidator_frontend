import { Metadata } from "next";
import { Mail } from "lucide-react";
import EmailValidator from "./components/EmailValidator";

// SEO Metadata
export const metadata: Metadata = {
  title: "Email Validator - Professional Email Verification Tool | Free Online Email Checker",
  description: "Validate email addresses instantly with our enterprise-grade email verification tool. Check email syntax, MX records, domain authenticity, disposable emails, and more. Free, fast, and accurate email validation service.",
  keywords: [
    "email validator",
    "email verification",
    "validate email",
    "email checker",
    "verify email address",
    "email syntax validator",
    "disposable email checker",
    "domain authenticity",
    "MX record checker",
    "email deliverability",
    "bulk email validator",
    "free email verification"
  ],
  authors: [{ name: "Email Validator" }],
  creator: "Email Validator",
  publisher: "Email Validator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    title: "Email Validator - Professional Email Verification Tool",
    description: "Validate email addresses instantly with our enterprise-grade email verification tool. Check syntax, MX records, domain authenticity, and more.",
    siteName: "Email Validator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Email Validator Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Email Validator - Professional Email Verification Tool",
    description: "Validate email addresses instantly with our enterprise-grade email verification tool.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://yourdomain.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function Home() {
  // JSON-LD Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Email Validator",
    description: "Professional email verification and validation tool with domain authenticity checking",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
    featureList: [
      "Email syntax validation",
      "MX records verification",
      "Domain authenticity scoring",
      "Disposable email detection",
      "Role account identification",
      "Real-time verification",
      "Fast response time"
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-4xl mx-auto">
          {/* Top Navigation with Download Button */}
          <div className="flex justify-end mb-6">
            <a
              href="https://shivanshudev.gumroad.com/l/emailvalidatorcode"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Full Source Code
            </a>
          </div>

          {/* SEO-Optimized Header */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-900 rounded-xl mb-3">
              <Mail className="w-7 h-7 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Email Validator - Verify Email Addresses Instantly
            </h1>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Professional email verification tool with advanced domain authenticity checking, MX record validation, and disposable email detection
            </p>
          </header>

          {/* Main Application */}
          <main className="flex justify-center">
            <EmailValidator />
          </main>

          {/* SEO Content Section */}
          <article className="mt-12 max-w-3xl mx-auto px-4">
            <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Why Use Our Email Validator?
              </h2>
              <p className="text-gray-700 mb-4">
                Our professional email validation tool helps you verify email addresses in real-time with enterprise-grade accuracy. 
                Whether you&apos;re cleaning your email list, validating user signups, or ensuring deliverability, our tool provides 
                comprehensive validation checks including syntax verification, MX record validation, and domain authenticity scoring.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span><strong>Syntax Validation:</strong> Checks if the email format is correct according to RFC standards</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span><strong>MX Records Check:</strong> Verifies if the domain has valid mail exchange records</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span><strong>Domain Authenticity:</strong> Scores domain reputation using Spamhaus intelligence</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span><strong>Disposable Email Detection:</strong> Identifies temporary email services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-2">✓</span>
                  <span><strong>Role Account Detection:</strong> Identifies generic role-based emails</span>
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                How Email Validation Works
              </h2>
              <p className="text-gray-700 mb-4">
                Our email validator performs multiple checks to ensure the email address is valid and deliverable:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li><strong>Format Validation:</strong> Ensures the email follows proper syntax rules</li>
                <li><strong>Domain Verification:</strong> Checks if the domain exists and has MX records</li>
                <li><strong>Mailbox Verification:</strong> Verifies if the mailbox can receive emails</li>
                <li><strong>Risk Assessment:</strong> Evaluates domain reputation and identifies potential issues</li>
                <li><strong>Deliverability Check:</strong> Determines if emails can be successfully delivered</li>
              </ol>
            </section>
          </article>

          {/* Footer with additional SEO context */}
          <footer className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Enterprise-grade email verification powered by advanced validation algorithms
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Free email validator tool | Instant results | Privacy-focused | No registration required
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}