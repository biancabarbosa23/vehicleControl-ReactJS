import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router-dom'

import { logout } from '../../services/auth'

const TheHeaderDropdown = () => {
  const history = useHistory()

  const handleLogout = (e) => {
    e.preventDefault()

    logout()
    history.replace('/admin/login')
  }

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Administrador</strong>
        </CDropdownItem>
        <CDropdownItem onClick={(e) => handleLogout(e)}>
          <i
            className="fa fa-times"
            aria-hidden="true"
            style={{ marginRight: 10 }}
          ></i>
          Sair
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
