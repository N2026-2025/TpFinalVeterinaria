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

const turnoRoutes = require('./routes/turnoRoutes');
app.use('/api', turnoRoutes);

// 🚩 POST para guardar tareas en tabla MOTIVO
app.post('/api/tareas', (req, res) => {
  const { Animal_ID, tipo, fecha } = req.body;
 
  if (!Animal_ID || !tipo || !fecha) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
 
  // Mapeo del tipo (frontend) a columna real de la tabla `motivo`
  const tipoMap = {
    turno: 'Control',
    vacuna: 'Vacuna',
    peluqueria: 'Peluquería',
    quirofano: 'Quirófano'
  };
 
  const columna = tipoMap[tipo.toLowerCase()];
  if (!columna) {
    return res.status(400).json({ error: 'Tipo de tarea no válido' });
  }
 
  const sql = `
    INSERT INTO motivo (Animal_ID, \`${columna}\`, Fecha)
    VALUES (?, 1, ?)
  `;
 
  connection.query(sql, [Animal_ID, fecha], (err, result) => {
    if (err) {
      console.error('❌ Error al insertar tarea en MySQL:', err);
      return res.status(500).json({ error: 'Error al guardar tarea en base de datos' });
    }
 
    const tarea = { Animal_ID, tipo, fecha, id: result.insertId };
    const fileName = `tarea_${Date.now()}.json`;
    const filePath = path.join(dataDir, fileName);
 
    fs.writeFile(filePath, JSON.stringify(tarea, null, 2), (err) => {
      if (err) {
        console.error('⚠️ Error al guardar archivo JSON de tarea:', err);
        return res.status(500).json({ error: 'Guardado parcial (archivo falló)' });
      }
 
      console.log(`✅ Tarea guardada en motivo: ${columna} para Animal ${Animal_ID}, archivo ${fileName}`);
      res.status(201).json({ mensaje: 'Tarea registrada correctamente' });
    });
  });
});

// ✅ Bien
const sql = `
  INSERT INTO datos_de_animal
  (Nombre, Animal_ID, Especie, Genero, Chip_N, Senas_Particulares, Fecha_de_Nacimiento)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;
 
const filename = `animal_${Date.now()}.json`;
 
console.log(`✅ Animal guardado: ID ${datos.Animal_ID}, archivo ${filename}`);

// 🟢 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
