/**
 * Definições de tipos para a API do Rybbit Analytics
 * Estende a interface Window global para incluir o objeto rybbit
 */

interface RybbitTrackEvent {
  message?: string;
  stack?: string | null;
  componentStack?: string | null;
  errorName?: string;
  timestamp?: string;
  type?: string;
  filename?: string | null;
  lineno?: number | null;
  colno?: number | null;
  [key: string]: unknown;
}

interface Rybbit {
  track(eventName: string, data?: RybbitTrackEvent): void;
}

declare global {
  interface Window {
    rybbit?: Rybbit;
  }
}

export {};
