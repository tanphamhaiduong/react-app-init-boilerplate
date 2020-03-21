import fallbackStorage from 'local-storage-fallback'

const getFallbackStorage = () => fallbackStorage

export const getStorage = () => {
  let storage = null

  if (!storage) {
    // Occurs when it's a browser environment
    // Using global variable `USE_MEMORY_STORAGE` for testing purpose
    if (typeof window !== 'undefined') {
      const KEY = `ohafit_storage_supported_${Math.random()}`

      try {
        window.localStorage.setItem(KEY, 'true')

        if (window.localStorage.getItem(KEY) !== 'true') {
          throw new Error('Unable to use `window.localStorage`.')
        }

        window.localStorage.removeItem(KEY)
        storage = window.localStorage
      } catch (err) {
        // Occurs when the browser(i.e. Safari) is in private mode.
        storage = getFallbackStorage()
      }
    } else {
      // Occurs when it's a Node environment.
      storage = getFallbackStorage()
    }
  }
  return storage
}

export const storage = getStorage()
