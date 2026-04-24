import { Link } from 'react-router-dom'
import { useT } from '@/hooks/useT'
import { useTitle } from '@/hooks/useTitle'

export default function NotFoundPage() {
  const { lang } = useT()
  const isAr = lang === 'ar'

  useTitle(isAr ? 'الصفحة غير موجودة' : 'Page introuvable')

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <p className="text-9xl font-extrabold text-primary/15 select-none leading-none mb-2">404</p>
      <h1 className="text-2xl font-bold text-accent mb-3">
        {isAr ? 'الصفحة غير موجودة' : 'Page introuvable'}
      </h1>
      <p className="text-slate-500 mb-8 max-w-sm leading-relaxed">
        {isAr
          ? 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
          : "La page que vous recherchez n'existe pas ou a été déplacée."}
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-primary-dark transition-colors duration-200 no-underline shadow-[0_4px_14px_0_rgba(9,20,183,0.25)]"
      >
        {isAr ? 'العودة إلى الرئيسية' : "Retour à l'accueil"}
      </Link>
    </main>
  )
}
