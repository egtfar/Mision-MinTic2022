import React, { useEffect, useState } from 'react'
import { DebounceInput } from 'react-debounce-input';
import { getCollection, updateDocument } from '../config/CustomHooks.jsx';
import { collectionTypes } from '../types/databaseTypes.js';
import { Loading } from './Loading.jsx';

export const Roles = () => {
  const [listaUsuarios, setListaUsuarios] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    cargarListaUsuarios()
  }, [setListaUsuarios])


  const cargarListaUsuarios = async () => {
    setLoading(true)
    const usuarios = await getCollection(collectionTypes.USERS)
    console.log(usuarios)
    setListaUsuarios(usuarios)
    setLoading(false)
  }

  const handleActive = async ({ estado, ...rest }) => {
    setLoading(true)
    const userTemporal = {
      estado: !estado,
      ...rest
    }
    console.log(userTemporal)
    await updateDocument(collectionTypes.USERS, userTemporal, userTemporal.id)
    setLoading(false)
    await cargarListaUsuarios()
  }

  const handleRoleUser = async (e, { role, ...rest }) => {
    setLoading(true)
    const { target: { value } } = e;
    const userTemporal = {
      role: value,
      ...rest
    }
    console.log(userTemporal)
    await updateDocument(collectionTypes.USERS, userTemporal, userTemporal.id)
    setLoading(false)
    await cargarListaUsuarios()
  }

  const handleNombre = async (e, { nombre, ...rest }) => {
    setLoading(true)
    const { target: { value } } = e;
    const userTemporal = {
      nombre: value,
      ...rest
    }
    console.log(userTemporal)
    await updateDocument(collectionTypes.USERS, userTemporal, userTemporal.id)
    setLoading(false)
    await cargarListaUsuarios()
  }


  return (
    <div className="mt-5">
      <h2>Lista de Usuarios</h2>

      {
        loading ?
          <div className="loading d-flex align-items-center justify-content-center">
            <Loading />
          </div>
          :

          <table className="table table-hover table-bordered mt-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">email</th>
                <th scope="col">Role</th>
                <th scope="col" className="text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {
                listaUsuarios.map((usuario, index) => (
                  <tr key={usuario.id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <DebounceInput
                        type="text"
                        className="form-control"
                        value={usuario.nombre}
                        placeholder="Nombre"
                        minLength={2}
                        debounceTimeout={1000}
                        onChange={(e) => handleNombre(e, usuario)}
                      />
                    </td>
                    <td>{usuario.email}</td>
                    <td>
                      <select className="form-select"
                        value={usuario.role}
                        onChange={e => handleRoleUser(e, usuario)}
                      >
                        <option value="admin">Administrador</option>
                        <option value="vendedor">Vendedor</option>
                      </select>
                    </td>
                    <td>
                      <div className="form-check d-flex justify-content-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={usuario.estado}
                          onChange={e => handleActive(usuario)}
                        />
                      </div>
                    </td>
                  </tr>
                )
                )
              }
            </tbody>
          </table>
      }
    </div>
  )
}