
create database final;

use final;

select user,host from mysql.user;
CREATE USER 'finaluser'@'%' IDENTIFIED BY 'finalpassword';
GRANT SELECT, INSERT, UPDATE, DELETE ON final.* TO 'finaluser'@'%';


select username from users;
-- create table users (
-- id int primary key, 
-- username varchar(100),
-- password varchar(100),
-- active bool default true)
-- ;
drop table users;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  fullname VARCHAR(200) NOT NULL,
  hashed_password VARCHAR(255) NOT NULL,
  active BOOL DEFAULT TRUE
);


select * from users;

insert into users values (1, 'pavithra', 'pavithra', true);
insert into users values (2, 'pavi', 'pavi', true);


commit;

-- drop table dataset1;

create table dataset1 (
	id int primary key, 
    implementation_strategy varchar(200), 
    Percentage int
    );
    

select * from dataset1;

-- insert into dataset1 values(1, "Strategy and Roadmap are in place, and 
-- are implementing agentic AI initiatives", 16);
-- insert into dataset1 values(2,'Dont have a strategy either at 
-- organizational or functional level',7);
-- insert into dataset1 values(3,'Dont have a strategy,but have multiple initiatives across functions to develop innovative solutions that can be scaled up',39);
-- insert into dataset1 values(4,'Currently formulating a strategy',28);
-- insert into dataset1 values(5,'Finalized a strategy and are 
-- preparing a roadmap for implementation',10);

insert into dataset1 values(1, 'Executing strategy', 16);
insert into dataset1 values(2, 'No strategy', 7);
insert into dataset1 values(3, 'Multiple initiatives', 39);
insert into dataset1 values(4, 'Strategy in progress', 28);
insert into dataset1 values(5, 'Roadmap in progress', 10);

-- drop table dataset2 ;
create table dataset2 (
	id int primary key, 
    current_state_of_adoption varchar(200), 
    percentage int
    );
    
    
select * from dataset2;

-- insert into dataset2 values(1, "Have implemented 
-- at scale", 2);
-- insert into dataset2 values(2,'Not interested in exploring',1);
-- insert into dataset2 values(3,'Have started exploring 
-- the potential',30);
-- insert into dataset2 values(4,'Considering experimenting with/deploying 
-- in the near future six to 12 months',31);
-- insert into dataset2 values(5,'Piloting some 
-- initial use cases ',23);
-- insert into dataset2 values(6,'Have implemented 
-- at partial scale',12);


insert into dataset2 values(1, 'At scale', 2);
insert into dataset2 values(2, 'Not interested', 1);
insert into dataset2 values(3, 'Exploring', 30);
insert into dataset2 values(4, 'Considering', 31);
insert into dataset2 values(5, 'Piloting', 23);
insert into dataset2 values(6, 'Partial scale', 12);
commit;


drop table maturity_prediction;
create table maturity_prediction
(
id integer primary key auto_increment,
maturity_level varchar(10),
period varchar(25),
percentage int);

insert into maturity_prediction (maturity_level, period, percentage ) values ('Level-0', 'Next 12 Months', 45);
insert into maturity_prediction (maturity_level, period, percentage ) values ('Level-1', 'Next 12 Months', 23);
insert into maturity_prediction (maturity_level, period, percentage ) values ('Level-2', 'Next 12 Months', 17);
insert into maturity_prediction (maturity_level, period, percentage ) values ('Level-3', 'Next 12 Months', 9);
insert into maturity_prediction (maturity_level, period, percentage ) values ('Level-4', 'Next 12 Months', 4);
insert into maturity_prediction (maturity_level, period, percentage ) values ('Level-5', 'Next 12 Months', 2);

insert into maturity_prediction (maturity_level, period, percentage ) values ('Level-0', 'Next 1-3 Years', 30);
insert into maturity_prediction (maturity_level, period, percentage ) values ('Level-1', 'Next 1-3 Years', 25);
insert into maturity_prediction (maturity_level, period, percentage ) values ('Level-2', 'Next 1-3 Years', 20);
insert into maturity_prediction (maturity_level, period, percentage ) values ('Level-3', 'Next 1-3 Years', 14);
insert into maturity_prediction (maturity_level, period, percentage ) values ('Level-4', 'Next 1-3 Years', 7);
insert into maturity_prediction (maturity_level, period, percentage ) values ('Level-5', 'Next 1-3 Years', 4);

select * from maturity_prediction;
commit;

alter table maturity_prediction
add id int primary key identity