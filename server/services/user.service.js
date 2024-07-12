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

module.exports.addUser = async (obj) => {
    try {
        const [records] = await db.query(
            `INSERT INTO users (name, password)
             SELECT ?, ?
             WHERE NOT EXISTS (
             SELECT 1 FROM users WHERE name = ?
             )`
            , [obj.name, obj.password, obj.name]);
            return records;
    }
    catch (error) {
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