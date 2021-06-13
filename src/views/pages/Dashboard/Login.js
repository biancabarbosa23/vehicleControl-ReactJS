import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

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
import { login } from '../../../services/auth'

export default function Auth() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (email === '' || password === '') {
        alertInfo('Por favor preencha todos os campos!')
        return
      }

      const response = await api.post('/admin/login', {
        email,
        senha: password,
      })

      login(response.data.token, response.data.admin, '999')

      history.push('/dashboard')

      setEmail('')
      setPassword('')
    } catch (response) {
      alertError(response.data.error)
    }
  }

  const handleVisiblePassword = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }

  return (
    <>
      <AuthTemplate title={'Login'} text={'Bem vindo a área do administrador!'}>
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
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i
                              className="fa fa-unlock-alt"
                              aria-hidden="true"
                            ></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Senha"
                          type={visible === true ? 'text' : 'password'}
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value)
                          }}
                        />
                        <InputGroupAddon>
                          <InputGroupText>
                            {visible === false ? (
                              <a onClick={(e) => handleVisiblePassword(e)}>
                                <i className="fa fa-eye"></i>
                              </a>
                            ) : (
                              <a onClick={(e) => handleVisiblePassword(e)}>
                                <i className="fa fa-eye-slash"></i>
                              </a>
                            )}
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormGroup>

                    <div className="group-button-link">
                      <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Entrar
                      </Button>
                      <a
                        className="text-light"
                        onClick={(e) => history.push('/admin/forgot')}
                      >
                        <small>Esqueceu sua senha?</small>
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
