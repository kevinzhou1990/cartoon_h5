H5部署
====
1. 环境要求    
    - 服务器需要安装nodejs
    - 需要安装npm包管理器
2. 命令    
    - 拉取到代码后，执行：npm install
    - 执行npm install 后，执行npm run build命令
    - 将生成的dist目录，放到web容器中
3. 如需要转发，配置
    - 如下   
    '/api': {
        target: 'http://10.1.15.99:9501'
      }    
    - target 为后台接口地址
4. gitlib地址：    
    - git@192.168.11.214:webh5/cartoon_h5.git
    - http://192.168.11.214:8087/webh5/cartoon_h5.git
5. tag命名：
    - build_test_日期时间
    - build_prod_日期时间