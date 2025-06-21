import { Skeleton } from "@/components/ui/skeleton";
import { PandaIcon } from "@/components/icons/panda-icon";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
       <header className="sticky top-0 z-40 flex h-20 items-center gap-4 border-b bg-background/95 backdrop-blur-sm">
        <div className="container flex items-center gap-4">
            <PandaIcon className="h-8 w-8 text-primary" />
            <Skeleton className="h-7 w-32" />
          <div className="ml-auto flex items-center gap-4">
            <Skeleton className="h-10 w-28 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </header>

      <main className="flex-1 bg-secondary/30">
        <div className="container py-8">
           <div className="px-4 md:px-0">
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-12 w-full mt-4 rounded-full" />
          </div>
           <div className="space-y-4 mt-8">
            <Skeleton className="h-8 w-48" />
            <div className="flex space-x-6">
              <Skeleton className="h-40 w-80 rounded-xl" />
              <Skeleton className="h-40 w-80 rounded-xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
