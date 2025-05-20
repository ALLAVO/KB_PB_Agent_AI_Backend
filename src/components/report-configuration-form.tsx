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
// Label removed as FormLabel is used
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Card components are used in parent page

const reportSections = [
  { id: "companyOverview", label: "기업 개요" },
  { id: "latestNewsSummary", label: "최신 뉴스 요약 (AI)" },
  { id: "newsSentiment", label: "뉴스 감성 분석" },
  { id: "pricePrediction", label: "주가 예측" },
  { id: "opportunityRisk", label: "기회/위험 분석" },
] as const;

const formSchema = z.object({
  ticker: z.string().min(1, "종목 코드는 필수입니다.").max(10, "종목 코드가 너무 깁니다.").toUpperCase(),
  sections: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "최소 하나 이상의 섹션을 선택해야 합니다.",
  }),
  detailLevel: z.enum(["concise", "detailed"], {
    required_error: "분석 상세 수준을 선택해야 합니다.",
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
      title: "보고서 생성 중...",
      description: `종목 코드: ${data.ticker}, 섹션: ${data.sections.join(', ')}, 상세 수준: ${data.detailLevel}`,
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
              <FormLabel className="text-base font-semibold">종목 코드</FormLabel>
              <FormControl>
                <Input placeholder="예: AAPL, 005930" {...field} className="text-base"/>
              </FormControl>
              <FormDescription>
                분석할 회사의 주식 티커 또는 종목 코드를 입력하세요.
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
                <FormLabel className="text-base font-semibold">보고서 섹션</FormLabel>
                <FormDescription>
                  보고서에 포함할 섹션을 선택하세요.
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
                          className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm hover:shadow-md transition-shadow bg-background cursor-pointer has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary"
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
                              className="h-5 w-5"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-sm cursor-pointer w-full py-1">
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
              <FormLabel className="text-base font-semibold">상세 수준</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-md has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary">
                    <FormControl>
                      <RadioGroupItem value="concise" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">요약된 분석</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-md has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary">
                    <FormControl>
                      <RadioGroupItem value="detailed" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">상세 분석</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground">
          보고서 생성
        </Button>
      </form>
    </Form>
  );
}
