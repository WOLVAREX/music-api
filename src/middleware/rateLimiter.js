const requests = new Map();
const WINDOW = (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000;
const MAX_REQUESTS = process.env.RATE_LIMIT_MAX_REQUESTS || 100;

export const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  if (!requests.has(ip)) requests.set(ip, []);
  const userRequests = requests.get(ip);
  const recentRequests = userRequests.filter(time => now - time < WINDOW);
  if (recentRequests.length >= MAX_REQUESTS) {
    return res.status(429).json({
      error: 'Too many requests',
      retryAfter: Math.ceil((recentRequests[0] + WINDOW - now) / 1000)
    });
  }
  recentRequests.push(now);
  requests.set(ip, recentRequests);
  next();
};
