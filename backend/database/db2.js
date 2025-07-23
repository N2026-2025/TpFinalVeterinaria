const sql = require('mssql');

const config = {
  user: 'TU_USUARIO_SQLSERVER',
  password: 'TU_CONTRASEÑA',
  server: 'localhost', // o IP/nombre de tu servidor SQL Server
  database: 'NOMBRE_DE_TU_BASE',
  options: {
    encrypt: false, // en local suele ser false
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Conectado a SQL Server');
    return pool;
  })
  .catch(err => console.log('Error de conexión a SQL Server:', err));

module.exports = {
  query: async (queryString, params = []) => {
    try {
      const pool = await poolPromise;
      const request = pool.request();

      // Agregar parámetros con nombre @param0, @param1...
      params.forEach((param, index) => {
        request.input(`param${index}`, param);
      });

      // Reemplazar los signos ? por @param0, @param1, ...
      let sqlQuery = queryString;
      params.forEach((_, index) => {
        sqlQuery = sqlQuery.replace('?', `@param${index}`);
      });

      const result = await request.query(sqlQuery);
      return result.recordset;
    } catch (error) {
      throw error;
    }
  },
};
