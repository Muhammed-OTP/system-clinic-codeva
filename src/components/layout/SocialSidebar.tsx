import { MessageCircle } from 'lucide-react'

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function SocialSidebar() {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 p-2 rtl:left-auto rtl:right-0">
      <a
        href="#"
        aria-label="Facebook"
        className="w-10 h-10 flex items-center justify-center rounded-[10px] bg-white border border-[#E2E8F0] shadow-sm text-[#334155] transition-all duration-200 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
      >
        <FacebookIcon size={16} />
      </a>
      <a
        href="#"
        aria-label="WhatsApp"
        className="w-10 h-10 flex items-center justify-center rounded-[10px] bg-white border border-[#E2E8F0] shadow-sm text-[#334155] transition-all duration-200 hover:bg-[#25D366] hover:text-white hover:border-[#25D366]"
      >
        <MessageCircle size={16} />
      </a>
    </div>
  )
}
