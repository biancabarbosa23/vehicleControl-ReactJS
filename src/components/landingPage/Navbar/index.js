import React, { useState } from 'react'
import $ from 'jquery'

export default function Navbar() {
  const [visibleNavigation, setVisibleNavigation] = useState(false)
  const scrollTo = (id) => {
    const element = document.getElementById(id)
    element.scrollIntoView({
      behavior: 'smooth',
    })
    setVisibleNavigation(false)
  }

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.navigation').css('background', '#8b0000 ')
      $('.navigation').css('opacity', '0.65')
    } else {
      $('.navigation').css('background', 'none')
      $('.navigation').css('opacity', '1')
    }
  })

  const handleOpenMenu = () => {
    setVisibleNavigation(!visibleNavigation)
  }

  return (
    <div
      className={
        visibleNavigation === false
          ? 'page-wrapper'
          : 'page-wrapper show-navigation'
      }
      id="page-top"
    >
      <nav className="navigation background-is-dark">
        <div className="container">
          <div className="wrapper">
            <div className="left">
              <a href="index-v1.html" className="brand">
                <img src="./assets/img/icons/fatec-logo_site.png" alt="" />
              </a>
            </div>
            {/* <!--end left--> */}
            <div className="right">
              <ul className="nav navigation-links animate">
                <li>
                  <a onClick={() => scrollTo('page-top')} className="scroll">
                    Home
                  </a>
                </li>
                <li>
                  <a onClick={() => scrollTo('page-top')} className="scroll">
                    About
                  </a>
                </li>
                <li>
                  <a onClick={() => scrollTo('about')} className="scroll">
                    Gallery
                  </a>
                </li>
                <li>
                  <a onClick={() => scrollTo('page-top')} className="scroll">
                    Pricing
                  </a>
                </li>
                <li>
                  <a onClick={() => scrollTo('page-top')} className="scroll">
                    Contact
                  </a>
                </li>
              </ul>
              <div className="nav-btn" onClick={() => handleOpenMenu()}>
                <figure></figure>
                <figure></figure>
                <figure></figure>
              </div>
            </div>
            {/* <!--end right--> */}
          </div>
        </div>
        {/* <!--end container--> */}
      </nav>
    </div>
  )
}
