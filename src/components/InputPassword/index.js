import React, { useState } from 'react'

export default function Password({ value, setValue, placeHolder }) {
  const [visible, setVisible] = useState(false)

  const handleVisiblePassword = (e) => {
    e.preventDefault()

    setVisible(!visible)
  }

  return (
    <div className="submit-line">
      <input
        className="form-control"
        type={visible === true ? 'text' : 'password'}
        name="password"
        placeholder={placeHolder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      {visible === false ? (
        <a className="submit-lente" onClick={(e) => handleVisiblePassword(e)}>
          <i className="fa fa-eye"></i>
        </a>
      ) : (
        <a className="submit-lente" onClick={(e) => handleVisiblePassword(e)}>
          <i className="fa fa-eye-slash"></i>
        </a>
      )}
    </div>
  )
}
