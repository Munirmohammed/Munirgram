import React, { useState } from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction'

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authReducer.loading)
  const initialState = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmpassword: '',
  }
  const [data, setData] = useState(initialState)

  const [confirmPass, setConfirmPass] = useState(true)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    setConfirmPass(true)
    e.preventDefault()

    if (isSignUp) {
      data.password === data.confirmpassword
        ? dispatch(signUp(data))
        : setConfirmPass(false)
    } else {
      dispatch(logIn(data))
    }
  }

  const resetForm = () => {
    setConfirmPass(true)
    setData({ initialState })
  }

  return (
    <div className="Auth">
      {/* Left Side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Munir Media</h1>
          <h6>Explore the ideas through out the world</h6>
        </div>
      </div>
      {/* Right Side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? 'Sign Up' : 'Log In'}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}
          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput"
                name="confirmpassword"
                onChange={handleChange}
                value={data.confirmpassword}
              />
            )}
          </div>

          <span
            style={{
              display: confirmPass ? 'none' : 'block',
              fontSize: '12px',
              color: 'red',
              alignSelf: 'flex-end',
              marginRight: '5px',
            }}
          >
            * Password Didn't match!
          </span>
          <div>
            <span
              style={{ fontSize: '13px', cursor: 'pointer' }}
              onClick={() => {
                setIsSignUp((prev) => !prev)
                resetForm()
              }}
            >
              {isSignUp ? (
                <strong>Already have an Account? Login!</strong>
              ) : (
                <strong>Don't have an account? Sign Up</strong>
              )}
            </span>
          </div>
          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : isSignUp ? 'SignUp' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth
