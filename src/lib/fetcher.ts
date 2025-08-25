type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetcherOptions {
  method?: Method;
  data?: any;
  token?: string;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined | null>;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3010/api';


export async function fetcher<T>(
  url: string,
  { method = 'GET', data, token, headers = {}, params }: FetcherOptions = {}
): Promise<T> {
  let fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

  console.log(fullUrl)

  // Append query params to the URL
  if (params) {
    const query = new URLSearchParams(
      Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)])
    ).toString();

    if (query) {
      fullUrl += fullUrl.includes('?') ? `&${query}` : `?${query}`;
    }
  }

  const isFormData = data instanceof FormData;

  const config: RequestInit = {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };

  if (!isFormData) {
    config.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
    if (data) {
      config.body = JSON.stringify(data);
    }
  } else {
    if (data) {
      config.body = data;
    }
  }

  const res = await fetch(fullUrl, config);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}
