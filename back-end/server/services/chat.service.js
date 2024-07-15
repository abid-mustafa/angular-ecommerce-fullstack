const { getConnectionPool } = require('../database');
const db = getConnectionPool();

module.exports.getChat = async (room) => {
    try {
        const [records] = await db.query('SELECT * FROM chats WHERE room = ?', room);
        return records;
    }
    catch (error) {
        throw error;
    }
}

module.exports.getChatRooms = async () => {
    try {
        const [records] = await db.query('SELECT DISTINCT room FROM chats');
        return records;
    }
    catch (error) {
        throw error;
    }
}

module.exports.addChat = async (obj) => {
    try {
        await db.query('INSERT INTO chats (senderId, room, text) VALUES (?, ?, ?)', [obj.senderId, obj.room, obj.text]);
    }
    catch (error) {
        throw error;
    }
}