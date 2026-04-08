import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getQuestionnaire,
  type QuestionnaireSection,
  type QuestionnaireType,
  type Question,
} from './questionnaire-data';
import {
  validateForm,
  generateMarkdown,
  sendToTelegram,
  emptyContactData,
  type FormData,
  type FormAdditionalData,
  type ContactData,
  type SourceData,
} from './form-utils';

function findQuestion(sections: QuestionnaireSection[], id: string): Question | undefined {
  for (const s of sections) {
    const q = s.questions.find((x) => x.id === id);
    if (q) return q;
  }
  return undefined;
}

function safeRadioValue(q: Question): string {
  const opts = q.options || [];
  const prefer = [
    'no_issues',
    'no',
    'satisfied',
    'no_complications',
    'normal',
    'pressureNormal',
    'all_organs_ok',
    'rarely_ill',
    'natural',
  ];
  for (const p of prefer) {
    if (opts.some((o) => o.value === p)) return p;
  }
  const nonOther = opts.find((o) => o.value !== 'other');
  return nonOther?.value ?? opts[0]?.value ?? 'yes';
}

function safeCheckboxValue(q: Question): string[] {
  const opts = q.options || [];
  if (opts.some((o) => o.value === 'no_issues')) return ['no_issues'];
  if (q.id === 'covid_status') return ['no'];
  if (opts.some((o) => o.value === 'no')) return ['no'];
  if (opts.some((o) => o.value === 'no_complications')) return ['no_complications'];
  if (opts.some((o) => o.value === 'rarely_ill')) return ['rarely_ill'];
  const first = opts.find((o) => o.value !== 'other');
  return first ? [first.value] : [];
}

function buildInitialFormData(sections: QuestionnaireSection[]): FormData {
  const formData: FormData = {};
  for (const section of sections) {
    for (const q of section.questions) {
      if (!q.required) continue;
      switch (q.type) {
        case 'radio':
          formData[q.id] = safeRadioValue(q);
          break;
        case 'checkbox':
          formData[q.id] = safeCheckboxValue(q);
          break;
        case 'number':
          formData[q.id] = q.id.includes('water') ? '1500' : '1';
          break;
        case 'text':
        case 'textarea':
          formData[q.id] = 'Тест';
          break;
        default:
          break;
      }
    }
  }
  return formData;
}

const validContact = (): ContactData => ({
  ...emptyContactData(),
  preferred_contact_method: 'telegram',
  telegram: '@testuser12345',
});

const emptySource: SourceData = { source: '', recommender: '' };

function convergeValidPayload(type: QuestionnaireType): {
  formData: FormData;
  additionalData: FormAdditionalData;
  sections: QuestionnaireSection[];
} {
  const sections = getQuestionnaire(type);
  let formData = buildInitialFormData(sections);
  let additionalData: FormAdditionalData = {};
  const contactData = validContact();

  for (let iter = 0; iter < 100; iter++) {
    const errors = validateForm(sections, formData, contactData, 'ru', additionalData, emptySource);
    const keys = Object.keys(errors);
    if (keys.length === 0) {
      return { formData, additionalData, sections };
    }

    for (const key of keys) {
      if (key.endsWith('_additional')) {
        additionalData[key] = 'Тестовое уточнение';
        continue;
      }

      const q = findQuestion(sections, key);
      if (!q) continue;

      if (q.type === 'number') {
        formData[key] = key === 'covid_times' ? '1' : '10';
        continue;
      }
      if (q.type === 'checkbox') {
        if (key === 'covid_complications') {
          formData[key] = ['no_complications'];
        } else {
          formData[key] = safeCheckboxValue(q);
        }
        continue;
      }
      if (q.type === 'radio') {
        formData[key] = safeRadioValue(q);
        continue;
      }
      formData[key] = 'Тестовый ответ';
    }
  }

  const final = validateForm(sections, formData, contactData, 'ru', additionalData, emptySource);
  throw new Error(`Could not build valid payload for "${type}": ${JSON.stringify(final)}`);
}

const TYPES: QuestionnaireType[] = ['infant', 'child', 'woman', 'man'];

describe('questionnaire submit pipeline', () => {
  describe.each(TYPES)('%s questionnaire', (type) => {
    it('validateForm returns no errors for a converged payload', () => {
      const { formData, additionalData, sections } = convergeValidPayload(type);
      const errors = validateForm(sections, formData, validContact(), 'ru', additionalData, emptySource);
      expect(errors).toEqual({});
    });

    it('generateMarkdown produces non-empty output with contacts and title markers', () => {
      const { formData, additionalData, sections } = convergeValidPayload(type);
      const md = generateMarkdown(type, sections, formData, additionalData, validContact(), 'ru', emptySource);
      expect(md.length).toBeGreaterThan(200);
      expect(md).toContain('Новая анкета');
      expect(md).toContain('Контакты');
      expect(md).toContain('Telegram');
      expect(md).toContain('t.me/testuser12345');
    });
  });

  it('rejects submission when contact method is missing', () => {
    const { formData, additionalData, sections } = convergeValidPayload('woman');
    const badContact: ContactData = emptyContactData();
    const errors = validateForm(sections, formData, badContact, 'ru', additionalData, emptySource);
    expect(errors.contact).toBeDefined();
  });
});

describe('sendToTelegram', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ ok: true, result: { message_id: 1 } }),
    } as Response);
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('returns success when Telegram API responds with ok', async () => {
    const result = await sendToTelegram('📋 Тестовая анкета\n\nКонтент');
    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
    expect(globalThis.fetch).toHaveBeenCalled();
    const url = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(url).toContain('api.telegram.org');
  });
});
