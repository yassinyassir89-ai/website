import { Skeleton } from '@/components/ui/skeleton'

export default function ProductLoading() {
  return (
    <div className="luxury-container py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-10">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        {/* Images */}
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full" />
          <div className="flex gap-3">
            {Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-20 flex-shrink-0" />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-px w-16" />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="w-4 h-4" />
              ))}
            </div>
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-6 w-20" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <Skeleton className="h-px w-full" />

          <div className="space-y-4">
            <Skeleton className="h-5 w-20" />
            <div className="flex gap-2">
              {Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-10 w-10" />
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Skeleton className="h-14 flex-1" />
            <Skeleton className="h-14 w-14" />
          </div>
        </div>
      </div>
    </div>
  )
}
