export interface Toast {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  header?: string; // Optional header for each toast
  delay?: number;  // Optional per-toast delay
}
