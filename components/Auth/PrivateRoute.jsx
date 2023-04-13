import React, { useContext } from "react"
import { Route, Link } from "react-router-dom"
import {AuthContext} from "../../src/Context/AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useContext(AuthContext);
 //const { Signin } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Link to="/login" />
      }}
    ></Route>
  )
}