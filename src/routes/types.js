import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated, getAccess } from '../services/auth'

import AccessDenied from '../views/pages/PageError/AccessDenied'

export const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() && getAccess() === '999' ? (
        <Component {...props} />
      ) : isAuthenticated() && getAccess() !== '999' ? (
        <>
          <AccessDenied />
        </>
      ) : (
        <Redirect to={{ pathname: '/admin/login' }} />
      )
    }
  />
)

export const StudentRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() && getAccess() === '1' ? (
        <Component {...props} />
      ) : isAuthenticated() && getAccess() !== '1' ? (
        <>
          <AccessDenied />
        </>
      ) : (
        <Redirect to={{ pathname: '/aluno/login' }} />
      )
    }
  />
)

export const EmployeeRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() && getAccess() === '2' ? (
        <Component {...props} />
      ) : isAuthenticated() && getAccess() !== '2' ? (
        <>
          <AccessDenied />
        </>
      ) : (
        <Redirect to={{ pathname: '/gestor/login' }} />
      )
    }
  />
)
