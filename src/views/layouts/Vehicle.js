import React from 'react'
import UiVehicle from '../../components/UiVehicle'
import Swal from 'sweetalert2'

import { infos } from '../../utils/vehicle.json'
import { getUser } from '../../services/auth'
import api from '../../services/api'
import { alertInfo, alertError, alertSuccess } from '../../utils/Alert'

export default function Vehicle({ vehicles, setVehicles }) {
  const handleAddVehicle = () => {
    const size = vehicles.length
    let total = 0
    let valueNull = 0

    if (size != 0) {
      for (var [key, value] of Object.entries(vehicles[size - 1])) {
        total++
        if (value == '') valueNull++
      }

      if (total == valueNull) {
        alertInfo('Já existe um formulário em branco ')
        return
      }

      if (!vehicles[size - 1]?.id) {
        alertInfo('Salve o ultimo formulário para cadastrar novos veículos')
        return
      }
    }

    setVehicles([...vehicles, infos])
  }

  const handleChangeData = (index, e) => {
    const { name } = e.target
    const { value } = e.target

    vehicles[index] = {
      ...vehicles[index],
      [name]: name === 'plate' ? value.toUpperCase() : value,
    }

    setVehicles([...vehicles])
  }

  const handleSubmit = async (index, e, edit) => {
    try {
      e.preventDefault()

      for (var [key, value] of Object.entries(vehicles[index])) {
        if (value === '') {
          alertInfo('Preencha todos os campos')
          return
        }
      }

      let regex = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}'
      if (!vehicles[index].plate.match(regex)) {
        alertInfo('Placa Inválida!')
        return
      }

      const user = await getUser()

      const data = {
        placa: vehicles[index].plate,
        marca: vehicles[index].brand,
        cor: vehicles[index].color,
        modelo: vehicles[index].model,
        tipo: vehicles[index].type,
      }

      let response

      if (edit) {
        response = await api.put(`/vehicle/${vehicles[index].id}`, data)
      } else {
        response = await api.post(`/vehicle/${user.id}`, data)

        vehicles[index] = {
          ...vehicles[index],
          id: response.data.idVehicle,
        }

        setVehicles([...vehicles])
      }

      alertSuccess(response.data.success)
      return false
    } catch (response) {
      alertError(response.data.error)
    }
  }

  const handleCancel = (index, data) => {
    vehicles[index] = data

    setVehicles([...vehicles])

    return false
  }

  const handleDelete = (index) => {
    Swal.fire({
      text: `Ter certeza que deseja excluir o veículo ${vehicles[index].plate}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/vehicle/${vehicles[index].id}`).then(
          (response) => {
            alertSuccess(response.data.success)
            handleRemove(index)
          },
          (response) => alertError(response.data.error)
        )
      }
    })
  }

  const handleRemove = (position) => {
    setVehicles([...vehicles.filter((_, index) => index !== position)])
  }

  return (
    <main>
      <div className="header">
        <div id="horizontal-line"></div>
        <p onClick={() => handleAddVehicle()}>Adicionar novo veiculo</p>
        <div id="horizontal-line"></div>
      </div>
      {vehicles.length === 0 && (
        <p className="message">Não há veículos cadastrados</p>
      )}
      {vehicles.map((vehicle, index) => (
        <UiVehicle
          index={index}
          vehicle={vehicle}
          handleChangeData={handleChangeData}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          handleRemove={handleRemove}
          handleCancel={handleCancel}
        />
      ))}
    </main>
  )
}
