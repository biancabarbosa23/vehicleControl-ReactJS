import React, { useState, useEffect } from 'react'

import { cpfMask } from '../../../utils/Mask'
import { courses, periods, semesters } from '../../../utils/student.json'

function DevForm({ student, setStudent, handleSubmit, edit, setEdit }) {
  const [messageEdit, setMessageEdit] = useState(false)
  const [oldData, setOldData] = useState({})

  useEffect(() => {
    setOldData(student)
  }, [])

  const handleChangeValue = async (e) => {
    const name = e.target.name
    let value

    name === 'cpf'
      ? (value = cpfMask(e.target.value))
      : (value = e.target.value)

    await setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleCancel = () => {
    setEdit(false)
    setStudent(oldData)
  }

  return (
    <aside className="perfil-student">
      <div className="header-perfil">
        <strong>{student.name}</strong>
        <a
          onClick={() => setEdit(true)}
          onMouseOver={() => setMessageEdit(true)}
          onMouseOut={() => setMessageEdit(false)}
        >
          <i
            className="fa fa-pen "
            aria-hidden="true"
            style={{ fontSize: 20, color: '#000' }}
          ></i>
          {messageEdit === true && <p>Editar</p>}
        </a>
      </div>

      <form>
        {edit && (
          <div className="input-block">
            <label htmlFor="name">Nome</label>
            <input
              name="name"
              id="name"
              value={student?.name}
              onChange={(e) => handleChangeValue(e)}
              required
              disabled={!edit}
            />
          </div>
        )}
        <div className="input-block">
          <label htmlFor="email">E-mail</label>
          <input
            name="email"
            id="emails"
            value={student?.email}
            onChange={(e) => handleChangeValue(e)}
            required
            disabled={!edit}
          />
        </div>

        <div className="input-block">
          <label htmlFor="cpf">CPF</label>
          <input
            name="cpf"
            id="cpf"
            value={student?.cpf && cpfMask(student.cpf)}
            onChange={(e) => handleChangeValue(e)}
            required
            disabled={!edit}
          />
        </div>
        <div className="input-block">
          <label htmlFor="course">Curso</label>
          <select
            name="course"
            id="course"
            value={student?.course}
            onChange={(e) => handleChangeValue(e)}
            required
            disabled={!edit}
          >
            {courses.map((course) => (
              <option key={course?.key} value={course.value}>
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
              value={student?.semester}
              onChange={(e) => handleChangeValue(e)}
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
              value={student?.period}
              onChange={(e) => handleChangeValue(e)}
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
          <div className="div-button">
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Salvar Alterações
            </button>
            <a onClick={() => handleCancel()}>Cancelar</a>
          </div>
        )}
      </form>
    </aside>
  )
}

export default DevForm
