"use server";

import { ai } from "@/ai/genkit";
import { z } from "zod";

const PandaGeneratorInputSchema = z.object({
  rarity: z
    .enum(["Common", "Rare", "Ultra Rare"])
    .describe(
      "The rarity of the panda, which should influence the tone and epicness of the name and backstory.",
    ),
});
export type PandaGeneratorInput = z.infer<typeof PandaGeneratorInputSchema>;

const PandaGeneratorOutputSchema = z.object({
  name: z
    .string()
    .describe(
      "A whimsical, cute, or funny name for a panda. Should be short and memorable, around 2-3 words max.",
    ),
  backstory: z
    .string()
    .describe(
      "A short, creative, and family-friendly backstory for the panda (2-3 sentences). The story should match the panda's given rarity.",
    ),
});
export type PandaGeneratorOutput = z.infer<typeof PandaGeneratorOutputSchema>;

const prompt = ai.definePrompt({
  name: "pandaGeneratorPrompt",
  input: { schema: PandaGeneratorInputSchema },
  output: { schema: PandaGeneratorOutputSchema },
  prompt: `You are a Panda Namer Extraordinaire, a world-renowned expert in crafting identities for newly discovered pandas. Your task is to generate a name and a short backstory for a panda based on its rarity.

The tone should be whimsical, humorous, and delightful.

Rarity: {{{rarity}}}

Guidelines by Rarity:
- Common: A cute, simple name and a funny, everyday-life backstory.
- Rare: A more distinguished or adventurous name and a backstory hinting at a special talent or a funny, uncommon event.
- Ultra Rare: An epic, legendary, or cosmic-sounding name and a backstory that is truly extraordinary, mythical, or hilariously over-the-top.

Please generate a name and backstory that fits the "{{{rarity}}}" rarity level.`,
});

const pandaGeneratorFlow = ai.defineFlow(
  {
    name: "pandaGeneratorFlow",
    inputSchema: PandaGeneratorInputSchema,
    outputSchema: PandaGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  },
);

export async function generatePandaDetails(
  input: PandaGeneratorInput,
): Promise<PandaGeneratorOutput> {
  return pandaGeneratorFlow(input);
}
