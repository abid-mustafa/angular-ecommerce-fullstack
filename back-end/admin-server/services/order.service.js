const { getConnectionPool } = require('../database');
const dbConnectionPool = getConnectionPool();

module.exports.getOrders = async (limit, offset, customerId) => {
    try {
        const [records] = await dbConnectionPool.query(`
            SELECT *
            FROM orders
            WHERE customerId = ?
            LIMIT ? OFFSET ?;
            `,
            [customerId, limit, offset]);
        return records
    } catch (error) {
        throw error;
    }
}

module.exports.getOrdersCount = async (customerId) => {
    try {
        const [[records]] = await dbConnectionPool.query(`
            SELECT COUNT(*) AS count
            FROM orders
            WHERE customerId = ?
            `,
            [customerId]);
        return records
    } catch (error) {
        throw error;
    }
}
