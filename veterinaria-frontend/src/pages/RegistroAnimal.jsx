// src/pages/RegistroAnimal.jsx
import React, { useState } from 'react';

const RegistroAnimal = () => {
  const [form, setForm] = useState({
    Nombre: '',
    Animal_ID: '',
    Especie: '',
    Genero: '',
    Chip_N: '',
    Senas_Particulares: '',
    Fecha_de_Nacimiento: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/animales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Animal registrado correctamente');
        setForm({
          Nombre: '',
          Animal_ID: '',
          Especie: '',
          Genero: '',
          Chip_N: '',
          Senas_Particulares: '',
          Fecha_de_Nacimiento: '',
        });
      } else {
        alert('❌ Error: ' + data.error);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Error de red o servidor.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '1rem' }}>
      <h2>Registrar Nuevo Animal</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Nombre" placeholder="Nombre" value={form.Nombre} onChange={handleChange} required /><br />
        <input type="number" name="Animal_ID" placeholder="N° de id" value={form.Animal_ID} onChange={handleChange} /><br />
        <input type="text" name="Especie" placeholder="Especie" value={form.Especie} onChange={handleChange} required /><br />
        <input type="text" name="Genero" placeholder="Género" value={form.Genero} onChange={handleChange} required /><br />
        <input type="number" name="Chip_N" placeholder="N° de chip" value={form.Chip_N} onChange={handleChange} /><br />
        <input type="text" name="Senas_Particulares" placeholder="Señas particulares" value={form.Senas_Particulares} onChange={handleChange} /><br />
        <input type="date" name="Fecha_de_Nacimiento" value={form.Fecha_de_Nacimiento} onChange={handleChange} required /><br />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistroAnimal;
