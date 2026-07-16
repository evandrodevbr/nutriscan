"use client";
import { cn } from "@/lib/utils";

interface SkeletonProps { className?: string; }

function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-[var(--border-subtle)]",
        className
      )}
    />
  );
}

export function ProductSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("min-h-screen bg-[var(--bg-base)]", className)}>
      {/* Sticky header skeleton */}
      <div className="sticky top-0 z-50 bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] h-20">
        <div className="container-editorial h-full flex items-center gap-6">
          <Skeleton className="w-9 h-9 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </div>

      <div className="container-editorial py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left column */}
          <div className="lg:col-span-5 space-y-6">
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <div className="card-warm rounded-xl p-8 space-y-4">
              <Skeleton className="h-3 w-24" />
              {[1,2,3].map(i => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[1,2].map(i => (
                <div key={i} className="card-warm rounded-xl p-8 space-y-4">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-40" />
                  <Skeleton className="w-20 h-20 rounded-full" />
                </div>
              ))}
            </div>
            <div className="card-warm rounded-xl p-8 space-y-4">
              <Skeleton className="h-5 w-48" />
              <div className="grid grid-cols-2 gap-4">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-1.5 w-full rounded-full" />
                  </div>
                ))}
              </div>
            </div>
            <div className="card-warm rounded-xl p-8 space-y-3">
              <Skeleton className="h-5 w-36" />
              {[1,2,3,4].map(i => <Skeleton key={i} className="h-4 w-full" />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("card-warm rounded-xl overflow-hidden", className)}>
      <Skeleton className="aspect-square w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="pt-3 border-t border-[var(--border-subtle)] space-y-2">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
          ))}
        </div>
        <Skeleton className="h-9 w-full rounded" />
      </div>
    </div>
  );
}

export function NutritionBarSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-12" />
      </div>
      <Skeleton className="h-1.5 w-full rounded-full" />
    </div>
  );
}

export function BadgeSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Skeleton className="w-14 h-14 rounded-full" />
      <div className="space-y-1.5">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}
