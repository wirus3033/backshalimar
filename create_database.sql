-- Base de donnees MySQL utilisee par l'API backshalimar.
-- Ce script est idempotent : il peut etre execute plusieurs fois.

CREATE DATABASE IF NOT EXISTS base_shalimar
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE base_shalimar;

-- Les tables de reference doivent etre creees avant les tables qui les utilisent.
CREATE TABLE IF NOT EXISTS profil (
    IDprofil INT UNSIGNED NOT NULL AUTO_INCREMENT,
    libele VARCHAR(100) NOT NULL,
    PRIMARY KEY (IDprofil),
    UNIQUE KEY uq_profil_libele (libele)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS statusChambre (
    idStatus INT UNSIGNED NOT NULL AUTO_INCREMENT,
    libele VARCHAR(100) NOT NULL,
    PRIMARY KEY (idStatus),
    UNIQUE KEY uq_status_chambre_libele (libele)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS uniter (
    IDUniter INT UNSIGNED NOT NULL AUTO_INCREMENT,
    libelle VARCHAR(100) NOT NULL,
    PRIMARY KEY (IDUniter),
    UNIQUE KEY uq_uniter_libelle (libelle)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS utilisateur (
    IDutilisateur INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL DEFAULT '',
    prenom VARCHAR(100) NOT NULL DEFAULT '',
    email VARCHAR(191) NOT NULL,
    telephone VARCHAR(30) NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    IDprofil INT UNSIGNED NULL,
    PRIMARY KEY (IDutilisateur),
    UNIQUE KEY uq_utilisateur_email (email),
    KEY idx_utilisateur_profil (IDprofil),
    CONSTRAINT fk_utilisateur_profil
        FOREIGN KEY (IDprofil) REFERENCES profil (IDprofil)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS chambre (
    IDChambre INT UNSIGNED NOT NULL AUTO_INCREMENT,
    numero_Chambre VARCHAR(30) NOT NULL,
    tarif DECIMAL(12,2) NOT NULL,
    IDstatusChambre INT UNSIGNED NOT NULL,
    PRIMARY KEY (IDChambre),
    UNIQUE KEY uq_chambre_numero (numero_Chambre),
    KEY idx_chambre_status (IDstatusChambre),
    CONSTRAINT fk_chambre_status
        FOREIGN KEY (IDstatusChambre) REFERENCES statusChambre (idStatus)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS reservation (
    IDReservation INT UNSIGNED NOT NULL AUTO_INCREMENT,
    date_dossier DATE NOT NULL,
    nom_client VARCHAR(191) NOT NULL,
    date_entree DATE NOT NULL,
    date_sortie DATE NOT NULL,
    IDChambre INT UNSIGNED NOT NULL,
    PUChambre DECIMAL(12,2) NOT NULL,
    duree INT UNSIGNED NOT NULL,
    montant_total DECIMAL(12,2) NOT NULL,
    montant_paye DECIMAL(12,2) NOT NULL DEFAULT 0,
    reste_a_payer DECIMAL(12,2)
        GENERATED ALWAYS AS (montant_total - montant_paye) STORED,
    informations_complementaires TEXT NULL,
    PRIMARY KEY (IDReservation),
    KEY idx_reservation_chambre (IDChambre),
    KEY idx_reservation_dates (date_entree, date_sortie),
    KEY idx_reservation_date_dossier (date_dossier),
    CONSTRAINT fk_reservation_chambre
        FOREIGN KEY (IDChambre) REFERENCES chambre (IDChambre)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS achat (
    IDAchat INT UNSIGNED NOT NULL AUTO_INCREMENT,
    date_achat DATE NOT NULL,
    produit VARCHAR(150) NOT NULL,
    quantite DECIMAL(10,2) NOT NULL,
    PU DECIMAL(12,2) NOT NULL,
    IDUniter INT UNSIGNED NOT NULL,
    montant DECIMAL(14,2)
        GENERATED ALWAYS AS (quantite * PU) STORED,
    observation TEXT NULL,
    PRIMARY KEY (IDAchat),
    KEY idx_achat_uniter (IDUniter),
    KEY idx_achat_date (date_achat),
    CONSTRAINT fk_achat_uniter
        FOREIGN KEY (IDUniter) REFERENCES uniter (IDUniter)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

-- entity_type/entity_id est une reference generique : aucune cle etrangere
-- n'est possible car entity_id peut designer plusieurs tables.
CREATE TABLE IF NOT EXISTS notification (
    IDNotification INT UNSIGNED NOT NULL AUTO_INCREMENT,
    type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    date_creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    entity_type VARCHAR(50) NULL,
    entity_id INT UNSIGNED NULL,
    PRIMARY KEY (IDNotification),
    KEY idx_notification_date (date_creation),
    KEY idx_notification_non_lue (is_read, date_creation),
    KEY idx_notification_entite (entity_type, entity_id)
) ENGINE=InnoDB;

-- Donnees minimales permettant de creer des utilisateurs, chambres et achats.
INSERT IGNORE INTO profil (libele) VALUES
    ('Administrateur'),
    ('Receptionniste'),
    ('Utilisateur');

INSERT IGNORE INTO statusChambre (libele) VALUES
    ('Disponible'),
    ('Occupee'),
    ('En maintenance');

INSERT IGNORE INTO uniter (libelle) VALUES
    ('Unite'),
    ('Kilogramme'),
    ('Litre');

