export const getFetch = async (url, token = null) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || data.error || `Error HTTP ${response.status}`
    );
  }

  return data;
};