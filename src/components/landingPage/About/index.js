import React from 'react'

export default function About() {
  return (
    <section className="block section-about">
      <div className="container">
        <div className="row display-flex justify-center mb-4">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="section-heading text-center">
              <h2 className="black">
                Porque realizar o controle dos veiculos?
              </h2>
              <p className="d-none  mt-4 black">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laborum obcaecati dignissimos quae quo ad iste ipsum officiis
                deleniti asperiores sit.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="icon-box text-center p-4">
              <div className="featured-icon mb-3">
                <i class="fas fa-shield-alt fa-5x"></i>
              </div>
              <div className="icon-text">
                <h3 className="mb-2 black">Segurança</h3>
                <p className="black">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Veritatis culpa expedita dignissimos.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="icon-box text-center p-4">
              <div className="featured-icon mb-3">
                <i class="fas fa-fingerprint fa-5x"></i>
              </div>
              <div className="icon-text">
                <h3 className="mb-2 black">Identificação</h3>
                <p className="black">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Veritatis culpa expedita dignissimos.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="icon-box text-center p-4">
              <div className="featured-icon mb-3">
                <i class="fas fa-stopwatch fa-5x"></i>
              </div>
              <div className="icon-text">
                <h3 className="mb-2 black">Agilidade</h3>
                <p className="black">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Veritatis culpa expedita dignissimos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
