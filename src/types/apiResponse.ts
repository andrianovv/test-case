import { Response } from 'superagent';

export interface APIResponse<T> extends Response {
  body: T;
}
