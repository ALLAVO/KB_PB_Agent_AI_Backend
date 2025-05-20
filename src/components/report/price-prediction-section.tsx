"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart as LineChartIcon } from 'lucide-react';

interface PricePredictionSectionProps {
  companyName: string;
}

// Mock data for the chart
const generateMockPredictionData = (companyName: string) => {
  const basePrice = companyName.length * 10 + 100; // Simple way to vary data by ticker
  return [
    { date: 'Jan', price: basePrice, predictedPrice: basePrice + 2 },
    { date: 'Feb', price: basePrice + 5, predictedPrice: basePrice + 7 },
    { date: 'Mar', price: basePrice + 3, predictedPrice: basePrice + 6 },
    { date: 'Apr', price: basePrice + 8, predictedPrice: basePrice + 10 },
    { date: 'May', price: basePrice + 12, predictedPrice: basePrice + 13 },
    { date: 'Jun', price: basePrice + 10, predictedPrice: basePrice + 15 },
  ];
};

export function PricePredictionSection({ companyName }: PricePredictionSectionProps) {
  const data = generateMockPredictionData(companyName);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-primary">
          <LineChartIcon className="mr-3 h-7 w-7" />
          Stock Price Prediction
        </CardTitle>
        <CardDescription>Forecast for {companyName.toUpperCase()} based on analytical models.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" domain={['dataMin - 5', 'dataMax + 5']} />
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
            <Legend wrapperStyle={{ color: 'hsl(var(--muted-foreground))' }} />
            <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 6, style: { fill: 'hsl(var(--primary))', strokeWidth: 2 } }} name="Actual Price" />
            <Line type="monotone" dataKey="predictedPrice" stroke="hsl(var(--accent))" strokeWidth={2} strokeDasharray="5 5" activeDot={{ r: 6, style: {fill: 'hsl(var(--accent))', strokeWidth: 2} }} name="Predicted Price" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
