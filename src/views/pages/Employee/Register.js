import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { alertError, alertInfo, alertSuccess } from '../../../utils/Alert'
import { cpfMask } from '../../../utils/Mask'
import { validateCPF, validateEmail } from '../../../utils/validator'
import { occupations } from '../../../utils/employee.json'
import api from '../../../services/api'
import { login } from '../../../services/auth'

import IuPassword from '../../../components/InputPassword'

export default function Login() {
  const history = useHistory()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [occupation, setOccupation] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (
        name === '' ||
        email === '' ||
        password === '' ||
        cpf === '' ||
        occupation === ''
      ) {
        alertInfo('Por favor preencha todos os campos!')
        return
      }

      if (validateEmail(email) === false) {
        alertInfo('Por favor digite um E-mail valido!')
        return
      }

      if (validateCPF(cpf) === false) {
        alertInfo('Por favor digite um CPF valido!')
        return
      }

      const response = await api.post('/employee', {
        nome: name,
        email,
        senha: password,
        cpf: cpf.replace(/[^0-9s]/g, ''),
        funcao: occupation,
      })

      login(response.data.token, response.data.user, '2')

      history.push('/gestor/dashboard')

      setName('')
      setEmail('')
      setCpf('')
      setOccupation('')
      setPassword('')
    } catch (response) {
      alertError(response.data.error)
    }
  }

  return (
    <div className="form-body page-auth-2">
      <div className="row">
        <div className="img-holder">
          <div className="bg"></div>
          <div className="info-holder"></div>
        </div>
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <h3>Cadastro de Funcionário</h3>
              <p>
                Cadastre seu veículo para poder utilizar o estacionamento da
                nossa instituição.
              </p>
              <div className="page-links">
                <a onClick={() => history.push('/gestor/login')}>Login</a>
                <a className="active">Cadastro</a>
              </div>
              <form>
                <input
                  className="form-control"
                  type="nome"
                  name="nome"
                  placeholder="Nome: "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
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
                  value={cpf}
                  onChange={(e) => setCpf(cpfMask(e.target.value))}
                  required
                />
                <select
                  className="form-control"
                  type="text"
                  name="curso"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  required
                >
                  <option value="">Selecione uma função ...</option>
                  {occupations.map((occupation) => (
                    <option key={occupation.key} value={occupation.value}>
                      {occupation.value}
                    </option>
                  ))}
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
                    Cadastrar
                  </button>{' '}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
