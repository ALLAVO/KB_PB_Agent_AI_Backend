import { Sparkles } from 'lucide-react'; // Using Sparkles as a placeholder for KB logo

export default function IndustryAgentPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem-1px)] p-6 text-center"> {/* Adjusted min-height for header */}
      <Sparkles className="w-24 h-24 text-primary mb-6" />
      <h1 className="text-3xl font-bold text-[hsl(var(--primary-text-on-light))] mb-3">
        산업 분석 AGENT
      </h1>
      <p className="text-xl text-muted-foreground">
        2차 중간 발표 오픈 예정입니다.
      </p>
      <p className="text-md text-muted-foreground mt-1">
        곧 더욱 강력한 산업 분석 기능으로 찾아뵙겠습니다.
      </p>
    </div>
  );
}
