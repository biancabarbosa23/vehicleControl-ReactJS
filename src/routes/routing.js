import PageMain from '../views/pages/PageMain'
import LoginStudent from '../views/pages/Aluno/Login'
import RegisterStudent from '../views/pages/Aluno/Register'
import ForgotStudent from '../views/pages/Aluno/Forgot'
import ResetStudent from '../views/pages/Aluno/Reset'
import HomeStudent from '../views/pages/Aluno/Home'

import LoginGestor from '../views/pages/Gestor/Login'
import RegisterGestor from '../views/pages/Gestor/Register'
import ForgotGestor from '../views/pages/Gestor/Forgot'
import ResetGestor from '../views/pages/Gestor/Reset'

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
    {
      path: '/aluno/dashboard',
      component: HomeStudent,
    },
  ],
}

export default routing
