import { Skeleton } from '@/components/ui/skeleton'

export default function HomeLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <Skeleton className="h-[85vh] min-h-[600px] w-full" />

      {/* Categories skeleton */}
      <div className="py-20 luxury-container">
        <div className="text-center mb-14 space-y-3">
          <Skeleton className="h-4 w-24 mx-auto" />
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-px w-16 mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array(5).fill(0).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] w-full" />
          ))}
        </div>
      </div>

      {/* Products skeleton */}
      <div className="py-20 bg-white luxury-container">
        <div className="flex justify-between mb-12">
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-56" />
          </div>
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-product w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
