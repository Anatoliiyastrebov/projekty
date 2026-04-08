import { format } from 'date-fns';
import { QuestionnaireSection, QuestionnaireType } from './questionnaire-data';
import { Language, translations } from './translations';

export interface FormData {
  [key: string]: string | string[];
}

export interface FormAdditionalData {
  [key: string]: string;
}

export type PreferredContactMethod = '' | 'telegram' | 'instagram' | 'phone';

export interface ContactData {
  preferred_contact_method: PreferredContactMethod;
  telegram: string;
  instagram: string;
  phone: string;
}

export const emptyContactData = (): ContactData => ({
  preferred_contact_method: '',
  telegram: '',
  instagram: '',
  phone: '',
});

export interface SourceData {
  source: string;
  recommender: string;
}

export interface FormErrors {
  [key: string]: string;
}

const TELEGRAM_URL_RE = /(?:https?:\/\/)?(?:www\.)?(?:t\.me|telegram\.me)\/([^/?#]+)/i;
const INSTAGRAM_URL_RE = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([^/?#]+)/i;

function looksLikePhoneString(s: string): boolean {
  const compact = s.replace(/[\s().-]/g, '');
  return /^\+?\d{6,}$/.test(compact);
}

function normalizePhoneFromRaw(raw: string): string {
  const t = raw.trim().replace(/[\s().-]/g, '');
  if (!t) return '';
  if (t.startsWith('+')) return `+${t.slice(1).replace(/\D/g, '')}`;
  return t.replace(/\D/g, '');
}

/** Instagram: username or profile URL → username fragment for validation */
export function parseInstagramInput(raw: string): string {
  let t = raw.trim();
  if (!t) return '';
  const m = t.match(INSTAGRAM_URL_RE);
  if (m) {
    try {
      t = decodeURIComponent(m[1]);
    } catch {
      t = m[1];
    }
  }
  return t.replace(/^@/, '').trim();
}

function normalizeTelegramFromUrl(raw: string): string | null {
  const m = raw.trim().match(TELEGRAM_URL_RE);
  if (!m) return null;
  const user = m[1].replace(/^@/, '').trim();
  if (!user || user.toLowerCase() === 'share' || user.includes('/')) return null;
  return `@${user}`;
}

function normalizeInstagramFromUrlField(raw: string): string {
  const m = raw.trim().match(INSTAGRAM_URL_RE);
  if (!m) return raw.trim();
  try {
    return `@${decodeURIComponent(m[1]).replace(/^@/, '')}`;
  } catch {
    return `@${m[1].replace(/^@/, '')}`;
  }
}

/** Merge legacy and new shapes; infer preferred method when missing */
export function migrateContactData(input: unknown): ContactData {
  const out = emptyContactData();
  if (!input || typeof input !== 'object') return out;

  const o = { ...(input as Record<string, unknown>) };

  if ('method' in o && 'username' in o) {
    const method = String(o.method || '');
    const username = String(o.username || '').trim();
    if (method === 'telegram') o.telegram = username;
    else if (method === 'instagram') o.instagram = username;
  }

  let telegram = String(o.telegram ?? '').trim();
  let instagram = String(o.instagram ?? '').trim();
  let phone = String(o.phone ?? '').trim();
  let preferred: PreferredContactMethod =
    (o.preferred_contact_method as PreferredContactMethod) || '';

  if (telegram) {
    const fromTgUrl = normalizeTelegramFromUrl(telegram);
    if (fromTgUrl) telegram = fromTgUrl;
    else if (!telegram.startsWith('@') && INSTAGRAM_URL_RE.test(telegram)) {
      instagram = normalizeInstagramFromUrlField(telegram);
      telegram = '';
    } else if (!instagram && !phone && looksLikePhoneString(telegram)) {
      phone = normalizePhoneFromRaw(telegram);
      telegram = '';
    }
  }

  if (instagram) {
    instagram = normalizeInstagramFromUrlField(instagram);
  }

  if (phone) {
    phone = normalizePhoneFromRaw(phone);
  }

  const validPref = (p: string): p is PreferredContactMethod =>
    p === 'telegram' || p === 'instagram' || p === 'phone' || p === '';

  if (!validPref(preferred)) preferred = '';

  const hasT = telegram.length > 0;
  const hasI = instagram.length > 0;
  const hasP = phone.length > 0;

  if (!preferred) {
    if (hasT && !hasI && !hasP) preferred = 'telegram';
    else if (hasI && !hasT && !hasP) preferred = 'instagram';
    else if (hasP && !hasT && !hasI) preferred = 'phone';
    else if (hasT && hasI && !hasP) preferred = 'telegram';
    else if (hasT && hasP && !hasI) preferred = 'telegram';
    else if (hasI && hasP && !hasT) preferred = 'instagram';
    else if (hasT && hasI && hasP) preferred = 'telegram';
  }

  if (preferred === 'telegram' && !hasT && (hasI || hasP)) {
    if (hasI && !hasP) preferred = 'instagram';
    else if (hasP && !hasI) preferred = 'phone';
  }

  out.telegram = telegram;
  out.instagram = instagram;
  out.phone = phone;
  out.preferred_contact_method = preferred;

  return out;
}

// Storage keys
const getStorageKey = (type: QuestionnaireType, lang: Language) => 
  `health_questionnaire_${type}_${lang}`;

// Save form data to localStorage
export const saveFormData = (
  type: QuestionnaireType,
  lang: Language,
  formData: FormData,
  additionalData: FormAdditionalData,
  contactData: ContactData,
  sourceData?: SourceData
) => {
  try {
    const data = { formData, additionalData, contactData, sourceData: sourceData || { source: '', recommender: '' }, timestamp: Date.now() };
    localStorage.setItem(getStorageKey(type, lang), JSON.stringify(data));
  } catch (err) {
    console.error('Error saving form data:', err);
  }
};

// Load form data from localStorage
export const loadFormData = (type: QuestionnaireType, lang: Language) => {
  try {
    const stored = localStorage.getItem(getStorageKey(type, lang));
    if (stored) {
      const data = JSON.parse(stored);
      // Only return if data is less than 24 hours old
      if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
        const contactData = migrateContactData(data.contactData);
        
        return {
          formData: data.formData as FormData,
          additionalData: data.additionalData as FormAdditionalData,
          contactData,
          sourceData: (data.sourceData as SourceData) || { source: '', recommender: '' },
        };
      }
    }
  } catch (err) {
    console.error('Error loading form data:', err);
  }
  return null;
};

// Clear form data from localStorage
export const clearFormData = (type: QuestionnaireType, lang: Language) => {
  try {
    localStorage.removeItem(getStorageKey(type, lang));
  } catch (err) {
    console.error('Error clearing form data:', err);
  }
};

export type ContactValidation = { valid: boolean; error?: string };

export const validateTelegramUsername = (raw: string): ContactValidation => {
  const value = raw.replace(/^@/, '').trim();
  if (!value) return { valid: false, error: 'empty' };
  if (value.length < 5) return { valid: false, error: 'telegram_too_short' };
  if (value.length > 32) return { valid: false, error: 'telegram_too_long' };
  if (!/^[a-zA-Z0-9_]+$/.test(value)) return { valid: false, error: 'telegram_invalid_chars' };
  return { valid: true };
};

export const validateInstagramUsername = (raw: string): ContactValidation => {
  const value = raw.replace(/^@/, '').trim();
  if (!value) return { valid: false, error: 'empty' };
  if (value.length > 30) return { valid: false, error: 'instagram_too_long' };
  if (!/^[a-zA-Z0-9._]+$/.test(value)) return { valid: false, error: 'instagram_invalid_chars' };
  if (/^\.|\.\.|\.$/.test(value)) return { valid: false, error: 'instagram_dots' };
  return { valid: true };
};

/** Telegram: @ prefix, no spaces; then username rules */
export const validateTelegramPreferred = (raw: string): ContactValidation => {
  const s = raw.trim();
  if (!s) return { valid: false, error: 'empty' };
  if (/\s/.test(s)) return { valid: false, error: 'telegram_no_spaces' };
  if (!s.startsWith('@')) return { valid: false, error: 'telegram_must_start_with_at' };
  return validateTelegramUsername(s);
};

/** Instagram: nickname or instagram.com/… link */
export const validateInstagramFlexible = (raw: string): ContactValidation => {
  const trimmed = raw.trim();
  if (!trimmed) return { valid: false, error: 'empty' };
  const parsed = parseInstagramInput(trimmed);
  if (!parsed) return { valid: false, error: 'instagram_invalid_input' };
  return validateInstagramUsername(parsed);
};

export const validatePhoneNumber = (raw: string): ContactValidation => {
  const s = raw.trim();
  if (!s) return { valid: false, error: 'empty' };
  if (!/^\+?[0-9]+$/.test(s)) return { valid: false, error: 'phone_invalid' };
  const digits = s.startsWith('+') ? s.slice(1) : s;
  if (digits.length < 6) return { valid: false, error: 'phone_too_short' };
  return { valid: true };
};

export function sanitizePhoneInput(raw: string): string {
  let out = '';
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i];
    if (c === '+' && out.length === 0) out += '+';
    else if (/\d/.test(c)) out += c;
  }
  return out;
}

// Validate form
export const validateForm = (
  sections: QuestionnaireSection[],
  formData: FormData,
  contactData: ContactData,
  lang: Language,
  additionalData?: FormAdditionalData,
  sourceData?: SourceData
): FormErrors => {
  const errors: FormErrors = {};
  const t = translations[lang];

  sections.forEach((section) => {
    section.questions.forEach((question) => {
      if (question.required) {
        const value = formData[question.id];
        
        if (question.type === 'checkbox') {
          if (!value || (Array.isArray(value) && value.length === 0)) {
            errors[question.id] = t.selectAtLeastOne;
          }
        } else if (question.type === 'number') {
          if (!value || value === '' || isNaN(Number(value))) {
            errors[question.id] = t.required;
          }
        } else {
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            errors[question.id] = t.required;
          }
        }
      }
    });
  });

  // Special validation: if operations is "yes", additional field is required
  if (formData['operations'] === 'yes' && additionalData) {
    const operationsAdditional = additionalData['operations_additional'];
    if (!operationsAdditional || operationsAdditional.trim() === '') {
      errors['operations_additional'] = t.required;
    }
  }

  // Special validation: if injuries has any option selected except "no_issues", additional field is required
  if (formData['injuries'] && additionalData) {
    const injuriesValue = formData['injuries'];
    const injuriesArray = Array.isArray(injuriesValue) ? injuriesValue : [injuriesValue];
    // Check if any option other than "no_issues" is selected
    const hasOtherThanNoIssues = injuriesArray.some((val: string) => val !== 'no_issues');
    if (hasOtherThanNoIssues) {
      const injuriesAdditional = additionalData['injuries_additional'];
      if (!injuriesAdditional || injuriesAdditional.trim() === '') {
        errors['injuries_additional'] = t.required;
      }
    }
  }

  // Universal validation: if any question has "other" selected, additional field is required (не принимать пустое)
  sections.forEach((section) => {
    section.questions.forEach((question) => {
      if ((question.type === 'checkbox' || question.type === 'radio') && question.options) {
        const hasOtherOption = question.options.some(opt => opt.value === 'other');
        if (hasOtherOption) {
          const questionValue = formData[question.id];
          if (questionValue) {
            const valueArray = Array.isArray(questionValue) ? questionValue : [questionValue];
            const hasOther = valueArray.includes('other');
            if (hasOther) {
              const additionalKey = `${question.id}_additional`;
              const additionalValue = additionalData?.[additionalKey];
              const isEmpty = additionalValue === undefined || additionalValue === null || String(additionalValue).trim() === '';
              if (isEmpty) {
                errors[additionalKey] = t.required;
              }
            }
          }
        }
      }
    });
  });

  // Special validation: if medications is "yes", additional field is required
  if (formData['medications'] === 'yes' && additionalData) {
    const medicationsAdditional = additionalData['medications_additional'];
    if (!medicationsAdditional || medicationsAdditional.trim() === '') {
      errors['medications_additional'] = t.required;
    }
  }
  
  // Special validation: if what_else is "yes", additional field is required
  if (formData['what_else'] === 'yes' && additionalData) {
    const whatElseAdditional = additionalData['what_else_additional'];
    if (!whatElseAdditional || whatElseAdditional.trim() === '') {
      errors['what_else_additional'] = t.required;
    }
  }
  // Special validation: if pregnancy_problems is "yes", additional field is required
  if (formData['pregnancy_problems'] === 'yes' && additionalData) {
    const pregnancyProblemsAdditional = additionalData['pregnancy_problems_additional'];
    if (!pregnancyProblemsAdditional || pregnancyProblemsAdditional.trim() === '') {
      errors['pregnancy_problems_additional'] = t.required;
    }
  }
  
  // Note: Universal validation for "other" options is handled above, but medications, what_else, main_concern, and pregnancy_problems use "yes" instead of "other"

  // Special validation: if illness_antibiotics has "took_antibiotics" or "took_other_medications" selected, additional field is required
  if (formData['illness_antibiotics'] && additionalData) {
    const illnessAntibioticsValue = formData['illness_antibiotics'];
    const illnessAntibioticsArray = Array.isArray(illnessAntibioticsValue) ? illnessAntibioticsValue : [illnessAntibioticsValue];
    const hasAntibiotics = illnessAntibioticsArray.includes('took_antibiotics');
    const hasOtherMedications = illnessAntibioticsArray.includes('took_other_medications');
    if (hasAntibiotics || hasOtherMedications) {
      const illnessAntibioticsAdditional = additionalData['illness_antibiotics_additional'];
      if (!illnessAntibioticsAdditional || illnessAntibioticsAdditional.trim() === '') {
        errors['illness_antibiotics_additional'] = t.required;
      }
    }
  }

  // weight_satisfaction: when want_to_lose or want_to_gain
  if (formData['weight_satisfaction'] && additionalData) {
    const vals = Array.isArray(formData['weight_satisfaction']) ? formData['weight_satisfaction'] : [];
    if (vals.includes('want_to_lose') || vals.includes('want_to_gain')) {
      const v = additionalData['weight_satisfaction_additional'];
      if (!v || v.trim() === '') errors['weight_satisfaction_additional'] = t.required;
    }
  }
  // stones: when stones_kidneys or stones_gallbladder or both
  if (formData['stones'] && additionalData) {
    const vals = Array.isArray(formData['stones']) ? formData['stones'] : [];
    if (vals.includes('stones_kidneys') || vals.includes('stones_gallbladder') || vals.includes('both')) {
      const v = additionalData['stones_additional'];
      if (!v || v.trim() === '') errors['stones_additional'] = t.required;
    }
  }
  // operations_injuries: when operations or organ_removed
  if (formData['operations_injuries'] && additionalData) {
    const vals = Array.isArray(formData['operations_injuries']) ? formData['operations_injuries'] : [];
    if (vals.includes('operations') || vals.includes('organ_removed') || vals.includes('injuries')) {
      const v = additionalData['operations_injuries_additional'];
      if (!v || v.trim() === '') errors['operations_injuries_additional'] = t.required;
    }
  }
  // pressure: when high
  if (formData['pressure'] && additionalData) {
    const vals = Array.isArray(formData['pressure']) ? formData['pressure'] : [];
    if (vals.includes('high')) {
      const v = additionalData['pressure_additional'];
      if (!v || v.trim() === '') errors['pressure_additional'] = t.required;
    }
  }
  // covid_times and covid_complications: only when была болезнь
  if (formData['covid_status']) {
    const raw = formData['covid_status'];
    const vals = Array.isArray(raw) ? raw : [raw];
    const hadCovid = vals.includes('had_covid') || vals.includes('both');
    if (hadCovid) {
      const times = formData['covid_times'];
      if (!times || times === '' || isNaN(Number(times))) {
        errors['covid_times'] = t.required;
      }
      const complications = formData['covid_complications'];
      if (!complications || (Array.isArray(complications) && complications.length === 0)) {
        errors['covid_complications'] = t.selectAtLeastOne;
      }
    }
  }
  // cysts_polyps: when cysts, polyps, fibroids, tumors, hernias
  if (formData['cysts_polyps'] && additionalData) {
    const vals = Array.isArray(formData['cysts_polyps']) ? formData['cysts_polyps'] : [];
    if (vals.some((v: string) => ['cysts', 'polyps', 'fibroids', 'tumors', 'hernias'].includes(v))) {
      const v = additionalData['cysts_polyps_additional'];
      if (!v || v.trim() === '') errors['cysts_polyps_additional'] = t.required;
    }
  }

  if (sourceData?.source === 'recommendation' && !sourceData.recommender?.trim()) {
    errors['source_recommender'] = t.required;
  }

  const tr = t as Record<string, string>;
  const fillMsg = tr.fillPreferredContact || t.required;
  const selectMethodMsg = tr.selectContactMethod || tr.atLeastOneContactRequired;
  const pcm = contactData.preferred_contact_method;

  if (!pcm) {
    errors['contact'] = selectMethodMsg;
  } else if (pcm === 'telegram') {
    const v = contactData.telegram?.trim() ?? '';
    if (!v) errors['telegram'] = fillMsg;
    else {
      const r = validateTelegramPreferred(v);
      if (!r.valid && r.error && r.error !== 'empty') {
        errors['telegram'] = tr[r.error] || t.required;
      }
    }
  } else if (pcm === 'instagram') {
    const v = contactData.instagram?.trim() ?? '';
    if (!v) errors['instagram'] = fillMsg;
    else {
      const r = validateInstagramFlexible(v);
      if (!r.valid && r.error && r.error !== 'empty') {
        errors['instagram'] = tr[r.error] || t.required;
      }
    }
  } else if (pcm === 'phone') {
    const v = contactData.phone?.trim() ?? '';
    if (!v) errors['phone'] = fillMsg;
    else {
      const r = validatePhoneNumber(v);
      if (!r.valid && r.error && r.error !== 'empty') {
        errors['phone'] = tr[r.error] || t.required;
      }
    }
  }

  if (pcm) {
    if (pcm !== 'telegram' && contactData.telegram?.trim()) {
      const r = validateTelegramPreferred(contactData.telegram);
      if (!r.valid && r.error && r.error !== 'empty' && !errors['telegram']) {
        errors['telegram'] = tr[r.error] || t.required;
      }
    }
    if (pcm !== 'instagram' && contactData.instagram?.trim()) {
      const r = validateInstagramFlexible(contactData.instagram);
      if (!r.valid && r.error && r.error !== 'empty' && !errors['instagram']) {
        errors['instagram'] = tr[r.error] || t.required;
      }
    }
    if (pcm !== 'phone' && contactData.phone?.trim()) {
      const r = validatePhoneNumber(contactData.phone);
      if (!r.valid && r.error && r.error !== 'empty' && !errors['phone']) {
        errors['phone'] = tr[r.error] || t.required;
      }
    }
  }

  return errors;
};

