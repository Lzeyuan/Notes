use mysql;
delete from mysql.user where user='root' and Host='%';
flush privileges;

create user 'leza'@'%' identified by 'LIZIEN&2024';
grant all on *.* to 'leza'@'%' with grant option;
flush privileges;