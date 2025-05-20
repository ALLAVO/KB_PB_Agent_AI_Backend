"use client";

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart as LineChartIcon } from 'lucide-react'; // Icon for the title

interface PricePredictionSectionProps {
  companyName: string;
}

// Mock data for the chart
const generateMockPredictionData = (companyName: string) => {
  const basePrice = companyName.length * 10 + 100; // Simple way to vary data by ticker
  const months = ["1월", "2월", "3월", "4월", "5월", "6월"];
  return months.map((month, index) => ({
    date: month,
    price: basePrice + index * Math.random() * 5,
    predictedPrice: basePrice + index * Math.random() * 5 + (Math.random() * 10 - 5)
  }));
};

export function PricePredictionSection({ companyName }: PricePredictionSectionProps) {
  const data = generateMockPredictionData(companyName);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-[hsl(var(--primary-text-on-light))]">
          <LineChartIcon className="mr-3 h-7 w-7 text-primary" />
          주가 예측
        </CardTitle>
        <CardDescription>분석 모델을 기반으로 한 {companyName.toUpperCase()}의 주가 전망입니다.</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={350}>
          <RechartsLineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" domain={['dataMin - 10', 'dataMax + 10']} />
            <RechartsTooltip
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend wrapperStyle={{ color: 'hsl(var(--muted-foreground))', paddingTop: '10px' }} />
            <Line type="monotone" dataKey="price" stroke="hsl(var(--chart-1))" strokeWidth={2} activeDot={{ r: 6, style: { fill: 'hsl(var(--chart-1))', strokeWidth: 2 } }} name="실제 주가" />
            <Line type="monotone" dataKey="predictedPrice" stroke="hsl(var(--chart-2))" strokeWidth={2} strokeDasharray="5 5" activeDot={{ r: 6, style: {fill: 'hsl(var(--chart-2))', strokeWidth: 2} }} name="예측 주가" />
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
