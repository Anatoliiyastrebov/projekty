import React, { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, Instagram, ExternalLink } from 'lucide-react';

interface ContactSectionProps {
  telegram: string;
  instagram: string;
  error?: string;
  onTelegramChange: (value: string) => void;
  onInstagramChange: (value: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  telegram,
  instagram,
  error,
  onTelegramChange,
  onInstagramChange,
}) => {
  const { t } = useLanguage();

  const cleanTelegram = useMemo(() => {
    return telegram.replace(/^@/, '').trim();
  }, [telegram]);

  const cleanInstagram = useMemo(() => {
    return instagram.replace(/^@/, '').trim();
  }, [instagram]);

  const telegramLink = useMemo(() => {
    if (!cleanTelegram) return '';
    return `https://t.me/${cleanTelegram}`;
  }, [cleanTelegram]);

  const instagramLink = useMemo(() => {
    if (!cleanInstagram) return '';
    return `https://instagram.com/${cleanInstagram}`;
  }, [cleanInstagram]);

  return (
    <div className="card-wellness space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-primary" />
        {t('contactMethod')} <span className="text-destructive">*</span>
      </h3>

      <p className="text-sm text-muted-foreground">
        {t('atLeastOneContactRequired')}
      </p>

      {error && (
        <p className="error-message">
          <AlertCircleIcon />
          {error}
        </p>
      )}

      <div className="space-y-4">
        {/* Telegram */}
        <div>
          <label className="text-sm text-muted-foreground mb-1 block flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span>{t('telegram')}</span>
          </label>
          <input
            type="text"
            className="input-field"
            value={telegram}
            onChange={(e) => onTelegramChange(e.target.value)}
            placeholder={t('usernameHint')}
          />
          {cleanTelegram && (
            <div className="bg-accent/50 rounded-xl p-2 mt-2">
              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium text-sm flex items-center gap-1 hover:underline break-all"
              >
                {telegramLink}
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            </div>
          )}
        </div>

        {/* Instagram */}
        <div>
          <label className="text-sm text-muted-foreground mb-1 block flex items-center gap-2">
            <Instagram className="w-4 h-4" />
            <span>{t('instagram')}</span>
          </label>
          <input
            type="text"
            className="input-field"
            value={instagram}
            onChange={(e) => onInstagramChange(e.target.value)}
            placeholder={t('usernameHint')}
          />
          {cleanInstagram && (
            <div className="bg-accent/50 rounded-xl p-2 mt-2">
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium text-sm flex items-center gap-1 hover:underline break-all"
              >
                {instagramLink}
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

const AlertCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
