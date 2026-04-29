import type { LucideIcon } from 'lucide-react'
import {
  Heart, Baby, Microscope, Shield, Brain, Eye, Bone, Activity,
  Stethoscope, Pill, UserCheck, ClipboardList,
  Award, Clock, ShieldCheck, Users,
} from 'lucide-react'

export interface Service {
  icon: LucideIcon
  fr: { title: string; desc: string }
  ar: { title: string; desc: string }
}

export interface Speciality {
  icon: LucideIcon
  fr: string
  ar: string
}

export interface DoctorWorkplace {
  type: 'gov' | 'private'
  name: string
}

export interface Doctor {
  id: number
  name: string
  specialtyFr: string
  specialtyAr: string
  bioFr: string
  bioAr: string
  degree: string
  specialization: string
  yearsExp: number
  domainsFr: string
  domainsAr: string
  workplaces: DoctorWorkplace[]
  image?: string
}

export interface Benefit {
  icon: LucideIcon
  fr: { title: string; desc: string }
  ar: { title: string; desc: string }
}

export const services: Service[] = [
  {
    icon: Heart,
    fr: { title: 'Cardiologie', desc: 'Diagnostic, prévention et traitement des maladies du cœur et des vaisseaux sanguins.' },
    ar: { title: 'طب القلب', desc: 'تشخيص ووقاية وعلاج أمراض القلب والأوعية الدموية.' },
  },
  {
    icon: Baby,
    fr: { title: 'Pédiatrie', desc: 'Suivi de la croissance et développement de l\'enfant de la naissance à l\'adolescence.' },
    ar: { title: 'طب الأطفال', desc: 'متابعة نمو وتطور الطفل من الولادة حتى المراهقة.' },
  },
  {
    icon: Microscope,
    fr: { title: 'Dermatologie', desc: 'Soins cutanés, traitement des maladies de peau et dermatologie esthétique.' },
    ar: { title: 'الأمراض الجلدية', desc: 'العناية بالبشرة وعلاج أمراض الجلد والجلدية التجميلية.' },
  },
  {
    icon: Shield,
    fr: { title: 'Médecine Générale', desc: 'Consultations, bilans de santé, prévention et orientation vers les spécialistes.' },
    ar: { title: 'الطب العام', desc: 'استشارات وفحوصات صحية ووقاية وإحالة إلى المتخصصين.' },
  },
  {
    icon: Brain,
    fr: { title: 'Neurologie', desc: 'Diagnostic et traitement des maladies du système nerveux central et périphérique.' },
    ar: { title: 'طب الأعصاب', desc: 'تشخيص وعلاج أمراض الجهاز العصبي المركزي والمحيطي.' },
  },
  {
    icon: Eye,
    fr: { title: 'Ophtalmologie', desc: 'Bilan visuel, traitement des pathologies oculaires et chirurgie réfractive.' },
    ar: { title: 'طب العيون', desc: 'فحص البصر وعلاج أمراض العيون والجراحة الانكسارية.' },
  },
  {
    icon: Bone,
    fr: { title: 'Orthopédie', desc: 'Chirurgie osseuse, traitement des fractures et rééducation musculo-squelettique.' },
    ar: { title: 'جراحة العظام', desc: 'جراحة العظام وعلاج الكسور وإعادة التأهيل.' },
  },
  {
    icon: Activity,
    fr: { title: 'Urgences', desc: "Service d'urgences disponible 24h/24, 7j/7 pour les cas critiques." },
    ar: { title: 'الطوارئ', desc: 'خدمة طوارئ متاحة 24/7 للحالات الحرجة.' },
  },
]

export const specialities: Speciality[] = [
  { icon: Heart, fr: 'Cardiologie', ar: 'طب القلب' },
  { icon: Baby, fr: 'Pédiatrie', ar: 'طب الأطفال' },
  { icon: Microscope, fr: 'Dermatologie', ar: 'الأمراض الجلدية' },
  { icon: Shield, fr: 'Méd. Générale', ar: 'الطب العام' },
  { icon: Brain, fr: 'Neurologie', ar: 'طب الأعصاب' },
  { icon: Eye, fr: 'Ophtalmologie', ar: 'طب العيون' },
  { icon: Bone, fr: 'Orthopédie', ar: 'جراحة العظام' },
  { icon: Activity, fr: 'Urgences', ar: 'الطوارئ' },
  { icon: Stethoscope, fr: 'Pneumologie', ar: 'طب الرئة' },
  { icon: Pill, fr: 'Endocrinologie', ar: 'الغدد الصماء' },
  { icon: UserCheck, fr: 'Gynécologie', ar: 'أمراض النساء' },
  { icon: ClipboardList, fr: 'Radiologie', ar: 'الأشعة' },
]

