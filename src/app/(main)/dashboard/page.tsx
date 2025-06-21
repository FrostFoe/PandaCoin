import { TaskCard } from "@/components/dashboard/task-card";
import { tasks } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Welcome back, PandaProdigy!</h1>
            <p className="text-muted-foreground">Here are your daily tasks. Complete them to earn more bamboo!</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    </div>
  );
}
