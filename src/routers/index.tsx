import React, { useState, useEffect, createContext, FC} from "react"
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";

import Application from "../components/layouts/Application"
import Dashboard from "../components/pages/Dashboard"
import Players from "../components/pages/Players"
import PlayerComponent from "../components/pages/PlayerComponent"
import SignUp from "../components/pages/SignUp"
import SignIn from "../components/pages/SignIn"

import { getUser } from "../services/auth/AuthServices"

import { User } from "../interfaces/index"
import Cookies from "js-cookie";

export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

export const Routers: FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()
  const handleGetUser = async () => {
    try {
      const res = await getUser()
      if (res?.data.success === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)
      } else {
        setIsSignedIn(false)
      }
    } catch (err) {

      setIsSignedIn(false)
      Cookies.remove("_access_token")
      Cookies.remove("_client")
      Cookies.remove("_uid")
      
      console.log(err)
    }

    setLoading(false)
  }
  
  useEffect(() => {
    handleGetUser()
  }, [setCurrentUser]);

  
  const PrivateRoute = ({ ...children }: any) => {
    if (!loading) {
      if (isSignedIn) {
        return (
          <Route
            {...children} />
        )
      } else {
        return <Redirect to="/signin" />
      }
    } else {
      return <>Loading</>
    }
  }

  const PublicRoute = ({ children }: any) => {
    if (!loading) {
      if (isSignedIn) {
        return <Redirect to="/dashboard" />
      } else {
        return children
      }
    } else {
      return <>Loading</>
    }
  }
  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
          <Switch>
            <PublicRoute path="/signup">
              <SignUp />
            </PublicRoute>
            <PublicRoute path="/signin">
              <SignIn />
            </PublicRoute>

            <PrivateRoute exact path="/">
              <Application>
                <Dashboard />
              </Application>
            </PrivateRoute>

            <PrivateRoute path="/dashboard">
              <Application>
                <Dashboard />
              </Application>
            </PrivateRoute>

            <PrivateRoute exact path="/players">
              <Application>
                <Players />
              </Application>
            </PrivateRoute>

            <PrivateRoute exact path={"/players/:id"}>
              <Application>
                <PlayerComponent />
              </Application>
            </PrivateRoute>

          </Switch>
      </AuthContext.Provider>
    </Router>
  )
}

