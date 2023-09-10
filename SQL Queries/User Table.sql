Use notesdb;

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role ENUM('admin', 'loginUser') NOT NULL
) engine = InnoDB default charset = utf8mb4 collate = utf8mb4_0900_ai_ci;

-- Insert admin user
INSERT INTO users (username, password, email, role) VALUES
('admin', 'admin_password_hash', 'admin@example.com', 'admin');

-- Insert login users
INSERT INTO users (username, password, email, role) VALUES
('user1', 'user1_password_hash', 'user1@example.com', 'loginUser'),
('user2', 'user2_password_hash', 'user2@example.com', 'loginUser');