// Generate Markdown
export const generateMarkdown = (
  type: QuestionnaireType,
  sections: QuestionnaireSection[],
  formData: FormData,
  additionalData: FormAdditionalData,
  contactData: ContactData,
  lang: Language,
  sourceData?: SourceData
): string => {
  const t = translations[lang];
  const headers = {
    infant: t.mdInfant,
    child: t.mdChild,
    woman: t.mdWoman,
    man: t.mdMan,
  };

  const dateStr = format(new Date(), 'dd.MM.yyyy, HH:mm');
  let md = `📋 Новая анкета: ${headers[type]}\n\n📅 Дата: ${dateStr}\n\n`;

  let questionNumber = 1;
  let healthSectionStarted = false;
  let isFirstSection = true;

  sections.forEach((section) => {
    // Skip empty sections
    const hasAnswers = section.questions.some((question) => {
      const value = formData[question.id];
      return value && (Array.isArray(value) ? value.length > 0 : value.trim() !== '');
    });

    if (!hasAnswers) return;

    // Section header (compact)
    if (!isFirstSection) {
      md += `\n`;
    }
    md += `**${section.title[lang]}**\n`;
    isFirstSection = false;

    // Check if this is the health section - start numbering from here
    if (section.id === 'health') {
      healthSectionStarted = true;
    }

    section.questions.forEach((question) => {
      const value = formData[question.id];
      const additional = additionalData[`${question.id}_additional`];

      if (value && (Array.isArray(value) ? value.length > 0 : value.trim() !== '')) {
        const label = question.label[lang];
        
        // Question number and label - start numbering from first question in "health" section
        let questionPrefix = '';
        if (healthSectionStarted) {
          questionPrefix = `${questionNumber}. `;
          questionNumber++;
        }
        
        // Format answer
        let answerText = '';
        if (Array.isArray(value)) {
          const optionLabels = value.map((v) => {
            const opt = question.options?.find((o) => o.value === v);
            return opt ? opt.label[lang] : v;
          });
          answerText = optionLabels.join(', ');
        } else if (question.options) {
          const opt = question.options.find((o) => o.value === value);
          answerText = opt ? opt.label[lang] : value;
        } else {
          answerText = value;
        }

        // Enhanced format: Question in bold, Answer in bold with arrow
        md += `${questionPrefix}**${label}**\n`;
        md += `➤ **${answerText}**`;
        
        if (additional && additional.trim() !== '') {
          md += `\n   _${additional}_`;
        }
        
        md += `\n`;
      }
    });
  });

  // Source section
  if (sourceData?.source) {
    const sourceLabels = { telegram: 'Telegram', instagram: 'Instagram', recommendation: lang === 'ru' ? 'По рекомендации' : 'By recommendation' };
    md += `\n**${lang === 'ru' ? 'Откуда узнали' : 'Source'}:** ${sourceLabels[sourceData.source as keyof typeof sourceLabels] || sourceData.source}`;
    if (sourceData.source === 'recommendation' && sourceData.recommender?.trim()) {
      md += `\n➤ _${sourceData.recommender.trim()}_`;
    }
    md += '\n';
  }

  // Contact section (enhanced)
  const contacts: string[] = [];
  const pcm = contactData.preferred_contact_method;
  if (contactData.telegram && contactData.telegram.trim() !== '') {
    const cleanTelegram = contactData.telegram.replace(/^@/, '').trim();
    contacts.push(`📱 Telegram: @${cleanTelegram}\n🔗 https://t.me/${cleanTelegram}`);
  }
  if (contactData.instagram && contactData.instagram.trim() !== '') {
    const cleanInstagram = contactData.instagram.replace(/^@/, '').trim();
    contacts.push(`📷 Instagram: @${cleanInstagram}\n🔗 https://instagram.com/${cleanInstagram}`);
  }
  if (contactData.phone && contactData.phone.trim() !== '') {
    contacts.push(`📞 ${lang === 'ru' ? 'Телефон' : 'Phone'}: ${contactData.phone.trim()}`);
  }

  if (pcm || contacts.length > 0) {
    const prefLabel =
      pcm === 'telegram'
        ? 'Telegram'
        : pcm === 'instagram'
          ? 'Instagram'
          : pcm === 'phone'
            ? lang === 'ru'
              ? 'Телефон'
              : 'Phone'
            : '';
    md += `\n━━━━━━━━━━━━━━━━━━━━\n`;
    md += `**${t.mdContacts}**\n`;
    if (pcm && prefLabel) {
      md += `➤ **${lang === 'ru' ? 'Предпочитаемый способ связи' : 'Preferred contact'}:** ${prefLabel}\n`;
    }
    contacts.forEach((contact) => {
      md += `➤ ${contact}\n`;
    });
  }

  return md;
};

