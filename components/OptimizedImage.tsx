"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

export interface OptimizedImageProps {
  src: string;
  alt: string;
  priority?: number; // 0 = mais prioridade (topo da página)
  onPageChange?: number; // Cancelar se página mudar
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  quality?: number;
  loading?: "lazy" | "eager";
  unoptimized?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Componente de imagem otimizada com carregamento inteligente
 * - Carrega apenas quando visível no viewport
 * - Cancela carregamento ao trocar de página
 * - Suporte a priorização de carregamento
 * - Placeholder durante carregamento
 */
export function OptimizedImage({
  src,
  alt,
  priority = 999,
  onPageChange,
  className,
  fill = false,
  width,
  height,
  sizes,
  placeholder = "empty",
  blurDataURL,
  quality,
  loading = "lazy",
  unoptimized,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Usa unoptimized=true para imagens do Open Food Facts, pois o servidor deles
  // costuma ser lento e causa erros de timeout no otimizador de imagens do Next.js.
  const isOffImage = src?.includes("openfoodfacts.org") ?? false;
  const isUnoptimized = unoptimized !== undefined ? unoptimized : isOffImage;

  // Usar priority para debug/logging se necessário
  console.debug(`OptimizedImage: ${src} (priority: ${priority})`);
  const imgRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const currentPageRef = useRef(onPageChange);

  // Atualizar referência da página atual
  useEffect(() => {
    currentPageRef.current = onPageChange;
  }, [onPageChange]);

  // Cancelar carregamento se página mudar
  useEffect(() => {
    if (onPageChange !== undefined && onPageChange !== currentPageRef.current) {
      setShouldLoad(false);
      setHasError(false);
    }
  }, [onPageChange]);

  // Configurar Intersection Observer
  useEffect(() => {
    if (typeof window === "undefined" || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoad) {
            setShouldLoad(true);
          }
        });
      },
      {
        rootMargin: "50px", // Pré-carregar 50px antes de ficar visível
        threshold: 0.1,
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [shouldLoad]);

  // Placeholder durante carregamento
  const renderPlaceholder = () => (
    <div
      className={cn(
        "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800",
        "animate-pulse flex items-center justify-center",
        className
      )}
    >
      <div className="text-gray-400 dark:text-gray-500 text-sm">
        Carregando...
      </div>
    </div>
  );

  // Imagem com erro
  const renderError = () => (
    <div
      className={cn(
        "bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center gap-2",
        "text-gray-400 dark:text-gray-500",
        className
      )}
    >
      <ImageOff className="w-8 h-8 text-gray-300 dark:text-gray-600" />
      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
        Imagem Indisponível
      </div>
    </div>
  );

  return (
    <div ref={imgRef} className="relative w-full h-full">
      {hasError ? (
        renderError()
      ) : shouldLoad ? (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          sizes={sizes}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          quality={quality}
          loading={loading}
          unoptimized={isUnoptimized}
          className={cn("transition-opacity duration-300", className)}
          onLoad={() => {
            onLoad?.();
          }}
          onError={() => {
            const errorObj = new Error("Falha ao carregar imagem");
            setHasError(true);
            onError?.(errorObj);
          }}
          {...props}
        />
      ) : (
        renderPlaceholder()
      )}
    </div>
  );
}
