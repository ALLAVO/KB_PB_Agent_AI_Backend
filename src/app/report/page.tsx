import { Suspense } from 'react';
import { CompanyOverviewSection } from '@/components/report/company-overview-section';
import { LatestNewsSummarySection } from '@/components/report/latest-news-summary-section';
import { NewsSentimentSection } from '@/components/report/news-sentiment-section';
import { OpportunityRiskSection } from '@/components/report/opportunity-risk-section';
import { PricePredictionSection } from '@/components/report/price-prediction-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, FileText } from 'lucide-react';

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
  // const detailLevel = searchParams?.detailLevel || 'concise'; // Can be used by sections later

  if (!ticker) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <Card className="w-full max-w-md text-center shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-destructive">
              <AlertTriangle className="mr-2 h-6 w-6" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">Please provide a company ticker.</p>
            <Button asChild className="mt-4">
              <a href="/">Go to Configuration</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const hasSections = selectedSections.length > 0;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary tracking-tight">
          Financial Report: <span className="text-accent">{ticker.toUpperCase()}</span>
        </h1>
        {searchParams?.detailLevel && (
           <p className="text-muted-foreground text-lg capitalize">Detail Level: {searchParams.detailLevel}</p>
        )}
      </div>

      {!hasSections && (
         <Card className="w-full text-center shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-primary">
              <FileText className="mr-2 h-6 w-6" />
              No Sections Selected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">No report sections were selected for {ticker.toUpperCase()}.</p>
            <p className="text-muted-foreground">Please go back and configure your report.</p>
            <Button asChild className="mt-4">
              <a href="/">Configure Report</a>
            </Button>
          </CardContent>
        </Card>
      )}

      {selectedSections.includes('companyOverview') && (
        <CompanyOverviewSection companyName={ticker} />
      )}
      {selectedSections.includes('latestNewsSummary') && (
        <Suspense fallback={<SectionSkeleton title="Latest News Summary"/>}>
          <LatestNewsSummarySection companyName={ticker} />
        </Suspense>
      )}
      {selectedSections.includes('newsSentiment') && (
         <Suspense fallback={<SectionSkeleton title="News Sentiment Analysis"/>}>
            <NewsSentimentSection companyName={ticker} />
         </Suspense>
      )}
      {selectedSections.includes('pricePrediction') && (
        <Suspense fallback={<SectionSkeleton title="Stock Price Prediction" chart/>}>
          {/* PricePredictionSection is client, data fetching (mocked) inside or passed */}
          <PricePredictionSection companyName={ticker} />
        </Suspense>
      )}
      {selectedSections.includes('opportunityRisk') && (
        <Suspense fallback={<SectionSkeleton title="Opportunity/Risk Analysis"/>}>
          <OpportunityRiskSection companyName={ticker} />
        </Suspense>
      )}
    </div>
  );
}

import { Button } from '@/components/ui/button'; // Local import for Button to avoid conflict in template

function SectionSkeleton({ title, chart = false }: { title: string, chart?: boolean }) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Skeleton className="h-6 w-6 mr-2 rounded-full" />
          <Skeleton className="h-7 w-1/3" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {chart ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <>
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </>
        )}
      </CardContent>
    </Card>
  )
}
