-- 用户表
CREATE TABLE user(
    id int not null,
    name char(20),
    password char(32),
    avtor char(50),
    position char(50),
    phone char(20),
    email char(50),
    type int
);
-- 留言表
CREATE TABLE comment(
    id int not null,
    name char(20),
    phone char(20),
    comment varchar(300)
);
-- 公司表
CREATE TABLE company(
    id int not null,
    name char(50),
    phone char(20),
	email char(50),
    address char(60)
);
-- 产品分类表
CREATE TABLE product_category(
    id int not null,
    code int,
    category char(30)
);
-- 产品表
CREATE TABLE product(
    id int not null,
    product char(50),
    category char(30),
    picture1 char(50),
    picture2 char(50),
    picture3 char(50),
    intro varchar(300)
);
