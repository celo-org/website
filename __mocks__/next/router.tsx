import * as React from 'react'
export const SingletonRouter = {}

function on(action, func) {
  return `${action} ${func}`
}

export function withRouter(Component) {
  return function Wrapped(props) {
    return <Component router={{ pathName: '/test/', events: {on} }} {...props} />
  }
}

export function useRouter() {
  return {
    back: jest.fn()
  }
}
