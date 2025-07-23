// controllers/turnoController.js
const { obtenerTurnoPorId } = require('../models/turnoModel');

const getTurno = async (req, res) => {
  const id = req.query.id || 1;
  try {
    const turno = await obtenerTurnoPorId(id);
    if (!turno) {
      return res.status(404).json({ mensaje: 'Turno no encontrado' });
    }
    res.json(turno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

module.exports = { getTurno };

// turnoController.js
const db = require('./db'); // o './conexion', como hayas llamado al pool

const listarTurnos = async (req, res) => {
  const result = await db.query('SELECT * FROM turnos');
  res.json(result.rows);
};

const crearTurno = async (req, res) => {
  const { mascota, fecha, motivo } = req.body;
  await db.query('INSERT INTO turnos (mascota, fecha, motivo) VALUES ($1, $2, $3)', [mascota, fecha, motivo]);
  res.json({ mensaje: 'Turno creado' });
};

module.exports = { listarTurnos, crearTurno };

// Definir un esquema para el modelo
const usuarioSchema = new mysql.Schema({
nombre: String,
edad: Number,
email: String
});

// Crear un nuevo documento
const nuevoUsuario = new Usuario({
  nombre: 'Ana Gomez',
  edad: 28,  // Número, no string
  email: 'ana.gomez@example.com'
});

// Guardar el nuevo usuario en la base de datos
nuevoUsuario.save((err, usuarioGuardado) => {
  if (err) return console.error('Error al guardar:', err);
  console.log('Usuario guardado:', usuarioGuardado);
});

// ACTUALIZAR Usuario con updateOne
Usuario.updateOne(
  { email: 'ana.gomez@example.com' },     // Filtro
  { $set: { edad: 29 } },                 // Modificación
  (err, result) => {                      // Callback
    if (err) return console.error(err);
    console.log('Usuario actualizado:', result);
  }
);

// Encontrar un usuario por su email
Usuario.findOne({ email: 'ana.gomez@eJEMPLO.com' }, (err, usuario) => {
 if (err) return console.error(err);
     console.log('Usuario encontrado:', usuario);
 });

// Encontrar un usuario por su email
Usuario.findOne({ email: 'ana.gomez@eJEMPLO.com' }, (err, usuario) => {
 if (err) return console.error(err);
     console.log('Usuario encontrado:', usuario);
 });

// Guardar el documento en la base de datos
 nuevoUsuario.save((err, usuario) => {
if (err) return console.error(err);
     console.log('Usuario creado:', usuario);
});

// Eliminar un usuario por su email
   Usuario.deleteOne({ email: 'ana.gomez@eJEMPLO.com' }, (err) => {
if (err) return console.error(err);
     console.log('Usuario eliminado');
 });