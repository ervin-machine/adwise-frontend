//const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000/api"; // Fallback for development
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"; // Fallback for development

export default API_URL;
