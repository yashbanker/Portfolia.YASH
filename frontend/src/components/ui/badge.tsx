import { cn } from '@/lib/utils';
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> { variant?: 'default' | 'outline' | 'success' | 'glass'; }
export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
    outline: 'border border-border text-foreground',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    glass: 'glass text-foreground',
  };
  return <div className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors', variants[variant], className)} {...props} />;
}