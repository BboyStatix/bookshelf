import React, {useReducer, useState} from 'react'
import ReactDOM from 'react-dom'

import {Logo} from 'components/logo'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'

const LoginForm = ({onSubmit, buttonText}) => {
  const handleSubmit = e => {
    e.preventDefault()
    const {username, password} = e.target.elements

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" />
      </div>
      <button>{buttonText}</button>
    </form>
  )
}

const dialogReducer = (_, action) => {
  switch (action) {
    case 'login':
      return {loginDialogShown: true, registerDialogShown: false}
    case 'register':
      return {loginDialogShown: false, registerDialogShown: true}
    case 'close':
      return {loginDialogShown: false, registerDialogShown: false}
  }
}

function App() {
  const [{loginDialogShown, registerDialogShown}, dispatch] = useReducer(
    dialogReducer,
    {
      loginDialogShown: false,
      registerDialogShown: false,
    },
  )
  const open = modal => dispatch(modal)
  const close = () => dispatch('close')

  function login(formData) {
    console.log('login', formData)
  }

  function register(formData) {
    console.log('register', formData)
  }

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => open('login')}>Login</button>
        <Dialog aria-label="login" isOpen={loginDialogShown} onDismiss={close}>
          <LoginForm onSubmit={login} buttonText="Login" />
        </Dialog>
      </div>
      <div>
        <button onClick={() => open('register')}>Register</button>
        <Dialog
          aria-label="register"
          isOpen={registerDialogShown}
          onDismiss={close}
        >
          <LoginForm onSubmit={register} buttonText="register" />
        </Dialog>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
