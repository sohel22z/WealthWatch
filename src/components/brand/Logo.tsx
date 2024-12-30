type LogoProps = {
  variant?: 'symbol' | 'full';
  className?: string;
};

export function Logo({ variant = 'full', className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {variant === 'full' && (
        <span className="text-2xl font-display font-bold heading-gradient">
          WealthWatch
        </span>
      )}
    </div>
  );
}