"use server";

import { createClient } from "@/lib/supabase/server";
import type { GameState, Panda } from "@/lib/types";
import { revalidatePath } from "next/cache";
import type { PandaGeneratorOutput } from "@/ai/flows/panda-generator-flow";

export async function getGameState(): Promise<GameState | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  try {
    const [profileRes, pandasRes, userTasksRes, tasksRes] = await Promise.all([
      supabase
        .from("profiles")
        .select("bamboo_balance")
        .eq("id", user.id)
        .single(),
      supabase
        .from("pandas")
        .select("*")
        .eq("user_id", user.id)
        .order("tamed_at", { ascending: false }),
      supabase.from("user_tasks").select("*").eq("user_id", user.id),
      supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: true }),
    ]);

    if (profileRes.error) throw profileRes.error;
    if (pandasRes.error) throw pandasRes.error;
    if (userTasksRes.error) throw userTasksRes.error;
    if (tasksRes.error) throw tasksRes.error;

    return {
      bambooBalance: profileRes.data.bamboo_balance,
      pandas: pandasRes.data.map((p: any) => ({
        ...p,
        tamedAt: new Date(p.tamed_at),
      })),
      userTasks: userTasksRes.data.map((ut: any) => ({
        task_id: ut.task_id,
        last_claimed_at: ut.last_claimed_at,
      })),
      tasks: tasksRes.data,
    };
  } catch (error) {
    return null;
  }
}

export async function getLeaderboardData() {
  const supabase = createClient();

  try {
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, username, avatar_url, bamboo_balance")
      .order("bamboo_balance", { ascending: false })
      .limit(10);

    if (profilesError) throw profilesError;

    const leaderboardUsers = await Promise.all(
      profiles.map(async (profile, index) => {
        const { count, error: countError } = await supabase
          .from("pandas")
          .select("id", { count: "exact", head: true })
          .eq("user_id", profile.id)
          .eq("rarity", "Ultra Rare");

        if (countError) {
          console.error(
            `Error fetching ultra rare count for ${profile.username}:`,
            countError,
          );
        }

        return {
          rank: index + 1,
          username: profile.username || "Panda Tamer",
          avatarUrl:
            profile.avatar_url || `https://placehold.co/100x100.png`,
          bamboo: profile.bamboo_balance,
          ultraRares: count ?? 0,
          title: "Panda Enthusiast",
        };
      }),
    );

    return leaderboardUsers;
  } catch (error) {
    return [];
  }
}

export async function claimTask(taskId: string, reward: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to claim tasks." };
  }

  try {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("bamboo_balance")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) throw new Error("Could not find your profile.");

    const { error: updateBalanceError } = await supabase
      .from("profiles")
      .update({ bamboo_balance: profile.bamboo_balance + reward })
      .eq("id", user.id);

    if (updateBalanceError) throw new Error("Failed to update bamboo balance.");

    const { error: upsertTaskError } = await supabase.from("user_tasks").upsert(
      {
        user_id: user.id,
        task_id: taskId,
        last_claimed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,task_id" },
    );

    if (upsertTaskError) throw new Error("Failed to update task cooldown.");

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { error: errorMessage };
  }
}

export async function addPanda(panda: Omit<Panda, "id" | "tamedAt">) {
  const TAME_COST = 100;
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to tame pandas." };
  }

  try {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("bamboo_balance")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      throw new Error("Could not find your profile.");
    }

    if (profile.bamboo_balance < TAME_COST) {
      return { error: "Not enough bamboo." };
    }

    const { error: updateBalanceError } = await supabase
      .from("profiles")
      .update({ bamboo_balance: profile.bamboo_balance - TAME_COST })
      .eq("id", user.id);

    if (updateBalanceError) {
      throw new Error("Failed to update bamboo balance.");
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
      throw new Error("Failed to add new panda to your collection.");
    }

    revalidatePath("/dashboard");
    revalidatePath("/pandas");
    revalidatePath("/tame");

    return { newPanda: { ...newPanda, tamedAt: new Date(newPanda.tamed_at) } };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { error: errorMessage };
  }
}

export async function updatePandaDetails(
  pandaId: string,
  details: PandaGeneratorOutput,
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update pandas." };
  }
  try {
    const { error } = await supabase
      .from("pandas")
      .update({ name: details.name, backstory: details.backstory })
      .eq("id", pandaId)
      .eq("user_id", user.id);

    if (error) {
      throw new Error("Failed to update panda details.");
    }

    revalidatePath("/dashboard");
    revalidatePath("/pandas");

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { error: errorMessage };
  }
}
