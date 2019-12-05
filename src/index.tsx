import React from 'react'
import ReactDOM from 'react-dom'
import Raven from 'raven-js'
import ReactGA from 'react-ga'
import { IntlProvider } from 'react-intl'
import { getLocaleFromBrowserLanguage } from './utils'
import App from 'src/App'
import * as serviceWorker from './serviceWorker'

const LOCALES = ['en', 'my']

const locale = getLocaleFromBrowserLanguage({
  defaultLocale: 'en',
  availableLocales: LOCALES,
  navigator: window.navigator,
})

const renderApp = (Component: React.ComponentType, locale: string) => {
  ReactDOM.render(
    <IntlProvider locale={locale}>
      <Component />
    </IntlProvider>,
    document.getElementById('root') as HTMLElement,
  )
}

const run = async () => {
  const { NODE_ENV, REACT_APP_SENTRY_KEY, REACT_APP_GOOGLE_ANALYTICS, APP_VERSION } = process.env
  if (NODE_ENV !== 'development' && REACT_APP_SENTRY_KEY) {
    Raven.config(REACT_APP_SENTRY_KEY, {
      release: APP_VERSION,
    }).install()
  }

  if (NODE_ENV !== 'development' && REACT_APP_GOOGLE_ANALYTICS) {
    ReactGA.initialize(REACT_APP_GOOGLE_ANALYTICS)
    ReactGA.pageview(window.location.pathname + window.location.search)
  }
  await renderApp(App, locale)
}

if (module.hot) {
  module.hot.accept('src/App', () => {
    const NextApp = require('src/App').default
    renderApp(NextApp, locale)
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
