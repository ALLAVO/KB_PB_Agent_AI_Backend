import { Newspaper } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { summarizeNews } from '@/ai/flows/summarize-news';

interface LatestNewsSummarySectionProps {
  companyName: string;
}

// Mock news articles - in a real app, these would be fetched dynamically
const mockNewsArticles = (companyName: string) => [
  `${companyName} announced record profits in the last quarter, driven by strong sales in its new product line.`,
  `Market analysts are increasingly bullish on ${companyName} stock following its recent innovations and positive market reception.`,
  `A new strategic partnership was unveiled by ${companyName}, expected to expand its reach in emerging markets.`,
  `${companyName} is investing heavily in R&D, with a focus on sustainable technologies for future growth.`,
  `Regulatory changes in the sector might pose new challenges for ${companyName}, but the company states it is well-prepared.`
];

export async function LatestNewsSummarySection({ companyName }: LatestNewsSummarySectionProps) {
  if (!companyName) return null;

  let summary = "Could not generate news summary at this time.";
  let errorOccurred = false;
  try {
    const result = await summarizeNews({ companyName, newsArticles: mockNewsArticles(companyName) });
    summary = result.summary;
  } catch (e) {
    console.error("Error summarizing news:", e);
    errorOccurred = true;
  }
  
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-primary">
          <Newspaper className="mr-3 h-7 w-7" />
          AI-Powered News Summary
        </CardTitle>
        <CardDescription>Key insights from recent news about {companyName.toUpperCase()}.</CardDescription>
      </CardHeader>
      <CardContent>
        {errorOccurred ? (
          <p className="text-sm text-destructive">{summary}</p>
        ) : (
          <p className="text-foreground leading-relaxed whitespace-pre-line">{summary}</p>
        )}
      </CardContent>
    </Card>
  );
}
