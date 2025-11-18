// Centralized API base URL for the client.
// Uses the Create React App convention: REACT_APP_* env vars are embedded at build time.
export const API_BASE = process.env.REACT_APP_API_URL || "";

// Usage examples:
// fetch(`${API_BASE}/record/`)
// If API_BASE is empty the fetch path will become "/record/..." and will use the current origin.
