import React from "react"
import { Route, Redirect } from "react-router-dom"
import { UseAuthP } from "../contexts/auth"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = UseAuthP()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}