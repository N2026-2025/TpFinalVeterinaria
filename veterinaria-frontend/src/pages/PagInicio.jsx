import React, { useState } from 'react';
import '../CSS/PagInicio.css'; // asegurate de que exista este archivo

const FichaMascota = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTipo, setModalTipo] = useState('');
  const [nuevaEntrada, setNuevaEntrada] = useState({ fecha: '', descripcion: '' });

  const [data, setData] = useState({
    vacunas: [
      { fecha: '2023-06-18', descripcion: 'DESPARASITANTE' },
      { fecha: '2023-05-14', descripcion: 'DESPARASITANTE' },
      { fecha: '2023-03-09', descripcion: 'VITAMINA B12' }
    ],
    atenciones: [
      { fecha: '2023-06-18', descripcion: 'CONTROL BIMESTRAL' },
      { fecha: '2023-04-10', descripcion: 'DESPARASITACIÓN' }
    ],
    turnos: [
      { fecha: '2023-08-20', descripcion: 'VACUNA ANUAL' },
      { fecha: '2023-10-05', descripcion: 'CONTROL' }
    ]
  });

  const abrirModal = (tipo) => {
    setModalTipo(tipo);
    setModalVisible(true);
    setNuevaEntrada({ fecha: '', descripcion: '' });
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const guardarEntrada = () => {
    if (!modalTipo || !nuevaEntrada.fecha || !nuevaEntrada.descripcion) return;

    setData({
      ...data,
      [modalTipo]: [...data[modalTipo], nuevaEntrada]
    });

    cerrarModal();
  };

  return (
    <div className="panel-container">
      <div className="pet-header">
        <img src="/Imagenes/descarga (1).jpeg" alt="Foto de mascota" className="pet-photo" />
        <div className="pet-info">
          <div className="pet-id">2000 50091 07 1256</div>
          <div className="pet-name">NOMBRE <strong>BELL</strong></div>
          <div className="pet-details">
            <span>ESPECIE <strong>HAMSTER</strong></span>
            <span>RAZA <strong>-</strong></span>
            <span>EDAD <strong>1</strong></span>
            <span>SEXO <strong>H</strong></span>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>VACUNAS ({data.vacunas.length})</h3>
        <ul className="list">
          {data.vacunas.map((v, i) => (
            <li key={i}><span>{v.fecha}</span> {v.descripcion}</li>
          ))}
        </ul>
        <button onClick={() => abrirModal('vacunas')}>+ Añadir Vacuna</button>
      </div>

      <div className="section">
        <h3>ATENCIONES ({data.atenciones.length})</h3>
        <ul className="list">
          {data.atenciones.map((a, i) => (
            <li key={i}><span>{a.fecha}</span> {a.descripcion}</li>
          ))}
        </ul>
        <button onClick={() => abrirModal('atenciones')}>+ Añadir Atención</button>
      </div>

      <div className="section2">
        <h3>TURNOS ({data.turnos.length})</h3>
        <ul className="list">
          {data.turnos.map((t, i) => (
            <li key={i}><span>{t.fecha}</span> {t.descripcion}</li>
          ))}
        </ul>
        <button onClick={() => abrirModal('turnos')}>+ Añadir Turno</button>
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h3>Agregar entrada a {modalTipo.toUpperCase()}</h3>
            <input
              type="date"
              value={nuevaEntrada.fecha}
              onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, fecha: e.target.value })}
            />
            <input
              type="text"
              placeholder="Descripción"
              value={nuevaEntrada.descripcion}
              onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, descripcion: e.target.value })}
            />
            <div className="modal-actions">
              <button onClick={guardarEntrada}>Guardar</button>
              <button onClick={cerrarModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FichaMascota;
