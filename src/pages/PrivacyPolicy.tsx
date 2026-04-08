import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/translations';

const EMAIL = 'valentina777888@eandex.ru';
const TELEGRAM_HANDLE = '@TimofeevaValentina';
const TELEGRAM_URL = 'https://t.me/TimofeevaValentina';

type PrivacySection = { heading: string; body: string };

const privacyContent: Record<Language, { title: string; sections: PrivacySection[] }> = {
  ru: {
    title: 'Политика конфиденциальности',
    sections: [
      {
        heading: 'Общие положения',
        body:
          'Настоящая политика описывает обработку персональных данных при использовании сайта с анкетой по здоровью. ' +
          'Обработка осуществляется в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».',
      },
      {
        heading: 'Оператор',
        body:
          `Оператор персональных данных: Тимофеева Валентина. Связь: ${EMAIL}, Telegram ${TELEGRAM_HANDLE}.`,
      },
      {
        heading: 'Какие данные обрабатываются',
        body:
          'Данные, которые вы указываете в анкете (в том числе ответы на вопросы и контакты для связи), а также технические данные, необходимые для работы сайта.',
      },
      {
        heading: 'Цель и основание',
        body:
          'Цель — рассмотрение анкеты и связь с вами по вопросу консультации. Правовое основание — ваше согласие, выраженное при отправке анкеты (включая отметку о согласии на обработку данных на странице анкеты).',
      },
      {
        heading: 'Хранение и передача',
        body:
          'Черновик анкеты может временно сохраняться в браузере на вашем устройстве. После отправки сведения передаются оператору способом, предусмотренным на сайте (например, в выбранный канал связи). Срок хранения — в объёме, необходимом для указанной цели, если иное не вытекает из закона.',
      },
      {
        heading: 'Ваши права',
        body:
          'Вы вправе запросить доступ к данным, их уточнение, ограничение обработки или отозвать согласие — для этого напишите на указанный e-mail или в Telegram.',
      },
      {
        heading: 'Информация на сайте',
        body:
          'Материалы сайта носят ознакомительный характер и не заменяют очную консультацию специалиста здравоохранения.',
      },
    ],
  },
  en: {
    title: 'Privacy policy',
    sections: [
      {
        heading: 'General',
        body:
          'This policy describes how personal data are handled when you use this health questionnaire website. Processing follows Federal Law No. 152-FZ «On Personal Data» of the Russian Federation.',
      },
      {
        heading: 'Data controller',
        body: `Controller: Valentina Timofeeva. Contact: ${EMAIL}, Telegram ${TELEGRAM_HANDLE}.`,
      },
      {
        heading: 'Data we process',
        body:
          'Information you enter in the questionnaire (answers and contact details) and technical data needed to run the site.',
      },
      {
        heading: 'Purpose and legal basis',
        body:
          'Purpose: to review your questionnaire and contact you about a consultation. Legal basis: your consent given when you submit the form (including the consent checkbox on the questionnaire page).',
      },
      {
        heading: 'Storage and transfer',
        body:
          'A draft may be stored locally in your browser. After submission, data are sent to the controller by the means provided on the site. Data are kept only as long as needed for this purpose unless the law requires otherwise.',
      },
      {
        heading: 'Your rights',
        body:
          'You may request access, rectification, restriction of processing, or withdraw consent by e-mail or Telegram using the contacts above.',
      },
      {
        heading: 'Disclaimer',
        body:
          'Site content is for general information only and does not replace an in-person consultation with a healthcare professional.',
      },
    ],
  },
};

const PrivacyPolicy: React.FC = () => {
  const { language, t } = useLanguage();
  const { title, sections } = privacyContent[language];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
            <Home className="w-4 h-4" />
            {t('backToHome')}
          </Link>
        </div>

        <article className="card-wellness space-y-6 text-foreground">
          <h1 className="text-3xl font-bold">{title}</h1>

          <div className="space-y-5">
            {sections.map((s) => (
              <section key={s.heading} className="space-y-2">
                <h2 className="text-lg font-semibold">{s.heading}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>

          <div className="pt-2 border-t border-border space-y-2 text-sm">
            <p className="font-medium text-foreground">{language === 'ru' ? 'Контакты' : 'Contacts'}</p>
            <p>
              <a href={`mailto:${EMAIL}`} className="text-primary hover:underline">
                {EMAIL}
              </a>
              {' · '}
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {TELEGRAM_HANDLE}
              </a>
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