export const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Martin',
    specialtyFr: 'Cardiologue',
    specialtyAr: 'أخصائية قلب',
    bioFr: "15 ans d'expérience en cardiologie interventionnelle et préventive.",
    bioAr: '15 سنة خبرة في أمراض القلب التدخلية والوقائية.',
    degree: 'Doctorat en Médecine – Faculté d\'Alger (2008)',
    specialization: 'Spécialisation – CHU Mustapha Pacha (2012)',
    yearsExp: 15,
    domainsFr: 'Cardiologie interventionnelle · Échocardiographie · Prévention cardiovasculaire',
    domainsAr: 'القلب التدخلي · تخطيط صدى القلب · الوقاية القلبية',
    workplaces: [
      { type: 'gov', name: 'CHU Mustapha Pacha' },
      { type: 'private', name: 'Codeva Clinic' },
    ],
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Dr. Karim Benali',
    specialtyFr: 'Pédiatre',
    specialtyAr: 'طبيب أطفال',
    bioFr: "Spécialiste des soins pédiatriques avec 10 ans d'expérience clinique.",
    bioAr: 'متخصص في رعاية الأطفال بخبرة 10 سنوات سريرية.',
    degree: 'Doctorat en Médecine – Université d\'Oran (2012)',
    specialization: 'Résidence Pédiatrie – CHU d\'Oran (2016)',
    yearsExp: 10,
    domainsFr: 'Pédiatrie générale · Néonatologie · Nutrition infantile',
    domainsAr: 'طب الأطفال العام · حديثي الولادة · تغذية الأطفال',
    workplaces: [
      { type: 'gov', name: "CHU d'Oran" },
      { type: 'private', name: 'Codeva Clinic' },
    ],
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    id: 3,
    name: 'Dr. Nadia Hamidi',
    specialtyFr: 'Dermatologue',
    specialtyAr: 'طبيبة جلدية',
    bioFr: 'Experte en dermatologie clinique et esthétique, diplômée de Paris.',
    bioAr: 'خبيرة في الجلدية السريرية والتجميلية، حاصلة على دبلوم من باريس.',
    degree: 'Doctorat en Médecine – Paris VI (2010)',
    specialization: 'DES Dermatologie – Hôpital Saint-Louis Paris (2014)',
    yearsExp: 12,
    domainsFr: 'Dermatologie clinique · Dermatologie esthétique · Laser',
    domainsAr: 'الجلدية السريرية · الجلدية التجميلية · الليزر',
    workplaces: [
      { type: 'gov', name: 'Hôpital Bab El Oued' },
      { type: 'private', name: 'Codeva Clinic' },
      { type: 'private', name: 'Cabinet Hydra' },
    ],
    image: 'https://randomuser.me/api/portraits/women/55.jpg',
  },
  {
    id: 4,
    name: 'Dr. Omar Cherif',
    specialtyFr: 'Neurologue',
    specialtyAr: 'طبيب أعصاب',
    bioFr: 'Neurologie clinique et fonctionnelle, 12 ans d\'expertise hospitalière.',
    bioAr: 'علم الأعصاب السريري والوظيفي، 12 سنة خبرة مستشفيات.',
    degree: 'Doctorat en Médecine – Faculté d\'Alger (2009)',
    specialization: 'Spécialisation Neurologie – CHU Ben Aknoun (2013)',
    yearsExp: 12,
    domainsFr: 'Neurologie clinique · EEG · Sclérose en plaques',
    domainsAr: 'الأعصاب السريرية · تخطيط الدماغ · التصلب المتعدد',
    workplaces: [
      { type: 'gov', name: 'CHU Ben Aknoun' },
      { type: 'gov', name: 'EHS Psychiatrie' },
      { type: 'private', name: 'Codeva Clinic' },
    ],
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: 5,
    name: 'Dr. Ahmed Ould Abdallah',
    specialtyFr: 'Médecin Généraliste',
    specialtyAr: 'طبيب عام',
    bioFr: 'Praticien au CHN de Nouakchott, spécialisé dans la prise en charge des maladies chroniques.',
    bioAr: 'طبيب في المركز الاستشفائي الوطني بنواكشوط، متخصص في إدارة الأمراض المزمنة.',
    degree: 'Doctorat en Médecine – Faculté de Médecine de Nouakchott (2014)',
    specialization: 'Formation en médecine interne – CHU Ibn Sina, Rabat (2016)',
    yearsExp: 9,
    domainsFr: 'Médecine interne · Maladies chroniques · Prévention',
    domainsAr: 'الطب الداخلي · الأمراض المزمنة · الوقاية',
    workplaces: [
      { type: 'gov', name: 'CHN de Nouakchott' },
      { type: 'private', name: 'Codeva Clinic' },
    ],
    image: 'https://randomuser.me/api/portraits/men/34.jpg',
  },
  {
    id: 6,
    name: 'Dr. Fatimetou Mint Sidi',
    specialtyFr: 'Gynécologue-Obstétricienne',
    specialtyAr: 'طبيبة نساء وتوليد',
    bioFr: 'Experte en suivi de grossesse et gynécologie, diplômée de Marrakech, 11 ans de pratique.',
    bioAr: 'خبيرة في متابعة الحمل وأمراض النساء، حاصلة على دبلوم من مراكش، 11 سنة ممارسة.',
    degree: 'Doctorat en Médecine – Université Cadi Ayyad, Marrakech (2011)',
    specialization: 'Spécialisation Gynéco-Obstétrique – CHU Mohammed VI (2015)',
    yearsExp: 11,
    domainsFr: 'Gynécologie · Obstétrique · Suivi grossesse à risque',
    domainsAr: 'أمراض النساء · التوليد · متابعة الحمل عالي الخطورة',
    workplaces: [
      { type: 'gov', name: 'Hôpital Cheikh Zayed, Nouakchott' },
      { type: 'private', name: 'Codeva Clinic' },
    ],
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
  },
  {
    id: 7,
    name: 'Dr. Sidi Ould Bah',
    specialtyFr: 'Ophtalmologue',
    specialtyAr: 'طبيب عيون',
    bioFr: 'Ophtalmologue formé à Paris, spécialisé en chirurgie réfractive et traitement du glaucome.',
    bioAr: 'طبيب عيون تكوّن في باريس، متخصص في الجراحة الانكسارية وعلاج الزرق.',
    degree: 'Doctorat en Médecine – Université Paris Diderot (2015)',
    specialization: 'DESC Ophtalmologie – Hôpital Lariboisière (2019)',
    yearsExp: 6,
    domainsFr: 'Chirurgie réfractive · Glaucome · Rétinologie',
    domainsAr: 'الجراحة الانكسارية · الزرق · أمراض الشبكية',
    workplaces: [
      { type: 'gov', name: 'Hôpital de Rosso, Mauritanie' },
      { type: 'private', name: 'Codeva Clinic' },
    ],
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
]

