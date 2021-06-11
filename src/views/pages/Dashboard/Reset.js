import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

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

export default function Reset() {
  const { token } = useParams()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [visiblePass, setVisiblePass] = useState(false)
  const [visibleConfirmPass, setVisibleConfirmPass] = useState(false)
  const [visibleAlert, setVisibleAlert] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setVisibleAlert(false)
      if (password === '' || confirmPassword === '') {
        alertInfo('Por favor preencha todos os campos!')
        return
      }

      if (password !== confirmPassword) {
        alertInfo('Confirmação de senha incorreta!')
        return
      }

      const response = await api.post('/admin/reset-password', {
        token,
        confirmarSenha: confirmPassword,
        senha: password,
      })

      if (response.data.success) {
        setVisibleAlert(true)
        setTimeout(function () {
          history.push('/admin/login')
        }, 5000)
      }

      setConfirmPassword('')
      setPassword('')
    } catch (response) {
      alertError(response.data.error)
    }
  }

  const handleVisiblePassword = (e) => {
    e.preventDefault()

    setVisiblePass(!visiblePass)
  }

  const handleVisibleConfirmPassword = (e) => {
    e.preventDefault()

    setVisibleConfirmPass(!visibleConfirmPass)
  }

  return (
    <>
      <AuthTemplate
        title={'Alteração de senha'}
        text={'Por favor, confirme sua nova senha!'}
      >
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="8">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  {visibleAlert === true && (
                    <div className="text-center">
                      <p className="alert-success">
                        Senha alterada com sucesso, redirecionando para a tela
                        de login ...
                      </p>
                    </div>
                  )}
                  <Form role="form">
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
                          type={visiblePass === true ? 'text' : 'password'}
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value)
                          }}
                        />
                        <InputGroupAddon>
                          <InputGroupText>
                            {visiblePass === false ? (
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
                          placeholder="Confirmar senha"
                          type={
                            visibleConfirmPass === true ? 'text' : 'password'
                          }
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value)
                          }}
                        />
                        <InputGroupAddon>
                          <InputGroupText>
                            {visibleConfirmPass === false ? (
                              <a
                                onClick={(e) => handleVisibleConfirmPassword(e)}
                              >
                                <i className="fa fa-eye"></i>
                              </a>
                            ) : (
                              <a
                                onClick={(e) => handleVisibleConfirmPassword(e)}
                              >
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
                        Confirmar
                      </Button>
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
