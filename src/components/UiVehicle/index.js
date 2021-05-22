import React, { useState, useEffect } from 'react'

import { types } from '../../utils/vehicle.json'

export default function UiVehicle({
  index,
  vehicle,
  handleSubmit,
  handleChangeData,
  handleRemove,
  handleDelete,
  handleCancel,
}) {
  const [oldData, setOldData] = useState({})
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    setOldData(vehicle)
  }, [])

  return (
    <aside className="vehicle">
      <div className="header-vehicle">
        {vehicle?.id && (
          <a>
            <i
              className="fa fa-pen "
              aria-hidden="true"
              onClick={() => setEdit(true)}
              style={{ fontSize: 20, color: '#000' }}
            ></i>
          </a>
        )}
        <a>
          <i
            className="fa fa-trash "
            aria-hidden="true"
            style={{ fontSize: 20, color: 'red' }}
            onClick={() => {
              vehicle?.id ? handleDelete(index) : handleRemove(index)
            }}
          ></i>
        </a>
      </div>

      <form>
        <div className="input-group">
          <div className="input-block">
            <label htmlFor="plate">Placa</label>
            <input
              name="plate"
              id={`plate${index}`}
              disabled={!vehicle?.id || edit === true ? false : true}
              maxLength={7}
              value={vehicle.plate}
              onChange={(e) => {
                handleChangeData(index, e)
              }}
            />
          </div>

          <div className="input-block">
            <label htmlFor="brand">Marca</label>
            <input
              name="brand"
              id={`brand${index}`}
              disabled={!vehicle?.id || edit === true ? false : true}
              value={vehicle.brand}
              onChange={(e) => {
                handleChangeData(index, e)
              }}
            />
          </div>
        </div>
        <div className="input-group">
          <div className="input-block">
            <label htmlFor="color">Cor</label>
            <input
              name="color"
              id={`color${index}`}
              disabled={!vehicle?.id || edit === true ? false : true}
              value={vehicle.color}
              onChange={(e) => {
                handleChangeData(index, e)
              }}
            />
          </div>

          <div className="input-block">
            <label htmlFor="type">Tipo</label>
            <select
              name="type"
              id={`type${index}`}
              disabled={!vehicle?.id || edit === true ? false : true}
              onChange={(e) => {
                handleChangeData(index, e)
              }}
              value={vehicle.type}
            >
              {types.map((type) => (
                <option key={type.key} value={type.value}>
                  {type.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-block">
          <label htmlFor="model">Modelo/Ano</label>
          <input
            name="model"
            id={`model${index}`}
            disabled={!vehicle?.id || edit === true ? false : true}
            onChange={(e) => {
              handleChangeData(index, e)
            }}
            value={vehicle.model}
          />
        </div>
        {edit === true || !vehicle?.id ? (
          <div className="div-button">
            <button
              type="submit"
              onClick={(e) => setEdit(handleSubmit(index, e, edit))}
            >
              Salvar
            </button>
            {vehicle?.id && (
              <a onClick={() => setEdit(handleCancel(index, oldData))}>
                Cancelar
              </a>
            )}
          </div>
        ) : null}
      </form>
    </aside>
  )
}
