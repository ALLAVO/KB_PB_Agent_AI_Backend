import { Building2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CompanyOverviewSectionProps {
  companyName: string;
}

export async function CompanyOverviewSection({ companyName }: CompanyOverviewSectionProps) {
  // In a real app, fetch company overview data based on companyName
  // This is a placeholder
  const overviewData = {
    description: `${companyName.toUpperCase()}에 대한 개요입니다. 일반적으로 회사의 역사, 미션, 제품 및 시장에서의 위치와 같은 정보가 포함됩니다.`,
    industry: "정보기술",
    ceo: "김철수",
    founded: "2000년",
    headquarters: "대한민국 서울"
  };

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
