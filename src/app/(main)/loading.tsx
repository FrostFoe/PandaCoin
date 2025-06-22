
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-screen bg-secondary/30">
      {/* Sidebar Skeleton */}
      <div className="hidden md:flex flex-col w-64 border-r bg-background">
        <div className="flex items-center h-16 border-b px-6">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-32 ml-2" />
        </div>
        <div className="flex-1 px-4 py-4 space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="mt-auto p-4 border-t">
          <Skeleton className="h-10 w-full rounded-full" />
        </div>
      </div>
      {/* Main Content Skeleton */}
      <div className="flex flex-col flex-1">
        <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="md:hidden">
            <Skeleton className="h-10 w-28 rounded-full" />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2" />
          </div>
          <div className="space-y-4 mt-8">
            <Skeleton className="h-8 w-48" />
            <div className="flex space-x-6">
              <Skeleton className="h-40 w-80 rounded-xl" />
              <Skeleton className="h-40 w-80 rounded-xl" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
