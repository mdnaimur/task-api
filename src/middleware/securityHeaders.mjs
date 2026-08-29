/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 29/08/2026
 */

export function securityHeaders(req, res) {
  res.setHeader("X-Content-Type-Options", "nosniff");

  res.setHeader("X-Frame-Options", "DENY");

  res.setHeader("Referrer-Policy", "no-referrer");
}