// Send to Telegram
// SECURITY NOTE: In production, use environment variables or a server-side proxy
// Do not expose BOT_TOKEN in client-side code in production!
// For development: Set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in .env file
export const sendToTelegram = async (markdown: string): Promise<{ success: boolean; error?: string }> => {
  // Try to get from environment variables first (for Vite: VITE_ prefix)
  const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  // Debug: Log all environment variables (without exposing sensitive data)
  const allViteEnvKeys = Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'));
  console.log('Environment check:', {
    hasToken: !!BOT_TOKEN,
    hasChatId: !!CHAT_ID,
    tokenLength: BOT_TOKEN?.length || 0,
    chatIdLength: CHAT_ID?.length || 0,
    mode: import.meta.env.MODE,
    prod: import.meta.env.PROD,
    dev: import.meta.env.DEV,
    allEnvKeys: allViteEnvKeys,
    allEnvValues: allViteEnvKeys.map(key => ({ key, hasValue: !!import.meta.env[key] }))
  });

  // Validate that BOT_TOKEN is set (CHAT_ID is optional - can be set later)
  if (!BOT_TOKEN || BOT_TOKEN.trim() === '') {
    const errorMsg = `Telegram Bot Token not configured. 
    
Please check:
1. Go to your hosting platform:
   - Netlify: Site settings → Environment variables
   - Vercel: Project settings → Environment variables
2. Make sure this variable is set:
   - Key: VITE_TELEGRAM_BOT_TOKEN, Value: your_bot_token
3. After adding variable, rebuild the site:
   - Netlify: Deploys → Trigger deploy → Clear cache and deploy site
   - Vercel: Deployments → Redeploy (or push to GitHub for auto-deploy)
4. Wait for the build to complete

Note: VITE_TELEGRAM_CHAT_ID is optional. If not set, you can add it later.

Current status:
- VITE_TELEGRAM_BOT_TOKEN: ${BOT_TOKEN ? 'SET' : 'NOT SET'}
- VITE_TELEGRAM_CHAT_ID: ${CHAT_ID ? 'SET (optional)' : 'NOT SET (optional)'}
- All VITE_ variables found: ${allViteEnvKeys.join(', ') || 'NONE'}`;
    
    console.error('Environment variables check failed:', {
      BOT_TOKEN: BOT_TOKEN ? 'SET (hidden)' : 'NOT SET',
      CHAT_ID: CHAT_ID ? 'SET (hidden)' : 'NOT SET (optional)',
      allViteEnvKeys,
      mode: import.meta.env.MODE
    });
    return { success: false, error: errorMsg };
  }

  // CHAT_ID is optional - if not set, we'll use a default or handle it differently
  // For now, if CHAT_ID is not set, we'll return an error with instructions
  if (!CHAT_ID || CHAT_ID.trim() === '') {
    const errorMsg = `Telegram Chat ID not configured. 
    
Please check:
1. Go to your hosting platform:
   - Netlify: Site settings → Environment variables
   - Vercel: Project settings → Environment variables
2. Add this variable:
   - Key: VITE_TELEGRAM_CHAT_ID, Value: your_chat_id
   
Note: CHAT_ID is the ID of the chat where the bot will send messages.
If you're sending to a bot, you need the chat ID of your personal chat with the bot.
You can get your chat ID by messaging @userinfobot on Telegram.

3. After adding variable, rebuild the site:
   - Netlify: Deploys → Trigger deploy → Clear cache and deploy site
   - Vercel: Deployments → Redeploy (or push to GitHub for auto-deploy)
4. Wait for the build to complete

Current status:
- VITE_TELEGRAM_BOT_TOKEN: SET
- VITE_TELEGRAM_CHAT_ID: NOT SET
- All VITE_ variables found: ${allViteEnvKeys.join(', ') || 'NONE'}`;
    
    console.error('CHAT_ID not set:', {
      BOT_TOKEN: 'SET (hidden)',
      CHAT_ID: 'NOT SET',
      allViteEnvKeys,
      mode: import.meta.env.MODE
    });
    return { success: false, error: errorMsg };
  }

  // Log payload for debugging
  console.log('Sending to Telegram...', { 
    chatId: CHAT_ID.substring(0, 4) + '...', 
    textLength: markdown.length,
    hasToken: !!BOT_TOKEN,
    hasChatId: !!CHAT_ID
  });

  // Create AbortController for timeout
  const controller = new AbortController();
  let timeoutId: NodeJS.Timeout | null = null;

  try {
    timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const sendMessage = async (withMarkdown: boolean) => {
      const payload: Record<string, string> = {
        chat_id: CHAT_ID,
        text: markdown,
      };
      if (withMarkdown) {
        payload.parse_mode = 'Markdown';
      }

      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const data = await response.json();
      return { response, data };
    };

    // First try with Markdown, then fallback to plain text for reliability.
    let { response, data } = await sendMessage(true);
    if ((!response.ok || !data?.ok) && String(data?.description || '').toLowerCase().includes('parse')) {
      console.warn('Markdown parse failed, retrying without parse_mode...', data);
      ({ response, data } = await sendMessage(false));
    }

    if (timeoutId) clearTimeout(timeoutId);

    if (!response.ok) {
      const errorMsg = data?.description || `HTTP ${response.status}`;
      console.error('Telegram API error:', {
        status: response.status,
        statusText: response.statusText,
        error: data
      });
      return {
        success: false,
        error: `Telegram API error: ${errorMsg}`
      };
    }

    if (!data?.ok) {
      const errorMsg = data?.description || 'Unknown Telegram API error';
      console.error('Telegram API returned error:', data);
      return {
        success: false,
        error: `Telegram API error: ${errorMsg}`
      };
    }

    console.log('Successfully sent to Telegram');
    return { success: true };
  } catch (error: any) {
    if (timeoutId) clearTimeout(timeoutId);
    
    let errorMessage = 'Unknown error occurred';
    
    if (error.name === 'AbortError') {
      errorMessage = 'Request timeout. Please check your internet connection and try again.';
    } else if (error instanceof TypeError && error.message.includes('fetch')) {
      errorMessage = 'Network error. Please check your internet connection and try again.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    console.error('Error sending to Telegram:', {
      error,
      message: errorMessage,
      name: error?.name,
      stack: error?.stack
    });
    
    return { 
      success: false, 
      error: errorMessage 
    };
  }
};

