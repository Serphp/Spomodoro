
import React, { useState, useContext } from "react"
import { Button, Card, Alert } from "react-bootstrap"
import { AuthContext } from "../../src/Context/AuthContext"
import { Link, redirect } from "react-router-dom"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useContext(AuthContext);

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
      <div className="boxcontainer2">
        <Card.Body>
        <h2 className="mb-5"> Welcome </h2>

          <h2 className="text-center mb-4">
            Profile           
          </h2>
          <div className="w-100 text-center mt-3 mb-3">
          <Link to="/update-profile" className="buttong">
            Update Profile
          </Link>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          
          <section className="card2 mb-3 mt-5">
          <Alert variant="danger">New Feature</Alert>
              <Card.Header>
              <Card.Title>Music Beta</Card.Title>
              <Card.Text>
              You play music while you work.
              </Card.Text>
              <button className='buttong'>
              <Link to="/Music" className="">Music</Link>
              </button>
            </Card.Header>
          </section>
        </Card.Body>
      </div>
      {/* <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div> */}
    </>
  )
}