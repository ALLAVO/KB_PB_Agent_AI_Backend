import { Building2, Globe, Briefcase, DollarSign, Percent, Calendar, UserCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchCompanyOverview, type CompanyOverview } from '@/services/report-data';
import { Badge } from '@/components/ui/badge';

interface CompanyOverviewSectionProps {
  companyName: string; // This prop is the ticker
}

export async function CompanyOverviewSection({ companyName }: CompanyOverviewSectionProps) {
  const overviewData: CompanyOverview = await fetchCompanyOverview(companyName);

  const formatMarketCap = (cap: number | string | undefined) => {
    if (typeof cap !== 'number') return cap || "정보 없음";
    if (cap >= 1_000_000_000_000) { // 조 단위
      return `${(cap / 1_000_000_000_000).toFixed(2)}조 원`;
    }
    if (cap >= 1_000_000_000) { // 억 단위
      return `${(cap / 1_000_000_000).toFixed(2)}억 원`;
    }
    return `${cap.toLocaleString()} 원`;
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-2xl text-[hsl(var(--primary-text-on-light))]">
            <Building2 className="mr-3 h-7 w-7 text-primary" />
            {overviewData.name} ({overviewData.ticker})
          </CardTitle>
          {overviewData.website && (
            <a href={overviewData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center">
              <Globe className="mr-1 h-4 w-4" />
              웹사이트 방문
            </a>
          )}
        </div>
        <CardDescription>기업 핵심 정보를 요약하여 제공합니다.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div>
          <h3 className="font-semibold text-lg mb-2 text-foreground">기업 요약</h3>
          <p className="text-foreground leading-relaxed text-sm">{overviewData.business_summary}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 pt-2 text-sm">
          {[
            { Icon: Briefcase, label: "섹터", value: overviewData.sector },
            { Icon: Briefcase, label: "산업", value: overviewData.industry },
            { Icon: Building2, label: "본사", value: overviewData.headquarters },
            { Icon: DollarSign, label: "시가총액", value: formatMarketCap(overviewData.market_cap) },
            { Icon: DollarSign, label: "현재가", value: overviewData.current_price ? `${overviewData.current_price.toLocaleString()} 원` : "정보 없음" },
            { Icon: Percent, label: "배당수익률", value: overviewData.dividend_yield ? `${overviewData.dividend_yield}%` : "정보 없음" },
            { Icon: UserCircle, label: "CEO", value: overviewData.ceo },
            { Icon: Calendar, label: "설립 연도", value: overviewData.founded },
          ].map((item, index) => (
            item.value && item.value !== "정보 없음" && (
              <div key={index} className="flex items-start space-x-2 p-2 bg-muted/30 rounded-md">
                <item.Icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <strong className="font-medium text-muted-foreground">{item.label}:</strong>
                  <span className="ml-1 text-foreground">{item.value}</span>
                </div>
              </div>
            )
          ))}
        </div>
        
      </CardContent>
    </Card>
  );
}
