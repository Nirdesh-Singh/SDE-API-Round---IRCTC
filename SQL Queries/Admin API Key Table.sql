Use notesdb;

CREATE TABLE admin_api_keys (
  id INT AUTO_INCREMENT PRIMARY KEY,
  api_key VARCHAR(255) NOT NULL
) engine = InnoDB default charset = utf8mb4 collate = utf8mb4_0900_ai_ci;

-- Insert admin API key
INSERT INTO admin_api_keys (api_key) VALUES
('your_admin_api_key_here');

