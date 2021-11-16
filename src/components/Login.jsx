import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { createUser, firebaseLogin, getDocument, saveDocument } from '../config/CustomHooks.jsx'
import { AuthContext } from '../context/AuthProvider.jsx'
import { collectionTypes } from '../types/databaseTypes.js'

export const Login = ({ match: { path } }) => {


  const { cerrarSession } = useContext(AuthContext)

  const history = useHistory();


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [usuarioCreado, setUsuarioCreado] = useState(false)

  const mapaErrores = {
    'auth/invalid-email': 'email invalido, por favor revisar',
    'auth/user-disabled': 'Usuario deshabilitado',
    'auth/user-not-found': 'email y/o password incorrecto',
    'auth/wrong-password': 'email y/o password incorrecto',
    'auth/too-many-requests': 'Demasiados intentos fallidos, intente más tarde',
  }


  const handleLogin = (e) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('Por favor ingresa email y password')
      return
    }

    if (password.length < 6) {
      setError('Password debe ser mayor a 6 caracteres')
      return
    }

    authfirebase(email, password)
  }

  const authfirebase = React.useCallback(async (email, password) => {
    try {
      const respuesta = await firebaseLogin(email, password)
      const user = await getDocument(collectionTypes.USERS, respuesta.id)

      if (user.role === "pendiente") {
        history.push('/login')
        setEmail('')
        setPassword('')
        setError('')
        setUsuarioCreado(true)
        return
      }
      history.push('/')
      setUsuarioCreado(false)
    } catch (error) {
      setError(mapaErrores[error.message])
    }
  }, [history])


  const handleCrearUsuario = (e) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('Por favor ingresa email y password')
      return
    }

    if (password.length < 6) {
      setError('Password debe ser mayor a 6 caracteres')
      return
    }
    crearUsuario(email, password)
    history.push('/login')
    setEmail('')
    setPassword('')
    setError('')
    setUsuarioCreado(false)
  }

  const crearUsuario = React.useCallback(async (email, password) => {
    try {
      const respuesta = await createUser(email, password)
      console.log(respuesta);
      const userCreated = await saveDocument(collectionTypes.USERS, respuesta, respuesta.id)
      console.log(userCreated);
      cerrarSession()
      setUsuarioCreado(true)
    } catch (error) {
      setError(mapaErrores[error.message])
    }
  }, [setError, cerrarSession])



  return (
    <div>

      <div className="contenido d-flex justify-content-center align-items-center flex-column">
        <div className="card col-md-8">
          <div className="card-header h3">
            {path === '/login' ? 'Ingresar' : 'Registrarse'}
          </div>
          <div className="card-body">
            <div className="card-text">

              <div className="mb-3 row">
                <div className="col-8 offset-2">
                  <input type="text" className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <div className="col-8 offset-2">
                  <input type="password" className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

            </div>

            <div className="d-flex justify-content-end col-8 offset-2">
              {
                path === '/login' ?
                  <Link className="btn btn-outline-success d-flex align-items-center"
                    to="/login"
                    onClick={handleLogin}
                  >
                    <div className="me-2">
                      Ingresar
                    </div>
                    <FontAwesomeIcon
                      size="1x"
                      className="icon"
                      icon={faSignInAlt} />
                  </Link>
                  :
                  <Link className="btn btn-outline-secondary d-flex align-items-center"
                    to="/login"
                    onClick={handleCrearUsuario}
                  >
                    <div className="me-2">
                      Registrarse
                    </div>
                    <FontAwesomeIcon
                      size="1x"
                      className="icon"
                      icon={faSignOutAlt} />
                  </Link>
              }
            </div>
          </div>
        </div>
        {
          error && <div className="alert alert-danger mt-3"><strong>Error!</strong> {error}</div>
        }
        {
          usuarioCreado && <div className="alert alert-warning mt-3"><strong>Usuario creado!</strong> por favor validar con el Administrador para la asignacion del rol</div>
        }
      </div>
    </div>
  )
}
