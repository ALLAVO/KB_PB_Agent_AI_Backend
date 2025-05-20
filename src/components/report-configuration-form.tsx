"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const reportSections = [
  { id: "companyOverview", label: "Company Overview" },
  { id: "latestNewsSummary", label: "Latest News Summary (AI)" },
  { id: "newsSentiment", label: "News Sentiment Analysis" },
  { id: "pricePrediction", label: "Stock Price Prediction" },
  { id: "opportunityRisk", label: "Opportunity/Risk Analysis" },
] as const;

const formSchema = z.object({
  ticker: z.string().min(1, "Ticker is required.").max(10, "Ticker is too long.").toUpperCase(),
  sections: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one section.",
  }),
  detailLevel: z.enum(["concise", "detailed"], {
    required_error: "You need to select a detail level.",
  }),
});

export type ReportConfigurationFormValues = z.infer<typeof formSchema>;

export function ReportConfigurationForm() {
  const router = useRouter();
  const form = useForm<ReportConfigurationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticker: "",
      sections: ["companyOverview", "latestNewsSummary"], // Default selection
      detailLevel: "concise",
    },
  });

  function onSubmit(data: ReportConfigurationFormValues) {
    toast({
      title: "Generating Report...",
      description: `Ticker: ${data.ticker}, Sections: ${data.sections.join(', ')}, Detail: ${data.detailLevel}`,
    });

    const queryParams = new URLSearchParams({
      ticker: data.ticker,
      sections: data.sections.join(','),
      detailLevel: data.detailLevel,
    });

    router.push(`/report?${queryParams.toString()}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="ticker"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Company Ticker</FormLabel>
              <FormControl>
                <Input placeholder="e.g., AAPL, GOOG" {...field} className="text-base"/>
              </FormControl>
              <FormDescription>
                Enter the stock ticker symbol of the company.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sections"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Report Sections</FormLabel>
                <FormDescription>
                  Select the sections to include in the report.
                </FormDescription>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportSections.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="sections"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm hover:shadow-md transition-shadow bg-background"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), item.id])
                                  : field.onChange(
                                      (field.value || []).filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-sm cursor-pointer">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="detailLevel"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base">Level of Detail</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="concise" />
                    </FormControl>
                    <FormLabel className="font-normal">Concise</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="detailed" />
                    </FormControl>
                    <FormLabel className="font-normal">Detailed</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full text-lg py-6 bg-primary hover:bg-primary/90">
          Generate Report
        </Button>
      </form>
    </Form>
  );
}
