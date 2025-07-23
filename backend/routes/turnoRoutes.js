const express = require('express');

const router = express.Router();

const db = require('../config/db');
 
// ✅ Ruta POST /api/tareas agregada acá directamente

router.post('/tareas', async (req, res) => {

  try {

    const { nombre, descripcion } = req.body;
 
    if (!nombre || !descripcion) {

      return res.status(400).json({ mensaje: 'Faltan campos requeridos' });

    }
 
    await db.query('INSERT INTO tarea (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);

    res.status(201).json({ mensaje: 'Tarea guardada correctamente' });

  } catch (err) {

    console.error(err);

    res.status(500).json({ mensaje: 'Error al guardar la tarea' });

  }

});
 
// GET /api/mascota/:id

router.get('/:id', async (req, res) => {

  const id = req.params.id;
 
  try {

    const [mascota] = await db.query('SELECT * FROM mascota WHERE id = ?', [id]);

    if (!mascota.length) return res.status(404).json({ mensaje: 'Mascota no encontrada' });
 
    const [vacunas] = await db.query('SELECT * FROM vacuna WHERE mascota_id = ?', [id]);

    const [atenciones] = await db.query('SELECT * FROM atencion WHERE mascota_id = ?', [id]);

    const [turnos] = await db.query('SELECT * FROM turno WHERE mascota_id = ?', [id]);
 
    res.json({

      ...mascota[0],

      vacunas,

      atenciones,

      turnos

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({ mensaje: 'Error del servidor' });

  }

});

router.post('/tareas', async (req, res) => {
  try {
    const { Animal_ID, tipo, descripcion, fecha } = req.body;
 
    if (!Animal_ID || !tipo || !descripcion || !fecha) {
      return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
    }
 
    // Aquí haces la inserción, por ejemplo en tabla 'tarea' con campos acorde,
    // si quieres mantener tabla 'motivo' debes cambiar o eliminar este router
    // para no chocar con server.js.
 
    // Si usas db.query, pero no tienes tabla 'tarea' que acepte esos campos,
    // te conviene hacer una query con 'motivo' para no romper.
    // Por ejemplo:
    const tipoMap = {
      turno: 'Control',
      vacuna: 'Vacuna',
      peluqueria: 'Peluquería',
      quirofano: 'Quirófano'
    };
    const columna = tipoMap[tipo.toLowerCase()];
    if (!columna) {
      return res.status(400).json({ mensaje: 'Tipo de tarea no válido' });
    }
 
    const sql = `
      INSERT INTO motivo (Animal_ID, \`${columna}\`, Fecha)
      VALUES (?, 1, ?)
    `;
 
    await db.query(sql, [Animal_ID, fecha]);
 
    // Crear JSON en /data (opcional, según lo de server.js)
    const fs = require('fs');
    const path = require('path');
    const dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
 
    const tarea = { Animal_ID, tipo, descripcion, fecha };
    const fileName = `tarea_${Date.now()}.json`;
    const filePath = path.join(dataDir, fileName);
 
    fs.writeFileSync(filePath, JSON.stringify(tarea, null, 2));
 
    res.status(201).json({ mensaje: 'Tarea guardada correctamente' });
 
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al guardar la tarea' });
  }
});
 
// GET /api/turno?id=1

router.get('/', async (req, res) => {

  const id = req.query.id || 1;
 
  try {

    const [rows] = await db.query('SELECT * FROM turno WHERE id = ?', [id]);

    if (!rows.length) return res.status(404).json({ mensaje: 'Turno no encontrado' });
 
    res.json(rows[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({ mensaje: 'Error del servidor' });

  }

});
 
module.exports = router;

 