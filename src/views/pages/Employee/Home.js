import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Perfil from '../../layouts/Employee/Perfil'

import { alertError, alertInfo, alertSuccess } from '../../../utils/Alert'
import { validateCPF, validateEmail } from '../../../utils/validator'
import api from '../../../services/api'
import { getUser, logout } from '../../../services/auth'
import Navbar from '../../../components/NavBarProfile'
import Vehicle from '../../layouts/Vehicle'

export default function Home() {
  const history = useHistory()
  const [vehicles, setVehicles] = useState([])
  const [employee, setEmployee] = useState({})
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    handleChangeData()
  }, [])

  const handleLogout = () => {
    logout()
    history.push('/gestor/login')
  }

  const handleChangeData = async () => {
    try {
      const user = getUser()

      const response = await api.get(`/employee/${user.id}`)

      setEmployee({
        name: response.data.employee.nome,
        email: response.data.employee.email,
        cpf: response.data.employee.cpf,
        function: response.data.employee.funcao,
      })

      const responseVehicle = await api.get(`/vehicles/${user.id}`)

      setVehicles(responseVehicle.data)
    } catch (response) {
      alertError(response.data.error)
    }
  }

  const handleSubmitPerfil = async (e) => {
    e.preventDefault()
    try {
      if (
        employee.name === '' ||
        employee.email === '' ||
        employee.cpf === '' ||
        employee.function === ''
      ) {
        alertInfo('Por favor preencha todos os campos!')
        return
      }

      if (validateEmail(employee.email) === false) {
        alertInfo('Por favor digite um E-mail valido!')
        return
      }

      if (validateCPF(employee.cpf) === false) {
        alertInfo('Por favor digite um CPF valido!')
        return
      }

      const user = getUser()

      const response = await api.put(`/employee/${user.id}`, {
        nome: employee.name,
        email: employee.email,
        cpf: employee.cpf.replace(/[^0-9s]/g, ''),
        funcao: employee.function,
      })

      alertSuccess(response.data.success)
      setEdit(false)
    } catch (response) {
      alertError(response.data.error)
    }
  }

  return (
    <div className="page-perfil employee">
      <Navbar handleLogout={handleLogout} />
      <div className="container" id="perfil">
        {employee?.name && (
          <>
            <Perfil
              employee={employee}
              setEmployee={setEmployee}
              edit={edit}
              setEdit={setEdit}
              handleSubmit={handleSubmitPerfil}
            />
            <Vehicle vehicles={vehicles} setVehicles={setVehicles} />
          </>
        )}
      </div>
    </div>
  )
}
