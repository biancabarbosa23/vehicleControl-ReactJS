import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container,
} from 'reactstrap'
import AuthTemplate from '../../layouts/Auth'

import api from '../../../services/api'
import { alertError, alertInfo, alertSuccess } from '../../../utils/Alert'

export default function Forgot() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [disabled, setDisabled] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setDisabled(true)
      if (email === '') {
        setDisabled(false)
        alertInfo('Por favor informe o E-mail!')
        return
      }

      const response = await api.post(`/admin/forgot-password`, email)

      alertSuccess(response.data.message)
      history.push('/admin/reset')

      setEmail('')
    } catch (response) {
      setDisabled(false)
      alertError(response.data.error)
    }
  }

  return (
    <>
      <AuthTemplate
        title={'Alteração de senha'}
        text={
          'Informe o E-mail cadastrado para enviar-mos o link de alteração de senha.'
        }
      >
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="8">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i
                              className="fa fa-envelope"
                              aria-hidden="true"
                            ></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="E-mail"
                          type="email"
                          autoComplete="new-email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                          }}
                        />
                      </InputGroup>
                    </FormGroup>

                    <div className="group-button-link">
                      <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        onClick={(e) => handleSubmit(e)}
                        disabled={disabled}
                      >
                        Enviar link
                      </Button>
                      <a
                        className="text-light"
                        onClick={(e) => history.push('/admin/login')}
                      >
                        <small>Voltar</small>
                      </a>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </AuthTemplate>
    </>
  )
}
