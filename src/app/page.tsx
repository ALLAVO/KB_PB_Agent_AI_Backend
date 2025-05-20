import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#3B3735] p-4">
      <div className="text-center">
        <Sparkles className="h-20 w-20 text-[#F7CE46] mx-auto mb-4" />
        <h1 className="text-5xl font-bold text-[#F7CE46] mb-3">
          KB PB Agent AI
        </h1>
        <p className="text-xl text-[#D4CFCB] mb-12">
          AI와 함께 당신의 성공적인 투자를 만들어가세요.
        </p>
      </div>
      <div className="space-y-6 md:space-y-0 md:space-x-6 flex flex-col md:flex-row">
        <Link
          href="/agent/company"
          className="px-8 py-4 bg-[#706B68] text-[#D4CFCB] text-lg font-semibold rounded-lg shadow-md hover:bg-[#8A837F] transition-colors duration-200 text-center w-64"
        >
          기업 분석 AGENT
        </Link>
        <Link
          href="/agent/industry"
          className="px-8 py-4 bg-[#706B68] text-[#D4CFCB] text-lg font-semibold rounded-lg shadow-md hover:bg-[#8A837F] transition-colors duration-200 text-center w-64"
        >
          산업 분석 AGENT
        </Link>
        <Link
          href="/agent/market"
          className="px-8 py-4 bg-[#706B68] text-[#D4CFCB] text-lg font-semibold rounded-lg shadow-md hover:bg-[#8A837F] transition-colors duration-200 text-center w-64"
        >
          주식 시장 분석 AGENT
        </Link>
      </div>
      <footer className="absolute bottom-8 text-center text-[#A09B98] text-sm">
        &copy; {new Date().getFullYear()} KB Financial Group. All Rights Reserved.
      </footer>
    </div>
  );
}
