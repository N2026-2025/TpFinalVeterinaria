// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mysql', 
  database: 'petcaredatabase',
  port: 3306,
});

module.exports = pool;


// Importar mysql
   const mysql = require('mysql');
  // URL de conexión a mysql (asegúrate de reemplazar los valores por los correctos)
   const url = 'mysql://localhost:3306/server.js';
// Configuración de la conexión
mysql.connect(url, {
useNewUrlParser: true,
useUnifiedTopology: true
 });