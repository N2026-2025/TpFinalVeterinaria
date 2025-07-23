import React, { useState } from 'react';
import '../CSS/registro.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    usuario: '',
    contraseña: '',
    confirmarContraseña: ''
  });

  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setMensajeExito('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nombre, correo, usuario, contraseña, confirmarContraseña } = formData;

    // Validación mínima
    if (!nombre || !correo || !usuario || !contraseña || !confirmarContraseña) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Simulación de registro exitoso
    console.log('Datos enviados:', formData);

    setMensajeExito('Registro exitoso. Podés iniciar sesión.');
    setFormData({
      nombre: '',
      correo: '',
      usuario: '',
      contraseña: '',
      confirmarContraseña: ''
    });
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src="/Imagenes/logopetcare2.png" alt="Logo appPet" />
      </div>
      <h1 className="app-title">Crear cuenta</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          className="input-field"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          className="input-field"
          value={formData.correo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="usuario"
          placeholder="Nombre de usuario"
          className="input-field"
          value={formData.usuario}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          className="input-field"
          value={formData.contraseña}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmarContraseña"
          placeholder="Confirmar contraseña"
          className="input-field"
          value={formData.confirmarContraseña}
          onChange={handleChange}
          required
        />
        <button type="submit" className="register-button">REGISTRARSE</button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {mensajeExito && <p style={{ color: 'green', marginTop: '10px' }}>{mensajeExito}</p>}

      <ul className="background-circles">
        {Array.from({ length: 10 }).map((_, i) => <li key={i}></li>)}
      </ul>
    </div>
  );
};

export default Registro;
