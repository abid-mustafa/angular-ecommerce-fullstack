
const { getConnectionPool } = require('../database');
const db = getConnectionPool();

// [records] destructures the object so that only the first element is stored in rows
module.exports.getAllProducts = async () => {
    try {
        const [records] = await db.query(`
            SELECT 
                p.id AS id,
                p.name AS name,
                p.description AS description,
                p.price AS price,
                p.image as image,
                c.name AS categoryName
            FROM 
                products p
            INNER JOIN 
                categories c ON p.categoryId = c.id`);
        return records
    }
    catch (error) {
        throw error;
    }
}