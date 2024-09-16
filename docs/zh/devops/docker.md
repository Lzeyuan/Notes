# Docker
## 网络
### 设置代理
```bash
# Docker daemon
sudo vi /etc/docker/daemon.json

# 内容
{
  "proxies": {
    "http-proxy": "http://192.168.116.189:10809",
    "https-proxy": "http://192.168.116.189:10809",
    "no-proxy": "*.test.example.com,.example.org,127.0.0.0/8"
  }
}

# 重启docker服务
sudo systemctl restart docker
```
### Macvlan只支持linux
详细见[Networking using a macvlan network](https://docs.docker.com/engine/network/tutorials/macvlan/)
> The macvlan networking driver only works on Linux hosts, and is not supported on Docker Desktop for Mac, Docker Desktop for Windows, or Docker EE for Windows Server.

## DockerCompose
```bash
sudo docker compose up
sudo docker compose restart
sudo docker compose down

# 重新构建镜像，然后启动服务
# 比如更新jar包后要重新构建镜像
sudo docker compose up --build
```
### mysql
custom.cnf
```bash
[mysqld]
skip-host-cache
skip-name-resolve
log-error=/var/log/mysql/error.log
log_timestamps=SYSTEM

[mysql]
default-character-set=utf8mb4


[client]
default-character-set=utf8mb4
```
init_user.sql
```sql
use mysql;
delete from mysql.user where user='root' and Host='%';
flush privileges;

create user 'leza'@'%' identified by 'LIZIEN&2024';
grant all on *.* to 'leza'@'%' with grant option;
flush privileges;
```

构建镜像
```Dockerfile
FROM mysql:5.7
COPY init_user.sql /docker-entrypoint-initdb.d/init_user.sql
COPY custom.cnf /etc/mysql/conf.d
```
docker-compose.yaml
```yaml
  mysql:
    build: .\mysql
    container_name: mysql
    shm_size: 128mb
    ports:
      - 3306:3306
    volumes:
      - D:\Development\Docker\LocalDevCompose\mysql\data:/var/lib/mysql
      - D:\Development\Docker\LocalDevCompose\mysql\log:/var/log/mysql
    environment:
      MYSQL_ROOT_PASSWORD: root&2024
      TZ: Asia/Shanghai
```