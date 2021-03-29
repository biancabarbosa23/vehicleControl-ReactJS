import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import routing from './routing'
import GlobalStyles from '../views/assets/globalStyle'

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
        </Switch>
      </Router>
    </Suspense>
  )
}
