import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { alertError, alertInfo, alertSuccess } from '../../../utils/Alert'
import { courses, periods, semesters } from '../../../utils/student.json'
import { cpfMask } from '../../../utils/Mask'
import api from '../../../services/api'
import { login } from '../../../services/auth'

import IuPassword from '../../../components/InputPassword'

export default function Login() {
  const history = useHistory()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [course, setCourse] = useState('')
  const [period, setPeriod] = useState('')
  const [semester, setSemester] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (
        name === '' ||
        email === '' ||
        password === '' ||
        cpf === '' ||
        course === '' ||
        period === '' ||
        semester === ''
      ) {
        alertInfo('Por favor preencha todos os campos!')
        return
      }

      const response = await api.post('/student/register', {
        nome: name,
        email,
        senha: password,
        cpf: cpf.replace(/[^0-9s]/g, ''),
        curso: course,
        periodo: period,
        semestre: semester,
      })

      login(response.data.token, response.data.user)

      alertSuccess(`Usuário cadastrado com sucesso`)

      setName('')
      setEmail('')
      setCpf('')
      setCourse('')
      setPeriod('')
      setSemester('')
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
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                >
                  <option value="">Selecione um curso ...</option>
                  {courses.map((course) => (
                    <option key={course.key} value={course.value}>
                      {course.value}
                    </option>
                  ))}
                </select>
                <select
                  className="form-control"
                  type="text"
                  name="periodo"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  required
                >
                  <option value="">Selecione um periodo ...</option>
                  {periods.map((period) => (
                    <option key={period.key} value={period.value}>
                      {period.value}
                    </option>
                  ))}
                </select>
                <select
                  className="form-control"
                  type="text"
                  name="semestre"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                >
                  <option value="">Selecione um semestre ...</option>
                  {semesters.map((semester) => (
                    <option key={semester.key} value={semester.value}>
                      {semester.value}
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
