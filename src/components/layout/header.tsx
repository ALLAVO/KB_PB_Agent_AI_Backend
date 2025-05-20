import Link from 'next/link';
import { BriefcaseBusiness } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <BriefcaseBusiness className="h-7 w-7" />
          <h1 className="text-2xl font-semibold">Market Gazer AI</h1>
        </Link>
      </div>
    </header>
  );
}
