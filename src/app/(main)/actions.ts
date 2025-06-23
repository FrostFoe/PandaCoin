"use server";

import { createClient } from "@/lib/supabase/server";
import type { GameState, Panda, Task, UserTask } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { tasks as allTasks } from "@/lib/data";
import type { PandaGeneratorOutput } from "@/ai/flows/panda-generator-flow";

export async function getGameState(): Promise<GameState | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("bamboo_balance")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    return null;
  }

  const { data: pandas, error: pandasError } = await supabase
    .from("pandas")
    .select("*")
    .eq("user_id", user.id)
    .order("tamed_at", { ascending: false });

  if (pandasError) {
    console.error("Error fetching pandas:", pandasError);
    return null;
  }

  const { data: userTasks, error: tasksError } = await supabase
    .from("user_tasks")
    .select("*")
    .eq("user_id", user.id);

  if (tasksError) {
    console.error("Error fetching user tasks:", tasksError);
    return null;
  }

  return {
    bambooBalance: profile.bamboo_balance,
    pandas: pandas.map((p) => ({ ...p, tamedAt: new Date(p.tamed_at) })),
    userTasks: userTasks.map((ut) => ({
      task_id: ut.task_id,
      last_claimed_at: ut.last_claimed_at,
    })),
  };
}

export async function claimTask(task: Task) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to claim tasks." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("bamboo_balance")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return { error: "Could not find your profile." };
  }

  const { error: updateBalanceError } = await supabase
    .from("profiles")
    .update({ bamboo_balance: profile.bamboo_balance + task.reward })
    .eq("id", user.id);

  if (updateBalanceError) {
    return { error: "Failed to update bamboo balance." };
  }

  const { error: upsertTaskError } = await supabase
    .from("user_tasks")
    .upsert(
      {
        user_id: user.id,
        task_id: task.id,
        last_claimed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,task_id" },
    );

  if (upsertTaskError) {
    return { error: "Failed to update task cooldown." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function addPanda(panda: Omit<Panda, "id" | "tamedAt">) {
  const TAME_COST = 100;
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to tame pandas." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("bamboo_balance")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return { error: "Could not find your profile." };
  }

  if (profile.bamboo_balance < TAME_COST) {
    return { error: "Not enough bamboo." };
  }

  const { error: updateBalanceError } = await supabase
    .from("profiles")
    .update({ bamboo_balance: profile.bamboo_balance - TAME_COST })
    .eq("id", user.id);

  if (updateBalanceError) {
    return { error: "Failed to update bamboo balance." };
  }

  const { data: newPanda, error: insertPandaError } = await supabase
    .from("pandas")
    .insert({
      user_id: user.id,
      name: panda.name,
      rarity: panda.rarity,
      image_url: panda.imageUrl,
      backstory: panda.backstory,
      tamed_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (insertPandaError) {
    return { error: "Failed to add new panda to your collection." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/pandas");
  revalidatePath("/tame");

  return { newPanda: { ...newPanda, tamedAt: new Date(newPanda.tamed_at) } };
}

export async function updatePandaDetails(
  pandaId: string,
  details: PandaGeneratorOutput,
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update pandas." };
  }

  const { error } = await supabase
    .from("pandas")
    .update({ name: details.name, backstory: details.backstory })
    .eq("id", pandaId)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Failed to update panda details." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/pandas");

  return { success: true };
}
