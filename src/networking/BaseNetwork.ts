async function fetchHandler<T>(url: string, config: RequestInit): Promise<T> {
  let options = {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY as string,
    },
  };
  let response = await fetch(url, options);

  if (!response.ok) throw new Error(`Failed to fetch ${url}, status: ${response.status}`);
  return response.json();
}

async function get<T>(url: string, config?: RequestInit): Promise<T> {
  const options = { method: 'GET', ...config };
  return fetchHandler(url, options);
}

async function post<T, U>(url: string, body: T, config?: RequestInit): Promise<U> {
  const options = { method: 'POST', body: JSON.stringify(body), ...config };
  return fetchHandler(url, options);
}

export { get, post };
