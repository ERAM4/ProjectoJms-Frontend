import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/navbarStyle.css';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // h8-t2: Cerrar menú mobile al navegar a otra página
  useEffect(() => {
    const collapseEl = document.getElementById('navbarNavAltMarkup');
    if (collapseEl && collapseEl.classList.contains('show')) {
      const bsCollapse = window.bootstrap?.Collapse?.getInstance(collapseEl);
      bsCollapse?.hide();
    }
  }, [location]);

  // h8-t1: Efecto de sombra al hacer scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top ${scrolled ? 'navbar-scrolled' : ''}`}
      style={{
        backgroundColor: 'blanchedalmond',
        transition: 'box-shadow 0.3s ease',
        boxShadow: scrolled ? '0 2px 12px rgba(114,47,55,0.15)' : 'none',
      }}
    >
      <div className="container">

        {/* Logo / Brand */}
        <NavLink className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/" style={{ color: '#722F37' }}>
          <span style={{ fontSize: '1.4rem' }}>🏡</span>
          <span>Espacio Casona JMS</span>
        </NavLink>

        {/* Toggler mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ color: '#722F37' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-1">

            <NavLink
              className={({ isActive }) => `nav-link nav-link-custom${isActive ? ' active-link' : ''}`}
              to="/"
              end
            >
              Inicio
            </NavLink>

            <NavLink
              className={({ isActive }) => `nav-link nav-link-custom${isActive ? ' active-link' : ''}`}
              to="/servicios"
            >
              Servicios
            </NavLink>

            <NavLink
              className={({ isActive }) => `nav-link nav-link-custom${isActive ? ' active-link' : ''}`}
              to="/catalogo"
            >
              Catálogo
            </NavLink>

            <NavLink
              className={({ isActive }) => `nav-link nav-link-custom${isActive ? ' active-link' : ''}`}
              to="/agendaCitas"
            >
              Agenda
            </NavLink>

            {/* Separador visual */}
            <div className="d-none d-lg-block" style={{ width: '1px', height: '24px', backgroundColor: '#ccc', margin: '0 8px' }} />

            {/* Botón Login */}
            <NavLink
              to="/login"
              className="nav-link"
            >
              <span
                className="btn btn-sm px-3 py-1 fw-semibold"
                style={{
                  border: '2px solid #722F37',
                  color: '#722F37',
                  borderRadius: '20px',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#722F37';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#722F37';
                }}
              >
                Iniciar Sesión
              </span>
            </NavLink>

            {/* Botón Registro */}
            <NavLink
              to="/registro"
              className="nav-link"
            >
              <span
                className="btn btn-sm px-3 py-1 fw-semibold"
                style={{
                  backgroundColor: '#722F37',
                  color: 'white',
                  borderRadius: '20px',
                  border: '2px solid #722F37',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#5a2229';
                  e.currentTarget.style.borderColor = '#5a2229';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#722F37';
                  e.currentTarget.style.borderColor = '#722F37';
                }}
              >
                Crear Cuenta
              </span>
            </NavLink>

          </div>
        </div>

      </div>
    </nav>
  );
}