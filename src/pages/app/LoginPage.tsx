import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Stethoscope } from 'lucide-react'
import { useAppDispatch } from '@/store'
import { setCredentials } from '@/features/auth/authSlice'
import { authService } from '@/services/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useT } from '@/hooks/useT'
import { useTitle } from '@/hooks/useTitle'
import type { UserRole } from '@/types/models'

const STAFF_ROLES: UserRole[] = ['admin', 'doctor', 'receptionist']

const ROLE_REDIRECT: Record<string, string> = {
  admin: '/app/admin',
  doctor: '/app/doctor',
  receptionist: '/app/reception',
}

function makeSchema(lang: string) {
  const isAr = lang === 'ar'
  return z.object({
    email: z
      .string()
      .min(1, isAr ? 'أدخل بريدك الإلكتروني' : 'Veuillez saisir votre email')
      .email(isAr ? 'البريد الإلكتروني غير صالح' : 'Adresse e-mail invalide'),
    password: z
      .string()
      .min(1, isAr ? 'أدخل كلمة المرور' : 'Veuillez saisir votre mot de passe'),
  })
}

type FormData = z.infer<ReturnType<typeof makeSchema>>

export default function LoginPage() {
  const { t, lang } = useT()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  useTitle(t.appLoginTitle)

  const schema = makeSchema(lang)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setApiError('')
    try {
      const res = await authService.login(data)
      const { access, user } = res.data

      if (!STAFF_ROLES.includes(user.role)) {
        setApiError(t.loginPatientBlocked)
        return
      }

      dispatch(setCredentials({ user, token: access }))

      if (user.role === 'doctor' && user.is_first_login) {
        navigate('/app/set-password', { replace: true })
        return
      }

      navigate(ROLE_REDIRECT[user.role] ?? '/app/admin', { replace: true })
    } catch (err: unknown) {
      const status = (err as { response?: { status: number } })?.response?.status
      if (status === 401) {
        setApiError(t.loginErrorInvalid)
      } else if (status === 403) {
        setApiError(t.loginErrorInactive)
      } else {
        setApiError(t.loginErrorGeneric)
      }
    }
  }

  return (
    <div className="min-h-screen hero-bg flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="hero-dots absolute inset-0 opacity-10" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex flex-col items-center gap-3 text-white">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <Stethoscope size={28} className="text-white" />
            </div>
            <div>
              <p className="text-xl font-extrabold">{t.appBrand}</p>
              <p className="text-sm text-white/60 mt-0.5">{t.appTagline}</p>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-extrabold text-accent">{t.appLoginTitle}</h1>
            <p className="text-slate-500 text-sm mt-1">{t.appLoginSub}</p>
          </div>

          <form key={lang} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="email"
              label={t.fieldEmail}
              placeholder={t.fieldEmailPh}
              type="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              id="password"
              label={t.fieldPassword}
              placeholder={t.fieldPasswordPh}
              type="password"
              error={errors.password?.message}
              {...register('password')}
            />

            {apiError && (
              <p className="text-sm text-[var(--color-error)] bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {apiError}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              disabled={isSubmitting}
            >
              {t.btnSignin}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
