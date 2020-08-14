
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


# vue相关

# vue-render 使用jsx语法

1. vue默认自带jsx语法，和react写法一样

2. 插槽的使用默认插槽： this.slots.default， 具名插槽：this.$slots.[name] --name > 插槽的名字

3. 作用域插槽：this.$scopedSlots[name]({city: '重庆'});  示例 --  <div>{this.$scopedSlots.default({ name: this.name })}</div>


4. const Test = require("Test.vue).default -- require引入vue文件时，默认要加上default才能成功，import就不需要

