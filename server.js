const fs = require('fs');
const path = require('path');
const LRU = require('lru-cache');
const express = require('express');
const proxyMiddleWare = require('http-proxy-middleware');
const compression = require('compression');
const microcache = require('route-cache');
const resolve = file => path.resolve(__dirname, file);
const { createBundleRenderer } = require('vue-server-renderer');
const cookieParser = require('cookie-parser');
const isProd = process.env.NODE_ENV === 'production';
const useMicroCache = process.env.MICRO_CACHE !== 'false';
const target = require('./config/romteAddress');
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

const app = express();

let renderer;
let readyPromise;
const routesSSR = [
  '/home',
  '/recommend',
  '/detail',
  '/ranking',
  '/topic',
  '/comments',
  '/discovery'
];

// SSR模板文件
const templatePath = resolve('./index.html');
// 非SSR模板文件
// const templateClient = resolve('./dist/index.html');
if (isProd) {
  // In production: create server renderer using template and built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const template = fs.readFileSync(templatePath, 'utf-8');
  const bundle = require('./dist/vue-ssr-server-bundle.json');
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  });
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('./build/setup-dev-server')(app, templatePath, (bundle, options) => {
    renderer = createRenderer(bundle, options);
  });
}

function createRenderer(bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      // for component caching
      cache: LRU({
        max: 100,
        maxAge: 1000
      }),
      // this is only needed when vue-server-renderer is npm-linked
      basedir: resolve('./dist'),
      // recommended for performance
      runInNewContext: false
    })
  );
}

function render(req, res) {
  const s = Date.now();
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Server', serverInfo);

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url);
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found');
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error');
      console.error(`error during render : ${req.url}`);
      console.error(err.stack);
    }
  };
  const context = {
    title: '漫画威龙', // default title
    url: req.url,
    cookies: req.cookies
  };
  // 执行服务端渲染，返回的是服务端渲染的模板
  // if (routesSSR.indexOf(req.path) > -1) {
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err);
    }
    res.send(html);
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`);
    }
  });
  // } else {
  //   // 客户端渲染，返回客户端渲染模板
  //   const content = fs.readFileSync(templateClient, 'utf-8');
  //   res.body = content;
  //   res.send(content);
  //   console.log('非服务端渲染，进入客户端');
  // }
}

const serve = (path, cache) =>
  express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
  });
app.use(cookieParser());
app.use(compression({ threshold: 0 }));
app.use('/dist', serve('./dist', true));
app.use('/assets', serve('./assets', true));
app.use('/manifest.json', serve('./manifest.json', true));
app.use('/service-worker.js', serve('./dist/service-worker.js'));
app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl));
// 允许所有域名跨域
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
  );
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  // 跨域请求CORS中的预请求
  if (req.method === 'OPTIONS') {
    res.send(200); //让options请求快速返回
  } else {
    next();
  }
});
// 服务器代理
app.use(
  '/api',
  proxyMiddleWare({
    // target: 'http://10.1.15.99:9501/',
    target: isProd ? target.prod : target.dev,
    // target: 'http://192.168.10.245:9501/',
    changeOrigin: true,
    pathRewrite: {},
    onProxyReq: (proxyReq, req, res) => {
      console.log('接口请求url-----', req.url);
      // proxyReq.setHeader('Authorization', req.cookies.token);
    }
  })
);

app.get(
  '*',
  isProd
    ? render
    : (req, res) => {
        readyPromise.then(() => render(req, res));
      }
);

const port = process.env.PORT || 9990;
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});