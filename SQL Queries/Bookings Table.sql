Use notesdb;

CREATE TABLE bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  train_id INT NOT NULL,
  user_id INT NOT NULL,
  no_of_seats INT NOT NULL,
  seat_numbers JSON NOT NULL,
  FOREIGN KEY (train_id) REFERENCES trains(train_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
) engine = InnoDB default charset = utf8mb4 collate = utf8mb4_0900_ai_ci;

-- Insert bookings
INSERT INTO bookings (train_id, user_id, no_of_seats, seat_numbers) VALUES
(1, 2, 2, '[5, 6]'),
(2, 3, 1, '[7]'),
(3, 1, 3, '[1, 2, 3]');

