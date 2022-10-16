import React, { FC, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Background from '../../assets/background.jpg';
import { useHistory } from "react-router-dom"

import { signUp } from "../../services/auth/AuthServices"
import { SignUpParams } from "../../interfaces"

import Alerts from "../shared/Alerts"

const SignUp: FC = () => {
  const history = useHistory()

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")

  const [opemMsg, setOpemMsg] = useState<boolean>(false)
  const [variant, setVariant] = useState<string>("")
  const [msgs, setMsgs] = useState<Array<string>>([])


  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    }

    try {
      await signUp(params).then(data => {
        if (data.status === 200) {
          history.push("/signin")
          // Signed in successfully!
        } else {
          //setAlertMessageOpen(true)
        }
      })
      .catch(error => {
        console.log(error.response.data.errors.full_messages)
        setVariant('danger')
        setMsgs(error.response.data.errors.full_messages)
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

  const handleSignIn = () => {
    history.push("/signIn")
  }
  return(
    <Container fluid="true" id="background-sign" style={{backgroundImage: `url("${Background}")`}}>
      <Container>
        <Row className="justify-content-center align-items-center"  style={{height: '100vh'}}>
          <Col xxl="4">
            <Card bg="light">
              <Card.Body>
                <h2 className='text-center'>Football</h2>
                <h6 className='text-center mt-4'>Register</h6>

                <Alerts 
                  variant={variant}
                  open={opemMsg}
                  msgs={msgs}
                />

                <Form className='mt-3'>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="Text"
                      placeholder="Enter Name"
                      value={name}
                      required
                      onChange={event => setName(event.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      required
                      value={email}
                      onChange={event => setEmail(event.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={event => setPassword(event.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={passwordConfirmation}
                      onChange={event => setPasswordConfirmation(event.target.value)}
                    />
                  </Form.Group>
                  <div className='text-center'>
                    <Button 
                      variant="primary"
                      type="submit"
                      disabled={!name || !email || !password || !passwordConfirmation ? true : false}
                      onClick={handleSubmit}
                    >
                      Register
                    </Button>
                  </div>
                  <div className='links-sign'>
                    <Button onClick={handleSignIn}> Login </Button>
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

export default SignUp