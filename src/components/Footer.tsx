import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card/50 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            © {new Date().getFullYear()} {t('siteTitle')}
          </div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              {t('footerLegalLink')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

