import React from 'react'
import { useHistory } from 'react-router-dom'

import Navbar from '../Navbar'

export default function Header() {
  const history = useHistory()

  const handleNextPage = (e, page) => {
    e.preventDefault()

    history.push(page)
  }

  return (
    <header
      style={{ backgroundColor: 'black', width: '100%', height: '120vh' }}
    >
      <Navbar />
      <section className="section welcome-area bg-overlay overflow-hidden d-flex align-items-center">
        <div className="hero-section">
          <div className="wrapper">
            <div className="container">
              <div className="hero-content text-center">
                <h1>Controle e Segurança de veículos na Instituição</h1>
                <p>
                  {' '}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  consectetur viverra dapibus. Aliquam ac justo laoreet,
                  malesuada magna sed, pretium erat. Curabitur accumsan leo
                  odio, a ultrices nibh varius eu.
                </p>
                <div className="hero-button">
                  <button onClick={(e) => handleNextPage(e, '/aluno/login')}>
                    Aluno
                  </button>

                  <button
                    onClick={(e) => handleNextPage(e, '/funcionario/login')}
                  >
                    Funcionário
                  </button>
                </div>
                <span>
                  {' '}
                  * Escolha um perfil acima para cadastrar seu veículo
                </span>
              </div>
            </div>
          </div>
          <div class="shape-bottom">
            <svg
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 100"
              preserveAspectRatio="none"
            >
              <path class="fill" d="M0,6V0h1000v100L0,6z"></path>
            </svg>
          </div>
        </div>
      </section>
    </header>
  )
}
