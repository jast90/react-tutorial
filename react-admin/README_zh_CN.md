
![push docker image to docker hub](https://github.com/jast90/react-tutorial/workflows/push%20docker%20image%20to%20docker%20hub/badge.svg) 
[docker hub](https://hub.docker.com/repository/docker/jast90/web-mall)

## 设置yarn taobao镜像

```
yarn config list
yarn config get registry
yarn config set registry https://registry.npm.taobao.org/
```

## 构建docker镜像

```
docker build -t mall-app -f Dockerfile .
```