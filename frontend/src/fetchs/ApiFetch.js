export const apiFetch = async ({url, method, body = null, token = null}) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: method,
    headers,
    body: body ? JSON.stringify(body) : null
  });

  const responseText = await response.text();
  const data = responseText ? JSON.parse(responseText) : null;

  if (!response.ok) {
    throw new Error(
      data?.message || data?.error || `Error HTTP ${response.status}`
    );
  }

  return data;
};