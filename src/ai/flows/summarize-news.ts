// SummarizeNews Story: As a user, I want the application to summarize recent news articles about a company using GenAI so that I can quickly understand key events.

'use server';

/**
 * @fileOverview Summarizes recent news articles about a company using GenAI.
 *
 * - summarizeNews - A function that summarizes news articles about a company.
 * - SummarizeNewsInput - The input type for the summarizeNews function.
 * - SummarizeNewsOutput - The return type for the summarizeNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeNewsInputSchema = z.object({
  companyName: z.string().describe('The name of the company to summarize news for.'),
  newsArticles: z.array(z.string()).describe('An array of recent news articles about the company.'),
});
export type SummarizeNewsInput = z.infer<typeof SummarizeNewsInputSchema>;

const SummarizeNewsOutputSchema = z.object({
  summary: z.string().describe('A summary of the recent news articles about the company.'),
});
export type SummarizeNewsOutput = z.infer<typeof SummarizeNewsOutputSchema>;

export async function summarizeNews(input: SummarizeNewsInput): Promise<SummarizeNewsOutput> {
  return summarizeNewsFlow(input);
}

const summarizeNewsPrompt = ai.definePrompt({
  name: 'summarizeNewsPrompt',
  input: {schema: SummarizeNewsInputSchema},
  output: {schema: SummarizeNewsOutputSchema},
  prompt: `Summarize the following news articles about {{companyName}}:\n\n{{#each newsArticles}}- {{{this}}}\n{{/each}}\n\nProvide a concise summary of the key events and overall sentiment.`,
});

const summarizeNewsFlow = ai.defineFlow(
  {
    name: 'summarizeNewsFlow',
    inputSchema: SummarizeNewsInputSchema,
    outputSchema: SummarizeNewsOutputSchema,
  },
  async input => {
    const {output} = await summarizeNewsPrompt(input);
    return output!;
  }
);
