import { Skeleton } from '@/components/ui/skeleton'

export default function BoutiqueLoading() {
  return (
    <div className="luxury-container py-12">
      <div className="mb-10">
        <Skeleton className="h-6 w-48 mb-3" />
        <Skeleton className="h-10 w-72 mb-4" />
        <Skeleton className="h-px w-16" />
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Filters skeleton */}
        <aside className="lg:w-64 flex-shrink-0 space-y-6">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-px w-full" />
              <div className="space-y-2">
                {Array(4).fill(0).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-full" />
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* Products skeleton */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-9 w-40" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array(12).fill(0).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[3/4] w-full" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
