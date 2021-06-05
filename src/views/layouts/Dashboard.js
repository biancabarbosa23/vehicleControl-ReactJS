import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader,
} from '../../components/Dashboard'

import api from '../../services/api'
import { logout } from '../../services/auth'

const Dashboard = () => {
  const history = useHistory()

  useEffect(() => {
    handleAccess()
  }, [])

  const handleAccess = async () => {
    try {
      const response = await api.get('/admin/authenticated')
      if (response.data.message) {
        logout()
        history.push('/admin/login')
      }
    } catch (response) {
      return
    }
  }

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default Dashboard
