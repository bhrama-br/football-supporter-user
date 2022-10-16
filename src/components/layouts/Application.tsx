import React from 'react';

import Header from './Header';
import Footer from './Footer';
import { Col, Container, Row } from 'react-bootstrap';

interface ApplicationProps {
  children: React.ReactElement
}

const Application = ({ children }: ApplicationProps) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container>
          <Row>
            <Col className='pt-5 pb-5'>
              {children}
            </Col>
          </Row>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Application