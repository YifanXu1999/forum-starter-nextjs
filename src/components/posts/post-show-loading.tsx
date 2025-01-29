import { Skeleton } from "@heroui/skeleton"

export default function PostShowLoading() {
  return (
    <div>
      <div className="my-2">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="p-4 border rounded-xl border-gray-200">
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  )
}