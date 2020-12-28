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