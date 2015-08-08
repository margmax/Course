drop database if exists ipresentation;

create database if not exists ipresentation;

use ipresentation;

drop table if exists users;

create table if not exists users(
   user_id integer primary key auto_increment,
   username varchar(100) unique,
   password varchar(100),
   data text
)engine=innodb;