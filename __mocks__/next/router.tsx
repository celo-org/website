import * as React from 'react'
export const SingletonRouter = {}

function on(action, func) {
  return `${action} ${func}`
}

const router = { pathName: '/test/', events: {on}, back: jest.fn() }

export function withRouter(Component) {
  return function Wrapped(props) {
    return <Component router={router} {...props} />
  }
}

export function useRouter() {
  return router
}
