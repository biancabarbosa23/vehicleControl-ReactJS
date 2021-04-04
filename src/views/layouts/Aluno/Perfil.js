import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { cpfMask } from '../../../utils/Mask'
import { courses, periods, semesters } from '../../../utils/student.json'
import { logout } from '../../../services/auth'

import ExitToAppIcon from '@material-ui/icons/ExitToApp'

function DevForm({
  name,
  setName,
  email,
  setEmail,
  cpf,
  setCpf,
  course,
  setCourse,
  period,
  setPeriod,
  semester,
  setSemester,
  handleSubmit,
  edit,
  setEdit,
}) {
  const history = useHistory()
  const [messageExit, setMessageExit] = useState(false)
  const [messageEdit, setMessageEdit] = useState(false)

  const handleLogout = () => {
    logout()
    history.push('/aluno/login')
  }

  return (
    <aside className="perfil-student">
      <div className="header-perfil">
        <div className="button-exit">
          <ExitToAppIcon
            style={{
              fontSize: 30,
              transform: `rotate(180deg)`,
              cursor: 'pointer',
            }}
            onClick={() => handleLogout()}
            onMouseOver={() => setMessageExit(true)}
            onMouseOut={() => setMessageExit(false)}
          />
          {messageExit === true && <p>Sair</p>}
        </div>
        <strong>PERFIL</strong>
        <a
          onClick={() => setEdit(true)}
          onMouseOver={() => setMessageEdit(true)}
          onMouseOut={() => setMessageEdit(false)}
        >
          <i
            className="fa fa-pen "
            aria-hidden="true"
            style={{ fontSize: 20 }}
          ></i>
          {messageEdit === true && <p>Editar</p>}
        </a>
      </div>

      <form>
        <div className="input-block">
          <label htmlFor="name">Nome</label>
          <input
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={!edit}
          />
        </div>

        <div className="input-block">
          <label htmlFor="email">E-mail</label>
          <input
            name="email"
            id="emails"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={!edit}
          />
        </div>

        <div className="input-block">
          <label htmlFor="cpf">CPF</label>
          <input
            name="cpf"
            id="cpf"
            value={cpfMask(cpf)}
            onChange={(e) => setCpf(cpfMask(e.target.value))}
            required
            disabled={!edit}
          />
        </div>
        <div className="input-block">
          <label htmlFor="course">Curso</label>
          <select
            name="course"
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
            disabled={!edit}
          >
            {courses.map((course) => (
              <option key={course.key} value={course.value}>
                {course.value}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <div className="input-block">
            <label htmlFor="semester">Semestre</label>
            <select
              name="semester"
              id="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
              disabled={!edit}
            >
              {semesters.map((semester) => (
                <option key={semester.key} value={semester.value}>
                  {semester.value}
                </option>
              ))}
            </select>
          </div>
          <div className="input-block">
            <label htmlFor="period">Período</label>
            <select
              name="period"
              id="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              required
              disabled={!edit}
            >
              {periods.map((period) => (
                <option key={period.key} value={period.value}>
                  {period.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        {edit === true && (
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Salvar Alterações
          </button>
        )}
      </form>
    </aside>
  )
}

export default DevForm
