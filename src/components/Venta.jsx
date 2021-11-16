import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { actualizarDocumentoDatabase, consultarDocumentoDatabase, guardarDatabase, usuario } from '../config/firebase';
import { Loading } from './Loading.jsx';

export const Venta = () => {
  console.log(usuario.uid);
  console.log(useParams());
  const { id } = useParams();
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioTotal, setPrecioTotal] = useState('');
  const [idcliente, setIdcliente] = useState('');
  const [cliente, setCliente] = useState('');
  const [estado, setEstado] = useState('');
  const [venta, setVenta] = useState({ fecha: '',descripcion: '', precioTotal: '', idcliente: '', cliente: '', estado: ''})
  const [loading, setLoading] = useState(false)
  const history = useHistory();

  const ven ={
    fecha,
    descripcion,
    precioTotal,
    idcliente,
    cliente,
    estado
  }

  const consultarVenta = React.useCallback(async () => {
    setLoading(true)
    const ventaTemp = await consultarDocumentoDatabase('lista-ventas', id)
    console.log(ventaTemp);
    setVenta(ventaTemp)
    setFecha(ventaTemp.fecha)
    setDescripcion(ventaTemp.descripcion)
    setPrecioTotal(ventaTemp.precioTotal)
    setIdcliente(ventaTemp.idcliente)
    setCliente(ventaTemp.cliente)
    setEstado(ventaTemp.estado)
    setLoading(false)
  }, [id])

  useEffect(() => {

    if (id !== 'create') {
      consultarVenta()
      return
    }
    setFecha('')
    setDescripcion('')
    setPrecioTotal(0)
    setIdcliente('')
    setCliente('')
    setEstado('')
    setVenta({ fecha:'' , descripcion:'' , precioTotal: 0, idcliente:'' , cliente:'' , estado: ''})
  }, [id, consultarVenta])



  const handleGuardarVenta = async (e) => {
    e.preventDefault()
    setVenta({ fecha, descripcion, precioTotal, idcliente, cliente, estado})
    console.log(ven)
    await guardarDatabase('lista-ventas', ven)
    setFecha('')
    setDescripcion('')
    setPrecioTotal(0)
    setIdcliente('')
    setCliente('')
    setEstado('')
    setVenta({ fecha: '', descripcion: '', precioTotal: 0, idcliente: '', cliente: '', estado: '' })
    history.push('/ventas')
  }

  const handleActualizarVenta = async (e) => {
    e.preventDefault()
    const ventaTemp = { fecha, descripcion, precioTotal: (+precioTotal), idcliente, cliente, estado}
    console.log(ventaTemp);

    await actualizarDocumentoDatabase('lista-ventas', id, ventaTemp)
    setFecha('')
    setDescripcion('')
    setPrecioTotal(0)
    setIdcliente('')
    setCliente('')
    setEstado('')
    setVenta({ fecha: '', descripcion: '', precioTotal: 0, idcliente: '', cliente: '', estado: ''})
    history.push('/ventas')
  }

  return (
    <div className="container">
      <h2>
        {
          id === 'create' ? 'Creación ' : 'Editar '
        }
        Venta
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
                  <label className="form-label">Fecha Venta</label>
                  <input
                    type="text"
                    className="form-control"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </div>
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
                  <label className="form-label">Precio Total</label>
                  <input
                    type="text"
                    className="form-control"
                    value={precioTotal}
                    onChange={(e) => setPrecioTotal(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Identificacion Cliente</label>
                  <input
                    type="text"
                    className="form-control"
                    value={idcliente}
                    onChange={(e) => setIdcliente(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Cliente</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
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
                    to='/ventas'>
                    <FontAwesomeIcon
                      color="white"
                      size="1x"
                      className="icon"
                      icon={faArrowLeft} />
                    <span className="ps-2">Regresar</span>
                  </Link>
                  <button
                    className="btn btn-primary ms-3"
                    onClick={id === 'create' ? handleGuardarVenta : handleActualizarVenta}>
                    <span className="pe-2">
                      {id === 'create' ?
                        'Guardar Venta' : 'Guardar Edición'
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