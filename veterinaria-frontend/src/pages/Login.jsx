import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/index.css';

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Usuario:', usuario, 'Contraseña:', contrasena);
    navigate('/panel');
  };

  const handleRegister = () => {
    navigate('/registro');
  };

  return (
    <div className="login-container" style={{ position: 'relative', zIndex: 2 }}>
      <div className="logo">
        <img src="/Imagenes/logopetcare2.png" alt="Logo appPet" />
      </div>
      <h1 className="app-title">Pet Care</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="USUARIO"
          className="input-field"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="CONTRASEÑA"
          className="input-field"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <button type="submit" className="login-button">INICIAR SESIÓN</button>
        <button type="button" className="register-button" onClick={handleRegister}>REGISTRARSE</button>
      </form>

      {/* Si querés los círculos de fondo: asegurate que no bloqueen clics */}
      <ul className="background-circles" style={{ pointerEvents: 'none', zIndex: 0 }}>
        {Array.from({ length: 10 }).map((_, i) => <li key={i}></li>)}
      </ul>
    </div>
  );
};

export default Login;
