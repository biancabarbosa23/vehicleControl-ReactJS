import React, { useState, useEffect } from 'react'

import { cpfMask } from '../../../utils/Mask'
import { occupations } from '../../../utils/employee.json'

export default function Perfil({
  employee,
  setEmployee,
  handleSubmit,
  edit,
  setEdit,
}) {
  const [messageEdit, setMessageEdit] = useState(false)
  const [oldData, setOldData] = useState({})

  useEffect(() => {
    setOldData(employee)
  }, [])

  const handleChangeValue = async (e) => {
    const name = e.target.name
    let value

    name === 'cpf'
      ? (value = cpfMask(e.target.value))
      : (value = e.target.value)

    await setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleCancel = () => {
    setEdit(false)
    setEmployee(oldData)
  }

  return (
    <aside className="perfil-student">
      <div className="header-perfil">
        <strong>{employee.name}</strong>
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
              value={employee?.name}
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
            value={employee?.email}
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
            value={employee?.cpf && cpfMask(employee.cpf)}
            onChange={(e) => handleChangeValue(e)}
            required
            disabled={!edit}
          />
        </div>
        <div className="input-block">
          <label htmlFor="cpf">Função</label>
          <select
            name="function"
            id="function"
            value={employee?.function}
            onChange={(e) => handleChangeValue(e)}
            required
            disabled={!edit}
          >
            {occupations.map((occupation) => (
              <option key={occupation.key} value={occupation.value}>
                {occupation.value}
              </option>
            ))}
          </select>
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
