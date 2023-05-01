import React, { useRef, useState, useContext } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { AuthContext } from "../../src/Context/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useContext(AuthContext);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    //const history = useHistory()
  
    async function handleSubmit(e) {
      e.preventDefault()
  
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
      }
      try {
        setError("")
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
        return navigate("/Dashboard")
      } catch {
        setError("Failed to create an account")
      }
      setLoading(false)
    }
    return (
      <>
        <div className="mt-5 container">
            <h1 className="title text-center mb-4">Sign Up</h1>
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
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required />
              </Form.Group>
              <button disabled={loading} className="buttonn w-100 mt-4" type="submit">
                Sign Up
              </button>
            </Form>
 
        </div>
        <div className="w-100 text-center mt-5">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
        {/* <script src="https://www.google.com/recaptcha/api.js"></script> */}
      </>
    )
  }