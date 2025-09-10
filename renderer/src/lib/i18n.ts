import { createContext, useContext, useState, ReactNode } from 'react'
import pt from '../locales/pt.json'
import en from '../locales/en.json'

type Lang = 'pt' | 'en'
type Dict = typeof pt

interface I18nContextType {
  lang: Lang
  t: (key: string, vars?: Record<string, any>) => string
  setLang: (lang: Lang) => void
}

const translations: Record<Lang, Dict> = { pt, en }

export const I18nContext = createContext<I18nContextType>({
  lang: 'pt',
  t: (k) => k,
  setLang: () => undefined,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const stored = (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) as Lang | null
  const [lang, setLangState] = useState<Lang>(stored || 'pt')

  function t(key: string, vars?: Record<string, any>) {
    const parts = key.split('.')
    let value: any = translations[lang]
    for (const p of parts) value = value?.[p]
    if (typeof value !== 'string') return key
    return value.replace(/{{(\w+)}}/g, (_, v) => String(vars?.[v] ?? ''))
  }

  function setLang(l: Lang) {
    setLangState(l)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('lang', l)
    }
  }

  return (
    <I18nContext.Provider value={{ lang, t, setLang }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  return useContext(I18nContext)
}
