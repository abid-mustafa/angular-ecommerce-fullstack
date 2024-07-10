const { getConnectionPool } = require('../database');
const db = getConnectionPool();

module.exports.getUserByName = async (name, password) => {
    const [[records]] = await db.query("SELECT * FROM users WHERE name = ?", [name])
    console.log(records);
    return records
}

module.exports.getAll = async () => {
    const [records] = await db.query("SELECT * FROM users")
    return records
}

module.exports.addUser = async (obj) => {
    const [data] =  await db.query(
        `INSERT INTO users (name, password)
         SELECT ?, ?
         WHERE NOT EXISTS (
         SELECT 1 FROM users WHERE name = ?
         )`
        , [obj.name, obj.password, obj.name]);
    console.log(data);
    return data;
}