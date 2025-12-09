import { Language } from './translations';

export type QuestionType = 'text' | 'number' | 'radio' | 'checkbox' | 'textarea';

export interface QuestionOption {
  value: string;
  label: {
    ru: string;
    en: string;
    de: string;
  };
}

export interface Question {
  id: string;
  type: QuestionType;
  label: {
    ru: string;
    en: string;
    de: string;
  };
  icon: string;
  options?: QuestionOption[];
  required: boolean;
  hasAdditional: boolean;
  placeholder?: {
    ru: string;
    en: string;
    de: string;
  };
}

export interface QuestionnaireSection {
  id: string;
  title: {
    ru: string;
    en: string;
    de: string;
  };
  icon: string;
  questions: Question[];
}

// Common options used across questionnaires
const yesNoOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'yes', label: { ru: 'Да', en: 'Yes', de: 'Ja' } },
  { value: 'no', label: { ru: 'Нет', en: 'No', de: 'Nein' } },
];

const yesNoOptionsSimple: QuestionOption[] = [
  { value: 'yes', label: { ru: 'Да', en: 'Yes', de: 'Ja' } },
  { value: 'no', label: { ru: 'Нет', en: 'No', de: 'Nein' } },
];

const digestionOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'stomach_pain', label: { ru: 'Боли в животе', en: 'Stomach pain', de: 'Bauchschmerzen' } },
  { value: 'diarrhea', label: { ru: 'Диарея', en: 'Diarrhea', de: 'Durchfall' } },
  { value: 'constipation', label: { ru: 'Запор', en: 'Constipation', de: 'Verstopfung' } },
];

const digestionOptionsExtended: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'stomach_pain', label: { ru: 'Боли в животе', en: 'Stomach pain', de: 'Bauchschmerzen' } },
  { value: 'diarrhea', label: { ru: 'Диарея', en: 'Diarrhea', de: 'Durchfall' } },
  { value: 'constipation', label: { ru: 'Запор', en: 'Constipation', de: 'Verstopfung' } },
  { value: 'bloating', label: { ru: 'Вздутие', en: 'Bloating', de: 'Blähungen' } },
];

const digestionOptionsAdult: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'heartburn', label: { ru: 'Изжога', en: 'Heartburn', de: 'Sodbrennen' } },
  { value: 'bloating', label: { ru: 'Вздутие', en: 'Bloating', de: 'Blähungen' } },
  { value: 'diarrhea', label: { ru: 'Диарея', en: 'Diarrhea', de: 'Durchfall' } },
  { value: 'constipation', label: { ru: 'Запор', en: 'Constipation', de: 'Verstopfung' } },
];

const digestionOptionsMan: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'heartburn', label: { ru: 'Изжога', en: 'Heartburn', de: 'Sodbrennen' } },
  { value: 'bitter_taste', label: { ru: 'Горечь во рту', en: 'Bitter taste in mouth', de: 'Bitterer Geschmack im Mund' } },
  { value: 'bloating', label: { ru: 'Вздутие', en: 'Bloating', de: 'Blähungen' } },
  { value: 'heaviness', label: { ru: 'Тяжесть в желудке', en: 'Heaviness in stomach', de: 'Schwere im Magen' } },
  { value: 'gas', label: { ru: 'Газы', en: 'Gas', de: 'Blähungen' } },
  { value: 'diarrhea', label: { ru: 'Диарея', en: 'Diarrhea', de: 'Durchfall' } },
  { value: 'constipation', label: { ru: 'Запор', en: 'Constipation', de: 'Verstopfung' } },
  { value: 'pancreatitis', label: { ru: 'Панкреатит', en: 'Pancreatitis', de: 'Pankreatitis' } },
];

const hairOptionsMan: QuestionOption[] = [
  { value: 'satisfied', label: { ru: 'Доволен качеством', en: 'Satisfied with quality', de: 'Mit Qualität zufrieden' } },
  { value: 'aggressive_fallout', label: { ru: 'Агрессивно выпадают', en: 'Aggressively falling out', de: 'Aggressiv ausfallend' } },
  { value: 'dry', label: { ru: 'Сухие', en: 'Dry', de: 'Trocken' } },
  { value: 'oily', label: { ru: 'Жирные', en: 'Oily', de: 'Fettig' } },
  { value: 'brittle', label: { ru: 'Ломкие', en: 'Brittle', de: 'Brüchig' } },
];

const varicoseHemorrhoidsManOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'varicose_network', label: { ru: 'Варикоз (сеточка)', en: 'Varicose veins (network)', de: 'Krampfadern (Netz)' } },
  { value: 'varicose_pronounced', label: { ru: 'Варикоз (выраженные вены)', en: 'Varicose veins (pronounced)', de: 'Krampfadern (ausgeprägt)' } },
  { value: 'hemorrhoids_no_bleeding', label: { ru: 'Геморрой (не кровоточит)', en: 'Hemorrhoids (no bleeding)', de: 'Hämorrhoiden (keine Blutung)' } },
  { value: 'hemorrhoids_bleeding', label: { ru: 'Геморрой (кровоточит)', en: 'Hemorrhoids (bleeding)', de: 'Hämorrhoiden (Blutung)' } },
  { value: 'pigment_spots', label: { ru: 'Пигментные пятна', en: 'Pigment spots', de: 'Pigmentflecken' } },
];

const jointOptionsMan: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'squeak', label: { ru: 'Скрипят', en: 'Squeak', de: 'Quietschen' } },
  { value: 'crunch', label: { ru: 'Хрустят', en: 'Crunch', de: 'Knacken' } },
  { value: 'inflammation', label: { ru: 'Воспаляются', en: 'Inflammation', de: 'Entzündung' } },
  { value: 'arthrosis_stage1', label: { ru: 'Артроз (1 стадия)', en: 'Arthrosis (stage 1)', de: 'Arthrose (Stadium 1)' } },
  { value: 'arthrosis_stage2', label: { ru: 'Артроз (2 стадия)', en: 'Arthrosis (stage 2)', de: 'Arthrose (Stadium 2)' } },
  { value: 'arthrosis_stage3', label: { ru: 'Артроз (3 стадия)', en: 'Arthrosis (stage 3)', de: 'Arthrose (Stadium 3)' } },
  { value: 'back_pain', label: { ru: 'Боли в спине', en: 'Back pain', de: 'Rückenschmerzen' } },
  { value: 'lower_back_pain', label: { ru: 'Боли в пояснице', en: 'Lower back pain', de: 'Kreuzschmerzen' } },
  { value: 'knee_pain', label: { ru: 'Боли в коленях', en: 'Knee pain', de: 'Knieschmerzen' } },
];

const lifestyleOptions: QuestionOption[] = [
  { value: 'sedentary', label: { ru: 'Сидячий', en: 'Sedentary', de: 'Sitzend' } },
  { value: 'regular_sport', label: { ru: 'Регулярно занимаетесь спортом', en: 'Regular sports', de: 'Regelmäßig Sport' } },
  { value: 'home_exercise', label: { ru: 'Делаете дома гимнастику', en: 'Home exercise', de: 'Gymnastik zu Hause' } },
  { value: 'cold_water', label: { ru: 'Обливаетесь холодной водой', en: 'Cold water dousing', de: 'Kaltes Wasser gießen' } },
  { value: 'stressful_work', label: { ru: 'Работаете в стрессовых условиях', en: 'Stressful work conditions', de: 'Stressige Arbeitsbedingungen' } },
  { value: 'physical_work', label: { ru: 'Работа связана с физическими нагрузками', en: 'Physical work', de: 'Körperliche Arbeit' } },
  { value: 'toxic_substances', label: { ru: 'Вдыхаете токсичные вещества на работе', en: 'Inhale toxic substances at work', de: 'Toxische Substanzen bei der Arbeit einatmen' } },
];

const headachesOptionsMan: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'headaches', label: { ru: 'Головные боли', en: 'Headaches', de: 'Kopfschmerzen' } },
  { value: 'migraines', label: { ru: 'Мигрени', en: 'Migraines', de: 'Migräne' } },
  { value: 'weather_dependent', label: { ru: 'Метеозависимость', en: 'Weather dependent', de: 'Wetterabhängig' } },
  { value: 'concussion', label: { ru: 'Сотрясение мозга', en: 'Concussion', de: 'Gehirnerschütterung' } },
  { value: 'head_trauma', label: { ru: 'Удары по голове', en: 'Head trauma', de: 'Kopftrauma' } },
  { value: 'tinnitus', label: { ru: 'Шум в ушах', en: 'Tinnitus', de: 'Tinnitus' } },
  { value: 'floaters', label: { ru: 'Мушки перед глазами', en: 'Floaters', de: 'Mouches volantes' } },
  { value: 'dizziness', label: { ru: 'Головокружения', en: 'Dizziness', de: 'Schwindel' } },
];

