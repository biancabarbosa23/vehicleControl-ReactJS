import React, { useEffect, useState } from 'react'

import { Row, Col, Container } from 'reactstrap'

export default function Auth({ children, title, text }) {
  useEffect(() => {
    document.body.classList.add('bg-default')
    return () => {
      document.body.classList.remove('bg-default')
    }
  }, [])

  return (
    <div className="main-content admin-auth bg-default">
      <div className="header bg-gradient-info py-7 py-lg-8">
        <Container>
          <img src="../../assets/img/icons/fatec-logo_site.png" />
          <div className="header-body text-center mb-7">
            <Row className="justify-content-center">
              <Col lg="5" md="6">
                <h1 className="text-white">{title}</h1>
                <p className="text-lead text-light">{text}</p>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      {/* Page content */}
      {children}
    </div>
  )
}
