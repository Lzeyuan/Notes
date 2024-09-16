# Linux常用配置

## 常用命令
```bash
# 添加用户
sudo adduser leza

# 查看硬盘容量
df -h

# systemd检查服务状态、启动、停止、启动自启、重启
sudo systemctl status <服务名>
sudo systemctl start <服务名>
sudo systemctl stop <服务名>
sudo systemctl enable <服务名>
sudo systemctl restart <服务名>

# 查看端口占用
netstat -anp | grep 6379
```

## 设置环境变量
```bash
# 当前会话有效
export http_proxy='http://ip:port'    # 代理服务器ip地址和端口号
export https_proxy='http://ip:port'   # 代理服务器ip地址和端口号
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
```
如果要默认设置环境变量到下面文件追加指令
| 用户 | 环境配置文件 |
|-------|-------|
| 所有用户 | /etc/profile<br/>/etc/bashrc<br/>/etc/environment |
| root | ~./bashrc<br/>~./bash_profile |
| 普通用户 | ~/.bashrc |

修改配置文件（如`/etc/profile`、`~/.bashrc`）后，需要`source ~/.bashrc`  或者`新开终端`才生效。

## 开启SSH服务
```bash
# 安装
sudo apt install openssh-server
sudo dnf install openssh-server

# 使用密钥登陆
ssh 用户名@服务器IP -i 密钥路径
```
### 生成密钥
根据文档：[github生成密钥文档](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=windows)、
[最佳实践是什么？](https://security.stackexchange.com/questions/143442/what-are-ssh-keygen-best-practices)
```bash
# 新系统使用
ssh-keygen -t ed25519 -a 100
# 旧系统使用
ssh-keygen -t rsa -b 4096 -o -a 100

# 生成秘钥后会提示指定存放位置
# 生成：秘钥文件、秘钥文件.pub
# windows默认路径：C:\Users\用户名\.ssh
```
之后把公钥 (默认路径：`C:\Users\用户名\.ssh\秘钥文件名.pub`) 内容复制到`~/.ssh/authorized_keys`文件下，没有就手动新建。

### vscode配置
```bash
# 修改文件：C:\Users\用户名\.ssh\config
Host tx-cloud
    HostName [服务器ip]
    User [用户名]
    IdentityFile "C:\路径\秘钥文件名"
```

## 默认文件目录
| 用户 | 环境配置文件 |
|---|---|
| /root	        | 超级管理员的家目录 |
| /home/用户名	|  普通用户的家目录 |
| /bin	        | 命令文件目录，存放所有用户可以执行的目录 |
| /sbin	        | 管理员操作目录，存放只有管理员才可以使用的命令 |
| /boot	        | 存放系统内核、启动文件目录 |
| /dev	        | 存放设备文件（硬盘、光驱） |
| /etc	        | 存放系统程序和系统配置文件 |
| /var	        | 存放：日志文件、邮件、打印、数据库、软件包 |
| /lib	        | 存放系统程序的动态连接共享库文件 |
| /usr	        | 存放用户工具和程序 |
| /media	        | 可拆卸的媒介挂载点，例：U盘、光驱 |
| /proc	        | 存放映射系统信息的文件 |
| /mnt	        | 用于临时挂载存储设备的目录 |
| /opt	        | 第三方应用程序安装所存放的目录 |
| /tmp	        | 存放系统的临时文件 |
| /usr/loca/etc	| 程序配置文件 |