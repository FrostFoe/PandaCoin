"use client";

import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/lib/hooks/use-toast";
import type { Task } from "@/lib/types";
import { getTasks, saveTask } from "@/actions/admin";

const taskSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3, "Name must be at least 3 characters."),
  description: z.string().optional(),
  reward: z.coerce.number().int().min(1, "Reward must be at least 1."),
  cooldown: z.coerce.number().int().min(1, "Cooldown must be at least 1 hour."),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  task: Task | null;
  onFormSubmit: (tasks: Task[]) => void;
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} form="task-form">
      {pending ? "Saving..." : isEditing ? "Save Changes" : "Create Task"}
    </Button>
  );
}

export function TaskFormDialog({
  isOpen,
  setIsOpen,
  task,
  onFormSubmit,
}: TaskFormDialogProps) {
  const isEditing = !!task;
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      id: task?.id,
      name: task?.name || "",
      description: task?.description || "",
      reward: task?.reward || 10,
      cooldown: task?.cooldown || 24,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (task) {
        reset(task);
      } else {
        reset({
          id: undefined,
          name: "",
          description: "",
          reward: 10,
          cooldown: 24,
        });
      }
    }
  }, [task, isOpen, reset]);

  const handleFormSubmit = async (data: TaskFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, String(value));
      }
    });

    const result = await saveTask(formData);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: result.error,
      });
    } else {
      toast({
        title: `Task ${isEditing ? "Updated" : "Created"}`,
        description: `The task "${data.name}" has been saved.`,
      });
      const updatedTasks = await getTasks();
      onFormSubmit(updatedTasks);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Task" : "Create New Task"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Make changes to the task details below."
              : "Fill out the form to add a new task to the game."}
          </DialogDescription>
        </DialogHeader>

        <form
          id="task-form"
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-4"
        >
          {task?.id && <input type="hidden" {...register("id")} />}
          <div>
            <Label htmlFor="name">Task Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} />
            {errors.description && (
              <p className="text-sm text-destructive mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reward">Reward</Label>
              <Input id="reward" type="number" {...register("reward")} />
              {errors.reward && (
                <p className="text-sm text-destructive mt-1">
                  {errors.reward.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="cooldown">Cooldown (Hours)</Label>
              <Input id="cooldown" type="number" {...register("cooldown")} />
              {errors.cooldown && (
                <p className="text-sm text-destructive mt-1">
                  {errors.cooldown.message}
                </p>
              )}
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <SubmitButton isEditing={isEditing} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