const covidComplicationsOptions: QuestionOption[] = [
  { value: 'no_complications', label: { ru: 'Нет осложнений', en: 'No complications', de: 'Keine Komplikationen' } },
  { value: 'hair_loss', label: { ru: 'Выпадение волос', en: 'Hair loss', de: 'Haarausfall' } },
  { value: 'heart_problems', label: { ru: 'Проблемы сердца', en: 'Heart problems', de: 'Herzprobleme' } },
  { value: 'joint_problems', label: { ru: 'Суставы', en: 'Joint problems', de: 'Gelenkprobleme' } },
  { value: 'memory_loss', label: { ru: 'Потеря памяти', en: 'Memory loss', de: 'Gedächtnisverlust' } },
  { value: 'panic_attacks', label: { ru: 'Панические атаки', en: 'Panic attacks', de: 'Panikattacken' } },
  { value: 'poor_sleep', label: { ru: 'Ухудшение сна', en: 'Poor sleep', de: 'Schlechter Schlaf' } },
];

const skinIssuesManOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'acne', label: { ru: 'Прыщи', en: 'Acne', de: 'Akne' } },
  { value: 'furuncles', label: { ru: 'Фурункулы', en: 'Furuncles', de: 'Furunkel' } },
  { value: 'irritation', label: { ru: 'Раздражение', en: 'Irritation', de: 'Reizung' } },
  { value: 'rosacea', label: { ru: 'Розацеа', en: 'Rosacea', de: 'Rosacea' } },
  { value: 'psoriasis', label: { ru: 'Псориаз', en: 'Psoriasis', de: 'Psoriasis' } },
  { value: 'dermatitis', label: { ru: 'Дерматит', en: 'Dermatitis', de: 'Dermatitis' } },
  { value: 'eczema', label: { ru: 'Экзема', en: 'Eczema', de: 'Ekzeme' } },
];

const skinVirusesManOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'herpes', label: { ru: 'Герпес', en: 'Herpes', de: 'Herpes' } },
  { value: 'papillomas', label: { ru: 'Папилломы', en: 'Papillomas', de: 'Papillome' } },
  { value: 'moles', label: { ru: 'Родинки', en: 'Moles', de: 'Muttermale' } },
  { value: 'warts', label: { ru: 'Бородавки', en: 'Warts', de: 'Warzen' } },
  { value: 'red_spots', label: { ru: 'Красные точечки на коже', en: 'Red spots on skin', de: 'Rote Punkte auf der Haut' } },
  { value: 'discharge', label: { ru: 'Выделения', en: 'Discharge', de: 'Ausfluss' } },
  { value: 'cystitis', label: { ru: 'Цистит', en: 'Cystitis', de: 'Zystitis' } },
];

const allergyOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'pollen', label: { ru: 'Цветение', en: 'Pollen', de: 'Pollen' } },
  { value: 'animals', label: { ru: 'Животные', en: 'Animals', de: 'Tiere' } },
  { value: 'dust', label: { ru: 'Пыль', en: 'Dust', de: 'Staub' } },
  { value: 'food', label: { ru: 'Еда', en: 'Food', de: 'Lebensmittel' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other', de: 'Andere' } },
];

const allergyOptionsExtended: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'pollen', label: { ru: 'Цветение', en: 'Pollen', de: 'Pollen' } },
  { value: 'animals', label: { ru: 'Животные', en: 'Animals', de: 'Tiere' } },
  { value: 'dust', label: { ru: 'Пыль', en: 'Dust', de: 'Staub' } },
  { value: 'food', label: { ru: 'Еда', en: 'Food', de: 'Lebensmittel' } },
  { value: 'medications', label: { ru: 'Лекарства', en: 'Medications', de: 'Medikamente' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other', de: 'Andere' } },
];

const skinOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'moles', label: { ru: 'Много родинок', en: 'Many moles', de: 'Viele Muttermale' } },
  { value: 'warts', label: { ru: 'Бородавки', en: 'Warts', de: 'Warzen' } },
  { value: 'rashes', label: { ru: 'Высыпания', en: 'Rashes', de: 'Ausschläge' } },
  { value: 'eczema', label: { ru: 'Экзема', en: 'Eczema', de: 'Ekzeme' } },
];

const sleepOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'good', label: { ru: 'Хорошо', en: 'Good', de: 'Gut' } },
  { value: 'bad', label: { ru: 'Плохо', en: 'Bad', de: 'Schlecht' } },
  { value: 'sometimes', label: { ru: 'Иногда проблемы', en: 'Sometimes problems', de: 'Manchmal Probleme' } },
];

const sleepOptionsSimple: QuestionOption[] = [
  { value: 'good', label: { ru: 'Хорошо', en: 'Good', de: 'Gut' } },
  { value: 'bad', label: { ru: 'Плохо', en: 'Bad', de: 'Schlecht' } },
  { value: 'sometimes', label: { ru: 'Иногда проблемы', en: 'Sometimes problems', de: 'Manchmal Probleme' } },
];

const energyOptions: QuestionOption[] = [
  { value: 'normal', label: { ru: 'Нормальная', en: 'Normal', de: 'Normal' } },
  { value: 'reduced', label: { ru: 'Сниженная', en: 'Reduced', de: 'Reduziert' } },
  { value: 'very_low', label: { ru: 'Очень низкая', en: 'Very low', de: 'Sehr niedrig' } },
];

const birthOptions: QuestionOption[] = [
  { value: 'natural', label: { ru: 'Естественно', en: 'Natural', de: 'Natürlich' } },
  { value: 'cesarean', label: { ru: 'Кесарево', en: 'Cesarean', de: 'Kaiserschnitt' } },
];

const injuriesOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Все в порядке', en: 'All is well', de: 'Alles in Ordnung' } },
  { value: 'injuries', label: { ru: 'Травмы', en: 'Injuries', de: 'Verletzungen' } },
  { value: 'surgeries', label: { ru: 'Операции', en: 'Surgeries', de: 'Operationen' } },
  { value: 'head_trauma', label: { ru: 'Удары по голове', en: 'Head trauma', de: 'Kopftrauma' } },
  { value: 'fractures', label: { ru: 'Переломы', en: 'Fractures', de: 'Brüche' } },
  { value: 'severe_falls', label: { ru: 'Сильные падения', en: 'Severe falls', de: 'Schwere Stürze' } },
];

const covidOptionsWoman: QuestionOption[] = [
  { value: 'no', label: { ru: 'Нет', en: 'No', de: 'Nein' } },
  { value: 'had_covid', label: { ru: 'Болела', en: 'Had COVID', de: 'Hatte COVID' } },
  { value: 'vaccinated', label: { ru: 'Вакцинирована', en: 'Vaccinated', de: 'Geimpft' } },
  { value: 'both', label: { ru: 'И болела, и вакцинирована', en: 'Both had COVID and vaccinated', de: 'Sowohl COVID gehabt als auch geimpft' } },
];

const covidOptionsMan: QuestionOption[] = [
  { value: 'no', label: { ru: 'Нет', en: 'No', de: 'Nein' } },
  { value: 'had_covid', label: { ru: 'Болел', en: 'Had COVID', de: 'Hatte COVID' } },
  { value: 'vaccinated', label: { ru: 'Вакцинирован', en: 'Vaccinated', de: 'Geimpft' } },
  { value: 'both', label: { ru: 'И болел, и вакцинирован', en: 'Both had COVID and vaccinated', de: 'Sowohl COVID gehabt als auch geimpft' } },
];

const teethOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'crumble', label: { ru: 'Крошатся', en: 'Crumble', de: 'Bröckeln' } },
  { value: 'decay_fast', label: { ru: 'Часто портятся', en: 'Decay often', de: 'Verderben oft' } },
  { value: 'bad_breath', label: { ru: 'Запах изо рта', en: 'Bad breath', de: 'Mundgeruch' } },
  { value: 'bleeding_gums', label: { ru: 'Кровоточивость', en: 'Bleeding gums', de: 'Zahnfleischbluten' } },
];

const jointOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'crunch', label: { ru: 'Хруст', en: 'Crunching', de: 'Knacken' } },
  { value: 'squeak', label: { ru: 'Скрип', en: 'Squeaking', de: 'Quietschen' } },
  { value: 'inflammation', label: { ru: 'Воспаление', en: 'Inflammation', de: 'Entzündung' } },
];

const hairOptions: QuestionOption[] = [
  { value: 'falling', label: { ru: 'Выпадают', en: 'Falling out', de: 'Fallen aus' } },
  { value: 'split', label: { ru: 'Секутся', en: 'Split ends', de: 'Spliss' } },
  { value: 'dry', label: { ru: 'Сухие', en: 'Dry', de: 'Trocken' } },
  { value: 'ok', label: { ru: 'В порядке', en: 'Normal', de: 'Normal' } },
];

const skinConditionOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'dry', label: { ru: 'Сухая', en: 'Dry', de: 'Trocken' } },
  { value: 'rashes', label: { ru: 'Высыпания', en: 'Rashes', de: 'Ausschläge' } },
  { value: 'irritation', label: { ru: 'Раздражение', en: 'Irritation', de: 'Reizung' } },
  { value: 'acne', label: { ru: 'Прыщи', en: 'Acne', de: 'Akne' } },
  { value: 'other', label: { ru: 'Другое', en: 'Other', de: 'Andere' } },
];

const molesWartsHerpesOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'moles', label: { ru: 'Родинки', en: 'Moles', de: 'Muttermale' } },
  { value: 'warts', label: { ru: 'Бородавки', en: 'Warts', de: 'Warzen' } },
  { value: 'herpes', label: { ru: 'Герпес', en: 'Herpes', de: 'Herpes' } },
];

const dischargeMolesWartsHerpesOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'thrush', label: { ru: 'Молочница', en: 'Thrush', de: 'Soor' } },
  { value: 'moles', label: { ru: 'Много родинок', en: 'Many moles', de: 'Viele Muttermale' } },
  { value: 'warts', label: { ru: 'Бородавки', en: 'Warts', de: 'Warzen' } },
  { value: 'hpv_skin', label: { ru: 'Папилломавирус на коже', en: 'HPV on skin', de: 'HPV auf der Haut' } },
  { value: 'herpes', label: { ru: 'Герпес', en: 'Herpes', de: 'Herpes' } },
];

const memoryOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'poor_memory', label: { ru: 'Плохая память', en: 'Poor memory', de: 'Schlechtes Gedächtnis' } },
  { value: 'poor_concentration', label: { ru: 'Плохая концентрация', en: 'Poor concentration', de: 'Schlechte Konzentration' } },
  { value: 'both', label: { ru: 'И память, и концентрация', en: 'Both memory and concentration', de: 'Sowohl Gedächtnis als auch Konzentration' } },
];

const illnessAntibioticsOptions: QuestionOption[] = [
  { value: 'rarely_ill', label: { ru: 'Редко болеет', en: 'Rarely ill', de: 'Selten krank' } },
  { value: 'often_ill', label: { ru: 'Часто болеет', en: 'Often ill', de: 'Oft krank' } },
  { value: 'took_antibiotics', label: { ru: 'Принимал антибиотики', en: 'Took antibiotics', de: 'Antibiotika genommen' } },
  { value: 'took_other_medications', label: { ru: 'Принимал другие лекарства', en: 'Took other medications', de: 'Andere Medikamente genommen' } },
];

const illnessAntibioticsInfantOptions: QuestionOption[] = [
  { value: 'rarely_ill', label: { ru: 'Редко болеет', en: 'Rarely ill', de: 'Selten krank' } },
  { value: 'often_ill', label: { ru: 'Часто болеет', en: 'Often ill', de: 'Oft krank' } },
  { value: 'took_antibiotics', label: { ru: 'Принимал антибиотики', en: 'Took antibiotics', de: 'Antibiotika genommen' } },
  { value: 'took_other_medications', label: { ru: 'Принимал другие лекарства', en: 'Took other medications', de: 'Andere Medikamente genommen' } },
];

const illnessAntibioticsChildOptions: QuestionOption[] = [
  { value: 'rarely_ill', label: { ru: 'Редко болеет', en: 'Rarely ill', de: 'Selten krank' } },
  { value: 'often_ill', label: { ru: 'Часто болеет', en: 'Often ill', de: 'Oft krank' } },
  { value: 'took_antibiotics', label: { ru: 'Принимал антибиотики', en: 'Took antibiotics', de: 'Antibiotika genommen' } },
  { value: 'took_other_medications', label: { ru: 'Принимал другие лекарства', en: 'Took other medications', de: 'Andere Medikamente genommen' } },
];

const cystsStonesOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'cysts', label: { ru: 'Кисты', en: 'Cysts', de: 'Zysten' } },
  { value: 'fibroids', label: { ru: 'Миомы', en: 'Fibroids', de: 'Myome' } },
  { value: 'stones_kidneys', label: { ru: 'Камни в почках', en: 'Stones in kidneys', de: 'Steine in Nieren' } },
  { value: 'sand_kidneys', label: { ru: 'Песок в почках', en: 'Sand in kidneys', de: 'Sand in Nieren' } },
  { value: 'stones_gallbladder', label: { ru: 'Камни в желчном', en: 'Stones in gallbladder', de: 'Steine in Gallenblase' } },
];

const cystsStonesKidneysOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'cysts', label: { ru: 'Кисты', en: 'Cysts', de: 'Zysten' } },
  { value: 'sand', label: { ru: 'Песок', en: 'Sand', de: 'Sand' } },
  { value: 'stones_kidneys', label: { ru: 'Камни в почках', en: 'Stones in kidneys', de: 'Steine in Nieren' } },
  { value: 'stones_gallbladder', label: { ru: 'Камни в желчном', en: 'Stones in gallbladder', de: 'Steine in Gallenblase' } },
];

const menstruationOptions: QuestionOption[] = [
  { value: 'regular', label: { ru: 'Регулярные', en: 'Regular', de: 'Regelmäßig' } },
  { value: 'heavy', label: { ru: 'Обильные', en: 'Heavy', de: 'Stark' } },
  { value: 'clots', label: { ru: 'Сгустками', en: 'With clots', de: 'Mit Gerinnseln' } },
  { value: 'painful', label: { ru: 'Болезненные', en: 'Painful', de: 'Schmerzhaft' } },
  { value: 'hot_flashes', label: { ru: 'Приливы', en: 'Hot flashes', de: 'Hitzewallungen' } },
  { value: 'sweating', label: { ru: 'Потливость', en: 'Sweating', de: 'Schwitzen' } },
  { value: 'poor_sleep', label: { ru: 'Плохой сон', en: 'Poor sleep', de: 'Schlechter Schlaf' } },
  { value: 'mood_swings', label: { ru: 'Скачки настроения', en: 'Mood swings', de: 'Stimmungsschwankungen' } },
];

const menstruationWomanOptions: QuestionOption[] = [
  { value: 'regular', label: { ru: 'Регулярные', en: 'Regular', de: 'Regelmäßig' } },
  { value: 'irregular', label: { ru: 'Нерегулярные', en: 'Irregular', de: 'Unregelmäßig' } },
  { value: 'painful', label: { ru: 'Болезненные', en: 'Painful', de: 'Schmerzhaft' } },
  { value: 'prolonged', label: { ru: 'Затяжные', en: 'Prolonged', de: 'Verlängert' } },
  { value: 'heavy_bleeding', label: { ru: 'Обильные кровотечения', en: 'Heavy bleeding', de: 'Starke Blutungen' } },
  { value: 'menopause', label: { ru: 'Менопауза', en: 'Menopause', de: 'Menopause' } },
];

const headachesOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'headaches', label: { ru: 'Головные боли', en: 'Headaches', de: 'Kopfschmerzen' } },
  { value: 'migraines', label: { ru: 'Мигрени', en: 'Migraines', de: 'Migräne' } },
  { value: 'injuries', label: { ru: 'Травмы', en: 'Injuries', de: 'Verletzungen' } },
  { value: 'concussion', label: { ru: 'Сотрясение', en: 'Concussion', de: 'Gehirnerschütterung' } },
];

const headachesSleepOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'headaches', label: { ru: 'Головные боли', en: 'Headaches', de: 'Kopfschmerzen' } },
  { value: 'poor_sleep', label: { ru: 'Плохой сон', en: 'Poor sleep', de: 'Schlechter Schlaf' } },
  { value: 'both', label: { ru: 'И головные боли, и плохой сон', en: 'Both headaches and poor sleep', de: 'Sowohl Kopfschmerzen als auch schlechter Schlaf' } },
];

const hyperactiveOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'hyperactive', label: { ru: 'Гиперактивный', en: 'Hyperactive', de: 'Hyperaktiv' } },
  { value: 'tired_often', label: { ru: 'Часто устаёт', en: 'Often tired', de: 'Oft müde' } },
  { value: 'normal', label: { ru: 'Нормально', en: 'Normal', de: 'Normal' } },
];

