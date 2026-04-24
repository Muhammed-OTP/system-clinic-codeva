import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useT } from '@/hooks/useT'
import { useTitle } from '@/hooks/useTitle'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(8),
  email: z.string().email(),
  password: z.string().min(8),
})

type LoginForm = z.infer<typeof loginSchema>
type RegisterForm = z.infer<typeof registerSchema>

type Tab = 'login' | 'register'

function LoginForm({ t }: { t: ReturnType<typeof useT>['t'] }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
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

function RegisterForm({ t }: { t: ReturnType<typeof useT>['t'] }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
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
  const { t } = useT()
  const [tab, setTab] = useState<Tab>('login')
  useTitle(tab === 'login' ? t.authLoginTitle : t.authRegisterTitle)

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center px-4 py-12 relative">
      <div className="hero-dots absolute inset-0 opacity-10" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Stethoscope size={20} className="text-white" />
            </div>
            <span className="text-xl font-extrabold">{t.appBrand}</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2 border-b border-[#E2E8F0]">
            {(['login', 'register'] as Tab[]).map((tabId) => (
              <button
                key={tabId}
                onClick={() => setTab(tabId)}
                className={`py-4 text-sm font-semibold transition-colors ${
                  tab === tabId
                    ? 'text-primary border-b-2 border-primary'
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

            {tab === 'login' ? <LoginForm t={t} /> : <RegisterForm t={t} />}

            {/* Switch tab link */}
            <p className="text-center text-sm text-slate-500 mt-6">
              {tab === 'login' ? (
                <>
                  {t.noAccount}{' '}
                  <button
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

        {/* Back to site */}
        <p className="text-center mt-6">
          <Link to="/" className="text-white/60 text-sm hover:text-white transition-colors">
            ← {t.nav[0]}
          </Link>
        </p>
      </div>
    </div>
  )
}
