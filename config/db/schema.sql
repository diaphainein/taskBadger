CREATE DATABASE taskBadger;

USE taskBadger;



CREATE TABLE users(
`u_id` INT(144) AUTO_INCREMENT PRIMARY KEY,
`name` VARCHAR(50) not null,
`password` VARCHAR(50) not null,
`email` VARCHAR(50) not null,
`phone_number` INTEGER(10) not null;

CREATE TABLE tasks(
`t_id` INT(144) AUTO_INCREMENT PRIMARY KEY,
`task` VARCHAR(50) not null,
`deadline` VARCHAR(50) not null,
`hourly` BOOLEAN default false,
`daily` BOOLEAN default false,
`weekly` BOOLEAN default false,
`complete` BOOLEAN default false,
`u_id` INT(144) default null, 
 FOREIGN KEY (u_id) references users (u_id) ON UPDATE CASCADE ON DELETE CASCADE,
date TIMESTAMP)ENGINE = InnoDB;