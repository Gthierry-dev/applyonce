
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface SocialLoginButtonProps {
  provider: 'google' | 'linkedin';
  onClick: () => void;
  className?: string;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onClick,
  className,
}) => {
  const getProviderIcon = () => {
    switch (provider) {
      case 'google':
        return (
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.845 8.2C15.845 7.67 15.8 7.15 15.715 6.645H8.09997V9.64H12.43C12.235 10.63 11.665 11.47 10.845 12.02V14.02H13.455C14.965 12.64 15.845 10.6 15.845 8.2Z" fill="#4285F4"/>
            <path d="M8.09997 16C10.275 16 12.11 15.28 13.46 14.02L10.85 12.02C10.125 12.515 9.205 12.8 8.1 12.8C5.995 12.8 4.20997 11.39 3.57497 9.5H0.895972V11.55C2.23997 14.19 4.98997 16 8.09997 16Z" fill="#34A853"/>
            <path d="M3.57499 9.5C3.41499 9.03 3.32499 8.52 3.32499 8C3.32499 7.48 3.41999 6.98 3.56999 6.5V4.45H0.895996C0.325996 5.54 0 6.74 0 8C0 9.26 0.324996 10.46 0.895996 11.55L3.57499 9.5Z" fill="#FBBC05"/>
            <path d="M8.09997 3.2C9.29997 3.2 10.375 3.635 11.215 4.45L13.5 2.125C12.11 0.81 10.275 0 8.09997 0C4.98997 0 2.23997 1.81 0.895972 4.45L3.56997 6.5C4.20997 4.61 5.99497 3.2 8.09997 3.2Z" fill="#EA4335"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6645 12.6668H10.6656V9.24683C10.6656 8.4268 10.6487 7.38013 9.51925 7.38013C8.37391 7.38013 8.19675 8.27347 8.19675 9.2001V12.6668H6.19787V5.5668H8.11779V6.4868H8.14654C8.43383 5.9601 9.10716 5.40013 10.11 5.40013C12.1354 5.40013 12.6667 6.8668 12.6667 8.7468V12.6668H12.6645Z" fill="#0A66C2"/>
            <path d="M3.3135 4.64681C2.59881 4.64681 2.02441 4.06681 2.02441 3.35681C2.02441 2.64681 2.60103 2.06681 3.3135 2.06681C4.02375 2.06681 4.60258 2.64681 4.60258 3.35681C4.60258 4.06681 4.02153 4.64681 3.3135 4.64681Z" fill="#0A66C2"/>
            <path d="M4.31475 12.6668H2.3125V5.5668H4.31475V12.6668Z" fill="#0A66C2"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getProviderName = () => {
    switch (provider) {
      case 'google':
        return 'Google';
      case 'linkedin':
        return 'LinkedIn';
      default:
        return '';
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className={cn("flex items-center justify-center gap-2", className)}
      onClick={onClick}
    >
      {getProviderIcon()}
      <span className="sm:inline">{getProviderName()}</span>
    </Button>
  );
};

export default SocialLoginButton;
