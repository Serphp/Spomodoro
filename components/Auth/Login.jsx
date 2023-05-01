import React, { useRef, useState, useContext } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { AuthContext } from "../../src/Context/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { Signin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)


  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await Signin(emailRef.current.value, passwordRef.current.value)
      return navigate("/dashboard");
    } catch {
      setError("Failed to log in")
    }
    setLoading(false)
  }


  return (
    <>
    
      <div className="mt-5 container">
          <h1 className="title text-center mb-4">Log In</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <button disabled={loading} className="buttonn w-100 mt-3" type="submit">
              Log In
            </button>
          </Form>
      </div>
      <div className="w-100 text-center mt-5">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
    </>
  )
}