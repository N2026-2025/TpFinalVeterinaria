import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  // Estados para inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para errores
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    // Simple regex para validar email
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // reset error

    if (!validateEmail(email)) {
      setError('Por favor ingresa un email válido.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Aquí podrías hacer la llamada a backend para autenticar
    // Si todo bien, redirigir:
    navigate('/panel');
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <img src="../public/logopetcare.png" alt="Logo" className="logo" />
        <h1>Iniciar Sesión</h1>
      </header>

      <form onSubmit={handleSubmit} className="login-form" noValidate>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Ingresar</button>

        {error && <p className="login-error">{error}</p>}
      </form>

      <p>
        ¿No tienes cuenta? <a href="/registro">Regístrate</a>
      </p>
    </div>
  );
}

export default Login;
