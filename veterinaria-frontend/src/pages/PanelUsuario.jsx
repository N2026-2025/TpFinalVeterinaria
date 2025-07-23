import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/panel.css';

const PanelUsuario = () => {
  const navigate = useNavigate();

  const [usuario] = useState({
    nombre: 'pet',
    correo: 'petcare@gmail.com',
    usuario: 'petcare',
  });

  const [tareas, setTareas] = useState([]);
  const [formData, setFormData] = useState({
    Nombre: '',
    Especie: '',
    Animal_ID: '',
    Genero: '',
    Chip_N: '',
    Senas_Particulares: '',
    Fecha_de_Nacimiento: '',
    titulo: '',
    fecha: '',
    tipo: ''
  });

  useEffect(() => {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    setTareas(tareasGuardadas);
  }, []);

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const handleLogout = () => {
    localStorage.removeItem('tareas');
    navigate('/');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmitAnimal = async (e) => {
    e.preventDefault();

    const nuevoAnimal = {
      Nombre: formData.Nombre,
      Especie: formData.Especie,
      Animal_ID: formData.Animal_ID,
      Genero: formData.Genero,
      Chip_N: formData.Chip_N,
      Senas_Particulares: formData.Senas_Particulares,
      Fecha_de_Nacimiento: formData.Fecha_de_Nacimiento,
      id: Date.now(),
    };

    try {
      const response = await fetch('http://localhost:3001/api/animales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoAnimal),
      });
      const data = await response.json();
      console.log('Guardado en MySQL:', data);
    } catch (error) {
      console.error('Error al guardar en backend:', error);
    }

    console.log('📤 Enviando animal al backend:', nuevoAnimal);
  };

  const handleSubmitTarea = async (e) => {
    e.preventDefault();

    const nuevaTarea = {
      Animal_ID: formData.Animal_ID,
      tipo: formData.tipo,
      descripcion: formData.titulo,
      fecha: formData.fecha,
      id: Date.now(),
    };

    setTareas((prevTareas) => {
      const actualizadas = [...prevTareas, nuevaTarea];
      localStorage.setItem('tareas', JSON.stringify(actualizadas));
      return actualizadas;
    });

    try {
      const response = await fetch('http://localhost:3001/api/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaTarea),
      });
      const data = await response.json();
      console.log('Tarea guardada en backend:', data);
    } catch (error) {
      console.error('Error al guardar tarea en backend:', error);
    }

    setFormData({
      ...formData,
      titulo: '',
      fecha: '',
      tipo: ''
    });
  };

  const eliminarTarea = (id) => {
    const filtradas = tareas.filter(t => t.id !== id);
    setTareas(filtradas);
  };

  const tareasPorTipo = (tipo) => tareas.filter(t => t.tipo === tipo);

  return (
    <div className="panel-container">
      <div className="logo">
        <img src="../../Imagenes/logopetcare2.png" alt="Logo appPet" />
      </div>

      <h1 className="app-title">Panel de Usuario</h1>

      <div className="user-info">
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p><strong>Usuario:</strong> {usuario.usuario}</p>
      </div>

      <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>

      <form onSubmit={handleSubmitTarea} className="form-tarea">
        <input type="text" id="titulo" placeholder="Ej: Turno con el veterinario" value={formData.titulo} onChange={handleInputChange} required />
        <input type="date" id="fecha" value={formData.fecha} onChange={handleInputChange} required />
        <select id="tipo" value={formData.tipo} onChange={handleInputChange} required>
        <option value="">Seleccionar tipo</option>
        <option value="turno">Control</option>
        <option value="quirofano">Quirófano</option>
        <option value="vacuna">Vacunación</option>
        <option value="peluqueria">Peluquería</option>
        </select>
        <button type="submit">Agregar tarea</button>
      </form>

{['turno', 'quirofano', 'vacuna', 'peluqueria'].map(tipo => (
<div key={tipo}>
<h2>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}s</h2>
<ul className="lista-tareas">
      {tareasPorTipo(tipo).map(t => (
<li key={t.id}>
          {t.descripcion} - {t.fecha}
<button className="delete-button" onClick={() => eliminarTarea(t.id)}>🗑️</button>
</li>
      ))}
</ul>
</div>
))}

      <form onSubmit={handleSubmitAnimal} className="form-tarea">
        <input type="text" id="Nombre" placeholder="Nombre" value={formData.Nombre} onChange={handleInputChange} required />
        <input type="number" id="Animal_ID" placeholder="ID" value={formData.Animal_ID} onChange={handleInputChange} required />
        <input type="text" id="Especie" placeholder="Especie" value={formData.Especie} onChange={handleInputChange} required />
        <input type="text" id="Genero" placeholder="Género" value={formData.Genero} onChange={handleInputChange} required />
        <input type="number" id="Chip_N" placeholder="Chip" value={formData.Chip_N} onChange={handleInputChange} required />
        <input type="text" id="Senas_Particulares" placeholder="Señas particulares" value={formData.Senas_Particulares} onChange={handleInputChange} />
        <input type="date" id="Fecha_de_Nacimiento" value={formData.Fecha_de_Nacimiento} onChange={handleInputChange} required />
        <button type="submit">Agregar animal</button>
        <button type="button" onClick={() => navigate('/nuevo-animal')}>Registrar nuevo animal</button>
      </form>



      <ul className="background-circles">
        {Array.from({ length: 10 }).map((_, i) => <li key={i}></li>)}
      </ul>
    </div>
  );
};


export default PanelUsuario;
