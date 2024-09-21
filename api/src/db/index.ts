import mysql from 'mysql2';

export default  mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'QWeee231Rdff',
  database: 'db_pokedex'
})
