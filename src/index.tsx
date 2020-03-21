import React from 'react'
import I18n from 'i18n-js'
import ReactDOM from 'react-dom'
import Raven from 'raven-js'
import ReactGA from 'react-ga'
import { getLocaleFromBrowserLanguage } from './utils'
import App from 'src/App'
import * as serviceWorker from './serviceWorker'
import './index.scss'
import { storage } from 'src/utils/storage'

const LOCALES = ['en', 'vn']

const locale = getLocaleFromBrowserLanguage({
  defaultLocale: 'en',
  availableLocales: LOCALES,
  navigator: window.navigator,
})
const localeText = require(`../public/locales/${locale}.json`)

// Init global config
window.spideveloper = {
  storage: storage,
  config: {
    AppEnv: 'development',
    sentryDns: '',
    uri: '',
    google: {
      analyticsKey: '',
      authClientId: '',
    },
  },
}

const renderApp = (Component: React.ComponentType) => {
  ReactDOM.render(<Component />, document.getElementById('root') as HTMLElement)
}

const run = async () => {
  await fetch('config.json')
    .then(response => response.json())
    .then(config => {
      window.spideveloper.config = config
      I18n.translations[locale] = localeText
      I18n.locale = locale
      if (config.AppEnv !== 'development' && config.sentryDns) {
        Raven.config(config.sentryDns, {
          release: process.env.APP_VERSION,
        }).install()
      }
      if (config.AppEnv !== 'development' && config?.google.analyticsClientId) {
        ReactGA.initialize(config?.google.analyticsClientId)
        ReactGA.pageview(window.location.pathname + window.location.search)
      }
      renderApp(App)
    })
    .catch(error => {
      console.error('Cannot fetch config', error)
    })
}

if (module.hot) {
  module.hot.accept('src/App', () => {
    const NextApp = require('src/App').default
    renderApp(NextApp)
  })
}

run()
if (process.env.NODE_ENV === 'development') {
  serviceWorker.unregister()
  console.info(`UnRegister-${process.env.APP_VERSION}`)
} else {
  serviceWorker.register()
  console.info(`Register-${process.env.APP_VERSION}`)
}
