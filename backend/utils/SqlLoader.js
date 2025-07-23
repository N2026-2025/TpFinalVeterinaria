const fs = require('fs');
const mysql = require('mysql2/promise');

// Configuración de la conexión a MySQL
const config = {
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'nombre_de_tu_base',
};

async function ejecutarSQL() {
  let connection;

  try {
    // Leer el archivo SQL
    const sql = fs.readFileSync('script.sql', 'utf8');

    // Conectarse a MySQL
    connection = await mysql.createConnection(config);

    // Ejecutar el contenido completo
    const resultados = await connection.query(sql);

    console.log('SQL ejecutado correctamente.');
  } catch (err) {
    console.error('Error al ejecutar el SQL:', err.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

ejecutarSQL();

//Como ejecutar? node ejecutarSQL.js

