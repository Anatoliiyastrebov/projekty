import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/translations';

const Impressum: React.FC = () => {
  const { language } = useLanguage();

  const impressumContent: Record<Language, {
    title: string;
    backToHome: string;
    impressum: string;
    accordingTo: string;
    nameLabel: string;
    name: string;
    addressLabel: string;
    address: string;
    emailLabel: string;
    telegramLabel: string;
    responsibleLabel: string;
    country: string;
  }> = {
    ru: {
      title: 'Правовая информация',
      backToHome: 'Вернуться на главную',
      impressum: 'Правовая информация',
      accordingTo: 'Информация согласно § 5 TMG',
      nameLabel: 'Имя и фамилия:',
      name: 'Валентина Тимофеева',
      addressLabel: 'Адрес:',
      address: 'Россия, город Омск\nул. 19 Рабочая, д. 83, кв. 28',
      emailLabel: 'Электронная почта:',
      telegramLabel: 'Telegram:',
      responsibleLabel: 'Ответственный за содержание согласно § 18 Abs. 2 MStV:',
      country: 'Россия',
    },
    en: {
      title: 'Legal Information',
      backToHome: 'Back to home',
      impressum: 'Impressum',
      accordingTo: 'Information according to § 5 TMG',
      nameLabel: 'First and Last Name:',
      name: 'Valentina Timofeeva',
      addressLabel: 'Address:',
      address: 'Russia, Omsk city\n19 Rabochaya St., bld. 83, apt. 28',
      emailLabel: 'E-Mail:',
      telegramLabel: 'Telegram:',
      responsibleLabel: 'Responsible for content according to § 18 Abs. 2 MStV:',
      country: 'Russia',
    },
  };

  const content = impressumContent[language];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <Home className="w-4 h-4" />
            {content.backToHome}
          </Link>
        </div>

        <div className="card-wellness space-y-6">
          <h1 className="text-3xl font-bold text-foreground">{content.title}</h1>
          
          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-xl font-semibold mb-4">{content.impressum}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {content.accordingTo}
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">{content.nameLabel}</h3>
              <p>{content.name}</p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">{content.addressLabel}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>
                {content.address}
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">{content.emailLabel}</h3>
              <p>
                <a 
                  href="mailto:valentina777888@eandex.ru"
                  className="text-primary hover:underline"
                >
                  valentina777888@eandex.ru
                </a>
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">{content.telegramLabel}</h3>
              <p>
                <a 
                  href="https://t.me/TimofeevaValentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @TimofeevaValentina
                </a>
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">
                {content.responsibleLabel}
              </h3>
              <p style={{ whiteSpace: 'pre-line' }}>
                {content.name}<br />
                {content.address}
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Impressum;

