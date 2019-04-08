import { api } from 'Redux/api';
import { History } from 'history';

export type EpicMiddlewareDependencies = {
  api: typeof api;
  browserHistory: History;
};
