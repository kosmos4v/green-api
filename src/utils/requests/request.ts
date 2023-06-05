const BASE_URL = 'https://api.green-api.com';

type TBody = Record<string, string>;

export function request(
  method: string,
  apiMethod: string,
  body?: TBody,
  receiptId?: number,
): Promise<Response> {
  const userApiToken: string | null = localStorage.getItem('userApiToken');
  const userId: string | null = localStorage.getItem('userId');

  const url = userApiToken && userId
    ? `${BASE_URL}/waInstance${userId}/${apiMethod}/${userApiToken}`
    : '';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000, http://localhost:3000/home',
    'User-Agent': 'PostmanRuntime/7.32.2',
    Connection: 'keep-alive',
    'Accept-Encoding': 'gzip, deflate, br',
    Accept: '*/*',
    mode: 'no-cors',
  };
  return fetch(
    receiptId ? `${url}/${receiptId}` : url,
    {
      headers,
      method,
      mode: 'cors',
      body: JSON.stringify(body),
    },
  );
}
