export type NavigatorProps = {
  userLanguage?: string
  readonly language: string
  readonly languages: ReadonlyArray<string>
}

export type LocaleProps = {
  defaultLocale?: string
  availableLocales?: string[]
  navigator: Navigator
}

export function getLanguageStringFromNavigatorObject(nav: NavigatorProps): string | null {
  let browserLanguage = null
  if (nav.languages && nav.languages.length > 0) {
    browserLanguage = nav.languages[0].split('-')[0]
  } else if (nav.userLanguage) {
    // IE 10 only supports window.navigator.userLanguage
    browserLanguage = nav.userLanguage.split('-')[0]
  } else if (nav.language) {
    // Safari only supports window.navigator.language
    browserLanguage = nav.language.split('-')[0]
  }
  return browserLanguage
}

export function getLocaleFromBrowserLanguage(opts: LocaleProps): string {
  let locale = opts.defaultLocale || 'en'
  const browserLanguage = getLanguageStringFromNavigatorObject(opts.navigator || window.navigator)
  const availableLocales = opts.availableLocales

  if (
    browserLanguage &&
    availableLocales &&
    availableLocales.length &&
    availableLocales.indexOf(browserLanguage) > -1
  ) {
    locale = browserLanguage
  }

  return locale
}
