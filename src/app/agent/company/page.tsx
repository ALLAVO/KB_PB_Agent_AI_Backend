import { ReportConfigurationForm } from '@/components/report-configuration-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export default function CompanyAgentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border-2 border-amber-400/50">
          <CardHeader className="text-center bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 rounded-t-lg pb-4 pt-6">
            <div className="flex items-center justify-center mb-2">
              <Sparkles className="h-10 w-10 text-primary mr-2" />
              <CardTitle className="text-3xl font-bold text-[hsl(var(--primary-text-on-light))]">
                기업 분석 AGENT
              </CardTitle>
            </div>
            <CardDescription className="text-md text-muted-foreground">
              분석하고 싶은 기업의 정보를 입력하고 맞춤형 보고서를 생성하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ReportConfigurationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
