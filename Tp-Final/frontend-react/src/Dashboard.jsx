import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Mis Mascotas</h1>
        {/* aquí podés poner logo o botón de cerrar sesión */}
      </header>

      <section className="turnos-section">
        <h2>Turnos Médicos</h2>
        {/* Aquí una lista de turnos */}
      </section>

      <section className="vacunas-section">
        <h2>Vacunaciones</h2>
        {/* Lista de vacunas */}
      </section>

      <section className="atenciones-section">
        <h2>Atenciones</h2>
        {/* Lista de atenciones */}
      </section>
    </div>
  );
}

export default Dashboard;
