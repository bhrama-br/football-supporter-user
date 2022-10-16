import React, { FC, useContext, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Background from '../../assets/background.jpg';
import { useHistory } from "react-router-dom"

import Alerts from "../shared/Alerts"
import { signIn } from "../../services/auth/AuthServices"
import { SignInParams } from "../../interfaces"
import Cookies from 'js-cookie';
import { AuthContext } from "../../routers"

const SignIn : FC = () => {
  const { setIsSignedIn } = useContext(AuthContext)
  const history = useHistory()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [opemMsg, setOpemMsg] = useState<boolean>(false)
  const [variant, setVariant] = useState<string>("")
  const [msgs, setMsgs] = useState<Array<string>>([])


  const handleSubmitLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignInParams = {
      email: email,
      password: password,
    }

    try {
      Cookies.remove("_access_token")
      Cookies.remove("_client")
      Cookies.remove("_uid")
      await signIn(params).then(data => {
        if (data.status === 200) {
          Cookies.set("_access_token", data.headers["access-token"] || '')
          Cookies.set("_client", data.headers["client"] || '')
          Cookies.set("_uid", data.headers["uid"] || '')
          Cookies.set("_name", data.data.data.name || '')

          setIsSignedIn(true)
          history.push("/dashboard")
          // Signed in successfully!
        } else {
          //setAlertMessageOpen(true)
        }
      })
      .catch(error => {
        setVariant('danger')
        setMsgs(error.response.data.errors)
        setOpemMsg(true)
      })      
    } catch (error) {
      console.log(error)
      setVariant('danger')
      setMsgs(['Invalid email or password'])
      setOpemMsg(true)
      //setAlertMessageOpen(true)
    }
  }

  const handleSignUp = () => {
    history.push("/signUp")
  }

  return(
    <Container fluid="true" id="background-sign" style={{backgroundImage: `url("${Background}")`}}>
      <Container>
        <Row className="justify-content-center align-items-center"  style={{height: '100vh'}}>
          <Col xxl="4">
            <Card bg="light">
              <Card.Body>
                <h2 className='text-center'>Football</h2>
                <h6 className='text-center mt-4'>Login</h6>

                <Alerts 
                  variant={variant}
                  open={opemMsg}
                  msgs={msgs}
                />

                <Form className='mt-3'>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"  
                      value={email}
                      required
                      onChange={event => setEmail(event.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      required
                      onChange={event => setPassword(event.target.value)}
                    />
                  </Form.Group>
                  <div className='text-center'>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={!email || !password ? true : false}
                      onClick={handleSubmitLogin}
                    >
                      Login
                    </Button>
                  </div>
                  <div className='links-sign'>
                    <Button onClick={handleSignUp}> Create account </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default SignIn