import { TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface OpportunityRiskSectionProps {
  companyName: string;
}

export async function OpportunityRiskSection({ companyName }: OpportunityRiskSectionProps) {
  // Placeholder data
  const analysisData = {
    opportunities: [
      `Expansion into new market segments for ${companyName.toUpperCase()}.`,
      `Potential for growth through strategic acquisitions.`,
      `Strong demand for ${companyName.toUpperCase()}'s core products.`,
    ],
    risks: [
      `Increased competition in the primary market.`,
      `Dependency on key suppliers.`,
      `Potential impact of upcoming regulatory changes.`,
    ],
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-primary">
          <TrendingUp className="mr-2 h-7 w-7" /> / <AlertTriangle className="ml-2 mr-3 h-7 w-7" />
          Opportunity & Risk Analysis
        </CardTitle>
        <CardDescription>Key factors influencing {companyName.toUpperCase()}'s future performance.</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-xl text-green-600 flex items-center mb-3">
            <TrendingUp className="mr-2 h-6 w-6" />
            Opportunities
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
            Risks
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
