import PageMain from '../views/pages/PageMain'
import LoginStudent from '../views/pages/Aluno/login'
import RegisterStudent from '../views/pages/Aluno/Register'

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
  ],
}

export default routing
