import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Registro from './pages/Registro'
import PanelUsuario from './pages/PanelUsuario'
import FichaMascota from './pages/FichaMascota'
import RegistroAnimal from './pages/RegistroAnimal';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/panel" element={<PanelUsuario />} />
        <Route path="/mascota/:id" element={<FichaMascota />} />
        {/* otras rutas */} 
        <Route path="/nuevo-animal" element={<RegistroAnimal />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
