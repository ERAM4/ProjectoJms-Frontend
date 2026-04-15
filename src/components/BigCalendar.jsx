import React, { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import "dayjs/locale/es";

// Configuramos dayjs en español
dayjs.locale("es");
const localizer = dayjsLocalizer(dayjs);

// --- FUNCIÓN PARA MAYÚSCULAS ---
// Toma cualquier texto (ej: "abril 2026") y lo devuelve como "Abril 2026"
const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default function BigCalendar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null); 
  
  const [usuarioActual, setUsuarioActual] = useState({
    nombre: '', apellido: '', correo: '', telefono: ''
  });

  // ==========================================
  // REGLAS DE NEGOCIO: LÍMITES DE HORARIO
  // Definimos que la Casona atiende de 09:00 a 23:00
  // ==========================================
  const minTime = dayjs().set('hour', 9).set('minute', 0).toDate();
  const maxTime = dayjs().set('hour', 23).set('minute', 0).toDate();

  useEffect(() => {
    setUsuarioActual({
      nombre: 'Juan', apellido: 'Pérez', correo: 'juan@email.com', telefono: '+56912345678'
    });

    setEvents([
      {
        id: 1,
        title: "Reserva de Juan Pérez",
        start: dayjs('2026-04-15T10:00:00').toDate(),
        end: dayjs('2026-04-15T13:00:00').toDate(),
        estado: 'PENDIENTE',
        cliente: { nombre: 'Juan', apellido: 'Pérez', correo: 'juan@email.com', telefono: '+56912345678' }
      }
    ]);
  }, []);

  const eventStyleGetter = (event) => {
    let backgroundColor = '#722F37'; 
    if (event.estado === 'PENDIENTE') backgroundColor = '#D4AF37'; 
    if (event.estado === 'RECHAZADA') backgroundColor = '#dc3545'; 

    return { style: { backgroundColor, borderRadius: '5px', color: 'white', border: 'none', display: 'block' } };
  };

  const handleSelectSlot = (slotInfo) => {
    if (isAdmin) return; 

    // ==========================================
    // REGLA 1: BLOQUEAR FECHAS PASADAS
    // ==========================================
    const ahora = dayjs();
    const inicioSeleccionado = dayjs(slotInfo.start);

    if (inicioSeleccionado.isBefore(ahora, 'day')) {
      alert("⚠️ No puedes agendar en fechas que ya pasaron.");
      return;
    }

    // ==========================================
    // REGLA 2: EVITAR CHOQUES DE HORARIO
    // ==========================================
    const estaOcupado = events.some(e => {
      const nuevoInicio = dayjs(slotInfo.start);
      const nuevoFin = dayjs(slotInfo.end);
      const eventoInicio = dayjs(e.start);
      const eventoFin = dayjs(e.end);
      return (e.estado === 'PENDIENTE' || e.estado === 'CONFIRMADA') && 
             (nuevoInicio.isBefore(eventoFin) && nuevoFin.isAfter(eventoInicio));
    });

    if (estaOcupado) {
      alert("⚠️ Horario no disponible. Ya existe una solicitud en este tramo.");
      return;
    }

    setEventoSeleccionado(null);
    setSelectedSlot(slotInfo); 
    setIsModalOpen(true);      
  };

  const handleSelectEvent = (event) => {
    setEventoSeleccionado(event);
    setIsModalOpen(true);
  };

  const handleSolicitarHora = () => {
    const nuevaReserva = {
      id: Date.now(),
      title: `Reserva de ${usuarioActual.nombre} ${usuarioActual.apellido}`,
      start: selectedSlot.start,
      end: selectedSlot.end,
      estado: 'PENDIENTE',
      cliente: { ...usuarioActual }
    };

    setEvents([...events, nuevaReserva]);
    setIsModalOpen(false);
  };

  const handleCambiarEstado = (nuevoEstado) => {
    const eventosActualizados = events.map(e => 
      e.id === eventoSeleccionado.id ? { ...e, estado: nuevoEstado } : e
    );
    setEvents(eventosActualizados);
    setIsModalOpen(false);
  };

  const misReservas = events.filter(e => e.cliente.correo === usuarioActual.correo);

  // --- CONFIGURACIÓN DE TRADUCCIÓN DE BOTONES ---
  const mensajesEspañol = {
    next: "Siguiente",
    previous: "Atrás",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "No hay reservas en este rango de fechas.",
    showMore: total => `+ Ver más (${total})`
  };

  // --- CONFIGURACIÓN DE FORMATOS PARA MAYÚSCULAS ---
  const formatosPersonalizados = {
    monthHeaderFormat: (date, culture, localizer) => 
      capitalize(localizer.format(date, 'MMMM YYYY', culture)),
    
    dayFormat: (date, culture, localizer) =>
      capitalize(localizer.format(date, 'dddd DD', culture)),
      
    dayHeaderFormat: (date, culture, localizer) =>
      capitalize(localizer.format(date, 'dddd, DD [de] MMMM', culture)),
  };

  return (
    <div style={{ minHeight: '80vh', padding: '20px', backgroundColor: '#fdfbf7' }}>
      <div className="container">
        
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-uppercase m-0" style={{ color: '#722F37', fontWeight: 'bold' }}>Agenda de Eventos</h2>
          <button 
            className={`btn fw-bold ${isAdmin ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setIsAdmin(!isAdmin)}
          >
            Viendo como: {isAdmin ? '👨‍💼 ADMINISTRADOR' : '👤 CLIENTE'}
          </button>
        </div>

        <div className="d-flex gap-3 mb-3 small fw-bold text-muted">
          <span><span style={{color: '#D4AF37'}}>■</span> Pendiente de Revisión</span>
          <span><span style={{color: '#722F37'}}>■</span> Confirmada</span>
        </div>

        <div className="card shadow-lg border-0 mb-5" style={{ borderRadius: '15px', overflow: 'hidden' }}>
          <div className="card-body p-4 bg-white">
            <Calendar
              localizer={localizer}
              events={events.filter(e => e.estado !== 'RECHAZADA')}
              selectable={!isAdmin} 
              onSelectSlot={handleSelectSlot} 
              onSelectEvent={handleSelectEvent} 
              eventPropGetter={eventStyleGetter} 
              
              // ==========================================
              // APLICAMOS LOS LÍMITES DE HORARIO AL CALENDARIO
              // ==========================================
              min={minTime} 
              max={maxTime} 
              
              messages={mensajesEspañol}
              formats={formatosPersonalizados}
              
              style={{ height: "60vh", width: "100%" }}
            />
          </div>
        </div>

        {!isAdmin && (
          <div className="card shadow-sm border-0" style={{ borderRadius: '15px' }}>
            <div className="card-header bg-white border-0 pt-4 pb-0">
              <h4 className="fw-bold" style={{ color: '#722F37' }}>Estado de mis Solicitudes</h4>
              <p className="text-muted small">Aquí puedes verificar si el administrador ha aprobado tus horas.</p>
            </div>
            <div className="card-body">
              {misReservas.length === 0 ? (
                <p className="text-center text-muted my-4">No tienes solicitudes recientes.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Fecha del Evento</th>
                        <th>Horario</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {misReservas.map((reserva) => (
                        <tr key={reserva.id}>
                          <td className="fw-bold text-dark">
                            {capitalize(dayjs(reserva.start).format('dddd, DD [de] MMMM YYYY'))}
                          </td>
                          <td className="text-muted">
                            {dayjs(reserva.start).format('HH:mm')} - {dayjs(reserva.end).format('HH:mm')}
                          </td>
                          <td>
                            {reserva.estado === 'PENDIENTE' && (
                              <span className="badge" style={{ backgroundColor: '#D4AF37', padding: '8px 12px' }}>⏳ En Revisión</span>
                            )}
                            {reserva.estado === 'CONFIRMADA' && (
                              <span className="badge bg-success" style={{ padding: '8px 12px' }}>✅ Aprobada</span>
                            )}
                            {reserva.estado === 'RECHAZADA' && (
                              <span className="badge bg-danger" style={{ padding: '8px 12px' }}>❌ Rechazada</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1050 }}>
          <div className="card p-4 shadow" style={{ width: '450px', borderRadius: '20px' }}>
            
            {!eventoSeleccionado && !isAdmin && (
              <>
                <h4 className="fw-bold mb-3 text-center" style={{ color: '#722F37' }}>Solicitar Reserva</h4>
                <div className="alert mb-4" style={{ backgroundColor: '#F4E1E6', color: '#722F37' }}>
                  <p className="mb-1"><strong>De:</strong> {dayjs(selectedSlot?.start).format('DD/MM/YYYY HH:mm')}</p>
                  <p className="mb-0"><strong>Hasta:</strong> {dayjs(selectedSlot?.end).format('DD/MM/YYYY HH:mm')}</p>
                </div>
                <p className="text-muted small mb-4 text-center">Tus datos ({usuarioActual.nombre} {usuarioActual.apellido}) serán enviados al administrador para su confirmación.</p>
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-light" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                  <button className="btn text-white fw-bold" style={{ backgroundColor: '#722F37' }} onClick={handleSolicitarHora}>Enviar Solicitud</button>
                </div>
              </>
            )}

            {eventoSeleccionado && isAdmin && (
              <>
                <h4 className="fw-bold mb-3 text-center" style={{ color: '#722F37' }}>Gestión de Reserva</h4>
                <div className="alert mb-3" style={{ backgroundColor: eventoSeleccionado.estado === 'PENDIENTE' ? '#fcf8e3' : '#F4E1E6' }}>
                  <p className="mb-1"><strong>Estado:</strong> {eventoSeleccionado.estado}</p>
                  <p className="mb-1"><strong>Inicio:</strong> {dayjs(eventoSeleccionado.start).format('DD/MM/YYYY HH:mm')}</p>
                  <p className="mb-0"><strong>Fin:</strong> {dayjs(eventoSeleccionado.end).format('DD/MM/YYYY HH:mm')}</p>
                </div>
                
                <h6 className="fw-bold text-muted border-bottom pb-2">Datos del Cliente</h6>
                <p className="mb-1"><strong>Nombre:</strong> {eventoSeleccionado.cliente.nombre} {eventoSeleccionado.cliente.apellido}</p>
                <p className="mb-1"><strong>Correo:</strong> {eventoSeleccionado.cliente.correo}</p>
                <p className="mb-4"><strong>Teléfono:</strong> {eventoSeleccionado.cliente.telefono}</p>

                {eventoSeleccionado.estado === 'PENDIENTE' ? (
                  <div className="d-flex justify-content-between gap-2">
                    <button className="btn btn-secondary w-100" onClick={() => setIsModalOpen(false)}>Cerrar</button>
                    <button className="btn btn-danger w-100 fw-bold" onClick={() => handleCambiarEstado('RECHAZADA')}>Rechazar</button>
                    <button className="btn btn-success w-100 fw-bold" onClick={() => handleCambiarEstado('CONFIRMADA')}>Aprobar</button>
                  </div>
                ) : (
                  <button className="btn btn-secondary w-100" onClick={() => setIsModalOpen(false)}>Cerrar Ventana</button>
                )}
              </>
            )}

             {eventoSeleccionado && !isAdmin && (
              <>
                <h4 className="fw-bold mb-3 text-center" style={{ color: '#722F37' }}>Detalle de Reserva</h4>
                <div className="alert mb-3 text-center" style={{ backgroundColor: eventoSeleccionado.estado === 'PENDIENTE' ? '#fcf8e3' : (eventoSeleccionado.estado === 'CONFIRMADA' ? '#d4edda' : '#f8d7da') }}>
                  <p className="mb-0 fw-bold">
                    {eventoSeleccionado.estado === 'PENDIENTE' && '⏳ Tu solicitud está en revisión'}
                    {eventoSeleccionado.estado === 'CONFIRMADA' && '✅ ¡Tu reserva está Aprobada!'}
                    {eventoSeleccionado.estado === 'RECHAZADA' && '❌ Solicitud rechazada'}
                  </p>
                </div>
                <p className="text-muted text-center small">Si tienes dudas, contáctanos a contacto@espaciocasona.cl</p>
                <button className="btn btn-secondary w-100 mt-3" onClick={() => setIsModalOpen(false)}>Cerrar</button>
              </>
            )}

          </div>
        </div>
      )}
      
    </div>
  );
}