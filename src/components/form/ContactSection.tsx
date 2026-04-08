import React, { useMemo, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, ExternalLink, Plus } from 'lucide-react';
import type { ContactData, PreferredContactMethod } from '@/lib/form-utils';
import { sanitizePhoneInput } from '@/lib/form-utils';

const METHODS: PreferredContactMethod[] = ['telegram', 'instagram', 'phone'];

export interface ContactSectionProps {
  contactData: ContactData;
  showExtraContacts: boolean;
  onToggleExtraContacts: () => void;
  errors: {
    contact?: string;
    telegram?: string;
    instagram?: string;
    phone?: string;
  };
  onPreferredChange: (value: PreferredContactMethod) => void;
  onTelegramChange: (value: string) => void;
  onInstagramChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}

const formatTelegramInput = (raw: string): string => {
  if (!raw.trim()) return '';
  const noSpaces = raw.replace(/\s/g, '');
  return noSpaces.startsWith('@') ? noSpaces : `@${noSpaces.replace(/^@+/, '')}`;
};

export const ContactSection: React.FC<ContactSectionProps> = (props) => {
  const {
    contactData,
    showExtraContacts,
    onToggleExtraContacts,
    errors,
    onPreferredChange,
    onTelegramChange,
    onInstagramChange,
    onPhoneChange,
  } = props;
  const { t, language } = useLanguage();

  const pcm = contactData.preferred_contact_method;
  const telegram = contactData.telegram ?? '';
  const instagram = contactData.instagram ?? '';
  const phone = contactData.phone ?? '';

  const cleanTelegram = useMemo(() => telegram.replace(/^@/, '').trim(), [telegram]);
  const cleanInstagram = useMemo(() => instagram.replace(/^@/, '').trim(), [instagram]);
  const telegramLink = useMemo(() => (cleanTelegram ? `https://t.me/${cleanTelegram}` : ''), [cleanTelegram]);
  const instagramLink = useMemo(
    () => (cleanInstagram ? `https://instagram.com/${cleanInstagram}` : ''),
    [cleanInstagram],
  );

  const handleTelegramChange = useCallback(
    (raw: string) => {
      if (!raw.trim()) {
        onTelegramChange('');
        return;
      }
      onTelegramChange(formatTelegramInput(raw));
    },
    [onTelegramChange],
  );

  const handlePhoneChange = useCallback(
    (raw: string) => {
      onPhoneChange(sanitizePhoneInput(raw));
    },
    [onPhoneChange],
  );

  const methodLabel = (m: PreferredContactMethod): string => {
    if (m === 'telegram') return t('telegram');
    if (m === 'instagram') return t('instagram');
    if (m === 'phone') return t('phone');
    return '';
  };

  const secondaryMethods = METHODS.filter((m) => m !== pcm);

  const renderTelegramField = (variant: 'primary' | 'secondary') => {
    const isPrimary = variant === 'primary';
    const wrap = isPrimary
      ? 'rounded-xl p-4 border-2 border-primary bg-primary/5 shadow-sm'
      : 'rounded-xl p-3 border border-border bg-muted/20';
    const err = errors.telegram;
    return (
      <div className={wrap}>
        <label className="text-sm text-muted-foreground mb-1 block flex items-center gap-2">
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span>{t('telegram')}</span>
          {isPrimary && <span className="text-destructive">*</span>}
        </label>
        <input
          type="text"
          className={`input-field ${err ? 'input-error' : ''}`}
          value={telegram}
          onChange={(e) => handleTelegramChange(e.target.value)}
          placeholder={t('telegramPlaceholder')}
          autoComplete="username"
          inputMode="text"
        />
        <p className="text-xs text-muted-foreground mt-1">{t('telegramFormatHint')}</p>
        {err && (
          <p className="error-message mt-1" role="alert">
            <AlertCircleIcon />
            {err}
          </p>
        )}
        {isPrimary && telegramLink && !err && (
          <ProfileLinkPreview href={telegramLink} language={language} />
        )}
      </div>
    );
  };

  const renderInstagramField = (variant: 'primary' | 'secondary') => {
    const isPrimary = variant === 'primary';
    const wrap = isPrimary
      ? 'rounded-xl p-4 border-2 border-primary bg-primary/5 shadow-sm'
      : 'rounded-xl p-3 border border-border bg-muted/20';
    const err = errors.instagram;
    return (
      <div className={wrap}>
        <label className="text-sm text-muted-foreground mb-1 block">
          {t('instagram')}
          {isPrimary && <span className="text-destructive ml-0.5">*</span>}
        </label>
        <input
          type="text"
          className={`input-field ${err ? 'input-error' : ''}`}
          value={instagram}
          onChange={(e) => onInstagramChange(e.target.value)}
          placeholder={t('instagramPlaceholder')}
          autoComplete="username"
          inputMode="text"
        />
        <p className="text-xs text-muted-foreground mt-1">{t('instagramFormatHint')}</p>
        {err && (
          <p className="error-message mt-1" role="alert">
            <AlertCircleIcon />
            {err}
          </p>
        )}
        {isPrimary && instagramLink && !err && (
          <ProfileLinkPreview href={instagramLink} language={language} />
        )}
      </div>
    );
  };

  const renderPhoneField = (variant: 'primary' | 'secondary') => {
    const isPrimary = variant === 'primary';
    const wrap = isPrimary
      ? 'rounded-xl p-4 border-2 border-primary bg-primary/5 shadow-sm'
      : 'rounded-xl p-3 border border-border bg-muted/20';
    const err = errors.phone;
    return (
      <div className={wrap}>
        <label className="text-sm text-muted-foreground mb-1 block">
          {t('phone')}
          {isPrimary && <span className="text-destructive ml-0.5">*</span>}
        </label>
        <input
          type="tel"
          className={`input-field ${err ? 'input-error' : ''}`}
          value={phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder={t('phonePlaceholder')}
          autoComplete="tel"
          inputMode="tel"
        />
        {err && (
          <p className="error-message mt-1" role="alert">
            <AlertCircleIcon />
            {err}
          </p>
        )}
      </div>
    );
  };

  const renderPrimaryField = () => {
    if (pcm === 'telegram') return renderTelegramField('primary');
    if (pcm === 'instagram') return renderInstagramField('primary');
    if (pcm === 'phone') return renderPhoneField('primary');
    return null;
  };

  const renderSecondary = (m: PreferredContactMethod) => {
    if (m === 'telegram') return <div key="tg">{renderTelegramField('secondary')}</div>;
    if (m === 'instagram') return <div key="ig">{renderInstagramField('secondary')}</div>;
    if (m === 'phone') return <div key="ph">{renderPhoneField('secondary')}</div>;
    return null;
  };

  const hasContactError = !!(errors.contact || errors.telegram || errors.instagram || errors.phone);

  return (
    <div className="card-wellness space-y-4" data-error={hasContactError}>
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-primary shrink-0" />
        {t('preferredContactTitle')} <span className="text-destructive">*</span>
      </h3>

      <p className="text-sm text-muted-foreground">{t('contactBlockHint')}</p>

      {errors.contact && (
        <p className="error-message" role="alert">
          <AlertCircleIcon />
          {errors.contact}
        </p>
      )}

      <div className="flex flex-wrap gap-2 sm:gap-3" role="radiogroup" aria-label={t('preferredContactTitle')}>
        {METHODS.map((m) => (
          <label
            key={m}
            className={`flex items-center gap-2 px-3 py-2.5 sm:px-4 rounded-xl cursor-pointer transition-all min-h-[44px] touch-manipulation ${
              pcm === m ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-muted'
            }`}
          >
            <input
              type="radio"
              name="preferred_contact_method"
              value={m}
              checked={pcm === m}
              onChange={() => onPreferredChange(m)}
              className="sr-only"
            />
            <span className="text-sm font-medium">{methodLabel(m)}</span>
          </label>
        ))}
      </div>

      {pcm && <div className="space-y-4">{renderPrimaryField()}</div>}

      {pcm && !showExtraContacts && (
        <button
          type="button"
          onClick={onToggleExtraContacts}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline py-2 min-h-[44px]"
        >
          <Plus className="w-4 h-4 shrink-0" />
          {t('addAnotherContact')}
        </button>
      )}

      {pcm && showExtraContacts && (
        <div className="space-y-4 pt-1 border-t border-border">
          <p className="text-xs text-muted-foreground font-medium">
            {language === 'ru' ? 'Дополнительно (необязательно)' : 'Additional (optional)'}
          </p>
          <div className="space-y-4">{secondaryMethods.map((m) => renderSecondary(m))}</div>
        </div>
      )}
    </div>
  );
};

const ProfileLinkPreview = ({ href, language }: { href: string; language: string }) => (
  <div className="bg-accent/50 rounded-xl p-3 mt-3 space-y-1">
    <p className="text-xs text-muted-foreground font-medium">
      {language === 'ru' ? 'Ссылка на профиль:' : 'Profile link:'}
    </p>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary font-medium text-sm flex items-center gap-1.5 hover:underline break-all"
    >
      {href}
      <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
    </a>
    <p className="text-xs text-muted-foreground">
      {language === 'ru'
        ? 'Перейдите по ссылке, чтобы убедиться, что профиль указан верно'
        : 'Click the link to verify the profile is correct'}
    </p>
  </div>
);

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
