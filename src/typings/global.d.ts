export type Config = {
  AppEnv: string
  sentryDns: string
  uri: string
  google: {
    analyticsKey: string
    authClientId: string
  }
}

declare global {
  interface Window {
    spideveloper: {
      storage: StorageFallback
      config: Config
    }
    __REDUX_DEVTOOLS_EXTENSION__?: Function
  }
}
