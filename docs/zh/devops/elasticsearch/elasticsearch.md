# elasticsearch
## 本地安装
> 文档：https://www.elastic.co/guide/en/elasticsearch/reference/current/rpm.html#rpm-key
## docker
### 单节点
```yaml
services:
  es01:
    image: elasticsearch:8.15.2
    container_name: es01
    mem_limit: 1GB
    ports:
      - 9200:9200
    networks:
      - elastic

networks:
  elastic:
    driver: bridge
```
```bash
# 重新生成密码
docker exec -it es01 /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
# 生成令牌
docker exec -it es01 /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana

# 官方推荐把密码设置到环境变量
export ELASTIC_PASSWORD="your_password"

# 复制证书
docker cp es01:/usr/share/elasticsearch/config/certs/http_ca.crt .


```