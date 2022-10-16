import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default class Footer extends Component {
  render() {
    return(
      <Container fluid className='footer-row'>
        <Container>
          <Row>
            <Col className='text-center footer-text'>
              Copyright 2022 by Paulo Bramante. All Rights Reserved.
            </Col>
          </Row>
        </Container>
      </Container>
    )
  }
}