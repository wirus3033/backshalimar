const db = require('../config/db');

class Notification {
    static async create(data) {
        const { type, message, entity_type, entity_id } = data;
        const [result] = await db.execute(`
            INSERT INTO notification (type, message, entity_type, entity_id) 
            VALUES (?, ?, ?, ?)
        `, [type, message, entity_type, entity_id]);
        return result;
    }

    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM notification ORDER BY date_creation DESC');
        return rows;
    }

    static async markAsRead(id) {
        const [result] = await db.execute('UPDATE notification SET is_read = TRUE WHERE IDNotification = ?', [id]);
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM notification WHERE IDNotification = ?', [id]);
        return result;
    }
}

module.exports = Notification;
