import { TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface OpportunityRiskSectionProps {
  companyName: string;
}

export async function OpportunityRiskSection({ companyName }: OpportunityRiskSectionProps) {
  // Placeholder data
  const analysisData = {
    opportunities: [
      `${companyName.toUpperCase()}의 새로운 시장 부문으로의 확장.`,
      `전략적 인수를 통한 성장 잠재력.`,
      `${companyName.toUpperCase()} 핵심 제품에 대한 강력한 수요.`,
    ],
    risks: [
      `주요 시장에서의 경쟁 심화.`,
      `핵심 공급업체에 대한 의존성.`,
      `다가오는 규제 변화의 잠재적 영향.`,
    ],
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-[hsl(var(--primary-text-on-light))]">
          <TrendingUp className="mr-2 h-7 w-7 text-primary" /> / <AlertTriangle className="ml-2 mr-3 h-7 w-7 text-primary" />
          기회 및 위험 분석
        </CardTitle>
        <CardDescription>{companyName.toUpperCase()}의 미래 성과에 영향을 미치는 주요 요인들입니다.</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6 pt-0">
        <div>
          <h3 className="font-semibold text-xl text-green-600 flex items-center mb-3">
            <TrendingUp className="mr-2 h-6 w-6" />
            기회 요인
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-foreground">
            {analysisData.opportunities.map((item, index) => (
              <li key={`opp-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-xl text-red-600 flex items-center mb-3">
            <AlertTriangle className="mr-2 h-6 w-6" />
            위험 요인
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-foreground">
            {analysisData.risks.map((item, index) => (
              <li key={`risk-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
