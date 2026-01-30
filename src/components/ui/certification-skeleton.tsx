'use client';

import { Skeleton } from './skeleton';

export function CertificationSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card/80 backdrop-blur-sm overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
          <div className="flex-grow space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-8 w-8 rounded" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function CertificationPathSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card/80 backdrop-blur-sm">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-32 rounded" />
            <Skeleton className="h-10 w-10 rounded" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="flex flex-wrap gap-1">
          <Skeleton className="h-6 w-16 rounded" />
          <Skeleton className="h-6 w-20 rounded" />
          <Skeleton className="h-6 w-14 rounded" />
          <Skeleton className="h-6 w-18 rounded" />
        </div>
      </div>
    </div>
  );
}

export function CertificationsSkeleton({ 
  type = 'individual', 
  count = 6 
}: { 
  type?: 'individual' | 'path'; 
  count?: number; 
}) {
  const SkeletonComponent = type === 'path' ? CertificationPathSkeleton : CertificationSkeleton;
  
  return (
    <div className={`grid gap-6 ${type === 'path' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}