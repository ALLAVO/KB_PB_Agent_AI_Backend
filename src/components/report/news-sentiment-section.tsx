import { Gauge } from 'lucide-react'; // Smile, Frown removed as Gauge is more general
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from 'lucide-react';


interface NewsSentimentSectionProps {
  companyName: string;
}

export async function NewsSentimentSection({ companyName }: NewsSentimentSectionProps) {
  // Placeholder data
  const sentimentData = {
    overallScore: 75, // Example: 0-100 scale
    positiveNews: [
      `${companyName.toUpperCase()}의 긍정적인 발전 A.`,
      `${companyName.toUpperCase()}의 성공적인 제품 B 출시.`,
    ],
    negativeNews: [
      `${companyName.toUpperCase()}에 영향을 미치는 시장 문제 C.`,
    ],
    neutralNewsCount: 5,
  };

  const getSentimentColorClass = (score: number) => {
    if (score > 70) return "text-green-600";
    if (score > 40) return "text-yellow-600";
    return "text-red-600";
  };
  
  const getSentimentProgressClass = (score: number) => {
    if (score > 70) return "[&>div]:bg-green-500";
    if (score > 40) return "[&>div]:bg-yellow-500";
    return "[&>div]:bg-red-500";
  };


  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-[hsl(var(--primary-text-on-light))]">
          <Gauge className="mr-3 h-7 w-7 text-primary" />
          뉴스 감성 분석
        </CardTitle>
        <CardDescription>{companyName.toUpperCase()}에 대한 최근 뉴스를 기반으로 한 시장 인식입니다.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-foreground">종합 감성 점수</span>
            <span className={`text-sm font-semibold ${getSentimentColorClass(sentimentData.overallScore)}`}>
              {sentimentData.overallScore} / 100
            </span>
          </div>
          <Progress value={sentimentData.overallScore} aria-label={`감성 점수: ${sentimentData.overallScore} / 100`} className={`h-3 ${getSentimentProgressClass(sentimentData.overallScore)}`} />
        </div>

        {sentimentData.positiveNews.length > 0 && (
          <div>
            <h4 className="font-semibold text-lg text-green-600 flex items-center mb-2">
              <TrendingUp className="mr-2 h-5 w-5" /> 긍정적 주요 내용
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
              <TrendingDown className="mr-2 h-5 w-5" /> 부정적 우려 사항
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
              {sentimentData.negativeNews.map((news, index) => (
                <li key={`neg-${index}`}>{news}</li>
              ))}
            </ul>
          </div>
        )}
        <Badge variant="secondary">
          분석된 중립 뉴스 기사: {sentimentData.neutralNewsCount}개
        </Badge>
      </CardContent>
    </Card>
  );
}
