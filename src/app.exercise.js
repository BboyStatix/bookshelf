/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {client} from 'utils/api-client.exercise'
import {useAsync} from 'utils/hooks'
import {FullPageSpinner} from 'components/lib'
import * as colors from 'styles/colors'

function App() {
  const {
    data: user,
    error,
    isLoading,
    isError,
    run,
    setData: setUser,
  } = useAsync()

  const login = ({username, password}) => run(auth.login({username, password}))

  const register = ({username, password}) =>
    run(auth.register({username, password}))

  const logout = () => {
    auth.logout().then(() => setUser(null))
  }

  React.useEffect(() => {
    auth.getToken().then(token => {
      if (token) {
        run(client('me', {token}))
      }
    })
  }, [run])

  if (isLoading) return <FullPageSpinner />

  if (isError)
    return (
      <div
        css={{
          color: colors.danger,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    )

  return user ? (
    <AuthenticatedApp user={user} logout={logout} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  )
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
