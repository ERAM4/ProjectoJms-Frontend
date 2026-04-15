import React, { useState } from 'react';

const GestionInventario = () => {
  
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Silla Tiffany Blanca", categoria: "Mobiliario", cantidad: 150, precio: 2500 },
    { id: 2, nombre: "Mesa Redonda 1.8m", categoria: "Mobiliario", cantidad: 15, precio: 12000 },
    { id: 3, nombre: "Copa de Vino Cristal", categoria: "Cristalería", cantidad: 300, precio: 1200 },
    { id: 4, nombre: "Foco Vintage Cálido", categoria: "Iluminación", cantidad: 8, precio: 5000 }
  ]);

  const categorias = ["Mobiliario", "Mantelería", "Cristalería", "Iluminación", "Otros"];

  const [nuevoProd, setNuevoProd] = useState({ nombre: '', categoria: 'Mobiliario', cantidad: '', precio: '' });
  const [idEditando, setIdEditando] = useState(null);
  const [filaEditada, setFilaEditada] = useState({});

  
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');

  
  const productosFiltrados = productos.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = filtroCategoria === 'Todas' || p.categoria === filtroCategoria;
    return coincideNombre && coincideCategoria;
  });

  
  const handleAgregar = (e) => {
    e.preventDefault();
    
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    setProductos([...productos, { ...nuevoProd, id: nuevoId }]);
    setNuevoProd({ nombre: '', categoria: 'Mobiliario', cantidad: '', precio: '' });
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este artículo permanentemente?")) {
      
      setProductos(productos.filter(p => p.id !== id));
    }
  };

  const iniciarEdicion = (producto) => {
    setIdEditando(producto.id);
    setFilaEditada({ ...producto });
  };

  const guardarCambios = (id) => {
    
    const nuevosProductos = productos.map(p => p.id === id ? filaEditada : p);
    setProductos(nuevosProductos);
    setIdEditando(null);
  };

  
  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4 text-dark fw-bold">Inventario - Espacio Casona JMS</h2>

     
      <div className="card shadow-sm mb-4 border-0">
        <div className="card-header text-white" style={{ backgroundColor: '#2e7d32' }}>
          <h5 className="mb-0">Registrar Nuevo Artículo</h5>
        </div>
        <div className="card-body bg-light">
          <form className="row g-3 align-items-end" onSubmit={handleAgregar}>
            <div className="col-md-3">
              <label className="form-label text-muted small fw-bold">NOMBRE DEL ARTÍCULO</label>
              <input type="text" className="form-control" placeholder="Ej. Mantel Redondo" value={nuevoProd.nombre} 
                onChange={e => setNuevoProd({...nuevoProd, nombre: e.target.value})} required />
            </div>
            <div className="col-md-3">
              <label className="form-label text-muted small fw-bold">CATEGORÍA</label>
              <select className="form-select" value={nuevoProd.categoria} 
                onChange={e => setNuevoProd({...nuevoProd, categoria: e.target.value})}>
                {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label text-muted small fw-bold">CANTIDAD</label>
              <input type="number" className="form-control" min="0" placeholder="0" value={nuevoProd.cantidad} 
                onChange={e => setNuevoProd({...nuevoProd, cantidad: Number(e.target.value)})} required />
            </div>
            <div className="col-md-2">
              <label className="form-label text-muted small fw-bold">PRECIO ($)</label>
              <input type="number" className="form-control" min="0" placeholder="0" value={nuevoProd.precio} 
                onChange={e => setNuevoProd({...nuevoProd, precio: Number(e.target.value)})} required />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-success w-100 fw-bold">➕ Agregar</button>
            </div>
          </form>
        </div>
      </div>

      
      <div className="row mb-3">
        <div className="col-md-8">
          <input 
            type="text" 
            className="form-control" 
            placeholder="🔍 Buscar artículo por nombre..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select 
            className="form-select" 
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="Todas">Todas las categorías</option>
            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th className="ps-4">ID</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Stock</th>
                  <th>Precio Unit.</th>
                  <th className="text-center pe-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
               
                {productosFiltrados.map(p => (
                  <tr key={p.id}>
                    <td className="ps-4 fw-bold text-secondary">#{p.id}</td>
                    
                    <td>
                      {idEditando === p.id ? 
                        <input type="text" className="form-control form-control-sm border-success" value={filaEditada.nombre} 
                        onChange={e => setFilaEditada({...filaEditada, nombre: e.target.value})} /> 
                        : p.nombre}
                    </td>

                    <td>
                      {idEditando === p.id ? 
                        <select className="form-select form-select-sm border-success" value={filaEditada.categoria} 
                        onChange={e => setFilaEditada({...filaEditada, categoria: e.target.value})}>
                          {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        : <span className="badge bg-secondary">{p.categoria}</span>}
                    </td>

                    <td>
                      {idEditando === p.id ? 
                        <input type="number" className="form-control form-control-sm border-success" value={filaEditada.cantidad} 
                        onChange={e => setFilaEditada({...filaEditada, cantidad: Number(e.target.value)})} /> 
                        : (
                          <span className={p.cantidad < 10 ? "badge bg-danger rounded-pill px-3" : "fw-bold"}>
                            {p.cantidad}
                          </span>
                        )}
                    </td>

                    <td>
                      {idEditando === p.id ? 
                        <input type="number" className="form-control form-control-sm border-success" value={filaEditada.precio} 
                        onChange={e => setFilaEditada({...filaEditada, precio: Number(e.target.value)})} /> 
                        : `$${p.precio.toLocaleString('es-CL')}`}
                    </td>

                    <td className="text-center pe-4">
                      {idEditando === p.id ? (
                        <button className="btn btn-sm btn-success me-2" onClick={() => guardarCambios(p.id)}>💾 Guardar</button>
                      ) : (
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => iniciarEdicion(p)}>✏️ Editar</button>
                      )}
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(p.id)}>🗑️ Borrar</button>
                    </td>
                  </tr>
                ))}
                
               
                {productosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      <h5>No se encontraron artículos</h5>
                      <p>Prueba buscando con otro término o seleccionando otra categoría.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default GestionInventario;