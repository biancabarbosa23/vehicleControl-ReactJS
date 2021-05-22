import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Perfil from '../../layouts/Student/Perfil'

import { alertError, alertInfo, alertSuccess } from '../../../utils/Alert'
import { validateCPF, validateEmail } from '../../../utils/validator'
import api from '../../../services/api'
import { getUser, logout } from '../../../services/auth'
import Navbar from '../../../components/NavBarProfile'
import Vehicle from '../../layouts/Vehicle'

export default function Home() {
  const history = useHistory()
  const [vehicles, setVehicles] = useState([])
  const [student, setStudent] = useState({})
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    handleChangeData()
  }, [])

  const handleLogout = () => {
    logout()
    history.push('/aluno/login')
  }

  const handleChangeData = async () => {
    try {
      const user = getUser()

      const response = await api.get(`/student/${user.id}`)

      setStudent({
        name: response.data.student?.nome,
        email: response.data.student?.email,
        cpf: response.data.student?.cpf,
        course: response.data.student?.curso,
        period: response.data.student?.periodo,
        semester: response.data.student?.semestre,
      })

      const responseVehicle = await api.get(`/vehicles/${user.id}`)

      setVehicles(responseVehicle.data)
    } catch (response) {
      console.log(response)
      alertError(response.data.error)
    }
  }

  const handleSubmitPerfil = async (e) => {
    e.preventDefault()
    try {
      if (
        student.name === '' ||
        student.email === '' ||
        student.cpf === '' ||
        student.course === '' ||
        student.period === '' ||
        student.semester === ''
      ) {
        alertInfo('Por favor preencha todos os campos!')
        return
      }

      if (validateEmail(student.email) === false) {
        alertInfo('Por favor digite um E-mail valido!')
        return
      }

      if (validateCPF(student.cpf) === false) {
        alertInfo('Por favor digite um CPF valido!')
        return
      }

      const user = getUser()

      const response = await api.put(`/student/${user.id}`, {
        nome: student.name,
        email: student.email,
        cpf: student.cpf.replace(/[^0-9s]/g, ''),
        curso: student.course,
        periodo: student.period,
        semestre: student.semester,
      })

      alertSuccess(response.data.success)
      setEdit(false)
    } catch (response) {
      alertError(response.data.error)
    }
  }

  return (
    <div className="page-perfil student">
      <Navbar handleLogout={handleLogout} />
      <div className="container" id="perfil">
        {student?.name && (
          <>
            <Perfil
              student={student}
              setStudent={setStudent}
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
