import React, { useContext } from "react"
import { redirect } from "react-router-dom"
import {AuthContext} from "../../src/Context/AuthContext"
//import Dashboard from "./Dashboard";

export default function PrivateRoute() {
  const { currentUser } = useContext(AuthContext);
 //const { Signin } = useContext(AuthContext);

  return (
    // <Route>
    //   {() => {
    //     return currentUser ? <Dashboard/> : redirect("/") 
    //   }}
    // </Route>
    <>
    
    </>
  )
}