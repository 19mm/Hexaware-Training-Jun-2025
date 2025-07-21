create database roadready;

use roadready;

show tables;

drop database roadready;

desc user_roles;

select * from users;
truncate table users;
select * from user_roles;
update user_roles set roles="ADMIN" where user_id=4;
desc cars;

ALTER TABLE cars MODIFY COLUMN availability_status TINYINT(1) NOT NULL;

update cars set availability_status=1 where id=4;

select * from cars;

desc bookings;

select * from bookings;

desc reviews;

select * from reviews;

desc payments;

select * from payments;