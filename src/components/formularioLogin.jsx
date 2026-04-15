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
      // 1. CORREGIDO: Puerto 8081 en lugar de 8080
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8081';

      // 2. CORREGIDO: La ruta completa es /api/usuarios/login
      const response = await fetch(`${apiUrl}/api/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credenciales),
      });

      // 3. Capturar la respuesta
      // Nota: Si el error es 401, a veces response.json() falla si el body está vacío.
      // Es mejor verificar response.ok primero.
      if (!response.ok) {
        const errorData = await response.text(); // Leemos el mensaje de texto "Correo o contraseña incorrectos"
        throw new Error(errorData || 'Credenciales incorrectas');
      }

      const data = await response.json();

      // 4. ¡Login Exitoso! 
      localStorage.setItem('sesionIniciada', 'true');
      
      if (data.nombre) {
         localStorage.setItem('nombreUsuario', data.nombre);
      }

      // 5. Redirigimos (Asegúrate de tener esta ruta en tu App.js)
      navigate('/'); 

    } catch (err) {
      setError(err.message || 'No se pudo conectar con el servidor.');
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
        // Fondo rojo vino profundo con transparencia
        backgroundImage: `
          linear-gradient(to right, rgba(140, 45, 45, 0.85), rgba(105, 36, 36, 0.81)),
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
                <h2 className="text-uppercase text-center mb-5" style={{ color: '#722F37' }}>Iniciar Sesión</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>

                  <div className="form-outline mb-4">
                    <label className="form-label mb-1" htmlFor="correo" style={{ color: '#722F37', fontWeight: 'bold' }}>
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
                    <label className="form-label mb-1" htmlFor="password" style={{ color: '#722F37', fontWeight: 'bold' }}>
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
                    <a href="#!" style={{ color: '#722F37' }}><small>¿Olvidaste tu contraseña?</small></a>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="btn btn-block btn-lg border-0 shadow-sm"
                      style={{ 
                        width: '100%', 
                        background: '#D4AF37', // Dorado Casona
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    >
                      {isLoading ? 'Verificando...' : 'Entrar a mi cuenta'}
                    </button>
                  </div>

                  <p className="text-center text-muted mt-5 mb-0">
                    ¿Aún no tienes una cuenta? <Link to="/registro" className="fw-bold" style={{ color: '#722F37' }}><u>Regístrate aquí</u></Link>
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