const getTelegramCredentials = (): { BOT_TOKEN: string; CHAT_ID: string } | { error: string } => {
  const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  if (!BOT_TOKEN || BOT_TOKEN.trim() === '' || !CHAT_ID || CHAT_ID.trim() === '') {
    return { error: 'Telegram Bot Token or Chat ID not configured.' };
  }
  return { BOT_TOKEN, CHAT_ID };
};

/** Send a file (e.g. analyses, ultrasound) to the same Telegram chat. Use after sendToTelegram(markdown). */
export const sendDocumentToTelegram = async (
  file: File,
  caption?: string
): Promise<{ success: boolean; error?: string }> => {
  const creds = getTelegramCredentials();
  if ('error' in creds) return { success: false, error: creds.error };

  const { BOT_TOKEN, CHAT_ID } = creds;
  const formData = new FormData();
  formData.append('chat_id', CHAT_ID);
  formData.append('document', file, file.name);
  if (caption && caption.trim()) {
    formData.append('caption', caption.trim());
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s for large files

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const data = await response.json();
    if (!response.ok) {
      const msg = data.description || `HTTP ${response.status}`;
      return { success: false, error: msg };
    }
    if (!data.ok) {
      return { success: false, error: data.description || 'Unknown Telegram API error' };
    }
    return { success: true };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: message };
  }
};
