import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { KeyRound } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store'
import { setCredentials, logout } from '@/features/auth/authSlice'
import { authService } from '@/services/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useT } from '@/hooks/useT'
import { useTitle } from '@/hooks/useTitle'

function makeSchema(lang: string) {
  const isAr = lang === 'ar'
  const min = isAr ? 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' : 'Minimum 8 caractères'
  return z
    .object({
      new_password: z.string().min(8, min),
      confirm_password: z.string().min(1),
    })
    .refine((d) => d.new_password === d.confirm_password, {
      message: isAr ? 'كلمتا المرور غير متطابقتين.' : 'Les mots de passe ne correspondent pas.',
      path: ['confirm_password'],
    })
}

type FormData = z.infer<ReturnType<typeof makeSchema>>

export default function SetPasswordPage() {
  const { t, lang } = useT()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((s) => s.auth.user)
  const [apiError, setApiError] = useState('')
  useTitle(t.setPasswordTitle)

  const schema = makeSchema(lang)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setApiError('')
    try {
      await authService.setFirstPassword({
        new_password: data.new_password,
        confirm_password: data.confirm_password,
      })
      // Update stored user — is_first_login is now false
      if (user) {
        dispatch(setCredentials({
          user: { ...user, is_first_login: false },
          token: localStorage.getItem('token') ?? '',
        }))
      }
      navigate('/app/doctor', { replace: true })
    } catch {
      setApiError(t.loginErrorGeneric)
    }
  }

  return (
    <div className="min-h-screen hero-bg flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="hero-dots absolute inset-0 opacity-10" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex flex-col items-center gap-3 text-white">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <KeyRound size={28} className="text-white" />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-extrabold text-accent">{t.setPasswordTitle}</h1>
            <p className="text-slate-500 text-sm mt-1">{t.setPasswordSub}</p>
          </div>

          <form key={lang} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                id="new-password"
                label={t.fieldNewPassword}
                placeholder={t.fieldPasswordPh}
                type="password"
                error={errors.new_password?.message}
                {...register('new_password')}
              />
              <p className="text-xs text-slate-400 mt-1">{t.setPasswordMin}</p>
            </div>
            <Input
              id="confirm-password"
              label={t.fieldConfirmPassword}
              placeholder={t.fieldPasswordPh}
              type="password"
              error={errors.confirm_password?.message}
              {...register('confirm_password')}
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
              {t.btnSetPassword}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => dispatch(logout())}
            className="w-full mt-4 text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            {lang === 'ar' ? 'تسجيل الخروج' : 'Se déconnecter'}
          </button>
        </div>
      </div>
    </div>
  )
}
