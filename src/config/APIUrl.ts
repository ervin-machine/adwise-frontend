// Baked in at build time - there's no server to read this from at runtime
// once this is exported as static files, so it must be set before `next build`
// (e.g. NEXT_PUBLIC_API_URL=https://adwise.duckdns.org/api npm run build).
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default API_URL;
