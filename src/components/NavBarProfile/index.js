import React from 'react'

export default function Navbar({ handleLogout }) {
  return (
    <div className="nav-bar-perfil">
      <nav className="navigation background-is-dark">
        <div className="container">
          <div className="wrapper">
            <div className="left">
              <a href="/" className="brand">
                <img src="../assets/img/icons/fatec_logo.png" alt="" />
              </a>
            </div>
            {/* <!--end left--> */}
            <div className="right">
              <ul className="nav  ">
                <li>
                  <a onClick={() => handleLogout()}>Sair</a>
                </li>
              </ul>
            </div>
            {/* <!--end right--> */}
          </div>
        </div>
        {/* <!--end container--> */}
      </nav>
    </div>
  )
}
