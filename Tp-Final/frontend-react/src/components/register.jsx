import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para registrar al usuario (API, validaciones, etc)
    // Por ahora solo redirige al login
    navigate('/');
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Crear Cuenta</h1>
      </header>

      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre completo" required />
        <input type="email" placeholder="Correo electrónico" required />
        <input type="password" placeholder="Contraseña" required />
        <input type="password" placeholder="Confirmar contraseña" required />
        <button type="submit" className="register-button">Registrarse</button>
      </form>

      <p className="register-text">
        ¿Ya tenés cuenta? <a href="/">Iniciar sesión</a>
      </p>
    </div>
  );
}

export default Register;
