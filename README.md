
# mysql 常见增删改查操作
use artist_blog;
select * from users;
insert into users (userName, `password`, nickName) values ("张三1111", "1234561", "小二11" );
update users set userName='蔡博' where id='1';
select version();
select userName, password from users;
select userName, password, nickName from users where userName="张三1" or nickName="小二";
select id, userName, password, nickName from users where nickName like '%1%' order by id desc;
delete from users where id=11;
