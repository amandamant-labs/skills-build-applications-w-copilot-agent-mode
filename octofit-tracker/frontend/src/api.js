// Small helper to build API endpoints for the Django REST backend.
export function apiUrl(resource) {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) {
    const url = `https://${codespace}-8000.app.github.dev/api/${resource}/`;
    console.log('apiUrl built from REACT_APP_CODESPACE_NAME:', url);
    return url;
  }

  const fallback = `${window.location.origin}/api/${resource}/`;
  console.log('apiUrl using fallback window.location.origin:', fallback);
  return fallback;
}

export default apiUrl;
