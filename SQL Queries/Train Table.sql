Use notesdb;

CREATE TABLE trains (
  train_id INT AUTO_INCREMENT PRIMARY KEY,
  train_name VARCHAR(255) NOT NULL,
  source VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  seat_capacity INT NOT NULL,
  arrival_time_at_source TIME NOT NULL,
  arrival_time_at_destination TIME NOT NULL
) engine = InnoDB default charset = utf8mb4 collate = utf8mb4_0900_ai_ci;

-- Insert train details
INSERT INTO trains (train_name, source, destination, seat_capacity, arrival_time_at_source, arrival_time_at_destination) VALUES
('Express Train 1', 'Station A', 'Station B', 100, '14:00:00', '20:30:00'),
('Express Train 2', 'Station B', 'Station C', 120, '15:00:00', '21:30:00'),
('Local Train 1', 'Station A', 'Station C', 80, '13:00:00', '19:30:00');

