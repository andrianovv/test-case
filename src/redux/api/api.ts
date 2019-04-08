import request from 'superagent';
import { from } from 'rxjs';

import { getURL } from './urlConstants';
import { APIResponse } from 'Types/apiResponse';

export const post = <T>(url: string, payload?: object) => {
  const req = request
    .post(getURL(url))
    .send(payload);

  return from<APIResponse<T>>(req);
};

export const get = <T>(url: string, payload: object = {}) => {
  const req = request
    .get(getURL(url))
    .query(payload);

  return from<APIResponse<T>>(req);
};
