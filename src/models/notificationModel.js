const db = require('../config/db');
const socket = require('../config/socket');

class Notification {
    static async create(data) {
        const { type, message, entity_type, entity_id } = data;
        const [result] = await db.execute(`
            INSERT INTO notification (type, message, entity_type, entity_id) 
            VALUES (?, ?, ?, ?)
        `, [type, message, entity_type, entity_id]);
        const [rows] = await db.execute(
            'SELECT * FROM notification WHERE IDNotification = ?',
            [result.insertId]
        );
        socket.emit('notification:new', rows[0]);
        return result;
    }

    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM notification ORDER BY date_creation DESC');
        return rows;
    }

    static async markAsRead(id) {
        const [result] = await db.execute('UPDATE notification SET is_read = TRUE WHERE IDNotification = ?', [id]);
        if (result.affectedRows > 0) socket.emit('notification:read', { IDNotification: Number(id) });
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM notification WHERE IDNotification = ?', [id]);
        if (result.affectedRows > 0) socket.emit('notification:deleted', { IDNotification: Number(id) });
        return result;
    }
}

module.exports = Notification;
