import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { alertError, alertInfo, alertSuccess } from '../../../utils/Alert'
import api from '../../../services/api'
import { login } from '../../../services/auth'

import IuPassword from '../../../components/InputPassword'

export default function Login() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (email === '' || password === '') {
        alertInfo('Por favor preencha todos os campos!')
        return
      }

      const response = await api.post('/user/login', {
        email,
        senha: password,
        type: 'aluno',
      })

      login(response.data.token, response.data.user, '1')

      history.push('/aluno/dashboard')

      setEmail('')
      setPassword('')
    } catch (response) {
      alertError(response.data.error)
    }
  }

  return (
    <div className="form-body page-auth">
      <div className="row">
        <div className="img-holder">
          <div className="bg"></div>
          <div className="info-holder"></div>
        </div>
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <h3>Área do Aluno</h3>
              <p>
                Cadastre seu veículo para poder utilizar o estacionamento da
                nossa instituição.
              </p>
              <div className="page-links">
                <a className="active">Login</a>
                <a onClick={() => history.push('/aluno/cadastro')}>Cadastro</a>
              </div>
              <form>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="E-mail: "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <IuPassword
                  value={password}
                  setValue={setPassword}
                  placeHolder="Senha:"
                />

                <div className="form-button">
                  <button
                    id="submit"
                    className="ibtn"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Login
                  </button>{' '}
                  <a onClick={() => history.push('/aluno/forgot')}>
                    Esqueceu sua senha?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
