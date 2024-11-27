const API_URL =
  process.env.REACT_APP_API_URL || // Use Vercel's environment variable
  (process.env.NODE_ENV === "production"
    ? "https://tiptop-back.onrender.com" // Fallback for production
    : "http://localhost:5000"); // Fallback for development

export default API_URL;
