export type ApiResponse<T> =
  | {
    success: true;
    message: string;
    data: T;
    timestamp: string;
    path: string;
  }
  | {
    success: false;
    message: string;
    data: null;
    errors?: Record<string, string>;
    timestamp: string;
    path: string;
  };
