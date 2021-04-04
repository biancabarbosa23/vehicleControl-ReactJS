import React, { useState, useEffect } from 'react'

import { cpfMask } from '../../../utils/Mask'

function DevForm() {
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [course, setCourse] = useState('')
  const [period, setPeriod] = useState('')
  const [semester, setSemester] = useState('')

  return (
    <aside className="perfil-student">
      <div className="header-perfil">
        <strong>PERFIL</strong>
        <a onClick={() => setEdit(true)}>
          <i class="fa fa-pen yarn start" aria-hidden="true"></i>
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
            value={cpf}
            onChange={(e) => setCpf(cpfMask(e.target.value))}
            required
            disabled={!edit}
          />
        </div>
        <div className="input-block">
          <label htmlFor="course">Curso</label>
          <input
            name="course"
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
            disabled={!edit}
          />
        </div>
        <div className="input-group">
          <div className="input-block">
            <label htmlFor="semester">Semestre</label>
            <input
              name="semester"
              id="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
              disabled={!edit}
            />
          </div>
          <div className="input-block">
            <label htmlFor="period">Período</label>
            <input
              name="period"
              id="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              required
              disabled={!edit}
            />
          </div>
        </div>
        {edit === true && <button type="submit">Salvar Alterações</button>}
      </form>
    </aside>
  )
}

export default DevForm
