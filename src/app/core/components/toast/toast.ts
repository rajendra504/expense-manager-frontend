export enum ToastType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO'
}

export interface AppToast {
  id?: number;
  title: string;
  message: string;
  type: ToastType;
  delay?: number;
}
