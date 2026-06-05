import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-8xl md:text-9xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-3">Page not found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex gap-3 justify-center">
          <Button asChild><Link href="/"><Home className="w-4 h-4" /> Go home</Link></Button>
          <Button asChild variant="outline"><Link href="/projects"><ArrowLeft className="w-4 h-4" /> View projects</Link></Button>
        </div>
      </div>
    </div>
  );
}