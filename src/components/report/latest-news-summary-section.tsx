import { Newspaper } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { summarizeNews } from '@/ai/flows/summarize-news';

interface LatestNewsSummarySectionProps {
  companyName: string;
}

// Mock news articles - in a real app, these would be fetched dynamically
const mockNewsArticles = (companyName: string) => [
  `${companyName}은(는) 신제품 라인의 강력한 판매에 힘입어 지난 분기 사상 최대 이익을 발표했습니다.`,
  `최근 혁신과 긍정적인 시장 반응에 따라 시장 분석가들은 ${companyName} 주식에 대해 점점 더 낙관적인 전망을 내놓고 있습니다.`,
  `${companyName}이(가) 신흥 시장에서의 영향력 확대를 목표로 하는 새로운 전략적 파트너십을 발표했습니다.`,
  `${companyName}은(는) 미래 성장을 위한 지속 가능한 기술에 중점을 두고 연구개발(R&D)에 막대한 투자를 하고 있습니다.`,
  `해당 부문의 규제 변화가 ${companyName}에 새로운 도전을 제기할 수 있지만, 회사는 잘 준비되어 있다고 밝혔습니다.`
];

export async function LatestNewsSummarySection({ companyName }: LatestNewsSummarySectionProps) {
  if (!companyName) return null;

  let summary = "현재 뉴스 요약을 생성할 수 없습니다.";
  let errorOccurred = false;
  try {
    const result = await summarizeNews({ companyName, newsArticles: mockNewsArticles(companyName) });
    summary = result.summary;
  } catch (e) {
    console.error("Error summarizing news:", e);
    errorOccurred = true;
  }
  
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-[hsl(var(--primary-text-on-light))]">
          <Newspaper className="mr-3 h-7 w-7 text-primary" />
          AI 뉴스 요약
        </CardTitle>
        <CardDescription>{companyName.toUpperCase()} 관련 최신 뉴스의 주요 내용입니다.</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {errorOccurred ? (
          <p className="text-sm text-destructive">{summary}</p>
        ) : (
          <p className="text-foreground leading-relaxed whitespace-pre-line">{summary}</p>
        )}
      </CardContent>
    </Card>
  );
}
