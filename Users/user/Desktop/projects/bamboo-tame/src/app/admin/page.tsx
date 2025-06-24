import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTasks } from "./actions";
import { TaskDataTable } from "./components/task-data-table";

export default async function AdminPage() {
  const tasks = await getTasks();

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
       <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="ml-auto">
            <Button asChild>
                <Link href="/dashboard">Return to App</Link>
            </Button>
          </div>
       </header>
       <main className="p-4 sm:px-6 sm:py-0">
         <p className="text-muted-foreground mb-4">A secure area to manage the game's dynamic content.</p>
         <TaskDataTable initialTasks={tasks} />
       </main>
    </div>
  );
}
