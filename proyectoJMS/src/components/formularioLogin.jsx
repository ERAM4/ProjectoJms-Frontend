import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginUsuario = () => {
  const [credenciales, setCredenciales] = useState({
    correo: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciales({
      ...credenciales,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
    
      await new Promise(resolve => setTimeout(resolve, 500));

      
      const usuarioGuardado = localStorage.getItem('usuarioCasona');

      if (!usuarioGuardado) {
        throw new Error('No existe ninguna cuenta registrada en este navegador.');
      }

      
      const usuarioObj = JSON.parse(usuarioGuardado);

      
      if (usuarioObj.correo !== credenciales.correo || usuarioObj.password !== credenciales.password) {
        throw new Error('Correo o contraseña incorrectos. Verifica tus datos.');
      }

      
      localStorage.setItem('sesionIniciada', 'true');
      localStorage.setItem('nombreUsuario', usuarioObj.nombre); // Guardamos el nombre por si quieres mostrar "Hola, [Nombre]" en el NavBar

      
      navigate('/');

      

    } catch (err) {
      setError(err.message);
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
          linear-gradient(to right, rgba(49, 212, 109, 0.7), rgba(62, 114, 33, 0.81)),
          url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5"> 
            <div className="card" style={{ borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5" style={{ color: '#355E3B' }}>Iniciar Sesión</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>

                  <div className="form-outline mb-4">
                    <label className="form-label fw-bold mb-1" htmlFor="correo" style={{ color: '#556B2F' }}>
                      Tu Correo Electrónico
                    </label>
                    <input 
                      type="email" 
                      id="correo" 
                      name="correo" 
                      value={credenciales.correo} 
                      onChange={handleChange} 
                      className="form-control form-control-lg" 
                      required 
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label fw-bold mb-1" htmlFor="password" style={{ color: '#556B2F' }}>
                      Contraseña
                    </label>
                    <input 
                      type="password" 
                      id="password" 
                      name="password" 
                      value={credenciales.password} 
                      onChange={handleChange} 
                      className="form-control form-control-lg" 
                      required 
                    />
                  </div>

                  <div className="d-flex justify-content-end mb-4">
                    <a href="#!" className="text-muted"><small>¿Olvidaste tu contraseña?</small></a>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="btn btn-success btn-block btn-lg text-body border-0 shadow-sm"
                      style={{ 
                        width: '100%', 
                        background: 'linear-gradient(to right, #84fab0, #8fd3f4)',
                        color: '#333',
                        fontWeight: 'bold'
                      }}
                    >
                      {isLoading ? 'Verificando...' : 'Entrar a mi cuenta'}
                    </button>
                  </div>

                  <p className="text-center text-muted mt-5 mb-0">
                    ¿Aún no tienes una cuenta? <Link to="/registro" className="fw-bold text-body"><u>Regístrate aquí</u></Link>
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

export default LoginUsuario;