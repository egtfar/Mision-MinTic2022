import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { actualizarDocumentoDatabase, consultarDocumentoDatabase, guardarDatabase, usuario } from '../config/firebase';
import { Loading } from './Loading.jsx';

export const Producto = () => {
  console.log(usuario.uid);
  console.log(useParams());
  const { id } = useParams();
  const [descripcion, setDescripcion] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [estado, setEstado] = useState('');
  const [producto, setProducto] = useState({ descripcion: '', precioUnitario: '', estado: '', idUsuario: '' })
  const [loading, setLoading] = useState(false)
  const history = useHistory();

  const p ={
    descripcion,
    precioUnitario,
    estado
  }

  const consultarProducto = React.useCallback(async () => {
    setLoading(true)
    const produtoTemp = await consultarDocumentoDatabase('lista-productos', id)
    console.log(produtoTemp);
    setProducto(produtoTemp)
    setDescripcion(produtoTemp.descripcion)
    setPrecioUnitario(produtoTemp.precioUnitario)
    setEstado(produtoTemp.estado)
    setLoading(false)
  }, [id])

  useEffect(() => {

    if (id !== 'create') {
      consultarProducto()
      return
    }
    setDescripcion('')
    setPrecioUnitario(0)
    setEstado('')
    setProducto({ descripcion:'' , precioUnitario: 0, estado: '', idUsuario:'' })
  }, [id, consultarProducto])



  const handleGuardarProducto = async (e) => {
    e.preventDefault()
    setProducto({ descripcion, precioUnitario, estado, idUsuario: usuario.uid })
    console.log(p)
    await guardarDatabase('lista-productos', p)
    setDescripcion('')
    setPrecioUnitario(0)
    setEstado('')
    setProducto({ descripcion: '', precioUnitario: 0 , estado: ''})
    history.push('/productos')
  }

  const handleActualizarProducto = async (e) => {
    e.preventDefault()
    const productoTemp = { descripcion, precioUnitario: (+precioUnitario), estado, idUsuario: usuario.uid }
    console.log(productoTemp);

    await actualizarDocumentoDatabase('lista-productos', id, productoTemp)
    setDescripcion('')
    setPrecioUnitario(0)
    setEstado('')
    setProducto({ descripcion: '', precioUnitario: 0, estado: '', idUsuario: '' })
    history.push('/productos')
  }

  return (
    <div className="container">
      <h2>
        {
          id === 'create' ? 'Creación ' : 'Editar '
        }
        Producto
      </h2>
      <hr className="mt-3" />

      {
        loading ?
          <div className="loading d-flex align-items-center justify-content-center">
            <Loading />
          </div>
          :
          <div className="row">
            <div className="offset-md-3 col-md-6">
              <form>
                <div className="mb-3">
                  <label className="form-label">Descripcion</label>
                  <input
                    type="text"
                    className="form-control"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Precio Unitario</label>
                  <input
                    type="text"
                    className="form-control"
                    value={precioUnitario}
                    onChange={(e) => setPrecioUnitario(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Estado</label>
                  <input
                    type="text"
                    className="form-control"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                  />
                </div>
                <div className="d-flex p-2 align-items-center">
                  <Link
                    className="btn btn-danger"
                    to='/productos'>
                    <FontAwesomeIcon
                      color="white"
                      size="1x"
                      className="icon"
                      icon={faArrowLeft} />
                    <span className="ps-2">Regresar</span>
                  </Link>
                  <button
                    className="btn btn-primary ms-3"
                    onClick={id === 'create' ? handleGuardarProducto : handleActualizarProducto}>
                    <span className="pe-2">
                      {id === 'create' ?
                        'Guardar Producto' : 'Guardar Edición'
                      }</span>
                    <FontAwesomeIcon
                      color="white"
                      size="1x"
                      className="icon"
                      icon={faSave} />

                  </button>
                </div>

              </form>
            </div>
          </div>
      }



    </div>
  )
}
