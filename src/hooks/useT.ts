import { useAppSelector } from '@/store'
import { translations } from '@/constants/translations'

export function useT() {
  const lang = useAppSelector((s) => s.ui.lang)
  return { t: translations[lang], lang, isRTL: lang === 'ar' }
}
