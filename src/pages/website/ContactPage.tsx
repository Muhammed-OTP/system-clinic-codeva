import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { useT } from '@/hooks/useT'
import { useTitle } from '@/hooks/useTitle'

function makeContactSchema(lang: string) {
  const isAr = lang === 'ar'
  return z.object({
    name: z.string().min(2, isAr ? 'يرجى إدخال اسمك الكامل' : 'Veuillez saisir votre nom complet'),
    phone: z.string().min(8, isAr ? 'رقم الهاتف غير صالح' : 'Numéro de téléphone invalide'),
    email: z.string().email(isAr ? 'أدخل بريدًا إلكترونيًا صحيحًا' : 'Adresse e-mail invalide'),
    message: z.string().min(10, isAr ? 'الرسالة قصيرة جدًا (10 أحرف على الأقل)' : 'Message trop court (10 caractères min.)'),
  })
}

type ContactForm = z.infer<ReturnType<typeof makeContactSchema>>

function ContactFormBody({ lang, t }: { lang: string; t: ReturnType<typeof useT>['t'] }) {
  const [submitted, setSubmitted] = useState(false)
  const schema = makeContactSchema(lang)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactForm>({
    resolver: zodResolver(schema),
  })

  function onSubmit(_data: ContactForm) {
    return new Promise<void>((resolve) => {
      setTimeout(() => { setSubmitted(true); resolve() }, 800)
    })
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle size={32} className="text-success" />
        </div>
        <h3 className="text-lg font-bold text-accent">{t.formSubmit}</h3>
        <p className="text-slate-500 text-sm max-w-xs">{t.contactSub}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        id="name"
        label={t.formName}
        placeholder={t.formNamePh}
        error={errors.name?.message}
        {...register('name')}
      />
      <Input
        id="phone"
        label={t.formPhone}
        placeholder={t.formPhonePh}
        type="tel"
        error={errors.phone?.message}
        {...register('phone')}
      />
      <Input
        id="email"
        label={t.formEmail}
        placeholder={t.formEmailPh}
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Textarea
        id="message"
        label={t.formMessage}
        placeholder={t.formMessagePh}
        rows={5}
        error={errors.message?.message}
        {...register('message')}
      />
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
        {t.formSubmit}
      </Button>
    </form>
  )
}

export default function ContactPage() {
  const { t, lang } = useT()
  useTitle(t.nav[3])
  const contentRef = useRef<HTMLElement>(null)

  const infoItems = [
    { icon: MessageCircle, label: t.infoWhatsapp, value: t.infoPhone },
    { icon: Phone, label: t.infoPhone, value: t.infoPhone },
    { icon: Mail, label: t.infoEmail, value: t.infoEmailVal },
    { icon: MapPin, label: t.infoAddress, value: t.infoAddressVal },
    { icon: Clock, label: t.infoHours, value: t.infoHoursVal },
  ]

  return (
    <main>
      {/* ── Banner ── */}
      <section className="hero-bg pt-28 pb-10 relative overflow-hidden">
        <div className="hero-dots absolute inset-0 opacity-10" />

        {/* Decorative icons */}
        <div className="absolute end-10 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
          <div className="relative w-52 h-48">
            <Phone size={90} className="text-white/15 absolute top-0 end-0" />
            <MapPin size={52} className="text-white/20 absolute bottom-0 start-4" />
            <MessageCircle size={42} className="text-white/10 absolute top-16 start-0" />
          </div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-8 text-center text-white">
          <span className="text-xs font-bold ltr:tracking-widest ltr:uppercase text-white/60">
            {t.contactLabel}
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mt-2">{t.contactTitle}</h1>
          <p className="mt-4 text-white/70 max-w-xl mx-auto text-lg">{t.contactSub}</p>
        </div>

        {/* Scroll arrow */}
        <div className="relative z-10 flex justify-center mt-8 pb-2">
          <button
            type="button"
            onClick={() => contentRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white/50 hover:text-white transition-colors"
            aria-label="scroll down"
          >
            <ChevronDown size={30} className="animate-bounce" />
          </button>
        </div>
      </section>

      {/* ── Form + Info ── */}
      <section ref={contentRef} className="py-20 bg-primary-subtle">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Form card — key forces remount on lang change so schema stays in sync */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8">
              <ContactFormBody key={lang} lang={lang} t={t} />
            </div>

            {/* Info + map */}
            <div className="flex flex-col gap-6">
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 space-y-5">
                {infoItems.map(({ icon: Icon, label, value }, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 ltr:uppercase ltr:tracking-wide mb-0.5">
                        {label}
                      </p>
                      <p className="text-sm font-medium text-accent">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl h-48 flex flex-col items-center justify-center gap-2">
                <MapPin size={28} className="text-primary/30" />
                <p className="text-sm text-slate-400">{t.mapPlaceholder}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
