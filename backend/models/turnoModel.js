// models/turnoModel.js
const pool = require('../db');

async function obtenerTurnoPorId(id) {
  const [rows] = await pool.query('SELECT dia, hora, lugar FROM turnos WHERE id = ?', [id]);
  return rows[0]; // puede ser undefined si no existe
}

module.exports = { obtenerTurnoPorId };