export const benefits: Benefit[] = [
  {
    icon: Award,
    fr: { title: 'Expertise Certifiée', desc: 'Des médecins sélectionnés pour leur excellence clinique et leurs certifications.' },
    ar: { title: 'خبرة معتمدة', desc: 'أطباء منتقون لتميزهم السريري وشهاداتهم.' },
  },
  {
    icon: Clock,
    fr: { title: 'Disponibilité 7j/7', desc: 'Un service médical disponible tous les jours, y compris les weekends.' },
    ar: { title: 'متاحون 7 أيام', desc: 'خدمة طبية متاحة كل يوم بما فيها عطل نهاية الأسبوع.' },
  },
  {
    icon: ShieldCheck,
    fr: { title: 'Équipements Modernes', desc: 'Des technologies de pointe pour un diagnostic précis et des soins efficaces.' },
    ar: { title: 'تجهيزات حديثة', desc: 'تقنيات متطورة لتشخيص دقيق ورعاية فعالة.' },
  },
  {
    icon: Users,
    fr: { title: 'Approche Personnalisée', desc: 'Un suivi adapté à chaque patient pour des soins sur mesure.' },
    ar: { title: 'نهج شخصي', desc: 'متابعة مخصصة لكل مريض لرعاية على قياسه.' },
  },
]
