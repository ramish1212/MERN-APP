import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function Footer() {
  const [mode, setMode] = useState(() => localStorage.getItem('mode') || 'light');
  return (
    <>
      <Container fluid className="footer">
        <Container>
          <Row className='row-1'>
            <Col md={6}>
              <div className="logo">
                <img src={mode === 'light' ? "/white-logo.png" : "/dark-logo.png"} alt="Logo" />
              </div>
            </Col>
            <Col md={3}>
              <div className="links">
                <h3>More Links</h3>
                <ul>
                  <li><Link to="/blogs">Blogs</Link></li>
                </ul>
              </div>
            </Col>
            <Col md={3}>
              <div className="links">
                <h3>More Links</h3>
                <ul>
                  <li><Link to="/about-us">About us</Link></li>
                  <li><Link to="/contact-us">Contact us</Link></li>
                  <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link to="/terms-of-service">Terms of Service</Link></li>
                </ul>
              </div>
            </Col>
          </Row>
          <div className="footer-bottom">
            <p>&copy; 2022 All Rights Reserved.</p>
          </div>
        </Container>
      </Container>
    </>
  )
}

export default Footer