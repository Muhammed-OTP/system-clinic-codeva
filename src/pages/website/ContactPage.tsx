import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { useT } from '@/hooks/useT'
import { useTitle } from '@/hooks/useTitle'

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email(),
  message: z.string().min(10),
})

type ContactForm = z.infer<typeof contactSchema>

export default function ContactPage() {
  const { t } = useT()
  useTitle(t.nav[5])

  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  function onSubmit(_data: ContactForm) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setSubmitted(true)
        resolve()
      }, 800)
    })
  }

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
      <section className="hero-bg py-24 relative overflow-hidden">
        <div className="hero-dots absolute inset-0 opacity-10" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-8 text-center text-white">
          <span className="text-xs font-bold ltr:tracking-widest ltr:uppercase text-white/60">
            {t.contactLabel}
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mt-2">{t.contactTitle}</h1>
          <p className="mt-4 text-white/70 max-w-xl mx-auto text-lg">{t.contactSub}</p>
        </div>
      </section>

      {/* ── Form + Info ── */}
      <section className="py-20 bg-primary-subtle">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Form card */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle size={32} className="text-success" />
                  </div>
                  <h3 className="text-xl font-bold text-accent">{t.contactTitle}</h3>
                  <p className="text-slate-500">{t.contactSub}</p>
                </div>
              ) : (
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
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {t.formSubmit}
                  </Button>
                </form>
              )}
            </div>

            {/* Info card */}
            <div className="flex flex-col gap-6">
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 space-y-5">
                {infoItems.map(({ icon: Icon, label, value }, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center flex-shrink-0 mt-0.5">
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
              <div className="bg-white border border-[#E2E8F0] rounded-2xl h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={28} className="text-primary/30 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">{t.mapPlaceholder}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
