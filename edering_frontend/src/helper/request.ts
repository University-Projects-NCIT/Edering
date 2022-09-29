import { envData } from 'config';
import { ApiRequestMethods } from 'types';

export const request = async <D>({
  url,
  method = ApiRequestMethods.get,
  data,
}: {
  url: string;
  method?: ApiRequestMethods;
  data?: D;
}) => {
  if (url) {
    url = envData.baseURL + url;
  }
  let options = {
    method,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  };
  console.log('options', options);
  console.log('url', url);

  try {
    const response = await fetch(url, options);
    console.log('response', response);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (e) {
    alert(e);
  }
};
