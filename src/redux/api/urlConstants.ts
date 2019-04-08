const BASE_URL = 'http://localhost:3002/';

export const urlConstants = {
  BASE_URL,
};

export const getURL = (url: string) => urlConstants.BASE_URL + url;
