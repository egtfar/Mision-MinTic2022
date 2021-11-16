import { faClipboardList, faFileInvoiceDollar, faHome, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import '../App.css'
import { AuthContext } from '../context/AuthProvider.jsx'

export const Sidebar = () => {

  const { stateUser } = useContext(AuthContext);

  return (
    <div className="Sidebar text-white">
      <nav className="">
        <div className="container d-flex flex-column  pt-4 ps-4">
          <FontAwesomeIcon color="white" size="2x" icon={faUser} />
          <small className="mt-2"><strong>Bienvenido</strong></small>
          <small className="mt-2 text-text-muted">
            {
              stateUser.user.email
            }
          </small>
          <small className="mt-2 text-text-muted text-capitalize">
            {
              stateUser.user.role
            }
          </small>
        </div>
        <div className="bg-success bg-opacity-75 mt-4 p-2 ps-4">Navegación</div>
        <ul className="SidebarList">
          <NavLink className="row-item d-flex p-2 align-items-center"
            activeClassName="row-active fw-bolder" to="/" exact
          >
            <FontAwesomeIcon
              color="white"
              size="1x"
              className="icon"
              icon={faHome} />
            <div className="title">Home</div>
          </NavLink>
          {
            stateUser.user.role === 'admin' &&
            <NavLink className="row-item d-flex p-2 align-items-center"
              activeClassName="row-active fw-bolder" to="/roles" exact
            >
              <FontAwesomeIcon
                color="white"
                size="1x"
                className="icon"
                icon={faUsers} />
              <div className="title">Roles</div>
            </NavLink>
          }
          <NavLink className="row-item d-flex p-2 align-items-center"
            activeClassName="row-active fw-bolder" to="/ventas" exact
          >
            <FontAwesomeIcon
              color="white"
              size="1x"
              className="icon"
              icon={faFileInvoiceDollar} />
            <div className="title">Ventas</div>
          </NavLink>
          <NavLink className="row-item d-flex p-2 align-items-center"
            activeClassName="row-active fw-bolder" to="/productos" exact
          >
            <FontAwesomeIcon
              color="white"
              size="1x"
              className="icon"
              icon={faClipboardList} />
            <div className="title">Productos</div>
          </NavLink>
        </ul>
      </nav>
    </div>
  )
}
