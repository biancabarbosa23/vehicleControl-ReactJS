import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import routing from './routing'
import GlobalStyles from '../views/assets/globalStyle'

import { StudentRoute, EmployeeRoute, AdminRoute } from './types'
import Dashboard from '../views/layouts/Dashboard'

export default function Routes() {
  return (
    <Suspense fallback={null}>
      <GlobalStyles />
      <Router>
        <Switch>
          {routing.public.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact
              component={route.component}
            />
          ))}
          {routing.student.map((route, index) => (
            <StudentRoute
              key={index}
              path={route.path}
              exact
              component={route.component}
            />
          ))}
          {routing.employee.map((route, index) => (
            <EmployeeRoute
              key={index}
              path={route.path}
              exact
              component={route.component}
            />
          ))}
          <AdminRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </Suspense>
  )
}
