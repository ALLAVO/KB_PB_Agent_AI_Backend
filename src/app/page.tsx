import { ReportConfigurationForm } from '@/components/report-configuration-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">Welcome to Market Gazer AI</CardTitle>
            <CardDescription className="text-lg">
              Configure and generate your insightful financial report.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReportConfigurationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
