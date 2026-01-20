"use client";

import { useEffect } from "react";

/**
 * Componente para configurar error tracking global do Rybbit
 * Captura erros JavaScript não tratados e Promise rejections
 */
export function ErrorTracking() {
  useEffect(() => {
    // Handler para erros JavaScript não capturados
    const handleError = (event: ErrorEvent) => {
      if (typeof window !== "undefined" && (window as any).rybbit) {
        try {
          (window as any).rybbit.track("error", {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            stack: event.error?.stack,
            errorName: event.error?.name,
            timestamp: new Date().toISOString(),
            type: "javascript_error",
          });
        } catch (trackingError) {
          console.error("[ErrorTracking] Falha ao enviar erro ao Rybbit:", trackingError);
        }
      }
    };

    // Handler para Promise rejections não tratadas
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (typeof window !== "undefined" && (window as any).rybbit) {
        try {
          const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
          
          (window as any).rybbit.track("error", {
            message: error.message || String(event.reason),
            stack: error.stack,
            errorName: error.name || "UnhandledPromiseRejection",
            timestamp: new Date().toISOString(),
            type: "unhandled_promise_rejection",
          });
        } catch (trackingError) {
          console.error("[ErrorTracking] Falha ao enviar rejection ao Rybbit:", trackingError);
        }
      }
    };

    // Adicionar listeners
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    // Cleanup
    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  return null;
}
