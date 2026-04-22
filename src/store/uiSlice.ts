import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type Lang = 'fr' | 'ar'

interface UIState {
  lang: Lang
}

const savedLang = (typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null) as Lang | null

const uiSlice = createSlice({
  name: 'ui',
  initialState: { lang: savedLang ?? 'fr' } as UIState,
  reducers: {
    setLang(state, action: PayloadAction<Lang>) {
      state.lang = action.payload
      localStorage.setItem('lang', action.payload)
      document.documentElement.setAttribute('lang', action.payload)
      document.documentElement.setAttribute('dir', action.payload === 'ar' ? 'rtl' : 'ltr')
    },
  },
})

export const { setLang } = uiSlice.actions
export default uiSlice.reducer
