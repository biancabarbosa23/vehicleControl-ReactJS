import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import $ from 'jquery'

import IuPassword from '../../../components/InputPassword'

import { alertError, alertInfo } from '../../../utils/Alert'
import api from '../../../services/api'

export default function Reset() {
  const history = useHistory()
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (password === '' || confirmPassword === '') {
        alertInfo('Por favor preencha todos os campos!')
        return
      }

      if (password !== confirmPassword) {
        alertInfo('Confirmação de senha incorreta!')
        return
      }

      const response = await api.post('/user/reset-password', {
        token,
        senha: password,
        confirmarSenha: confirmPassword,
        type: 'gestor',
      })

      if (response.data.success) {
        $('.form-items', '.form-content').addClass('hide-it')
        $('.form-sent', '.form-content').addClass('show-it')

        setTimeout(function () {
          history.push('/gestor/login')
        }, 5000)
      }
    } catch (response) {
      alertError(response.data.error)
    }
  }

  return (
    <div className="form-body page-auth-2">
      <div className="website-logo">
        <a href="">
          <div className="logo">
            <img
              className="logo-size"
              src="../assets/images/logo2.png"
              alt=""
            />
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
              <h3>Resetar Senha</h3>
              <p>Digite a nova senha desejada, e depois confirme-a.</p>
              <form>
                <IuPassword
                  value={password}
                  setValue={setPassword}
                  placeHolder="Senha:"
                />
                <IuPassword
                  value={confirmPassword}
                  setValue={setConfirmPassword}
                  placeHolder="Confirmar senha:"
                />
                <div className="form-button ">
                  <button
                    id="submit"
                    className="ibtn btn-forget"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
            <div className="form-sent">
              <div className="tick-holder">
                <div className="tick-icon"></div>
              </div>
              <h3>Senha Alterada</h3>
              <p>Redirecionando para o login...</p>
              <div className="info-holder"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
