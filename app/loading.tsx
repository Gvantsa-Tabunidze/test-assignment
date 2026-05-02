
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonPage() {
  return (
    <div className="min-h-screen w-full p-6 space-y-6">

      {/* header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>

      {/* grid content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>

      {/* footer / pagination */}
      <div className="flex justify-between items-center mt-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-24" />
      </div>

    </div>
  )
}