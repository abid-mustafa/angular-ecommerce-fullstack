const { getConnectionPool } = require('../database');
const db = getConnectionPool();

// [records] destructures the object so that only the first element is stored in rows
module.exports.getAllCategories = async () => {
    try {
        const [records] = await db.query("SELECT * FROM categories");
        return records
    }
    catch (error) {
        throw error;
    }
}

module.exports.addCategory = async (obj) => {
    try {
        const [records] = await db.query('INSERT INTO categories (name, description) VALUES (?, ?)',
            [obj.name, obj.description]
        );
        return records
    }
    catch (error) {
        throw error;
    }
}