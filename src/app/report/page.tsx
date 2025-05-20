import { Suspense } from 'react';
import { CompanyOverviewSection } from '@/components/report/company-overview-section';
import { LatestNewsSummarySection } from '@/components/report/latest-news-summary-section';
import { NewsSentimentSection } from '@/components/report/news-sentiment-section';
import { OpportunityRiskSection } from '@/components/report/opportunity-risk-section';
import { PricePredictionSection } from '@/components/report/price-prediction-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function ReportPage({
  searchParams,
}: {
  searchParams?: {
    ticker?: string;
    sections?: string; // comma-separated
    detailLevel?: string;
  };
}) {
  const ticker = searchParams?.ticker;
  const selectedSections = searchParams?.sections?.split(',') || [];
  const detailLevel = searchParams?.detailLevel || 'concise'; 

  if (!ticker) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]"> {/* Adjust height if header is present */}
        <Card className="w-full max-w-md text-center shadow-xl border-destructive border-2">
          <CardHeader className="bg-destructive/10">
            <CardTitle className="flex items-center justify-center text-destructive">
              <AlertTriangle className="mr-2 h-6 w-6" />
              오류
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-lg">기업 티커(종목 코드)를 찾을 수 없습니다.</p>
            <Button asChild className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="/agent/company">보고서 설정으로 돌아가기</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const hasSections = selectedSections.length > 0;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center mb-10 p-6 rounded-lg bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 shadow-md border border-amber-300/80">
        <div className="flex items-center justify-center mb-2">
          <Sparkles className="h-10 w-10 text-primary mr-3" />
          <h1 className="text-4xl font-bold text-[hsl(var(--primary-text-on-light))] tracking-tight">
            기업 분석 보고서
          </h1>
        </div>
        <p className="text-2xl font-semibold text-accent">
          {ticker.toUpperCase()}
        </p>
        {searchParams?.detailLevel && (
           <p className="text-muted-foreground text-md capitalize mt-1">분석 수준: {detailLevel === 'concise' ? '요약' : '상세'}</p>
        )}
      </div>

      {!hasSections && (
         <Card className="w-full text-center shadow-xl border-primary/50 border-2">
          <CardHeader className="bg-primary/10">
            <CardTitle className="flex items-center justify-center text-[hsl(var(--primary-text-on-light))]">
              <FileText className="mr-2 h-6 w-6" />
              선택된 섹션 없음
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-lg">{ticker.toUpperCase()}에 대한 보고서 섹션이 선택되지 않았습니다.</p>
            <p className="text-muted-foreground">보고서 설정 페이지로 돌아가서 원하는 섹션을 선택해주세요.</p>
            <Button asChild className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="/agent/company">보고서 설정하기</a>
            </Button>
          </CardContent>
        </Card>
      )}

      {selectedSections.includes('companyOverview') && (
        <CompanyOverviewSection companyName={ticker} />
      )}
      {selectedSections.includes('latestNewsSummary') && (
        <Suspense fallback={<SectionSkeleton title="최신 뉴스 요약"/>}>
          <LatestNewsSummarySection companyName={ticker} />
        </Suspense>
      )}
      {selectedSections.includes('newsSentiment') && (
         <Suspense fallback={<SectionSkeleton title="뉴스 감성 분석"/>}>
            <NewsSentimentSection companyName={ticker} />
         </Suspense>
      )}
      {selectedSections.includes('pricePrediction') && (
        <Suspense fallback={<SectionSkeleton title="주가 예측" chart/>}>
          <PricePredictionSection companyName={ticker} />
        </Suspense>
      )}
      {selectedSections.includes('opportunityRisk') && (
        <Suspense fallback={<SectionSkeleton title="기회 및 위험 분석"/>}>
          <OpportunityRiskSection companyName={ticker} />
        </Suspense>
      )}
    </div>
  );
}

function SectionSkeleton({ title, chart = false }: { title: string, chart?: boolean }) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center text-[hsl(var(--primary-text-on-light))]">
          <Skeleton className="h-7 w-7 mr-2 rounded-full bg-muted/70" />
          <Skeleton className="h-7 w-1/3 bg-muted/70" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-6">
        {chart ? (
          <Skeleton className="h-64 w-full bg-muted/70" />
        ) : (
          <>
            <Skeleton className="h-5 w-full bg-muted/70" />
            <Skeleton className="h-5 w-full bg-muted/70" />
            <Skeleton className="h-5 w-4/5 bg-muted/70" />
          </>
        )}
      </CardContent>
    </Card>
  )
}
