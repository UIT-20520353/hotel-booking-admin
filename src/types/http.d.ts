export type TErrorResponse = {
  title: string;
  status: number;
  detail: string;
};

export type THttpResponse<T> = {
  ok: boolean;
  status: number;
  body?: T;
  error?: TErrorResponse;
};
