const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));

// Conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'petcaredatabase',
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar con MySQL:', err);
  } else {
    console.log('✅ Conectado a MySQL');
  }
});

// Crear carpeta /data si no existe
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Crear carpeta /tareas si no existe
const tareasDir = path.join(__dirname, 'tareas');
if (!fs.existsSync(tareasDir)) {
  fs.mkdirSync(tareasDir);
}


// Rutas externas
const turnoRoutes = require('./routes/turnoRoutes');
app.use('/api', turnoRoutes);

// 🐾 POST para guardar animal en tabla `datos_de_animal` y archivo JSON
app.post('/api/animales', (req, res) => {
  const datos = req.body;

  if (
    !datos.Nombre || !datos.Animal_ID || !datos.Especie || !datos.Genero ||
    !datos.Chip_N || !datos.Senas_Particulares || !datos.Fecha_de_Nacimiento
  ) {
    return res.status(400).json({ error: 'Faltan datos obligatorios del animal' });
  }

  const sql = `
    INSERT INTO datos_de_animal
    (Nombre, Animal_ID, Especie, Genero, Chip_N, Senas_Particulares, Fecha_de_Nacimiento)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(sql, [
    datos.Nombre,
    datos.Animal_ID,
    datos.Especie,
    datos.Genero,
    datos.Chip_N,
    datos.Senas_Particulares,
    datos.Fecha_de_Nacimiento,
  ], (err, result) => {
    if (err) {
      console.error('❌ Error al insertar en datos_de_animal:', err);
      return res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }

    const filename = `animal_${Date.now()}.json`;
    const filepath = path.join(dataDir, filename);

    fs.writeFile(filepath, JSON.stringify(datos, null, 2), (err) => {
      if (err) {
        console.error('⚠️ Error al guardar archivo JSON:', err);
        return res.status(500).json({ error: 'Guardado parcial (archivo falló)' });
      }

      console.log(`✅ Animal guardado: ID ${datos.Animal_ID}, archivo ${filename}`);
      res.status(201).json({ mensaje: 'Animal registrado correctamente' });
    });
  });
});

app.post('/api/tareas', (req, res) => {
  const { titulo, fecha, tipo, Animal_ID, } = req.body;

  if (!titulo || !fecha || !tipo || !Animal_ID ) {
    return res.status(400).json({ error: 'Faltan datos (titulo, fecha o tipo , Animal_ID)' });
  }

  const tarea = {
    titulo,
    fecha,
    tipo,
    Animal_ID,
    id: Date.now()
  };
  
const camposFaltantes = [];
if (!titulo) camposFaltantes.push('titulo');
if (!fecha) camposFaltantes.push('fecha');
if (!tipo) camposFaltantes.push('tipo');

if (camposFaltantes.length > 0) {
  return res.status(400).json({ error: `Faltan datos: ${camposFaltantes.join(', ')}` });
}

  const fileName = `tarea_${tarea.id}.json`;
  const filePath = path.join(tareasDir, fileName);

  fs.writeFile(filePath, JSON.stringify(tarea, null, 2), (err) => {
    if (err) {
      console.error('⚠️ Error al guardar archivo JSON:', err);
      return res.status(500).json({ error: 'Error al guardar archivo JSON' });
    }

    let columna = '';
    if (tipo === 'turno') columna = 'turno';
    else if (tipo === 'vacunacion') columna = 'vacunacion';
    else if (tipo === 'quirofano') columna = 'quirofano';
    else if (tipo === 'peluqueria') columna = 'peluqueria';
    else return res.status(400).json({ error: 'Tipo inválido' });

    const sql = `INSERT INTO motivo (\`${columna}\`) VALUES (?)`;
    connection.query(sql, [titulo], (err, result) => {
      if (err) {
        console.error('❌ Error al insertar en motivo:', err);
        return res.status(500).json({ error: 'Error en base de datos' });
      }

      console.log(`✅ Tarea guardada: ${titulo} en ${columna}, archivo ${fileName}`);
      res.status(201).json({ mensaje: 'Tarea registrada correctamente' });
    });
  });
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
