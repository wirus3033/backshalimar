CREATE TABLE IF NOT EXISTS notification (
    IDNotification INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    entity_type VARCHAR(50),
    entity_id INT
);
