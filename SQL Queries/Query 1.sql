Use notesdb;

create table `User` (
`NotesID` int(11) not null auto_increment,
`Name` varchar(45) default null,
`Content` text,
primary key(`NotesID`)
) engine = InnoDB auto_increment = 0 default charset = utf8mb4 collate = utf8mb4_0900_ai_ci;

lock tables `User` write;
insert into `User` values (1, 'Notes for CS', 'We need to complete DP as soon as possible. Then jump on to OS.'),
(2, 'Notes for OS', 'We need to complete CN as soon as possible. Then jump on to Maths.'),
(3, 'Notes for OOPS', 'We need to complete DA as soon as possible. Then jump on to DBMS.'),
(4, 'Notes for DSA', 'We need to complete History as soon as possible. Then jump on to ML.');
unlock tables;