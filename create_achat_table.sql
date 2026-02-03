CREATE TABLE IF NOT EXISTS achat (
    IDAchat INT AUTO_INCREMENT PRIMARY KEY,

    date_achat DATE NOT NULL,
    produit VARCHAR(150) NOT NULL,

    quantite DECIMAL(10,2) NOT NULL,
    PU DECIMAL(10,2) NOT NULL,

    IDUniter INT NOT NULL,

    montant DECIMAL(10,2)
        GENERATED ALWAYS AS (quantite * PU) STORED,

    observation TEXT,

    CONSTRAINT fk_achat_uniter
        FOREIGN KEY (IDUniter)
        REFERENCES uniter(IDUniter)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;
