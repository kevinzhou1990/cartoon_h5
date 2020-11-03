H5部署
====
1. 环境要求
    - 服务器需要安装nodejs
    - 需要安装npm包管理器
    - 需要全局安装pm2，执行：npm install pm2 -g
2. 命令
    - 拉取到代码后，执行：npm install
    - 执行npm install 后，执行npm run build命令
    - 将生成的dist目录，项目根目录下的index.html, build, server.js package.json 拷贝到服务器目录
    - 在服务器目录下执行npm install
    - 在服务器目录下执行
3. gitlib地址：
    - git@192.168.11.214:webh5/cartoon_h5.git
    - http://192.168.11.214:8087/webh5/cartoon_h5.git
4. tag命名：
    - build_test_日期时间
    - build_prod_日期时间
