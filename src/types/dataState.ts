export class DataState<T> {
  loading: boolean;
  error: Error | string | null;
  data: T | null;

  static initial() {
    return {
      loading: false,
      error: null,
      data: null,
    };
  }
}
