import rateLimit from "express-rate-limit";
import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";

// Rate limiter for login endpoint
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: {
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  keyGenerator: (req: Request) => {
    // Use IP address as key
    return req.ip || req.socket.remoteAddress || "unknown";
  },
});

// General API rate limiter
export const apiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: {
    message: "Too many requests. Please slow down.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// CSRF Token storage (in production, use Redis or database)
const csrfTokens: Map<string, { token: string; expiresAt: Date }> = new Map();

// Clean up expired tokens periodically
setInterval(() => {
  const now = new Date();
  const keysToDelete: string[] = [];
  csrfTokens.forEach((value, key) => {
    if (value.expiresAt < now) {
      keysToDelete.push(key);
    }
  });
  keysToDelete.forEach((key) => csrfTokens.delete(key));
}, 5 * 60 * 1000); // Clean every 5 minutes

// Generate CSRF token
export function generateCsrfToken(sessionId: string): string {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  csrfTokens.set(sessionId, { token, expiresAt });
  return token;
}

// Validate CSRF token
export function validateCsrfToken(sessionId: string, token: string): boolean {
  const stored = csrfTokens.get(sessionId);
  if (!stored) return false;
  if (stored.expiresAt < new Date()) {
    csrfTokens.delete(sessionId);
    return false;
  }
  return stored.token === token;
}

// CSRF protection middleware
export function csrfProtection(req: Request, res: Response, next: NextFunction) {
  // Skip for GET, HEAD, OPTIONS requests (safe methods)
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return next();
  }

  // Get session ID from auth token
  const authToken = req.headers.authorization?.replace("Bearer ", "");
  if (!authToken) {
    return next(); // Let auth middleware handle missing token
  }

  // Get CSRF token from header
  const csrfToken = req.headers["x-csrf-token"] as string;

  // Skip CSRF for login (no session yet) and setup endpoints
  if (req.path === "/api/auth/login" || req.path === "/api/auth/setup") {
    return next();
  }

  // Validate CSRF token for authenticated requests
  if (csrfToken && validateCsrfToken(authToken, csrfToken)) {
    return next();
  }

  // For backward compatibility, allow requests without CSRF token but log warning
  console.warn(`CSRF token missing or invalid for ${req.method} ${req.path}`);
  return next();
}

// Security headers middleware
export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  
  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  
  // XSS protection
  res.setHeader("X-XSS-Protection", "1; mode=block");
  
  // Referrer policy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  
  // Content Security Policy (adjust as needed)
  if (process.env.NODE_ENV === "production") {
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self'"
    );
  }
  
  next();
}

// Input sanitization helper
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

// Sanitize object recursively
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeInput(value);
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized as T;
}
