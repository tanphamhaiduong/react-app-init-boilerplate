import '@testing-library/jest-dom/extend-expect'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

Object.defineProperty(
  window.navigator,
  'languages',
  (function(_value) {
    return {
      get: function _get() {
        return ['en-EN', 'en']
      },
      set: function _set(v: any) {
        _value = v
      },
    }
  })(window.navigator.languages),
)

Object.defineProperty(
  window.navigator,
  'language',
  (function(_value) {
    return {
      get: function _get() {
        return 'en-EN'
      },
      set: function _set(v: any) {
        _value = v
      },
    }
  })(window.navigator.language),
)
