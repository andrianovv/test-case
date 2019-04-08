export const isNotEmptyArray = (value: any): boolean =>
  Array.isArray(value) && !!value.length;
