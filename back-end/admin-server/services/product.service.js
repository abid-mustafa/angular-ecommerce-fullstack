
const { getConnectionPool, getConnection } = require('../database');
const db = getConnectionPool();
let dbConnection;
getConnection().then((conn) => {
    dbConnection = conn;
});

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
                c.name AS categoryName,
                s.quantity
            FROM 
                products p
            JOIN 
                categories c ON p.categoryId = c.id
            JOIN
                stocks s on p.id = s.productId`);
        return records
    }
    catch (error) {
        throw error;
    }
}

module.exports.addProduct = async (obj) => {
    try {
        await dbConnection.beginTransaction();

        let [data] = await dbConnection.query('INSERT INTO products (name, description, price, image, categoryId) VALUES (?, ?, ?, ?, ?)',
            [obj.name, obj.description, obj.price, obj.image, obj.categoryId]);

        const productId = data.insertId;
        await dbConnection.query('INSERT INTO stocks (productId, quantity) VALUES (?, ?)', [productId, obj.quantity]);

        await dbConnection.query('INSERT INTO stock_history (productId, quantity) VALUES (?, ?)', [productId, obj.quantity]);

        await dbConnection.commit();
        return true
    }
    catch (error) {
        console.log(error);
        await dbConnection.rollback();
        throw error;
    }
}

module.exports.updateStock = async (obj) => {

}