import React from 'react'

export const Home = () => {
  return (
    <div>
      <div className="contenido d-flex justify-content-center align-items-center flex-column">

        <img className="img-fluid"
          src="img/logo.jpeg" alt="logo" />

        <figure className="text-center display-6">
          <blockquote className="blockquote">
            <p className="display-4">TIENDA "DE TODO"</p>
          </blockquote>
          <figcaption className="blockquote-footer">
            donde encuentras lo que <cite title="Source Title">buscas</cite>
          </figcaption>
        </figure>


      </div>
    </div>
  )
}
