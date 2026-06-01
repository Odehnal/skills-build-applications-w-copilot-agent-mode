const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

const apiRoot = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function getApiUrl(resourcePath) {
  return `${apiRoot}/${resourcePath}/`;
}

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}

export async function fetchCollection(resourcePath) {
  const response = await fetch(getApiUrl(resourcePath));

  if (!response.ok) {
    throw new Error(`Failed to load ${resourcePath}: HTTP ${response.status}`);
  }

  const payload = await response.json();
  return normalizeCollectionResponse(payload);
}