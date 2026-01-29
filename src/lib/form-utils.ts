import { format } from 'date-fns';
import { QuestionnaireSection, QuestionnaireType } from './questionnaire-data';
import { Language, translations } from './translations';

export interface FormData {
  [key: string]: string | string[];
}

export interface FormAdditionalData {
  [key: string]: string;
}

export interface ContactData {
  telegram: string;
  instagram: string;
}

export interface FormErrors {
  [key: string]: string;
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
  contactData: ContactData
) => {
  try {
    const data = { formData, additionalData, contactData, timestamp: Date.now() };
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
        // Migrate old ContactData structure (method + username) to new structure (telegram + instagram)
        let contactData: ContactData = data.contactData as ContactData;
        if (contactData && 'method' in contactData && 'username' in contactData) {
          // Old structure detected - migrate to new structure
          const oldData = contactData as any;
          contactData = {
            telegram: oldData.method === 'telegram' ? (oldData.username || '') : '',
            instagram: oldData.method === 'instagram' ? (oldData.username || '') : '',
          };
        } else if (!contactData || !('telegram' in contactData)) {
          // Ensure new structure exists
          contactData = {
            telegram: '',
            instagram: '',
          };
        }
        
        return {
          formData: data.formData as FormData,
          additionalData: data.additionalData as FormAdditionalData,
          contactData,
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

// Validate form
export const validateForm = (
  sections: QuestionnaireSection[],
  formData: FormData,
  contactData: ContactData,
  lang: Language,
  additionalData?: FormAdditionalData
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

  // Universal validation: if any question has "other" selected, additional field is required
  sections.forEach((section) => {
    section.questions.forEach((question) => {
      if ((question.type === 'checkbox' || question.type === 'radio') && question.options) {
        const hasOtherOption = question.options.some(opt => opt.value === 'other');
        if (hasOtherOption) {
          const questionValue = formData[question.id];
          if (questionValue) {
            const valueArray = Array.isArray(questionValue) ? questionValue : [questionValue];
            const hasOther = valueArray.includes('other');
            if (hasOther && additionalData) {
              const additionalKey = `${question.id}_additional`;
              const additionalValue = additionalData[additionalKey];
              if (!additionalValue || additionalValue.trim() === '') {
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
  
  // Special validation: if main_concern is "yes", additional field is required
  if (formData['main_concern'] === 'yes' && additionalData) {
    const mainConcernAdditional = additionalData['main_concern_additional'];
    if (!mainConcernAdditional || mainConcernAdditional.trim() === '') {
      errors['main_concern_additional'] = t.required;
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

  // Validate contact - at least one contact method must be filled
  const hasTelegram = contactData.telegram && contactData.telegram.trim() !== '';
  const hasInstagram = contactData.instagram && contactData.instagram.trim() !== '';
  
  if (!hasTelegram && !hasInstagram) {
    errors['contact'] = t.atLeastOneContactRequired;
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
  lang: Language
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

  // Contact section (enhanced)
  const contacts: string[] = [];
  
  if (contactData.telegram && contactData.telegram.trim() !== '') {
    const cleanTelegram = contactData.telegram.replace(/^@/, '').trim();
    contacts.push(`📱 Telegram: @${cleanTelegram}\n🔗 https://t.me/${cleanTelegram}`);
  }
  
  if (contactData.instagram && contactData.instagram.trim() !== '') {
    const cleanInstagram = contactData.instagram.replace(/^@/, '').trim();
    contacts.push(`📷 Instagram: @${cleanInstagram}\n🔗 https://instagram.com/${cleanInstagram}`);
  }

  if (contacts.length > 0) {
    md += `\n━━━━━━━━━━━━━━━━━━━━\n`;
    md += `**${t.mdContacts}**\n`;
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

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: markdown,
          parse_mode: 'Markdown',
        }),
        signal: controller.signal,
      }
    );

    if (timeoutId) clearTimeout(timeoutId);

    const responseData = await response.json();

    if (!response.ok) {
      const errorMsg = responseData.description || `HTTP ${response.status}`;
      console.error('Telegram API error:', {
        status: response.status,
        statusText: response.statusText,
        error: responseData
      });
      return { 
        success: false, 
        error: `Telegram API error: ${errorMsg}` 
      };
    }

    if (!responseData.ok) {
      const errorMsg = responseData.description || 'Unknown Telegram API error';
      console.error('Telegram API returned error:', responseData);
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