const sugarOptions: QuestionOption[] = [
  { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
  { value: 'no', label: { ru: 'Нет', en: 'No', de: 'Nein' } },
  { value: 'moderate', label: { ru: 'Умеренно', en: 'Moderate', de: 'Mäßig' } },
  { value: 'strong', label: { ru: 'Сильно', en: 'Strong', de: 'Stark' } },
];

const pressureOptions: QuestionOption[] = [
  { value: 'low', label: { ru: 'Низкое', en: 'Low', de: 'Niedrig' } },
  { value: 'high', label: { ru: 'Высокое', en: 'High', de: 'Hoch' } },
  { value: 'normal', label: { ru: 'Нормальное', en: 'Normal', de: 'Normal' } },
];

const waterOptions: QuestionOption[] = [
  { value: '1', label: { ru: '1 литр', en: '1 liter', de: '1 Liter' } },
  { value: '1.5', label: { ru: '1.5 литра', en: '1.5 liters', de: '1.5 Liter' } },
  { value: '2', label: { ru: '2 литра', en: '2 liters', de: '2 Liter' } },
  { value: '2.5', label: { ru: '2.5 литра', en: '2.5 liters', de: '2.5 Liter' } },
  { value: '3', label: { ru: '3 литра', en: '3 liters', de: '3 Liter' } },
  { value: '3.5', label: { ru: '3.5 литра', en: '3.5 liters', de: '3.5 Liter' } },
];

const sleepAdultOptions: QuestionOption[] = [
  { value: 'good', label: { ru: 'Хороший', en: 'Good', de: 'Gut' } },
  { value: 'hard_to_fall_asleep', label: { ru: 'Трудно заснуть', en: 'Hard to fall asleep', de: 'Schwer einzuschlafen' } },
  { value: 'wake_often', label: { ru: 'Часто просыпаюсь', en: 'Wake up often', de: 'Wache oft auf' } },
];

// Infant questionnaire (type = infant)
export const infantQuestionnaire: QuestionnaireSection[] = [
  {
    id: 'personal',
    title: { ru: 'Личные данные', en: 'Personal Information', de: 'Persönliche Daten' },
    icon: 'user',
    questions: [
      {
        id: 'name',
        type: 'text',
        label: { ru: 'Имя', en: 'Name', de: 'Vorname' },
        icon: 'user',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'last_name',
        type: 'text',
        label: { ru: 'Фамилия', en: 'Last Name', de: 'Nachname' },
        icon: 'user',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'age',
        type: 'number',
        label: { ru: 'Возраст', en: 'Age', de: 'Alter' },
        icon: 'calendar',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'weight',
        type: 'number',
        label: { ru: 'Вес (кг)', en: 'Weight (kg)', de: 'Gewicht (kg)' },
        icon: 'scale',
        required: true,
        hasAdditional: false,
      },
    ],
  },
  {
    id: 'health',
    title: { ru: 'Здоровье', en: 'Health', de: 'Gesundheit' },
    icon: 'heart',
    questions: [
      {
        id: 'digestion',
        type: 'checkbox',
        label: { ru: 'Пищеварение – боли в животе, диарея, запор', en: 'Digestion – stomach pain, diarrhea, constipation', de: 'Verdauung – Bauchschmerzen, Durchfall, Verstopfung' },
        icon: 'heart',
        options: digestionOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'sweats_at_night',
        type: 'radio',
        label: { ru: 'Потеет во сне', en: 'Sweats at night', de: 'Schwitzt nachts' },
        icon: 'droplets',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'bad_breath',
        type: 'radio',
        label: { ru: 'Есть ли неприятный запах изо рта', en: 'Is there bad breath', de: 'Gibt es Mundgeruch' },
        icon: 'wind',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'skin_condition',
        type: 'checkbox',
        label: { ru: 'Много родинок, бородавок, высыпания, экземы', en: 'Many moles, warts, rashes, eczema', de: 'Viele Muttermale, Warzen, Ausschläge, Ekzeme' },
        icon: 'sparkles',
        options: skinOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'allergies',
        type: 'checkbox',
        label: { ru: 'Аллергия - на цветение, животных, пыль, еду', en: 'Allergies - to pollen, animals, dust, food', de: 'Allergien - gegen Pollen, Tiere, Staub, Lebensmittel' },
        icon: 'flower',
        options: allergyOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'water_per_day',
        type: 'number',
        label: { ru: 'Сколько воды в день пьет ребенок', en: 'How much water does the child drink per day', de: 'Wie viel Wasser trinkt das Kind pro Tag' },
        icon: 'droplet',
        required: true,
        hasAdditional: true,
      },
      {
        id: 'injuries',
        type: 'checkbox',
        label: { ru: 'Травмы, операции, удары по голове, сильные падения, переломы', en: 'Injuries, surgeries, head trauma, severe falls, fractures', de: 'Verletzungen, Operationen, Kopftrauma, schwere Stürze, Brüche' },
        icon: 'activity',
        options: injuriesOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'sleep_quality',
        type: 'radio',
        label: { ru: 'Хорошо ли спит', en: 'Does the child sleep well', de: 'Schläft das Kind gut' },
        icon: 'moon',
        options: sleepOptionsSimple,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'illness_antibiotics',
        type: 'checkbox',
        label: { ru: 'Часто ли болеет, часто ли принимал антибиотики или другие лекарства', en: 'Is often ill, has often taken antibiotics or other medications', de: 'Ist oft krank, hat oft Antibiotika oder andere Medikamente genommen' },
        icon: 'pill',
        options: illnessAntibioticsInfantOptions,
        required: true,
        hasAdditional: true,
      },
    ],
  },
  {
    id: 'birth_pregnancy',
    title: { ru: 'Роды и беременность', en: 'Birth and Pregnancy', de: 'Geburt und Schwangerschaft' },
    icon: 'baby',
    questions: [
      {
        id: 'birth_type',
        type: 'radio',
        label: { ru: 'Как прошли роды - естественно или кесарево?', en: 'How was the birth - natural or cesarean?', de: 'Wie war die Geburt - natürlich oder Kaiserschnitt?' },
        icon: 'baby',
        options: birthOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'mother_toxicosis',
        type: 'radio',
        label: { ru: 'Был ли у мамы сильный токсикоз при беременности', en: 'Did mother have severe toxicosis during pregnancy', de: 'Hatte die Mutter starke Toxikose während der Schwangerschaft' },
        icon: 'alert-circle',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'mother_allergy',
        type: 'radio',
        label: { ru: 'Была ли у мамы аллергия до или во время беременности', en: 'Did mother have allergies before or during pregnancy', de: 'Hatte die Mutter Allergien vor oder während der Schwangerschaft' },
        icon: 'flower',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'mother_constipation',
        type: 'radio',
        label: { ru: 'Был ли у мамы запор', en: 'Did mother have constipation', de: 'Hatte die Mutter Verstopfung' },
        icon: 'alert-triangle',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'mother_antibiotics',
        type: 'radio',
        label: { ru: 'Пила ли мама в беременность антибиотики', en: 'Did mother take antibiotics during pregnancy', de: 'Nahm die Mutter Antibiotika während der Schwangerschaft' },
        icon: 'pill',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'mother_anemia',
        type: 'radio',
        label: { ru: 'Была ли анемия у мамы', en: 'Did mother have anemia', de: 'Hatte die Mutter Anämie' },
        icon: 'heart',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'pregnancy_problems',
        type: 'textarea',
        label: { ru: 'Какие проблемы были в беременность', en: 'What problems were there during pregnancy', de: 'Welche Probleme gab es während der Schwangerschaft' },
        icon: 'file-text',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите проблемы', en: 'Describe problems', de: 'Probleme beschreiben' },
      },
      {
        id: 'what_else',
        type: 'textarea',
        label: { ru: 'Что еще я должна знать о здоровье ребенка?', en: 'What else should I know about the child\'s health?', de: 'Was sollte ich noch über die Gesundheit des Kindes wissen?' },
        icon: 'info',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Дополнительная информация', en: 'Additional information', de: 'Zusätzliche Informationen' },
      },
    ],
  },
];

// Child questionnaire (type = child)
export const childQuestionnaire: QuestionnaireSection[] = [
  {
    id: 'personal',
    title: { ru: 'Личные данные', en: 'Personal Information', de: 'Persönliche Daten' },
    icon: 'user',
    questions: [
      {
        id: 'name',
        type: 'text',
        label: { ru: 'Имя', en: 'Name', de: 'Vorname' },
        icon: 'user',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'last_name',
        type: 'text',
        label: { ru: 'Фамилия', en: 'Last Name', de: 'Nachname' },
        icon: 'user',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'age',
        type: 'number',
        label: { ru: 'Возраст', en: 'Age', de: 'Alter' },
        icon: 'calendar',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'weight',
        type: 'number',
        label: { ru: 'Вес (кг)', en: 'Weight (kg)', de: 'Gewicht (kg)' },
        icon: 'scale',
        required: true,
        hasAdditional: false,
      },
    ],
  },
  {
    id: 'health',
    title: { ru: 'Здоровье', en: 'Health', de: 'Gesundheit' },
    icon: 'heart',
    questions: [
      {
        id: 'digestion',
        type: 'checkbox',
        label: { ru: 'Пищеварение – боли в животе, диарея, запор', en: 'Digestion – stomach pain, diarrhea, constipation', de: 'Verdauung – Bauchschmerzen, Durchfall, Verstopfung' },
        icon: 'heart',
        options: digestionOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'teeth_decay',
        type: 'radio',
        label: { ru: 'Зубы – быстро портятся', en: 'Teeth – decay quickly', de: 'Zähne – verderben schnell' },
        icon: 'smile',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'sweats_grinds',
        type: 'checkbox',
        label: { ru: 'Потеет во сне, скрипит зубами', en: 'Sweats at night, grinds teeth', de: 'Schwitzt nachts, knirscht mit den Zähnen' },
        icon: 'moon',
        options: [
          { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
          { value: 'sweats', label: { ru: 'Потеет во сне', en: 'Sweats at night', de: 'Schwitzt nachts' } },
          { value: 'grinds', label: { ru: 'Скрипит зубами', en: 'Grinds teeth', de: 'Knirscht mit den Zähnen' } },
          { value: 'other', label: { ru: 'Другое', en: 'Other', de: 'Andere' } },
        ],
        required: true,
        hasAdditional: true,
      },
      {
        id: 'bad_breath',
        type: 'radio',
        label: { ru: 'Есть ли неприятный запах изо рта', en: 'Is there bad breath', de: 'Gibt es Mundgeruch' },
        icon: 'wind',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'sugar_dependency',
        type: 'textarea',
        label: { ru: 'Зависимость от сладкого, постоянно просит снеки, печенье, конфеты и т.д, при этом отказывается от домашней еды', en: 'Sugar dependency, constantly asks for snacks, cookies, candy, etc., while refusing home-cooked food', de: 'Zuckerabhängigkeit, fragt ständig nach Snacks, Keksen, Süßigkeiten usw., lehnt aber hausgemachtes Essen ab' },
        icon: 'candy',
        required: true,
        hasAdditional: false,
        placeholder: { ru: 'Опишите подробно', en: 'Describe in detail', de: 'Detailliert beschreiben' },
      },
      {
        id: 'skin_condition',
        type: 'checkbox',
        label: { ru: 'Много родинок, бородавок, высыпания, экземы', en: 'Many moles, warts, rashes, eczema', de: 'Viele Muttermale, Warzen, Ausschläge, Ekzeme' },
        icon: 'sparkles',
        options: skinOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'allergies',
        type: 'checkbox',
        label: { ru: 'Аллергия - на цветение, животных, пыль, еду', en: 'Allergies - to pollen, animals, dust, food', de: 'Allergien - gegen Pollen, Tiere, Staub, Lebensmittel' },
        icon: 'flower',
        options: allergyOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'hyperactive',
        type: 'radio',
        label: { ru: 'Гиперактивный или часто жалуется на усталость', en: 'Hyperactive or often complains of tiredness', de: 'Hyperaktiv oder klagt oft über Müdigkeit' },
        icon: 'zap',
        options: hyperactiveOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'water_per_day',
        type: 'number',
        label: { ru: 'Сколько воды в день пьет ребенок', en: 'How much water does the child drink per day', de: 'Wie viel Wasser trinkt das Kind pro Tag' },
        icon: 'droplet',
        required: true,
        hasAdditional: true,
      },
      {
        id: 'injuries',
        type: 'checkbox',
        label: { ru: 'Травмы, операции, удары по голове, сильные падения, переломы', en: 'Injuries, surgeries, head trauma, severe falls, fractures', de: 'Verletzungen, Operationen, Kopftrauma, schwere Stürze, Brüche' },
        icon: 'activity',
        options: injuriesOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'headaches_sleep',
        type: 'checkbox',
        label: { ru: 'Жалобы на головную боль, плохой сон', en: 'Headache complaints, poor sleep', de: 'Kopfschmerzen, schlechter Schlaf' },
        icon: 'brain',
        options: headachesSleepOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'illness_antibiotics',
        type: 'checkbox',
        label: { ru: 'Часто ли болеет, часто ли принимал антибиотики или другие лекарства', en: 'Is often ill, has often taken antibiotics or other medications', de: 'Ist oft krank, hat oft Antibiotika oder andere Medikamente genommen' },
        icon: 'pill',
        options: illnessAntibioticsChildOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'what_else',
        type: 'textarea',
        label: { ru: 'Что еще я должна знать о здоровье ребенка?', en: 'What else should I know about the child\'s health?', de: 'Was sollte ich noch über die Gesundheit des Kindes wissen?' },
        icon: 'info',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Дополнительная информация', en: 'Additional information', de: 'Zusätzliche Informationen' },
      },
    ],
  },
];

// Woman questionnaire (type = woman)
export const womanQuestionnaire: QuestionnaireSection[] = [
  {
    id: 'personal',
    title: { ru: 'Личные данные', en: 'Personal Information', de: 'Persönliche Daten' },
    icon: 'user',
    questions: [
      {
        id: 'name',
        type: 'text',
        label: { ru: 'Имя', en: 'Name', de: 'Vorname' },
        icon: 'user',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'last_name',
        type: 'text',
        label: { ru: 'Фамилия', en: 'Last Name', de: 'Nachname' },
        icon: 'user',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'age',
        type: 'number',
        label: { ru: 'Возраст', en: 'Age', de: 'Alter' },
        icon: 'calendar',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'height',
        type: 'number',
        label: { ru: 'Рост (см)', en: 'Height (cm)', de: 'Größe (cm)' },
        icon: 'ruler',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'weight',
        type: 'number',
        label: { ru: 'Вес (кг)', en: 'Weight (kg)', de: 'Gewicht (kg)' },
        icon: 'scale',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'weight_satisfaction',
        type: 'textarea',
        label: { ru: 'Если недовольны своим весом – сколько хотите убрать или добавить', en: 'If not satisfied with your weight – how much do you want to lose or gain', de: 'Wenn Sie mit Ihrem Gewicht nicht zufrieden sind – wie viel möchten Sie abnehmen oder zunehmen' },
        icon: 'scale',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите', en: 'Describe', de: 'Beschreiben' },
      },
    ],
  },
  {
    id: 'health',
    title: { ru: 'Здоровье', en: 'Health', de: 'Gesundheit' },
    icon: 'heart',
    questions: [
      {
        id: 'water_per_day',
        type: 'number',
        label: { ru: 'Сколько воды в день Вы пьете? (не чай, не кофе, не другие напитки, а только вода)', en: 'How much water do you drink per day? (not tea, not coffee, not other drinks, only water)', de: 'Wie viel Wasser trinken Sie pro Tag? (nicht Tee, nicht Kaffee, nicht andere Getränke, nur Wasser)' },
        icon: 'droplet',
        required: true,
        hasAdditional: true,
      },
      {
        id: 'covid_detailed',
        type: 'textarea',
        label: { ru: 'Был ли ковид (сколько раз) или вакцина от ковид (сколько доз). Были ли осложнения после ковид: выпадение волос, проблемы сердца, суставы, потеря памяти, панические атаки, ухудшение сна и т.д.', en: 'Did you have COVID (how many times) or COVID vaccine (how many doses). Were there complications after COVID: hair loss, heart problems, joints, memory loss, panic attacks, poor sleep, etc.', de: 'Hatten Sie COVID (wie oft) oder COVID-Impfung (wie viele Dosen). Gab es Komplikationen nach COVID: Haarausfall, Herzprobleme, Gelenke, Gedächtnisverlust, Panikattacken, schlechter Schlaf usw.' },
        icon: 'shield',
        required: true,
        hasAdditional: false,
        placeholder: { ru: 'Опишите подробно', en: 'Describe in detail', de: 'Detailliert beschreiben' },
      },
      {
        id: 'hair_condition',
        type: 'checkbox',
        label: { ru: 'Волосы: довольны ли их качеством, или они агрессивно выпадают. Сухие, жирные, ломкие', en: 'Hair: satisfied with quality, or aggressively falling out. Dry, oily, brittle', de: 'Haare: mit Qualität zufrieden oder aggressiv ausfallend. Trocken, fettig, brüchig' },
        icon: 'sparkles',
        options: hairOptionsMan,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'teeth',
        type: 'checkbox',
        label: { ru: 'Зубы: быстро крошатся или портятся, есть неприятный запах изо рта, кровоточат десны', en: 'Teeth: crumble or decay quickly, bad breath, bleeding gums', de: 'Zähne: bröckeln oder verderben schnell, Mundgeruch, Zahnfleischbluten' },
        icon: 'smile',
        options: teethOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'digestion',
        type: 'checkbox',
        label: { ru: 'Пищеварение: изжога, горечь во рту, вздутие, тяжесть в желудке, газы, диарея, запор, панкреатит', en: 'Digestion: heartburn, bitter taste in mouth, bloating, heaviness in stomach, gas, diarrhea, constipation, pancreatitis', de: 'Verdauung: Sodbrennen, bitterer Geschmack im Mund, Blähungen, Schwere im Magen, Gas, Durchfall, Verstopfung, Pankreatitis' },
        icon: 'heart',
        options: digestionOptionsMan,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'stones',
        type: 'textarea',
        label: { ru: 'Песок или камни в желчном или почках. Если есть камни, указать размер', en: 'Sand or stones in gallbladder or kidneys. If there are stones, specify size', de: 'Sand oder Steine in Gallenblase oder Nieren. Wenn Steine vorhanden sind, Größe angeben' },
        icon: 'circle',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите', en: 'Describe', de: 'Beschreiben' },
      },
      {
        id: 'operations_injuries',
        type: 'textarea',
        label: { ru: 'Были ли операции (какие именно), все ли органы на месте (какой орган удален), травмы', en: 'Were there operations (which ones), are all organs in place (which organ was removed), injuries', de: 'Gab es Operationen (welche), sind alle Organe vorhanden (welches Organ wurde entfernt), Verletzungen' },
        icon: 'scissors',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите подробно', en: 'Describe in detail', de: 'Detailliert beschreiben' },
      },
      {
        id: 'pressure',
        type: 'textarea',
        label: { ru: 'Давление: высокое или низкое. Если высокое – пьете ли лекарства и как долго', en: 'Blood pressure: high or low. If high – do you take medication and for how long', de: 'Blutdruck: hoch oder niedrig. Wenn hoch – nehmen Sie Medikamente und wie lange' },
        icon: 'activity',
        required: true,
        hasAdditional: false,
        placeholder: { ru: 'Опишите', en: 'Describe', de: 'Beschreiben' },
      },
      {
        id: 'chronic_diseases',
        type: 'textarea',
        label: { ru: 'Есть ли хронические или аутоиммунные заболевания: диабет, аутоиммунный тиреоидит, артрит, псориаз и т.д.', en: 'Are there chronic or autoimmune diseases: diabetes, autoimmune thyroiditis, arthritis, psoriasis, etc.', de: 'Gibt es chronische oder autoimmune Erkrankungen: Diabetes, autoimmune Thyreoiditis, Arthritis, Psoriasis usw.' },
        icon: 'alert-circle',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Перечислите', en: 'List', de: 'Auflisten' },
      },
      {
        id: 'headaches',
        type: 'checkbox',
        label: { ru: 'Головные боли, мигрени, метеозависимость, сотрясение мозга, удары по голове, шум в ушах, мушки перед глазами, головокружения', en: 'Headaches, migraines, weather dependence, concussion, head trauma, tinnitus, floaters, dizziness', de: 'Kopfschmerzen, Migräne, Wetterabhängigkeit, Gehirnerschütterung, Kopftrauma, Tinnitus, Mouches volantes, Schwindel' },
        icon: 'brain',
        options: headachesOptionsMan,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'numbness_cold',
        type: 'checkbox',
        label: { ru: 'Онемение пальцев рук и ног, руки-ноги холодные даже летом', en: 'Numbness of fingers and toes, cold hands and feet even in summer', de: 'Taubheit der Finger und Zehen, kalte Hände und Füße auch im Sommer' },
        icon: 'thermometer',
        options: [
          { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
          { value: 'numbness', label: { ru: 'Онемение пальцев', en: 'Numbness of fingers', de: 'Taubheit der Finger' } },
          { value: 'cold_extremities', label: { ru: 'Холодные руки-ноги даже летом', en: 'Cold hands and feet even in summer', de: 'Kalte Hände und Füße auch im Sommer' } },
          { value: 'both', label: { ru: 'Оба', en: 'Both', de: 'Beide' } },
        ],
        required: true,
        hasAdditional: true,
      },
      {
        id: 'varicose_hemorrhoids',
        type: 'checkbox',
        label: { ru: 'Варикоз (сеточка или выраженные вены), геморрой (кровоточит или нет), пигментные пятна', en: 'Varicose veins (network or pronounced), hemorrhoids (bleeding or not), pigment spots', de: 'Krampfadern (Netz oder ausgeprägt), Hämorrhoiden (Blutung oder nicht), Pigmentflecken' },
        icon: 'heart',
        options: varicoseHemorrhoidsManOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'joints',
        type: 'checkbox',
        label: { ru: 'Суставы: скрипят, хрустят, воспаляются, артроз (какая стадия). Боли в спине, пояснице, в коленях', en: 'Joints: squeak, crunch, inflammation, arthrosis (what stage). Back pain, lower back pain, knee pain', de: 'Gelenke: quietschen, knacken, Entzündung, Arthrose (welches Stadium). Rückenschmerzen, Kreuzschmerzen, Knieschmerzen' },
        icon: 'bone',
        options: jointOptionsMan,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'cysts_polyps',
        type: 'textarea',
        label: { ru: 'Кисты, полипы, миомы, опухоли, грыжи', en: 'Cysts, polyps, fibroids, tumors, hernias', de: 'Zysten, Polypen, Myome, Tumore, Hernien' },
        icon: 'circle',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите', en: 'Describe', de: 'Beschreiben' },
      },
      {
        id: 'skin_viruses',
        type: 'checkbox',
        label: { ru: 'Герпес, папилломы, родинки, бородавки, красные точечки на коже, выделения, цистит', en: 'Herpes, papillomas, moles, warts, red spots on skin, discharge, cystitis', de: 'Herpes, Papillome, Muttermale, Warzen, rote Punkte auf der Haut, Ausfluss, Zystitis' },
        icon: 'alert-circle',
        options: skinVirusesManOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'menstruation',
        type: 'textarea',
        label: { ru: 'Женские дни: нерегулярные, болезненные, затяжные, обильные кровотечения. Или менопауза? Как давно?', en: 'Menstruation: irregular, painful, prolonged, heavy bleeding. Or menopause? How long ago?', de: 'Menstruation: unregelmäßig, schmerzhaft, verlängert, starke Blutungen. Oder Menopause? Wie lange her?' },
        icon: 'calendar',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите подробно', en: 'Describe in detail', de: 'Detailliert beschreiben' },
      },
      {
        id: 'skin_issues',
        type: 'checkbox',
        label: { ru: 'Прыщи, фурункулы, акне, раздражение, розацеа, псориаз, дерматит, экзема', en: 'Acne, furuncles, irritation, rosacea, psoriasis, dermatitis, eczema', de: 'Akne, Furunkel, Reizung, Rosacea, Psoriasis, Dermatitis, Ekzeme' },
        icon: 'sparkles',
        options: skinIssuesManOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'allergies',
        type: 'checkbox',
        label: { ru: 'Аллергия (на пыльцу, еду, шерсть животных, пыль, лекарства)', en: 'Allergies (to pollen, food, animal hair, dust, medications)', de: 'Allergien (gegen Pollen, Lebensmittel, Tierhaare, Staub, Medikamente)' },
        icon: 'flower',
        options: allergyOptionsExtended,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'colds',
        type: 'textarea',
        label: { ru: 'Простуды: сколько раз за год простужаетесь. Пользуетесь ли антибиотиками и жаропонижающими', en: 'Colds: how many times per year do you get colds. Do you use antibiotics and antipyretics', de: 'Erkältungen: wie oft im Jahr erkälten Sie sich. Verwenden Sie Antibiotika und Antipyretika' },
        icon: 'pill',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите', en: 'Describe', de: 'Beschreiben' },
      },
      {
        id: 'sleep',
        type: 'checkbox',
        label: { ru: 'Сон: трудно заснуть, часто просыпаетесь ночью', en: 'Sleep: hard to fall asleep, wake up often at night', de: 'Schlaf: schwer einzuschlafen, wachen oft nachts auf' },
        icon: 'moon',
        options: [
          { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
          { value: 'hard_to_fall_asleep', label: { ru: 'Трудно заснуть', en: 'Hard to fall asleep', de: 'Schwer einzuschlafen' } },
          { value: 'wake_often', label: { ru: 'Часто просыпаетесь ночью', en: 'Wake up often at night', de: 'Wachen oft nachts auf' } },
          { value: 'both', label: { ru: 'Оба', en: 'Both', de: 'Beide' } },
        ],
        required: true,
        hasAdditional: true,
      },
      {
        id: 'energy',
        type: 'textarea',
        label: { ru: 'Энергия: с утра нужно собрать себя по кусочкам, очень тяжело просыпаться, утром чувствуете себя неотдохнувшим, нужно стимулировать себя кофе', en: 'Energy: need to pull yourself together in the morning, very hard to wake up, feel unrested in the morning, need to stimulate yourself with coffee', de: 'Energie: müssen sich morgens zusammenreißen, sehr schwer aufzuwachen, fühlen sich morgens unausgeruht, müssen sich mit Kaffee stimulieren' },
        icon: 'zap',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите', en: 'Describe', de: 'Beschreiben' },
      },
      {
        id: 'memory',
        type: 'textarea',
        label: { ru: 'Память: притормаживает, трудно сконцентрироваться на каком-то деле, трудно вспомнить имена и события, трудно запомнить информацию', en: 'Memory: slows down, hard to concentrate on tasks, hard to remember names and events, hard to remember information', de: 'Gedächtnis: verlangsamt, schwer sich zu konzentrieren, schwer sich Namen und Ereignisse zu merken, schwer Informationen zu merken' },
        icon: 'brain',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите', en: 'Describe', de: 'Beschreiben' },
      },
      {
        id: 'lifestyle',
        type: 'checkbox',
        label: { ru: 'Какой у вас образ жизни: сидячий, занимаетесь регулярно спортом, делаете дома гимнастику, обливаетесь холодной водой, работаете в стрессовых условиях, работа связана с физическими нагрузками, вдыхаете на работе токсичные вещества (парикмахер, мастер маникюра/педикюра, строитель, регулярно дышите краской (маляр, автомаляр) и др.)', en: 'What is your lifestyle: sedentary, regular sports, home exercise, cold water dousing, stressful work conditions, physical work, inhale toxic substances at work (hairdresser, manicurist/pedicurist, builder, regularly breathe paint (painter, auto painter) etc.)', de: 'Wie ist Ihr Lebensstil: sitzend, regelmäßig Sport, Gymnastik zu Hause, kaltes Wasser gießen, stressige Arbeitsbedingungen, körperliche Arbeit, toxische Substanzen bei der Arbeit einatmen (Friseur, Maniküre/Pediküre, Bauarbeiter, regelmäßig Farbe atmen (Maler, Autolackierer) usw.)' },
        icon: 'activity',
        options: lifestyleOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'medications',
        type: 'textarea',
        label: { ru: 'Принимаете ли лекарства на постоянной основе (если да - напишите название, если это возможно)', en: 'Do you take medications on a regular basis (if yes - write the name, if possible)', de: 'Nehmen Sie Medikamente regelmäßig ein (wenn ja - schreiben Sie den Namen, wenn möglich)' },
        icon: 'pill',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Перечислите лекарства', en: 'List medications', de: 'Medikamente auflisten' },
      },
      {
        id: 'tests',
        type: 'textarea',
        label: { ru: 'Есть ли у вас анализы крови за последние 2-3 месяца? УЗИ? Если есть, вышлите, мне в личку.', en: 'Do you have blood tests from the last 2-3 months? Ultrasound? If yes, send them to me in private message.', de: 'Haben Sie Bluttests aus den letzten 2-3 Monaten? Ultraschall? Wenn ja, senden Sie sie mir in einer privaten Nachricht.' },
        icon: 'file-text',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите', en: 'Describe', de: 'Beschreiben' },
      },
      {
        id: 'what_else',
        type: 'textarea',
        label: { ru: 'Что еще Вы хотели бы добавить о своем здоровье', en: 'What else would you like to add about your health', de: 'Was möchten Sie sonst noch über Ihre Gesundheit hinzufügen' },
        icon: 'info',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Дополнительная информация', en: 'Additional information', de: 'Zusätzliche Informationen' },
      },
      {
        id: 'main_concern',
        type: 'textarea',
        label: { ru: 'Какой самый важный вопрос вас волнует в первую очередь', en: 'What is the most important question that concerns you first', de: 'Welche wichtigste Frage beschäftigt Sie zuerst' },
        icon: 'help-circle',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите', en: 'Describe', de: 'Beschreiben' },
      },
    ],
  },
];

// Man questionnaire (type = man)
export const manQuestionnaire: QuestionnaireSection[] = [
  {
    id: 'personal',
    title: { ru: 'Личные данные', en: 'Personal Information', de: 'Persönliche Daten' },
    icon: 'user',
    questions: [
      {
        id: 'name',
        type: 'text',
        label: { ru: 'Имя', en: 'Name', de: 'Vorname' },
        icon: 'user',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'last_name',
        type: 'text',
        label: { ru: 'Фамилия', en: 'Last Name', de: 'Nachname' },
        icon: 'user',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'age',
        type: 'number',
        label: { ru: 'Возраст', en: 'Age', de: 'Alter' },
        icon: 'calendar',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'height',
        type: 'number',
        label: { ru: 'Рост (см)', en: 'Height (cm)', de: 'Größe (cm)' },
        icon: 'ruler',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'weight',
        type: 'number',
        label: { ru: 'Вес (кг)', en: 'Weight (kg)', de: 'Gewicht (kg)' },
        icon: 'scale',
        required: true,
        hasAdditional: false,
      },
      {
        id: 'weight_satisfaction',
        type: 'textarea',
        label: { ru: 'Если недовольны своим весом – сколько хотите убрать или добавить', en: 'If not satisfied with your weight – how much do you want to lose or gain', de: 'Wenn Sie mit Ihrem Gewicht nicht zufrieden sind – wie viel möchten Sie abnehmen oder zunehmen' },
        icon: 'scale',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите', en: 'Describe', de: 'Beschreiben' },
      },
    ],
  },
  {
    id: 'health',
    title: { ru: 'Здоровье', en: 'Health', de: 'Gesundheit' },
    icon: 'heart',
    questions: [
      {
        id: 'water_per_day',
        type: 'number',
        label: { ru: 'Сколько воды в день Вы пьете? (не чай, не кофе, не другие напитки, а только вода)', en: 'How much water do you drink per day? (not tea, not coffee, not other drinks, only water)', de: 'Wie viel Wasser trinken Sie pro Tag? (nicht Tee, nicht Kaffee, nicht andere Getränke, nur Wasser)' },
        icon: 'droplet',
        required: true,
        hasAdditional: true,
      },
      {
        id: 'covid_detailed',
        type: 'textarea',
        label: { ru: 'Был ли ковид (сколько раз) или вакцина от ковид (сколько доз). Были ли осложнения после ковид: выпадение волос, проблемы сердца, суставы, потеря памяти, панические атаки, ухудшение сна и т.д.', en: 'Did you have COVID (how many times) or COVID vaccine (how many doses). Were there complications after COVID: hair loss, heart problems, joints, memory loss, panic attacks, poor sleep, etc.', de: 'Hatten Sie COVID (wie oft) oder COVID-Impfung (wie viele Dosen). Gab es Komplikationen nach COVID: Haarausfall, Herzprobleme, Gelenke, Gedächtnisverlust, Panikattacken, schlechter Schlaf usw.' },
        icon: 'shield',
        required: true,
        hasAdditional: false,
        placeholder: { ru: 'Опишите подробно', en: 'Describe in detail', de: 'Detailliert beschreiben' },
      },
      {
        id: 'hair_condition',
        type: 'checkbox',
        label: { ru: 'Волосы: довольны ли их качеством, или они агрессивно выпадают. Сухие, жирные, ломкие', en: 'Hair: satisfied with quality, or aggressively falling out. Dry, oily, brittle', de: 'Haare: mit Qualität zufrieden oder aggressiv ausfallend. Trocken, fettig, brüchig' },
        icon: 'sparkles',
        options: hairOptionsMan,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'teeth',
        type: 'checkbox',
        label: { ru: 'Зубы: быстро крошатся или портятся, есть неприятный запах изо рта, кровоточат десны', en: 'Teeth: crumble or decay quickly, bad breath, bleeding gums', de: 'Zähne: bröckeln oder verderben schnell, Mundgeruch, Zahnfleischbluten' },
        icon: 'smile',
        options: teethOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'digestion',
        type: 'checkbox',
        label: { ru: 'Пищеварение: изжога, горечь во рту, вздутие, тяжесть в желудке, газы, диарея, запор, панкреатит', en: 'Digestion: heartburn, bitter taste in mouth, bloating, heaviness in stomach, gas, diarrhea, constipation, pancreatitis', de: 'Verdauung: Sodbrennen, bitterer Geschmack im Mund, Blähungen, Schwere im Magen, Gas, Durchfall, Verstopfung, Pankreatitis' },
        icon: 'heart',
        options: digestionOptionsMan,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'stones',
        type: 'textarea',
        label: { ru: 'Песок или камни в желчном или почках. Если есть камни, указать размер', en: 'Sand or stones in gallbladder or kidneys. If there are stones, specify size', de: 'Sand oder Steine in Gallenblase oder Nieren. Wenn Steine vorhanden sind, Größe angeben' },
        icon: 'circle',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите', en: 'Describe', de: 'Beschreiben' },
      },
      {
        id: 'operations_injuries',
        type: 'textarea',
        label: { ru: 'Были ли операции (какие именно), все ли органы на месте (какой орган удален), травмы', en: 'Were there operations (which ones), are all organs in place (which organ was removed), injuries', de: 'Gab es Operationen (welche), sind alle Organe vorhanden (welches Organ wurde entfernt), Verletzungen' },
        icon: 'scissors',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите подробно', en: 'Describe in detail', de: 'Detailliert beschreiben' },
      },
      {
        id: 'pressure',
        type: 'textarea',
        label: { ru: 'Давление: высокое или низкое. Если высокое – пьете ли лекарства и как долго', en: 'Blood pressure: high or low. If high – do you take medication and for how long', de: 'Blutdruck: hoch oder niedrig. Wenn hoch – nehmen Sie Medikamente und wie lange' },
        icon: 'activity',
        required: true,
        hasAdditional: false,
        placeholder: { ru: 'Опишите', en: 'Describe', de: 'Beschreiben' },
      },
      {
        id: 'chronic_diseases',
        type: 'textarea',
        label: { ru: 'Есть ли хронические или аутоиммунные заболевания: диабет, аутоиммунный тиреоидит, артрит, псориаз и т.д.', en: 'Are there chronic or autoimmune diseases: diabetes, autoimmune thyroiditis, arthritis, psoriasis, etc.', de: 'Gibt es chronische oder autoimmune Erkrankungen: Diabetes, autoimmune Thyreoiditis, Arthritis, Psoriasis usw.' },
        icon: 'alert-circle',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Перечислите', en: 'List', de: 'Auflisten' },
      },
      {
        id: 'headaches',
        type: 'checkbox',
        label: { ru: 'Головные боли, мигрени, метеозависимость, сотрясение мозга, удары по голове, шум в ушах, мушки перед глазами, головокружения', en: 'Headaches, migraines, weather dependence, concussion, head trauma, tinnitus, floaters, dizziness', de: 'Kopfschmerzen, Migräne, Wetterabhängigkeit, Gehirnerschütterung, Kopftrauma, Tinnitus, Mouches volantes, Schwindel' },
        icon: 'brain',
        options: headachesOptionsMan,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'numbness_cold',
        type: 'checkbox',
        label: { ru: 'Онемение пальцев рук и ног, руки-ноги холодные даже летом', en: 'Numbness of fingers and toes, cold hands and feet even in summer', de: 'Taubheit der Finger und Zehen, kalte Hände und Füße auch im Sommer' },
        icon: 'thermometer',
        options: [
          { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
          { value: 'numbness', label: { ru: 'Онемение пальцев', en: 'Numbness of fingers', de: 'Taubheit der Finger' } },
          { value: 'cold_extremities', label: { ru: 'Холодные руки-ноги даже летом', en: 'Cold hands and feet even in summer', de: 'Kalte Hände und Füße auch im Sommer' } },
          { value: 'both', label: { ru: 'Оба', en: 'Both', de: 'Beide' } },
        ],
        required: true,
        hasAdditional: true,
      },
      {
        id: 'varicose_hemorrhoids',
        type: 'checkbox',
        label: { ru: 'Варикоз (сеточка или выраженные вены), геморрой (кровоточит или нет), пигментные пятна', en: 'Varicose veins (network or pronounced), hemorrhoids (bleeding or not), pigment spots', de: 'Krampfadern (Netz oder ausgeprägt), Hämorrhoiden (Blutung oder nicht), Pigmentflecken' },
        icon: 'heart',
        options: varicoseHemorrhoidsManOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'joints',
        type: 'checkbox',
        label: { ru: 'Суставы: скрипят, хрустят, воспаляются, артроз (какая стадия). Боли в спине, пояснице, в коленях', en: 'Joints: squeak, crunch, inflammation, arthrosis (what stage). Back pain, lower back pain, knee pain', de: 'Gelenke: quietschen, knacken, Entzündung, Arthrose (welches Stadium). Rückenschmerzen, Kreuzschmerzen, Knieschmerzen' },
        icon: 'bone',
        options: jointOptionsMan,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'cysts_polyps',
        type: 'textarea',
        label: { ru: 'Кисты, полипы, миомы, опухоли, грыжи', en: 'Cysts, polyps, fibroids, tumors, hernias', de: 'Zysten, Polypen, Myome, Tumore, Hernien' },
        icon: 'circle',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите', en: 'Describe', de: 'Beschreiben' },
      },
      {
        id: 'skin_viruses',
        type: 'checkbox',
        label: { ru: 'Герпес, папилломы, родинки, бородавки, красные точечки на коже, выделения, цистит', en: 'Herpes, papillomas, moles, warts, red spots on skin, discharge, cystitis', de: 'Herpes, Papillome, Muttermale, Warzen, rote Punkte auf der Haut, Ausfluss, Zystitis' },
        icon: 'alert-circle',
        options: skinVirusesManOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'prostatitis',
        type: 'radio',
        label: { ru: 'Простатит', en: 'Prostatitis', de: 'Prostatitis' },
        icon: 'heart',
        options: yesNoOptionsSimple,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'skin_issues',
        type: 'checkbox',
        label: { ru: 'Прыщи, фурункулы, акне, раздражение, розацеа, псориаз, дерматит, экзема', en: 'Acne, furuncles, irritation, rosacea, psoriasis, dermatitis, eczema', de: 'Akne, Furunkel, Reizung, Rosacea, Psoriasis, Dermatitis, Ekzeme' },
        icon: 'sparkles',
        options: skinIssuesManOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'allergies',
        type: 'checkbox',
        label: { ru: 'Аллергия (на пыльцу, еду, шерсть животных, пыль, лекарства)', en: 'Allergies (to pollen, food, animal hair, dust, medications)', de: 'Allergien (gegen Pollen, Lebensmittel, Tierhaare, Staub, Medikamente)' },
        icon: 'flower',
        options: allergyOptionsExtended,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'colds',
        type: 'textarea',
        label: { ru: 'Простуды: сколько раз за год простужаетесь. Пользуетесь ли антибиотиками и жаропонижающими', en: 'Colds: how many times per year do you get colds. Do you use antibiotics and antipyretics', de: 'Erkältungen: wie oft im Jahr erkälten Sie sich. Verwenden Sie Antibiotika und Antipyretika' },
        icon: 'pill',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите', en: 'Describe', de: 'Beschreiben' },
      },
      {
        id: 'sleep',
        type: 'checkbox',
        label: { ru: 'Сон: трудно заснуть, часто просыпаетесь ночью', en: 'Sleep: hard to fall asleep, wake up often at night', de: 'Schlaf: schwer einzuschlafen, wachen oft nachts auf' },
        icon: 'moon',
        options: [
          { value: 'no_issues', label: { ru: 'Нет проблем', en: 'No issues', de: 'Keine Beschwerden' } },
          { value: 'hard_to_fall_asleep', label: { ru: 'Трудно заснуть', en: 'Hard to fall asleep', de: 'Schwer einzuschlafen' } },
          { value: 'wake_often', label: { ru: 'Часто просыпаетесь ночью', en: 'Wake up often at night', de: 'Wachen oft nachts auf' } },
          { value: 'both', label: { ru: 'Оба', en: 'Both', de: 'Beide' } },
        ],
        required: true,
        hasAdditional: true,
      },
      {
        id: 'energy',
        type: 'textarea',
        label: { ru: 'Энергия: с утра нужно собрать себя по кусочкам, очень тяжело просыпаться, утром чувствуете себя неотдохнувшим, нужно стимулировать себя кофе', en: 'Energy: need to pull yourself together in the morning, very hard to wake up, feel unrested in the morning, need to stimulate yourself with coffee', de: 'Energie: müssen sich morgens zusammenreißen, sehr schwer aufzuwachen, fühlen sich morgens unausgeruht, müssen sich mit Kaffee stimulieren' },
        icon: 'zap',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите', en: 'Describe', de: 'Beschreiben' },
      },
      {
        id: 'memory',
        type: 'textarea',
        label: { ru: 'Память: притормаживает, трудно сконцентрироваться на каком-то деле, трудно вспомнить имена и события, трудно запомнить информацию', en: 'Memory: slows down, hard to concentrate on tasks, hard to remember names and events, hard to remember information', de: 'Gedächtnis: verlangsamt, schwer sich zu konzentrieren, schwer sich Namen und Ereignisse zu merken, schwer Informationen zu merken' },
        icon: 'brain',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите', en: 'Describe', de: 'Beschreiben' },
      },
      {
        id: 'lifestyle',
        type: 'checkbox',
        label: { ru: 'Какой у вас образ жизни: сидячий, занимаетесь регулярно спортом, делаете дома гимнастику, обливаетесь холодной водой, работаете в стрессовых условиях, работа связана с физическими нагрузками, вдыхаете на работе токсичные вещества (парикмахер, мастер маникюра/педикюра, строитель, регулярно дышите краской (маляр, автомаляр) и др.)', en: 'What is your lifestyle: sedentary, regular sports, home exercise, cold water dousing, stressful work conditions, physical work, inhale toxic substances at work (hairdresser, manicurist/pedicurist, builder, regularly breathe paint (painter, auto painter) etc.)', de: 'Wie ist Ihr Lebensstil: sitzend, regelmäßig Sport, Gymnastik zu Hause, kaltes Wasser gießen, stressige Arbeitsbedingungen, körperliche Arbeit, toxische Substanzen bei der Arbeit einatmen (Friseur, Maniküre/Pediküre, Bauarbeiter, regelmäßig Farbe atmen (Maler, Autolackierer) usw.)' },
        icon: 'activity',
        options: lifestyleOptions,
        required: true,
        hasAdditional: true,
      },
      {
        id: 'medications',
        type: 'textarea',
        label: { ru: 'Принимаете ли лекарства на постоянной основе (если да - напишите название, если это возможно)', en: 'Do you take medications on a regular basis (if yes - write the name, if possible)', de: 'Nehmen Sie Medikamente regelmäßig ein (wenn ja - schreiben Sie den Namen, wenn möglich)' },
        icon: 'pill',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Перечислите лекарства', en: 'List medications', de: 'Medikamente auflisten' },
      },
      {
        id: 'tests',
        type: 'textarea',
        label: { ru: 'Есть ли у вас анализы крови за последние 2-3 месяца? УЗИ? Если есть, вышлите, мне в личку.', en: 'Do you have blood tests from the last 2-3 months? Ultrasound? If yes, send them to me in private message.', de: 'Haben Sie Bluttests aus den letzten 2-3 Monaten? Ultraschall? Wenn ja, senden Sie sie mir in einer privaten Nachricht.' },
        icon: 'file-text',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите', en: 'Describe', de: 'Beschreiben' },
      },
      {
        id: 'what_else',
        type: 'textarea',
        label: { ru: 'Что еще Вы хотели бы добавить о своем здоровье', en: 'What else would you like to add about your health', de: 'Was möchten Sie sonst noch über Ihre Gesundheit hinzufügen' },
        icon: 'info',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Дополнительная информация', en: 'Additional information', de: 'Zusätzliche Informationen' },
      },
      {
        id: 'main_concern',
        type: 'textarea',
        label: { ru: 'Какой самый важный вопрос вас волнует в первую очередь', en: 'What is the most important question that concerns you first', de: 'Welche wichtigste Frage beschäftigt Sie zuerst' },
        icon: 'help-circle',
        required: false,
        hasAdditional: false,
        placeholder: { ru: 'Опишите', en: 'Describe', de: 'Beschreiben' },
      },
    ],
  },
];

export type QuestionnaireType = 'infant' | 'child' | 'woman' | 'man';

export const getQuestionnaire = (type: QuestionnaireType): QuestionnaireSection[] => {
  switch (type) {
    case 'infant':
      return infantQuestionnaire;
    case 'child':
      return childQuestionnaire;
    case 'woman':
      return womanQuestionnaire;
    case 'man':
      return manQuestionnaire;
    default:
      return infantQuestionnaire;
  }
};

export const getQuestionnaireTitle = (type: QuestionnaireType, lang: Language): string => {
  const titles = {
    infant: { ru: 'Анкета для младенца', en: 'Infant Questionnaire', de: 'Säuglingsfragebogen' },
    child: { ru: 'Детская анкета', en: 'Child Questionnaire', de: 'Kinderfragebogen' },
    woman: { ru: 'Женская анкета', en: 'Women\'s Questionnaire', de: 'Frauenfragebogen' },
    man: { ru: 'Мужская анкета', en: 'Men\'s Questionnaire', de: 'Männerfragebogen' },
  };
  return titles[type]?.[lang] || titles[type]?.ru || '';
};
