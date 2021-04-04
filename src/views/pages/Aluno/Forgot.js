import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import $ from 'jquery'

import Timer from '../../../components/Timer'

import { alertError, alertInfo, alertSuccess } from '../../../utils/Alert'
import api from '../../../services/api'

export default function Forgot() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [disable, setDisable] = useState(false)
  const [resendDisable, setResendDisable] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setDisable(true)

      if (email === '') {
        alertInfo('Por favor preencha o E-mail!')
        setDisable(false)
        return
      }
      const response = await api.post('/user/forgot-password', {
        email,
        type: 'aluno',
      })

      if (response.data.success) {
        $('.form-items', '.form-content').addClass('hide-it')
        $('.form-sent', '.form-content').addClass('show-it')
      }
    } catch (response) {
      alertError(response.data.error)
      setDisable(false)
    }
  }

  const handleResendSubmit = async (e) => {
    e.preventDefault()
    try {
      setResendDisable(true)

      if (email === '') {
        alertInfo('Não há e-mail informado')
        setResendDisable(false)
        setTimeout(() => window.location.reload(), 5000)
        return
      }
      const response = await api.post('/user/forgot-password', {
        email,
        type: 'aluno',
      })
    } catch (response) {
      alertError(response.data.error)
      setDisable(false)
    }
  }

  return (
    <div className="form-body">
      <div className="row">
        <div className="img-holder">
          <div className="bg"></div>
          <div className="info-holder"></div>
        </div>
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <h3>Resetar Senha</h3>
              <p>
                Para redefinir sua senha, digite o endereço de E-mail que você
                usa para fazer login.
              </p>
              <form>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  placeholder="E-mail:"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="form-button ">
                  <button
                    id="submit"
                    className="ibtn btn-forget"
                    onClick={(e) => handleSubmit(e)}
                    disabled={disable}
                  >
                    Enviar link
                  </button>
                  <a onClick={() => history.push('/aluno/login')}>voltar</a>
                </div>
              </form>
            </div>
            <div className="form-sent">
              <div className="tick-holder">
                <div className="tick-icon"></div>
              </div>
              <h3>Link para resetar senha enviado</h3>
              <p>Verifique sua caixa de entrada {email}</p>
              <div className="info-holder"></div>
              <div className="form-button mt-0">
                <button
                  id="submit"
                  className="ibtn btn-forget"
                  style={{ marginBottom: 10 }}
                  onClick={(e) => handleResendSubmit(e)}
                  disabled={resendDisable}
                >
                  Reenviar link
                </button>
                {resendDisable === true && (
                  <Timer
                    initialMinute={0}
                    initialSeconds={45}
                    setDisable={setResendDisable}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
