# H5 部署

1. 环境要求
   - 服务器需要安装 nodejs
   - 需要安装 npm 包管理器
   - 需要全局安装 pm2，执行：npm install pm2 -g
2. 命令
   - 开发环境
       - 拉取到代码后，执行：npm install
       - 执行 npm install 后，执行 npm run build:dev 命令
       - 将生成的 dist 目录，项目根目录下的 index.html, build, config, server.js package.json 拷贝到服务器目录
       - 在服务器目录下执行 npm install
       - 在服务器目录下执行 pm2 start npm --watch --name cartoon -- run start:dev
   - 测试&生产环境
       - 拉取到代码后，执行：npm install
       - 执行 npm install 后，执行 npm run build 命令
       - 将生成的 dist 目录，项目根目录下的 index.html, build, config, server.js package.json 拷贝到服务器目录
       - 在服务器目录下执行 npm install
       - 在服务器目录下执行 pm2 start npm --watch --name cartoon -- run start
4. tag 命名：
   - build*test*日期时间
   - build*prod*日期时间
5. api地址配置文件
   - 系统请求的api远程地址配置在项目根目录下 /config/romteAddress.js中，dev对应为开发环境，prod对应为线上部署环境
