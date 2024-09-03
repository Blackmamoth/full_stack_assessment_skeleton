USE home_db;

-- The new `user` table, which contains the user attributes from the original `user_home` table
CREATE TABLE IF NOT EXISTS user (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE (username, email)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- The new `home` table, which contains home related attributes from the original `user_home` table
CREATE TABLE IF NOT EXISTS home (
    id INT NOT NULL AUTO_INCREMENT,
    street_address VARCHAR(255) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    sqft FLOAT NOT NULL,
    beds INT DEFAULT 0,
    baths INT DEFAULT 1,
    list_price DECIMAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- This table is created to store user's interest, meaning this table stores records of whichever home a particular user is interested in
CREATE TABLE IF NOT EXISTS user_interests (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    home_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
    FOREIGN KEY (home_id) REFERENCES home (id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- indexes on user_interests table for better performance
CREATE INDEX idx_user_id ON user_interests (user_id);
CREATE INDEX idx_home_id ON user_interests (home_id);
CREATE INDEX idx_user_home ON user_interests (user_id, home_id);

 
-- migrate all the users from `user_home` table to the new `user` table
INSERT INTO user (username, email) SELECT DISTINCT username, email FROM user_home ORDER BY username;

-- migrate all the home details from `user_home` tables to the new `home` table
INSERT INTO home (street_address, state, zip, sqft, beds, baths, list_price) SELECT DISTINCT street_address, state, zip, sqft, beds, baths, list_price FROM user_home ORDER BY street_address;

-- store user_id and home_id pairs based on the homes a particular user is interested in
INSERT INTO user_interests (user_id, home_id) SELECT u.id AS user_id, h.id AS home_id FROM user_home uh JOIN user u ON uh.username = u.username JOIN home h ON h.street_address = uh.street_address;