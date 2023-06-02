import mysql from 'mysql2/promise';

console.log("Creating connection pool... ");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'nguyen250802',
    database: 'nodejsbasic'
});

export default pool;