const BASE_URL = "https://api.green-api.com";

type TBody = Record<string, string>;

export function request (
  method: string,
  apiMethod: string,
  userId: string,
  body?: TBody,
  receiptId?: number,
  ): Promise<any> { // any заменить на конкретную структуру данных ApiResponse для каждого промиса
    const userApiToken = localStorage.getItem('userApiToken');
    
    const url = `${BASE_URL}/waInstance${userId}/${apiMethod}/${userApiToken}`

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000, http://localhost:3000/home",
      "User-Agent": "PostmanRuntime/7.32.2",
      "Connection": "keep-alive",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept": "*/*",
      "mode": "no-cors",
    }
    return fetch (
      receiptId ? url + `/${receiptId}` : url,
      {
        headers,
        method,
        mode: 'cors',
        body: JSON.stringify(body),
      }
    );
  };