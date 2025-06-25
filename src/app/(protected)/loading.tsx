import { Skeleton } from "@/components/ui/skeleton";
import { PandaIcon } from "@/components/shared/PandaIcon";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <a className="flex items-center gap-2">
              <PandaIcon className="h-8 w-8 text-primary" />
              <span className="font-bold font-fredoka text-lg hidden sm:inline-block">
                Bamboo Tame
              </span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6 md:py-10">
        <div className="space-y-10">
          <Skeleton className="h-12 w-full rounded-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="flex space-x-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-48 w-80 rounded-xl shrink-0" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-56 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
