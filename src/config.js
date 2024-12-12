const API_URL =
  "tiptop-recruit-125-gqefaxguh6a2fddw.centralus-01.azurewebsites.net" || // Use Vercel's environment variable
  (process.env.NODE_ENV === "production"
    ? "tiptop-recruit-125-gqefaxguh6a2fddw.centralus-01.azurewebsites.net" // Fallback for production
    : "http://localhost:5000/api"); // Fallback for development

export default API_URL;
