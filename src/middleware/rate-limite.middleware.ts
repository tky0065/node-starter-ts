import { rateLimit } from "express-rate-limit";

// general Rate limiting middleware
export const genralRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 5 minutes
  limit: 100, // each IP can make up to 10 requests per `windowsMs` (5 minutes)
  standardHeaders: true, // add the `RateLimit-*` headers to the response
  legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
});

// strict Rate limiting middleware
export const strictRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50, // each IP can make up to 100 requests per `windowsMs` (15 minutes)
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  headers: true,
});