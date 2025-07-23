import React, { useEffect, useState } from 'react';

export default function FichaMascota({ animalId }) {
  const [animal, setAnimal] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoEntrada, setTipoEntrada] = useState('');
  const [nuevaEntrada, setNuevaEntrada] = useState({ fecha: '', descripcion: '' });

  useEffect(() => {
    fetch(`/api/animal/${animalId}`)
      .then((res) => res.json())
      .then((data) => {
        setAnimal(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error('Error al cargar datos del animal:', error);
        setCargando(false);
      });
  }, [animalId]);

  const abrirModal = (tipo) => {
    setTipoEntrada(tipo);
    setNuevaEntrada({ fecha: '', descripcion: '' });
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const guardarEntrada = () => {
    if (!animal) return;
    const updated = { ...animal };
    updated[tipoEntrada].push({ ...nuevaEntrada });
    setAnimal(updated);
    cerrarModal();

    // Guardar en el backend
    fetch(`/api/animal/${animalId}/${tipoEntrada}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaEntrada),
    }).catch((e) => console.error('Error al guardar entrada:', e));
  };

  if (cargando) return <p>Cargando ficha...</p>;
  if (!animal) return <p>No se encontró información del animal.</p>;

  return (
    <div className="panel-container" style={{ fontFamily: 'Arial', maxWidth: '600px', margin: 'auto' }}>
      {/* ENCABEZADO */}
      <div className="pet-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img src="https://place-hamster.com/100/100" alt="Foto de mascota" className="pet-photo" style={{ borderRadius: '50%', marginRight: '10px' }} />
        <div className="pet-info">
          <div className="pet-id">{animal.id || '2000 50091 07 1256'}</div>
          <div className="pet-name">NOMBRE <strong>{animal.nombre}</strong></div>
          <div className="pet-details" style={{ display: 'flex', flexDirection: 'column' }}>
            <span>ESPECIE <strong>{animal.especie}</strong></span>
            <span>RAZA <strong>{animal.raza || '-'}</strong></span>
            <span>EDAD <strong>{animal.edad}</strong></span>
            <span>SEXO <strong>{animal.sexo}</strong></span>
          </div>
        </div>
      </div>

      {/* VACUNAS */}
      <div className="section">
        <h3>VACUNAS ({animal.vacunas.length})</h3>
        <ul className="list">
          {animal.vacunas.map((v, i) => (
            <li key={i}><span>{v.fecha}</span> {v.descripcion}</li>
          ))}
        </ul>
        <button onClick={() => abrirModal('vacunas')}>+ Añadir Vacuna</button>
      </div>

      {/* ATENCIONES */}
      <div className="section">
        <h3>ATENCIONES ({animal.atenciones.length})</h3>
        <ul className="list">
          {animal.atenciones.map((a, i) => (
            <li key={i}><span>{a.fecha}</span> {a.descripcion}</li>
          ))}
        </ul>
        <button onClick={() => abrirModal('atenciones')}>+ Añadir Atención</button>
      </div>

      {/* TURNOS */}
      <div className="section2">
        <h3>TURNOS ({animal.turnos.length})</h3>
        <ul className="list">
          {animal.turnos.map((t, i) => (
            <li key={i}><span>{t.fecha}</span> {t.descripcion}</li>
          ))}
        </ul>
        <button onClick={() => abrirModal('turnos')}>+ Añadir Turno</button>
      </div>

      {/* MODAL */}
      {modalVisible && (
        <div className="modal" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div className="modal-content" style={{
            backgroundColor: 'white', padding: '20px', borderRadius: '10px',
            minWidth: '300px'
          }}>
            <h3>Agregar entrada a {tipoEntrada}</h3>
            <input type="date" value={nuevaEntrada.fecha} onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, fecha: e.target.value })} />
            <input type="text" placeholder="Descripción" value={nuevaEntrada.descripcion} onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, descripcion: e.target.value })} />
            <div className="modal-actions" style={{ marginTop: '10px' }}>
              <button onClick={guardarEntrada}>Guardar</button>
              <button onClick={cerrarModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
