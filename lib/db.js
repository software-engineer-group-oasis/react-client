import mysql from 'mysql2/promise'

// 创建连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'house_rental',
    port: 3307,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default pool