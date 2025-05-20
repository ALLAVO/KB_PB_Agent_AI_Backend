import { Building2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchCompanyOverview, type CompanyOverview } from '@/services/report-data';

interface CompanyOverviewSectionProps {
  companyName: string;
}

export async function CompanyOverviewSection({ companyName }: CompanyOverviewSectionProps) {
  const overviewData: CompanyOverview = await fetchCompanyOverview(companyName);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-[hsl(var(--primary-text-on-light))]">
          <Building2 className="mr-3 h-7 w-7 text-primary" />
          기업 개요: {companyName.toUpperCase()}
        </CardTitle>
        <CardDescription>회사에 대한 간략한 소개입니다.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <p className="text-foreground leading-relaxed">{overviewData.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-2 text-sm">
          <div><strong className="font-medium text-muted-foreground">산업:</strong> {overviewData.industry}</div>
          <div><strong className="font-medium text-muted-foreground">CEO:</strong> {overviewData.ceo}</div>
          <div><strong className="font-medium text-muted-foreground">설립 연도:</strong> {overviewData.founded}</div>
          <div><strong className="font-medium text-muted-foreground">본사:</strong> {overviewData.headquarters}</div>
        </div>
      </CardContent>
    </Card>
  );
}
