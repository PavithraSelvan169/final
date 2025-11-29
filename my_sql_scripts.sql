
create database final;

use final;

select user,host from mysql.user;
CREATE USER 'finaluser'@'%' IDENTIFIED BY 'finalpassword';
GRANT SELECT, INSERT, UPDATE, DELETE ON final.* TO 'finaluser'@'%';

select username from users;
create table users (
id int primary key, 
username varchar(100),
password varchar(100),
active bool default true)
;

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

insert into dataset1 values(1, "Strategy and roadmap are in place, and 
are implementing agentic AI initiatives", 16);
insert into dataset1 values(2,'Dont have a strategy either at 
organizational or functional level',7);
insert into dataset1 values(3,'Dont have a strategy,but have multiple initiatives across functions to develop innovative solutions that can be scaled up',39);
insert into dataset1 values(4,'Currently formulating a strategy',28);
insert into dataset1 values(5,'Finalized a strategy and are 
preparing a roadmap for implementation',10);


create table dataset2 (
	id int primary key, 
    current_state_of_adoption varchar(200), 
    percentage int
    );
    
    
select * from dataset2;

insert into dataset2 values(1, "Have implemented 
at scale", 2);
insert into dataset2 values(2,'Not interested in exploring',1);
insert into dataset2 values(3,'Have started exploring 
the potential',30);
insert into dataset2 values(4,'Considering experimenting with/deploying 
in the near future six to 12 months',31);
insert into dataset2 values(5,'Piloting some 
initial use cases ',23);
insert into dataset2 values(6,'Have implemented 
at partial scale',12);

commit;