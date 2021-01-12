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
const devServer = process.env.NODE_ENV === 'devServer';
const useMicroCache = process.env.MICRO_CACHE !== 'false';
const target = require('./config/romteAddress');
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

const app = express();

let renderer;
let readyPromise;

// SSR模板文件
const templatePath = resolve('./index.html');
if (isProd || devServer) {
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
      // 修改runInNewContext 值为true，使之能传递cookies透传
      runInNewContext: true
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
      res.status(500);
      res.redirect('/error?status=500');
      console.error(`error during render : ${req.url}`);
      console.error(err.stack);
    }
  };
  const context = {
    title: '哇咔漫画', // default title
    url: req.url,
    cookies: req.cookies
  };
  if (JSON.stringify(req.cookies) !== '{}') {
    res.cookie('access_token', req.cookies.access_token, {
      expires: new Date(new Date().getTime() + 14 * 86400000)
    });
    res.cookie('refresh_token', req.cookies.refresh_token, {
      expires: new Date(new Date().getTime() + 14 * 86400000)
    });
  }
  // 执行服务端渲染，返回的是服务端渲染的模板
  renderer.renderToString(context, (err, html) => {
    console.log(context.url, err);
    if (err) {
      return handleError(err);
    }
    res.send(html);
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`);
    }
  });
}

const serve = (path, cache) =>
  express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
  });
app.set('trust proxy', true);
app.disable('etag');
app.use(cookieParser());
app.use(compression({ threshold: 0 }));
app.use('/apple-app-site-association', serve('./dist/apple-app-site-association'));
app.use('/dist', serve('./dist', true));
app.use('/assets', serve('./assets', true));
app.use('/favicon.ico', serve('./favicon.ico', true));
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
  res.header('X-Forwarded-For', req.connection.remoteAddress);
  res.header('x-real-ip', req.connection.remoteAddress);
  // console.log('req-----------', req.hostname, req.connection.remoteAddress);
  if (req && req.cookies && req.cookies.access_token) {
    req.headers.authorization = req.cookies.access_token;
  }

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
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('X-Forwarded-For', req.connection.remoteAddress);
      console.log('接口请求url-----', process.env.VUE_ENV, req.url, req.connection.remoteAddress);
    }
  })
);

app.get(
  '*',
  isProd || devServer
    ? render
    : (req, res) => {
        readyPromise.then(() => render(req, res));
      }
);

const port = process.env.PORT || 9990;
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
