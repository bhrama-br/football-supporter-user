import Cookies from 'js-cookie';
import React, { FC, useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { signOut } from "../../services/auth/AuthServices"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../routers"


const Header: FC = () => {
  const { setIsSignedIn } = useContext(AuthContext)
  const history = useHistory()

  const name = Cookies.get('_name')

  const handlerSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const response = await signOut()

      if (response.data.success === true) {
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")
        setIsSignedIn(false)

        history.push("/signin")
        // Succeeded in sign out
      } else {
        // Failed in sign out
      }
    } catch (err) {
      // Error
      // console.log(err)
    }
  }
  
  return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Football Notification</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/players">Players</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={name} id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={handlerSignOut}>Sign out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header