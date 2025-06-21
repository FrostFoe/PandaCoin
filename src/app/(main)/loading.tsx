import { Skeleton } from "@/components/ui/skeleton";
import { PandaIcon } from "@/components/icons/panda-icon";

export default function Loading() {
  // A skeleton that mimics the main layout for a smooth loading experience between routes.
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr]">
      {/* Sidebar Skeleton */}
      <div className="relative hidden h-screen border-r bg-card p-4 transition-all duration-300 ease-in-out md:flex flex-col w-64">
        <div className="flex items-center gap-2 pb-4 border-b mb-4">
            <PandaIcon className="h-8 w-8 text-primary" />
            <Skeleton className="h-7 w-32" />
        </div>
        <div className="flex-1 space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
        <div className="mt-auto">
            <Skeleton className="h-12 w-full" />
        </div>
      </div>
      
      {/* Main Content Skeleton */}
      <div className="flex flex-col">
        {/* Header Skeleton */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <div className="md:hidden">
                <Skeleton className="h-10 w-10" />
            </div>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="ml-auto flex-1 sm:flex-initial" />
                <Skeleton className="h-10 w-28 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-24 hidden md:block" />
            </div>
        </header>

        {/* Page Content Skeleton */}
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-8">
            <div className="flex flex-col gap-8">
                <div>
                    <Skeleton className="h-9 w-1/2 mb-2" />
                    <Skeleton className="h-5 w-1/3" />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="aspect-square">
                            <Skeleton className="w-full h-full rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
