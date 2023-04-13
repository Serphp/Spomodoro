
import React, { useState, useContext } from "react"
import { Button, Card, Alert } from "react-bootstrap"
import { AuthContext } from "../../src/Context/AuthContext"
import { Link, redirect } from "react-router-dom"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useContext(AuthContext);
  //const history = redirect()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      redirect("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
    <h1> Welcome </h1>
      <div className="boxcontainer2">
        <Card.Body>
            
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </div>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}