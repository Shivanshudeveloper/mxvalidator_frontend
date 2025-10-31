"use client";

import { useState } from "react";
import { 
  Mail, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Loader2, 
  Shield, 
  Server,
  Trash2,
  UserCheck,
  Clock,
  Hash,
  Zap,
  Globe,
  ShieldCheck,
  ShieldAlert
} from "lucide-react";

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

interface ValidationResponse {
  request_id: string;
  email: string;
  is_reachable: string;
  is_valid_syntax: boolean;
  mx_exists: boolean;
  is_disposable: boolean;
  is_role_account: boolean;
  is_deliverable: boolean;
  classification: string;
  processing_time_ms: number;
  domain_authenticity: AuthenticityData | null;
  domain_reputation: ReputationData | null;
}

export default function EmailValidator() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ValidationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to validate email");
      }

      const data: ValidationResponse = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyles = (status: string) => {
    switch(status) {
      case "Safe":
        return {
          containerClass: "bg-emerald-50 border-emerald-200",
          textClass: "text-emerald-700",
          iconClass: "text-emerald-600",
          icon: <CheckCircle2 className="w-5 h-5" />,
          label: "Valid"
        };
      case "Invalid":
        return {
          containerClass: "bg-red-50 border-red-200",
          textClass: "text-red-700",
          iconClass: "text-red-600",
          icon: <XCircle className="w-5 h-5" />,
          label: "Invalid"
        };
      default:
        return {
          containerClass: "bg-amber-50 border-amber-200",
          textClass: "text-amber-700",
          iconClass: "text-amber-600",
          icon: <AlertCircle className="w-5 h-5" />,
          label: "Risky"
        };
    }
  };

  const getScoreColor = (score: number | null) => {
    if (score === null) return "text-gray-500";
    if (score > 3) return "text-emerald-600"; // Excellent
    if (score === 3) return "text-green-600"; // Good
    if (score >= 1) return "text-blue-600"; // Okay
    if (score === 0) return "text-gray-600"; // Neutral
    if (score >= -2) return "text-orange-600"; // Very Poor
    return "text-red-600"; // Poor (below -2)
  };

  const getScoreLabel = (score: number | null) => {
    if (score === null) return "N/A";
    if (score > 3) return "Excellent";
    if (score === 3) return "Good";
    if (score >= 1) return "Okay";
    if (score === 0) return "Neutral";
    if (score >= -2) return "Very Poor";
    return "Poor";
  };

  const getScoreBgColor = (score: number | null) => {
    if (score === null) return "bg-gray-100";
    if (score > 3) return "bg-emerald-100"; // Excellent
    if (score === 3) return "bg-green-100"; // Good
    if (score >= 1) return "bg-blue-100"; // Okay
    if (score === 0) return "bg-gray-100"; // Neutral
    if (score >= -2) return "bg-orange-100"; // Very Poor
    return "bg-red-100"; // Poor
  };

  const validationItems = result ? [
    {
      label: "Syntax",
      value: result.is_valid_syntax,
      icon: <Shield className="w-3.5 h-3.5" />,
      positive: "Valid",
      negative: "Invalid"
    },
    {
      label: "MX Records",
      value: result.mx_exists,
      icon: <Server className="w-3.5 h-3.5" />,
      positive: "Found",
      negative: "Missing"
    },
    {
      label: "Disposable",
      value: !result.is_disposable,
      icon: <Trash2 className="w-3.5 h-3.5" />,
      positive: "No",
      negative: "Yes"
    },
    {
      label: "Role Account",
      value: !result.is_role_account,
      icon: <UserCheck className="w-3.5 h-3.5" />,
      positive: "Personal",
      negative: "Role"
    }
  ] : [];

  return (
    <div className="w-full max-w-xl">
      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <form onSubmit={validateEmail} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="block w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 bg-gray-50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium py-2.5 px-4 text-sm rounded-lg transition-all duration-200 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Validating...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Validate Email</span>
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm">
                {error}
              </p>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="mt-6 space-y-4">
              {/* Status Card */}
              <div className={`p-4 rounded-lg border ${getStatusStyles(result.is_reachable).containerClass} transition-all`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={getStatusStyles(result.is_reachable).iconClass}>
                    {getStatusStyles(result.is_reachable).icon}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${getStatusStyles(result.is_reachable).textClass}`}>
                      {getStatusStyles(result.is_reachable).label} Email
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">{result.email}</p>
                  </div>
                </div>

                {/* Domain Metrics */}
                {(result.domain_reputation || (result.domain_authenticity && result.domain_authenticity.score !== null)) && (
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
                    {/* Domain Reputation */}
                    {result.domain_reputation && (
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          {result.domain_reputation.isClean ? (
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <ShieldAlert className="w-4 h-4 text-red-600" />
                          )}
                          <p className="text-xs font-medium text-gray-600">Domain Reputation</p>
                        </div>
                        <div className={`inline-flex items-center px-2.5 py-1 rounded-full ${
                          result.domain_reputation.isClean ? 'bg-emerald-100' : 'bg-red-100'
                        }`}>
                          <span className={`text-sm font-semibold ${
                            result.domain_reputation.isClean ? 'text-emerald-700' : 'text-red-700'
                          }`}>
                            {result.domain_reputation.isClean ? 'Clean' : 'Blacklisted'}
                          </span>
                        </div>
                        {!result.domain_reputation.isClean && (
                          <p className="text-xs text-red-600 mt-1 font-medium">
                            {result.domain_reputation.listedCount} list{result.domain_reputation.listedCount > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Domain Authenticity Score */}
                    {result.domain_authenticity && result.domain_authenticity.score !== null && (
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe className="w-4 h-4 text-gray-600" />
                          <p className="text-xs font-medium text-gray-600">Domain Authenticity</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-2xl font-bold ${getScoreColor(result.domain_authenticity.score)}`}>
                            {result.domain_authenticity.score}
                          </span>
                          <div className={`inline-flex items-center px-2 py-0.5 rounded-full ${getScoreBgColor(result.domain_authenticity.score)}`}>
                            <span className={`text-xs font-medium ${getScoreColor(result.domain_authenticity.score)}`}>
                              {getScoreLabel(result.domain_authenticity.score)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Compact Validation Grid */}
              <div className="grid grid-cols-2 gap-3">
                {validationItems.map((item, index) => (
                  <div key={index} className={`bg-gray-50 rounded-lg p-3 border ${item.value ? 'border-gray-200' : 'border-gray-300'}`}>
                    <div className="flex items-center gap-2">
                      <div className={`${item.value ? 'text-emerald-600' : 'text-gray-400'}`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 truncate">
                          {item.label}
                        </p>
                        <p className={`text-sm font-medium ${item.value ? 'text-gray-900' : 'text-gray-500'}`}>
                          {item.value ? item.positive : item.negative}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Compact Additional Details */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Deliverable</p>
                    <p className="font-medium text-gray-900 text-sm">
                      {result.is_deliverable ? "Yes" : "No"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="font-medium text-gray-900 text-sm capitalize">
                      {result.classification}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Speed
                    </p>
                    <p className="font-medium text-gray-900 text-sm">
                      {result.processing_time_ms}ms
                    </p>
                  </div>
                </div>

                {/* Compact Request ID */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Hash className="w-3 h-3" />
                  <span>ID:</span>
                  <code className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                    {result.request_id.substring(0, 12)}...
                  </code>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compact Footer */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Enterprise-grade verification
        </p>
      </div>
    </div>
  );
}

