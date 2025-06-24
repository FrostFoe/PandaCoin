"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { Task } from "@/lib/types";

async function getAdminUser() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return null;
  }
  return user;
}

export async function getTasks(): Promise<Task[]> {
  const user = await getAdminUser();
  if (!user) {
    return [];
  }
  const supabase = createClient();
  const { data, error } = await supabase.from("tasks").select("*").order("created_at");

  if (error) {
    console.error("Error fetching tasks:", error.message);
    return [];
  }
  return data;
}

const taskSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3, "Name must be at least 3 characters."),
  description: z.string().optional().nullable(),
  reward: z.coerce.number().int().min(1, "Reward must be at least 1."),
  cooldown: z.coerce.number().int().min(1, "Cooldown must be at least 1 hour."),
});

export async function saveTask(formData: FormData) {
  const user = await getAdminUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const data = Object.fromEntries(formData.entries());
  const validatedFields = taskSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid data", details: validatedFields.error.flatten().fieldErrors };
  }

  const { id, ...taskData } = validatedFields.data;
  const supabase = createClient();

  if (id) {
    // Update existing task
    const { error } = await supabase.from("tasks").update(taskData).eq("id", id);
    if (error) {
      console.error("Error updating task:", error);
      return { error: "Failed to update task." };
    }
  } else {
    // Create new task
    const { error } = await supabase.from("tasks").insert(taskData);
    if (error) {
      console.error("Error creating task:", error);
      return { error: "Failed to create task." };
    }
  }

  revalidatePath("/admin");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteTask(taskId: string) {
  const user = await getAdminUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  if (!taskId) {
    return { error: "Task ID is required." };
  }

  const supabase = createClient();
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    console.error("Error deleting task:", error);
    return { error: "Failed to delete task." };
  }

  revalidatePath("/admin");
  revalidatePath("/dashboard");
  return { success: true };
}
