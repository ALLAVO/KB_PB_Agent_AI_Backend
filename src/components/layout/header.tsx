import Link from 'next/link';
import { Sparkles } from 'lucide-react'; // Using Sparkles as a placeholder for KB logo

export function Header() {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-[hsl(var(--primary-text-on-light))] hover:opacity-80 transition-opacity">
          <Sparkles className="h-8 w-8" />
          <h1 className="text-2xl font-semibold">KB PB Agent AI</h1>
        </Link>
        {/* Future navigation links can go here */}
        {/* Example:
        <nav className="flex gap-4">
          <Link href="/agent/company" className="text-sm font-medium text-muted-foreground hover:text-primary-text-on-light">기업 분석</Link>
          <Link href="/agent/industry" className="text-sm font-medium text-muted-foreground hover:text-primary-text-on-light">산업 분석</Link>
          <Link href="/agent/market" className="text-sm font-medium text-muted-foreground hover:text-primary-text-on-light">시장 분석</Link>
        </nav>
        */}
      </div>
    </header>
  );
}
