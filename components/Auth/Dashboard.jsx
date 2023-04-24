
import React, { useState, useContext } from "react"
import { Button, Card, Alert } from "react-bootstrap"
import { AuthContext } from "../../src/Context/AuthContext"
import { Link, redirect } from "react-router-dom"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useContext(AuthContext);

  // async function handleLogout() {
  //   setError("")

  //   try {
  //     await logout()
  //     redirect("/login")
  //   } catch {
  //     setError("Failed to log out")
  //   }
  // }

  return (
    <>
      <section className="probootstrap-section probootstrap-cover probootstrap-scene-0">
      <div className="container">

          <Card.Body>
          <h2 className="probootstrap-heading">DashBoard</h2>

          <Card.Header>
          {error && <Alert variant="danger">{error}</Alert>}

          <div style={{textAlign: 'center'}}>Email: 
          <b> {currentUser.email}</b> </div>
          </Card.Header>

          <div className="w-100 text-center mt-3 mb-3">
            <button className="buttong">
            <Link to="/update-profile" >
            Update Profile
            </Link>
            </button>
          </div>


          <section className="text-center">
          <h2 className="probootstrap-heading">Music</h2>
              <Card.Header>
              <Card.Text>
              You play music while you work.
              </Card.Text>
            </Card.Header>
            <div className="w-100 text-center mt-3 mb-3">
            <button className='buttong'>
              <Link to="/Music" className="">Music</Link>
              </button>
              </div>
          </section>
        </Card.Body>
      </div>
      </section>
      {/* <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div> */}
    </>
  )
}