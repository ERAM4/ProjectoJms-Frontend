import React from 'react';
import { Link } from 'react-router-dom'; // Importante para que funcionen los botones
import Banner from "../components/Banner.jsx";
import Testimonios from '../components/Testimonios.jsx'


function Inicio() {
  return (
    // Envolvemos todo en un div principal que le da el fondo clarito a toda la página
    <div style={{ backgroundColor: '#fdfbf7', minHeight: '100vh', paddingBottom: '50px' }}>
      
      {/* 1. Tu Banner Original */}
      <Banner />
      
      {/* 2. La sección de las 3 Cards */}
      {/* Le damos un margen superior (marginTop) para separarlo del Banner */}
      <div className="container" style={{ marginTop: '50px' }}>
        
        {/* La fila (row) que ordena las tarjetas responsivamente */}
        <div className="row g-4">
          
          {/* --- CARD 1 --- */}
          <div className="col-12 col-md-4">
            <div className="card h-100 shadow border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80" 
                className="card-img-top" 
                alt="Eventos corporativos" 
                style={{ height: '220px', objectFit: 'cover' }}
              />
              <div className="card-body text-center p-4 d-flex flex-column">
                <h4 className="card-title fw-bold" style={{ color: '#722F37' }}>Eventos Corporativos</h4>
                <p className="card-text text-muted mb-4">
                  Salones equipados y un entorno natural ideal para reuniones, capacitaciones y cenas de fin de año de tu empresa.
                </p>
                <Link to="/catalogo" className="btn btn-outline-dark mt-auto mx-auto" style={{ borderColor: '#722F37', color: '#722F37', borderRadius: '25px', width: '80%' }}>
                  Ver Catálogo
                </Link>
              </div>
            </div>
          </div>

         {/* --- CARD 2 --- */}
          <div className="col-12 col-md-4">
            <div className="card h-100 shadow border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <img 
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80" 
                className="card-img-top" 
                alt="Visitas y Matrimonios" 
                style={{ height: '220px', objectFit: 'cover' }}
              />
              <div className="card-body text-center p-4 d-flex flex-column">
                <h4 className="card-title fw-bold" style={{ color: '#722F37' }}>Matrimonios y Visitas</h4>
                <p className="card-text text-muted mb-4">
                  Haz que tu día sea mágico. Agenda una hora presencial con nuestro equipo para recorrer los jardines, salones y planificar tu boda.
                </p>
                
                <Link to="/agendaCitas" className="btn btn-outline-dark mt-auto mx-auto" style={{ borderColor: '#722F37', color: '#722F37', borderRadius: '25px', width: '80%', fontWeight: 'bold' }}>
                  Agendar Hora
                </Link>
              </div>
            </div>
          </div>

          {/* --- CARD 3 --- */}
          <div className="col-12 col-md-4">
            <div className="card h-100 shadow border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <img 
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=80" 
                className="card-img-top" 
                alt="Cumpleaños y Fiestas" 
                style={{ height: '220px', objectFit: 'cover' }}
              />
              <div className="card-body text-center p-4 d-flex flex-column">
                <h4 className="card-title fw-bold" style={{ color: '#722F37' }}>Celebraciones</h4>
                <p className="card-text text-muted mb-4">
                  Espacios versátiles para celebrar cumpleaños o aniversarios junto a tus seres queridos en un ambiente exclusivo.
                </p>
                <Link to="/stockAdmin" className="btn btn-outline-dark mt-auto mx-auto" style={{ borderColor: '#722F37', color: '#722F37', borderRadius: '25px', width: '80%' }}>
                  Ver Stock
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Testimonios/>
      
    </div>
  );
}

export default Inicio;