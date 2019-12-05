import {
  getLanguageStringFromNavigatorObject,
  NavigatorProps,
  LocaleProps,
  getLocaleFromBrowserLanguage,
} from './locale'

describe('locale', () => {
  describe('getLanguageStringFromNavigatorObject', () => {
    it('should run correctly and return browserLanguage from languages', () => {
      const mockNav: NavigatorProps = {
        languages: ['en-EN', 'vi-VN'],
        language: 'vi-VN',
        userLanguage: 'vi-VN',
      }
      const result = getLanguageStringFromNavigatorObject(mockNav)
      const output = 'en'
      expect(result).toEqual(output)
    })

    it('should run correctly and return languages from userLanguage', () => {
      const mockNav = {
        language: 'my-MY',
        userLanguage: 'vi-VN',
      } as NavigatorProps
      const result = getLanguageStringFromNavigatorObject(mockNav)
      const output = 'vi'
      expect(result).toEqual(output)
    })

    it('should run correctly and return languages from language', () => {
      const mockNav = {
        language: 'my-MY',
      } as NavigatorProps
      const result = getLanguageStringFromNavigatorObject(mockNav)
      const output = 'my'
      expect(result).toEqual(output)
    })

    it('should run correctly and return null', () => {
      const mockNav = {} as NavigatorProps
      const result = getLanguageStringFromNavigatorObject(mockNav)
      const output = null
      expect(result).toEqual(output)
    })
  })

  describe('getLocaleFromBrowserLanguage', () => {
    it('should run correctly and return locale', () => {
      const mockOpts: LocaleProps = {
        defaultLocale: 'en',
        availableLocales: ['en', 'vn'],
        navigator: window.navigator,
      }
      const result = getLocaleFromBrowserLanguage(mockOpts)
      const output = 'en'
      expect(result).toEqual(output)
    })

    it('should run correctly and return locale when no defaultLocale', () => {
      const mockOpts: LocaleProps = {
        availableLocales: ['en', 'vn'],
        navigator: window.navigator,
      }
      const result = getLocaleFromBrowserLanguage(mockOpts)
      const output = 'en'
      expect(result).toEqual(output)
    })

    it('should run correctly and return locale when no availableLocales', () => {
      const mockOpts: LocaleProps = {
        navigator: window.navigator,
      }
      const result = getLocaleFromBrowserLanguage(mockOpts)
      const output = 'en'
      expect(result).toEqual(output)
    })

    it('should run correctly and return locale when no navigator', () => {
      const mockOpts = {} as LocaleProps
      const result = getLocaleFromBrowserLanguage(mockOpts)
      const output = 'en'
      expect(result).toEqual(output)
    })
  })
})
