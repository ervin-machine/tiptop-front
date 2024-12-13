const API_URL =
  process.env.REACT_APP_API_URL || // Use Vercel's environment variable
  (process.env.NODE_ENV === "production"
    ? "https://tiptop-recruit-125-gqefaxguh6a2fddw.centralus-01.azurewebsites.net/api" // Fallback for production
    : "http://localhost:5000/api"); // Fallback for development

export default API_URL;
