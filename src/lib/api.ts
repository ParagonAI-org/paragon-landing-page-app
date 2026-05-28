/**
 * Basic fetch wrapper for making API requests.
 * Handles JSON parsing and basic error handling.
 * @param endpoint - The API endpoint to call (relative to the base URL).
 * @param options - Fetch options (method, headers, body, etc.).
 * @returns A promise that resolves with the JSON response.
 * @throws An error if the network response is not ok.
 */
export async function fetchApi<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error(
      'API URL is not configured. Set NEXT_PUBLIC_API_URL environment variable.',
    )
  }

  const url = `${apiUrl}${endpoint}`
  const defaultHeaders = {
    'Content-Type': 'application/json',
    // Add other default headers like Authorization if needed
    // 'Authorization': `Bearer ${getToken()}`,
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      // Attempt to parse error details from the response body
      let errorData: Record<string, unknown> = {}
      try {
        errorData = await response.json()
      } catch {
        // Ignore if the body isn't valid JSON
      }
      throw new Error(
        `API request failed with status ${response.status}: ${
          errorData?.message || response.statusText
        }`,
      )
    }

    // Handle cases where the response might be empty (e.g., 204 No Content)
    if (response.status === 204) {
      return undefined as T // Or null, depending on expected behavior
    }

    return (await response.json()) as T
  } catch (error) {
    console.error(`API request to ${endpoint} failed:`, error)
    // Re-throw the error to be handled by the caller
    throw error
  }
}

// Example usage:
/*
interface User {
  id: number;
  name: string;
}

async function getUser(id: number): Promise<User> {
  return fetchApi<User>(`/users/${id}`);
}

async function createUser(data: { name: string }): Promise<User> {
  return fetchApi<User>('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
*/
