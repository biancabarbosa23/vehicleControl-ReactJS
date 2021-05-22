import PageMain from '../views/pages/PageMain'
import LoginStudent from '../views/pages/Student/Login'
import RegisterStudent from '../views/pages/Student/Register'
import ForgotStudent from '../views/pages/Student/Forgot'
import ResetStudent from '../views/pages/Student/Reset'
import HomeStudent from '../views/pages/Student/Home'

import LoginGestor from '../views/pages/Employee/Login'
import RegisterGestor from '../views/pages/Employee/Register'
import ForgotGestor from '../views/pages/Employee/Forgot'
import ResetGestor from '../views/pages/Employee/Reset'
import HomeEmployee from '../views/pages/Employee/Home'

const routing = {
  public: [
    {
      path: '/',
      component: PageMain,
    },
    {
      path: '/aluno/login',
      component: LoginStudent,
    },
    {
      path: '/aluno/cadastro',
      component: RegisterStudent,
    },
    {
      path: '/aluno/forgot',
      component: ForgotStudent,
    },
    {
      path: '/aluno/reset/:token',
      component: ResetStudent,
    },
    {
      path: '/gestor/login',
      component: LoginGestor,
    },
    {
      path: '/gestor/cadastro',
      component: RegisterGestor,
    },
    {
      path: '/gestor/forgot',
      component: ForgotGestor,
    },
    {
      path: '/gestor/reset/:token',
      component: ResetGestor,
    },
  ],
  student: [
    {
      path: '/aluno/dashboard',
      component: HomeStudent,
    },
  ],
  employee: [
    {
      path: '/gestor/dashboard',
      component: HomeEmployee,
    },
  ],
}

export default routing
