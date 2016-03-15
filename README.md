# fe-start

### 介绍
    基于gulp/webpack/ES6的前端框架

### 技术栈
- handlebarsjs[http://www.handlebarsjs.org/]
- webpack 模块化处理

### 开始
1. `git clone project url`
2. `cd project dir`
3. `npm install`
4. `npm run dev`


### 文件目录
```
├── dist  // 生产环境静态资源打包目录
├── src
│   ├── common
│   │   ├── components   // 公共组件
│   │   │   ├── Button
│   │   │   ├── Footer
│   │   │   ├── Header
│   │   │   └── layout
│   │   ├── images       // 公用图片
│   │   │   └── webpack.png
│   │   ├── js           // 公用js
│   │   ├── less         // 公用css
│   │   └── lib          // 公用lib
│   │  
│   ├── configs            // 配置文件
│   │   ├── pathMap.json   // 资源路径配置
│   │   └── routes
│   │       ├── APIRouter.json  // API接口路由
│   │       └── router.json     // 路由配置
│   ├── mock   // 数据MOCK
│   │  
│   └── views  // 视图
│       ├── demo
│       │   ├── index.hbs
│       │   ├── script.js
│       │   └── style.less
│       ├── demo1
│       │   ├── img
│       │   ├── index.hbs
│       │   ├── script.js
│       │   └── style.less
│       └── demoViews
│           └── demo1
├── LICENSE
├── README.md
├── gulpfile.babel.js  // gulp配置文件
├── package.json
├── routes.js
├── server.js          // 调试启动服务器
└── webpack            // webpack配置文件
    ├── webpack.config.js
    └── webpack.prod.config.js

```

### 前端单独开发
- 配置路由(router.json)
- API接口路由配置(APIRouter.json)

### 使用MOCK系统
