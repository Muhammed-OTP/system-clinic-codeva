import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { Stethoscope, ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useT } from '@/hooks/useT'
import { useTitle } from '@/hooks/useTitle'

function makeLoginSchema(lang: string) {
  const isAr = lang === 'ar'
  return z.object({
    email: z
      .string()
      .min(1, isAr ? 'أدخل بريدك الإلكتروني' : 'Veuillez saisir votre email')
      .email(isAr ? 'البريد الإلكتروني غير صالح' : 'Adresse e-mail invalide'),
    password: z
      .string()
      .min(8, isAr ? 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' : 'Minimum 8 caractères'),
  })
}

function makeRegisterSchema(lang: string) {
  const isAr = lang === 'ar'
  const required = isAr ? 'هذا الحقل مطلوب' : 'Ce champ est obligatoire'
  return z.object({
    firstName: z.string().min(1, required),
    lastName: z.string().min(1, required),
    phone: z
      .string()
      .min(8, isAr ? 'أدخل رقم هاتف صحيح' : 'Numéro de téléphone invalide'),
    email: z
      .string()
      .min(1, isAr ? 'أدخل بريدك الإلكتروني' : 'Veuillez saisir votre email')
      .email(isAr ? 'البريد الإلكتروني غير صالح' : 'Adresse e-mail invalide'),
    password: z
      .string()
      .min(8, isAr ? 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' : 'Minimum 8 caractères'),
  })
}

type LoginForm = z.infer<ReturnType<typeof makeLoginSchema>>
type RegisterForm = z.infer<ReturnType<typeof makeRegisterSchema>>
type Tab = 'login' | 'register'

function LoginFormBody({ t, lang }: { t: ReturnType<typeof useT>['t']; lang: string }) {
  const schema = makeLoginSchema(lang)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  })

  function onSubmit(_data: LoginForm) {
    return new Promise<void>((resolve) => setTimeout(resolve, 600))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="login-email"
        label={t.fieldEmail}
        placeholder={t.fieldEmailPh}
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <div>
        <Input
          id="login-password"
          label={t.fieldPassword}
          placeholder={t.fieldPasswordPh}
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />
        <div className="mt-1.5 text-end">
          <button type="button" className="text-xs text-primary hover:underline">
            {t.forgotPwd}
          </button>
        </div>
      </div>
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
        {t.btnLogin}
      </Button>
    </form>
  )
}

function RegisterFormBody({ t, lang }: { t: ReturnType<typeof useT>['t']; lang: string }) {
  const schema = makeRegisterSchema(lang)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  })

  function onSubmit(_data: RegisterForm) {
    return new Promise<void>((resolve) => setTimeout(resolve, 600))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Input
          id="reg-first"
          label={t.fieldFirstName}
          placeholder={t.fieldFirstNamePh}
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input
          id="reg-last"
          label={t.fieldLastName}
          placeholder={t.fieldLastNamePh}
          error={errors.lastName?.message}
          {...register('lastName')}
        />
      </div>
      <Input
        id="reg-phone"
        label={t.formPhone}
        placeholder={t.fieldPhonePh}
        type="tel"
        error={errors.phone?.message}
        {...register('phone')}
      />
      <Input
        id="reg-email"
        label={t.fieldEmail}
        placeholder={t.fieldEmailPh}
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <div>
        <Input
          id="reg-password"
          label={t.fieldPassword}
          placeholder={t.fieldPasswordPh}
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />
        <p className="text-xs text-slate-400 mt-1">{t.fieldPasswordMin}</p>
      </div>
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
        {t.btnRegister}
      </Button>
    </form>
  )
}

export default function AuthPage() {
  const { t, lang, isRTL } = useT()
  const [tab, setTab] = useState<Tab>('login')
  useTitle(tab === 'login' ? t.authLoginTitle : t.authRegisterTitle)

  const BackArrow = isRTL ? ArrowLeft : ArrowRight

  return (
    <div className="min-h-screen hero-bg flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="hero-dots absolute inset-0 opacity-10" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-white">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Stethoscope size={20} className="text-white" />
            </div>
            <span className="text-xl font-extrabold">{t.appBrand}</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2 border-b border-[#E2E8F0]">
            {(['login', 'register'] as Tab[]).map((tabId) => (
              <button
                key={tabId}
                type="button"
                onClick={() => setTab(tabId)}
                className={`py-4 text-sm font-semibold transition-colors ${
                  tab === tabId
                    ? 'text-primary border-b-2 border-primary bg-primary-subtle/50'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tabId === 'login' ? t.tabLogin : t.tabRegister}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-accent">
                {tab === 'login' ? t.authLoginTitle : t.authRegisterTitle}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {tab === 'login' ? t.authLoginSub : t.authRegisterSub}
              </p>
            </div>

            {/* key={lang} forces remount when language changes → schema and messages stay in sync */}
            {tab === 'login'
              ? <LoginFormBody key={`login-${lang}`} t={t} lang={lang} />
              : <RegisterFormBody key={`register-${lang}`} t={t} lang={lang} />
            }

            {/* Switch tab */}
            <p className="text-center text-sm text-slate-500 mt-6">
              {tab === 'login' ? (
                <>
                  {t.noAccount}{' '}
                  <button
                    type="button"
                    onClick={() => setTab('register')}
                    className="text-primary font-semibold hover:underline"
                  >
                    {t.createAccount}
                  </button>
                </>
              ) : (
                <>
                  {t.hasAccount}{' '}
                  <button
                    type="button"
                    onClick={() => setTab('login')}
                    className="text-primary font-semibold hover:underline"
                  >
                    {t.signin}
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Back to home — prominent, clear for all users */}
        <div className="mt-6">
          <Link to="/">
            <Button
              type="button"
              variant="ghost"
              size="md"
              className="w-full text-white/70 hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40 gap-2"
            >
              <BackArrow size={16} />
              {t.nav[0]}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
