const { getConnection, getConnectionPool } = require('../database');
const dbConnectionPool = getConnectionPool();
let dbConnection;
getConnection().then((conn) => {
    dbConnection = conn;
});

module.exports.addOrder = async (obj) => {
    await dbConnection.beginTransaction();
    try {
        const orderLines = obj.orderLines;

        for (let line of orderLines) {
            await dbConnection.query(`
                UPDATE stocks
                SET quantity = quantity - ?
                WHERE productId = ?;
                `, [line.quantity, line.productId]);
        }
        await dbConnection.query("CALL add_order(?,?,?,?,?,?,?)",
            [obj.customerId, obj.total, obj.orderNumber, obj.email, obj.address, obj.contact, JSON.stringify(obj.orderLines)]);
        await dbConnection.commit();
    }
    catch (error) {
        console.log(error);
        await dbConnection.rollback();
        throw error;
    }
}

module.exports.getOrdersByCustomerId = async (customerId) => {
    try {
        const [records] = await dbConnectionPool.query("SELECT orderNumber, total, timestamp FROM orders WHERE customerId = ?",
            [customerId]);
        return records
    } catch (error) {
        throw error;
    }
}

module.exports.getQuantity = async (productId) => {
    try {
        const [[records]] = await dbConnectionPool.query(`
            SELECT 
                p.name,
                s.quantity
            FROM 
                products p
            INNER JOIN 
                stocks s ON p.id = s.productId
            WHERE p.id = ?
            `,[productId]);
        return records
    } catch (error) {
        throw error;
    }
}