const db = require('../database')

// module.exports.addOrder = async (obj) => {
//     const [data] = await db.query("CALL add_order(?,?,?,?,?,?,?)",
//         [obj.customerId, obj.total, obj.orderNumber, obj.email, obj.address, obj.contact, JSON.stringify(obj.orderLines)]);
//         return data;
// }

module.exports.addOrder = async (obj) => {
    const dbConnection = await db.getConnection().beginTransaction();
    try {
        const orderLines = obj.orderLines;

        for (let index = o; index < orderLines.length; index++) {
            const element = array[index];
            await dbConnection.query(`
                UPDATE stocks
                SET quantity = quantity - ?
                WHERE productId = ?;
                `, [element.quantity, element.productId]);
        }
        await dbConnection.query("CALL add_order(?,?,?,?,?,?,?)",
            [obj.customerId, obj.total, obj.orderNumber, obj.email, obj.address, obj.contact, JSON.stringify(obj.orderLines)]);
        await dbConnection.commit();
    }
    catch (error) {
        console.log(error);
        await dbConnection.rollback();
    }
}

module.exports.getOrdersByCustomerId = async (customerId) => {
    const [data] = await db.query("SELECT orderNumber, total, timestamp FROM orders WHERE customerId = ?",
        [customerId]);
    console.log(data);
    return data
}

module.exports.getQuantity = async (productId) => {
    const [[data]] = await db.query("SELECT quantity FROM stocks WHERE productId = ?",
        [productId]);
    console.log(data);
    return data
}

// get products from db by ids

// check if the product is out-of-stock in the returned list of products