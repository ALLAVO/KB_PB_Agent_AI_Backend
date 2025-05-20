import { Smile, Frown, TrendingUp, TrendingDown, Gauge } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface NewsSentimentSectionProps {
  companyName: string;
}

export async function NewsSentimentSection({ companyName }: NewsSentimentSectionProps) {
  // Placeholder data
  const sentimentData = {
    overallScore: 75, // Example: 0-100 scale
    positiveNews: [
      `Positive development A for ${companyName.toUpperCase()}.`,
      `Successful product launch B by ${companyName.toUpperCase()}.`,
    ],
    negativeNews: [
      `Market challenge C affecting ${companyName.toUpperCase()}.`,
    ],
    neutralNewsCount: 5,
  };

  const getSentimentColor = (score: number) => {
    if (score > 70) return "bg-green-500";
    if (score > 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-primary">
          <Gauge className="mr-3 h-7 w-7" />
          News Sentiment Analysis
        </CardTitle>
        <CardDescription>Public perception of {companyName.toUpperCase()} based on recent news.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-foreground">Overall Sentiment Score</span>
            <span className={`text-sm font-semibold ${sentimentData.overallScore > 70 ? 'text-green-600' : sentimentData.overallScore > 40 ? 'text-yellow-600' : 'text-red-600'}`}>
              {sentimentData.overallScore} / 100
            </span>
          </div>
          <Progress value={sentimentData.overallScore} aria-label={`Sentiment score: ${sentimentData.overallScore} out of 100`} className="h-3 [&>div]:bg-primary" />
        </div>

        {sentimentData.positiveNews.length > 0 && (
          <div>
            <h4 className="font-semibold text-lg text-green-600 flex items-center mb-2">
              <TrendingUp className="mr-2 h-5 w-5" /> Positive Highlights
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
              {sentimentData.positiveNews.map((news, index) => (
                <li key={`pos-${index}`}>{news}</li>
              ))}
            </ul>
          </div>
        )}

        {sentimentData.negativeNews.length > 0 && (
          <div>
            <h4 className="font-semibold text-lg text-red-600 flex items-center mb-2">
              <TrendingDown className="mr-2 h-5 w-5" /> Negative Concerns
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
              {sentimentData.negativeNews.map((news, index) => (
                <li key={`neg-${index}`}>{news}</li>
              ))}
            </ul>
          </div>
        )}
        <Badge variant="secondary">
          {sentimentData.neutralNewsCount} Neutral News Articles Analyzed
        </Badge>
      </CardContent>
    </Card>
  );
}
