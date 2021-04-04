import React, { useState, useEffect } from 'react'

import Perfil from '../../layouts/Aluno/Perfil'

import { alertError, alertInfo, alertSuccess } from '../../../utils/Alert'
import api from '../../../services/api'
import { getUser } from '../../../services/auth'

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [course, setCourse] = useState('')
  const [period, setPeriod] = useState('')
  const [semester, setSemester] = useState('')
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    handleChangeData()
  }, [])

  const handleChangeData = async () => {
    try {
      const user = getUser()

      const response = await api.get(`/student/${user.id}`)

      setName(response.data.student.nome)
      setEmail(response.data.student.email)
      setCpf(response.data.student.cpf)
      setCourse(response.data.student.curso)
      setPeriod(response.data.student.periodo)
      setSemester(response.data.student.semestre)
    } catch (response) {
      alertError(response.data.error)
    }
  }

  const handleSubmitPerfil = async (e) => {
    e.preventDefault()
    try {
      if (
        name === '' ||
        email === '' ||
        cpf === '' ||
        course === '' ||
        period === '' ||
        semester === ''
      ) {
        alertInfo('Por favor preencha todos os campos!')
        return
      }

      const user = getUser()

      const response = await api.put(`/student/${user.id}`, {
        nome: name,
        email,
        cpf: cpf.replace(/[^0-9s]/g, ''),
        curso: course,
        periodo: period,
        semestre: semester,
      })

      alertSuccess(response.data.success)
      setEdit(false)
    } catch (response) {
      alertError(response.data.error)
    }
  }

  return (
    <div className="page-perfil">
      <div className="container" id="perfil">
        <Perfil
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          cpf={cpf}
          setCpf={setCpf}
          course={course}
          setCourse={setCourse}
          period={period}
          setPeriod={setPeriod}
          semester={semester}
          setSemester={setSemester}
          edit={edit}
          setEdit={setEdit}
          handleSubmit={handleSubmitPerfil}
        />
      </div>
    </div>
  )
}
