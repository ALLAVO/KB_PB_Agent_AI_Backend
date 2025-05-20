import { Building2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CompanyOverviewSectionProps {
  companyName: string;
}

export async function CompanyOverviewSection({ companyName }: CompanyOverviewSectionProps) {
  // In a real app, fetch company overview data based on companyName
  // This is a placeholder
  const overviewData = {
    description: `This is a placeholder overview for ${companyName.toUpperCase()}. It would typically include information about the company's history, mission, products, and market position.`,
    industry: "Technology",
    ceo: "Jane Doe",
    founded: "2000",
    headquarters: "Silicon Valley, CA"
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-primary">
          <Building2 className="mr-3 h-7 w-7" />
          Company Overview: {companyName.toUpperCase()}
        </CardTitle>
        <CardDescription>A brief look at the company.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-foreground leading-relaxed">{overviewData.description}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 text-sm">
          <div><strong className="font-medium text-muted-foreground">Industry:</strong> {overviewData.industry}</div>
          <div><strong className="font-medium text-muted-foreground">CEO:</strong> {overviewData.ceo}</div>
          <div><strong className="font-medium text-muted-foreground">Founded:</strong> {overviewData.founded}</div>
          <div><strong className="font-medium text-muted-foreground">Headquarters:</strong> {overviewData.headquarters}</div>
        </div>
      </CardContent>
    </Card>
  );
}
