# 网络设置
redhat系使用NetworkManager，debian系使用netplan。
## Debian/Ubuntu
基于ubuntu24实测
```bash
# 重新获取DHCP
networkctl renew DEVICES...

# 查看网络工具
systemctl list-unit-files --type=service --state=enabled | grep network

# 重启网络，默认networkd，其他有：networking、NetworkManager
# sudo systemctl restart networking
# sudo systemctl restart NetworkManager
sudo systemctl restart systemd-networkd.service

# 重启网络还可以使用netplan
sudo netplan apply
```
> redhat发行版，重启网络参考：[How to Restart Network Interface in Linux](https://www.cyberciti.biz/faq/linux-restart-network-interface/)
>

### Netplan
Netplan是一层抽象，后端可以使用：`networkd`、`networking`、`NetworkManager`
```yaml
# vi /etc/netpaln/[配置文件.yaml]
network:
  version: 2
  renderer: networkd
  ethernets:
    # dhcp
    enp0s3:
      dhcp4: true
    # 静态IP
    enp0s8:
      addresses: [192.168.5.3/24]
      routes:
      - to: "default"
        via: "192.168.5.1"
      nameservers:
        # 如果一个用户尝试访问 server 而不是一个完整的域名，
        # DNS解析器会自动尝试 server.example.com 和 server.mydomain.local。
        search: [mydomain.com , otherdomain.local ]
        addresses: [192.168.5.1 , 114.114.114.114]
      optional: true
# 保存后sudo netplan apply
```

### 防火墙ufw
ufw默认 `inactive` 状态，要 `sudo ufw enable` 启动。

`sudo vi /etc/default/ufw` 修改 `IPV6=yes` 开启ipv6。
```bash
# 默认配置：deny (incoming), allow (outgoing), deny (routed)
# 开启防火墙
sudo ufw default allow ssh
sudo ufw enable
sudo ufw default reload

# 添加放行端口
sudo ufw allow allow 80/tcp
# 批量放行
sudo ufw allow 6000:6007/udp

# 添加放行IP
sudo ufw allow from 203.0.113.4

# 允许从网卡为eth1和IP为192.168.1.100进入的所有流量访问3306端口
sudo ufw allow in on eth1 from 192.168.1.100 to any port 3306

# deny同理

# 查看防火墙序号
sudo ufw status numbered
# 查看添加的规则
sudo ufw show added
# 删除规则
sudo ufw delete [序号]
sudo ufw delete allow [ufw syntax]
```

## Redhat
基于rocky linux 9实测
### 防火墙
```bash
# 重新加载防火墙配置
firewall-cmd --reload

# 80端口
firewall-cmd --permanent --add-service=http
firewall-cmd --add-port=9001/tcp --permanent #permanent代表永久添加 

# 查看防火墙端口是否开放，不能看--add-service的，用--list-services看
firewall-cmd --list-ports
```

## Windows
### 修改IP
```powershell
# 设置控制台输出编码为UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# 定义网络接口名称
$interfaceName = "以太网"

# 定义静态IP地址、子网掩码、默认网关和DNS服务器地址
$staticIP = "192.168.1.10"
$subnetMask = "255.255.255.0"
$defaultGateway = "192.168.1.1"
$dnsServer = "192.168.1.1"

# 设置静态IP地址
netsh interface ip set address name="$interfaceName" static $staticIP $subnetMask $defaultGateway

# 设置DNS服务器
netsh interface ip set dns name="$interfaceName" static $dnsServer

# 如果需要设置备用DNS服务器，可以使用以下命令
# netsh interface ip add dns name="$interfaceName"$secondaryDnsServer

# 显示配置结果
netsh interface ip show config name="$interfaceName"

```