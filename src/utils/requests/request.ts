type TBody = Record<string, string>;

export enum ApiMethod {
  sendMessage = 'sendMessage',
  receiveNotification = 'receiveNotification',
  deleteNotification = 'deleteNotification',
}

export function request(
  method: string,
  apiMethod: ApiMethod,
  body?: TBody,
  receiptId?: number,
): Promise<Response> {
  const userApiToken: string | null = localStorage.getItem('userApiToken');
  const userId: string | null = localStorage.getItem('userId');

  if (!userApiToken || !userId) return Promise.reject();

  const url = userApiToken && userId
    ? `/waInstance${userId}/${apiMethod}/${userApiToken}`
    : '';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
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
