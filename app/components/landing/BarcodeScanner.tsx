"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, Camera, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BarcodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (barcode: string) => void;
}

export function BarcodeScanner({
  isOpen,
  onClose,
  onScan,
}: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const scannerRef = useRef<HTMLDivElement>(null);
  const qrCodeScanner = useRef<any>(null);

  // Verificar se é mobile
  const isMobile =
    typeof window !== "undefined" &&
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Verificar se é HTTPS ou localhost
  const isSecure =
    typeof window !== "undefined" &&
    (window.location.protocol === "https:" ||
      window.location.hostname === "localhost");

  const startScanner = useCallback(async () => {
    try {
      setError(null);
      setIsScanning(true);

      // Dynamic import para carregar apenas quando necessário
      const { Html5QrcodeScanner } = await import("html5-qrcode");

      if (!scannerRef.current) return;

      qrCodeScanner.current = new Html5QrcodeScanner(
        scannerRef.current.id,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        false
      );

      qrCodeScanner.current.render(
        (decodedText: string) => {
          // Validar se é um código de barras válido
          if (isValidBarcode(decodedText)) {
            setSuccess(true);
            setTimeout(() => {
              onScan(decodedText);
              onClose();
            }, 1000);
          } else {
            setError("Código de barras inválido. Tente novamente.");
          }
        },
        (error: string) => {
          // Ignorar erros de "No QR code found" para não spam
          if (!error.includes("No QR code found")) {
            console.warn("Erro do scanner:", error);
          }
        }
      );
    } catch (err) {
      console.error("Erro ao iniciar scanner:", err);
      setError("Erro ao acessar a câmera. Verifique as permissões.");
      setIsScanning(false);
    }
  }, [onScan, onClose]);

  useEffect(() => {
    if (isOpen && isMobile && isSecure) {
      startScanner();
    } else if (isOpen && !isMobile) {
      setError("Scanner de câmera disponível apenas em dispositivos móveis");
    } else if (isOpen && !isSecure) {
      setError("Scanner de câmera requer conexão segura (HTTPS)");
    }

    return () => {
      stopScanner();
    };
  }, [isOpen, isMobile, isSecure, startScanner]);

  const stopScanner = () => {
    if (qrCodeScanner.current) {
      qrCodeScanner.current.clear().catch((err: unknown) => {
        console.warn("Erro ao parar scanner:", err);
      });
      qrCodeScanner.current = null;
    }
    setIsScanning(false);
  };

  const isValidBarcode = (code: string): boolean => {
    const cleanCode = code.replace(/\D/g, "");
    return cleanCode.length >= 8 && cleanCode.length <= 13;
  };

  const handleClose = () => {
    stopScanner();
    setError(null);
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md mx-auto overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Scanner de Código de Barras
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="w-8 h-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          {!isMobile && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Scanner de câmera disponível apenas em dispositivos móveis
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Use o campo de busca para digitar o código de barras manualmente
              </p>
            </div>
          )}

          {!isSecure && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Scanner de câmera requer conexão segura (HTTPS)
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Use o campo de busca para digitar o código de barras manualmente
              </p>
            </div>
          )}

          {isMobile && isSecure && (
            <div className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Código de barras detectado com sucesso!
                  </p>
                </div>
              )}

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Aponte a câmera para o código de barras do produto
                </p>

                {/* Scanner Container */}
                <div
                  id="barcode-scanner"
                  ref={scannerRef}
                  className="w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center"
                >
                  {!isScanning && !error && (
                    <div className="text-center">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Iniciando câmera...
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Mantenha o código de barras dentro da área destacada
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancelar
            </Button>
            {isMobile && isSecure && (
              <Button
                onClick={() => {
                  setError(null);
                  setSuccess(false);
                  startScanner();
                }}
                className="flex-1"
                disabled={isScanning}
              >
                {isScanning ? "Escaneando..." : "Tentar Novamente"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
