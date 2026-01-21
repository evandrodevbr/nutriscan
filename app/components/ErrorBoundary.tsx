"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary para capturar erros React e enviar ao Rybbit
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Enviar erro ao Rybbit se disponível
    if (typeof window !== "undefined" && window.rybbit) {
      try {
        window.rybbit.track("error", {
          message: error.message,
          stack: error.stack || undefined,
          componentStack: errorInfo.componentStack || undefined,
          errorName: error.name,
          timestamp: new Date().toISOString(),
        });
      } catch (trackingError) {
        console.error("[ErrorBoundary] Falha ao enviar erro ao Rybbit:", trackingError);
      }
    }

    console.error("[ErrorBoundary] Erro capturado:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 dark:bg-[#030712]">
          <div className="max-w-md w-full text-center space-y-6 border border-slate-200 p-10 rounded-[2.5rem] bg-slate-50 dark:bg-red-950/10 dark:border-red-900/20">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              Erro Inesperado
            </h1>
            <p className="text-slate-600 text-sm dark:text-slate-400 font-medium">
              {this.state.error?.message || "Algo deu errado. Por favor, recarregue a página."}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
