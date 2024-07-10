const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "ecommerce"
})

module.exports.getConnectionPool = () => {
    return mysqlPool;
}

module.exports.getConnection = async () => {
    return await this.mysqlPool.getConnection();
}