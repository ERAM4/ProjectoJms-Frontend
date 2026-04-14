import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    password: '',
    repetirPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMensaje(null);

    if (formData.password !== formData.repetirPassword) {
      setError('Las contraseñas no coinciden. Por favor, verifica.');
      setIsLoading(false);
      return;
    }

    try {
      
      
     
      const { repetirPassword, ...datosUsuario } = formData;
      
      
      await new Promise(resolve => setTimeout(resolve, 500));

      
      localStorage.setItem('usuarioCasona', JSON.stringify(datosUsuario));

      
      setMensaje('¡Cuenta creada exitosamente! Ya puedes iniciar sesión.');
      
      
      setFormData({ 
        nombre: '', apellido: '', correo: '', telefono: '', password: '', repetirPassword: '' 
      });

      
    } catch (err) {
      setError('Hubo un error al guardar los datos localmente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        display: 'flex',
        alignItems: 'center',
        padding: '50px 15px', 
        backgroundImage: `
          linear-gradient(to right, rgba(182, 94, 35, 0.7), rgba(105, 36, 36, 0.81)),
          url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card" style={{ borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5">Crear una cuenta</h2>

                {mensaje && <div className="alert alert-success">{mensaje}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                  
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label mb-1" htmlFor="nombre">Tu Nombre</label>
                        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className="form-control form-control-lg" required />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label mb-1" htmlFor="apellido">Tu Apellido</label>
                        <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} className="form-control form-control-lg" required />
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label mb-1" htmlFor="correo">Tu Correo Electrónico</label>
                    <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} className="form-control form-control-lg" required />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label mb-1" htmlFor="telefono">Tu Teléfono</label>
                    <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} className="form-control form-control-lg" required />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label mb-1" htmlFor="password">Contraseña</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control form-control-lg" required />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label mb-1" htmlFor="repetirPassword">Repite tu contraseña</label>
                    <input type="password" id="repetirPassword" name="repetirPassword" value={formData.repetirPassword} onChange={handleChange} className="form-control form-control-lg" required />
                  </div>

                  <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" id="terms" required />
                    <label className="form-check-label" htmlFor="terms">
                      Acepto todas las condiciones de los <a href="#!" className="text-body"><u>Términos de servicio</u></a>
                    </label>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="btn btn-success btn-block btn-lg text-body border-0"
                      style={{ 
                        width: '100%', 
                        background: 'linear-gradient(to right, #84fab0, #8fd3f4)',
                        color: '#333',
                        fontWeight: 'bold'
                      }}
                    >
                      {isLoading ? 'Registrando...' : 'Registrarse'}
                    </button>
                  </div>

                  <p className="text-center text-muted mt-5 mb-0">
                    ¿Ya tienes una cuenta? <Link to="/login" className="fw-bold text-body"><u>Inicia sesión aquí</u></Link>
                  </p>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroUsuario;