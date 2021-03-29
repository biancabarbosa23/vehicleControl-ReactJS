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

      const response = await api.post('/aluno/login', {
        email,
        senha: password,
      })

      login(response.data.token, response.data.user)

      alertSuccess(`Usuário ${response.data.user.name} Logado com sucesso`)

      setEmail('')
      setPassword('')
    } catch (response) {
      alertError(response.data.error)
    }
  }

  return (
    <div className="form-body page-auth">
      <div className="website-logo">
        <a href="">
          <div className="logo">
            <img className="logo-size" src="../img/logo2.png" alt="" />
          </div>
        </a>
      </div>
      <div className="row">
        <div className="img-holder">
          <div className="bg"></div>
          <div className="info-holder"></div>
        </div>
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <h3>Cadastro de Aluno</h3>
              <p>
                Cadastre seu veículo para poder utilizar o estacionamento da
                nossa instituição.
              </p>
              <div className="page-links">
                <a onClick={() => history.push('/aluno/login')}>Login</a>
                <a className="active">Cadastro</a>
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
                <input
                  className="form-control"
                  type="cpf"
                  name="cpf"
                  placeholder="CPF: "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <select
                  className="form-control"
                  type="text"
                  name="curso"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                >
                  <option>Escolha um curso:</option>
                </select>
                <select
                  className="form-control"
                  type="text"
                  name="periodo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                >
                  <option>Escolha um período:</option>
                </select>
                <select
                  className="form-control"
                  type="text"
                  name="semestre"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                >
                  <option>Escolha um semestre:</option>
                </select>
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
                  <a onClick={() => history.push('/forgot')}>
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
