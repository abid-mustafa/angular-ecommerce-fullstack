const { getConnectionPool } = require('../database');
const db = getConnectionPool();

module.exports.getUserByName = async (name, password) => {
    try {
        const [[records]] = await db.query("SELECT * FROM users WHERE name = ?", [name])
        return records;
    } catch (error) {
        throw error;
    }
}

module.exports.getAllUsers = async () => {
    try {
        const [records] = await db.query('SELECT * FROM users');
        return records;
    }
    catch (error) {
        throw error;
    }
}