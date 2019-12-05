import { RouteComponentProps } from 'react-router'
import { UnregisterCallback, Href } from 'history'

// This is to mock out the dependencies for react router
export function getMockRouterProps<P>(data: P | {}) {
  var location = {
    hash: '',
    key: '',
    pathname: '',
    search: '',
    state: {},
  }

  const props: RouteComponentProps<P | {}> = {
    match: {
      isExact: true,
      params: data,
      path: '',
      url: '',
    },
    location: location,
    history: {
      length: 2,
      action: 'POP',
      location: location,
      push: jest.fn(),
      replace: jest.fn(),
      go: jest.fn(),
      goBack: jest.fn(),
      goForward: jest.fn(),
      block: t => {
        const temp: UnregisterCallback = () => {}
        return temp
      },
      createHref: t => {
        const temp: Href = ''
        return temp
      },
      listen: t => {
        const temp: UnregisterCallback = () => {}
        return temp
      },
    },
    staticContext: {},
  }

  return props
}
