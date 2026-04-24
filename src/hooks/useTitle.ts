import { useEffect } from 'react'

export function useTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | Codeva Clinic`
    return () => { document.title = 'Codeva Clinic' }
  }, [title])
}
