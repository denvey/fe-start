# fe-start
front end start up framework

### 介绍
    基于gulp/webpack/ES6的前端框架,主要简化开发中的工作,开发者只需要编写逻辑代码

### 技术栈
- handlebarsjs[http://www.handlebarsjs.org/]
- webpack 模块化处理

### 开始
1. `git clone project url`
2. `npm install`
3. `npm run dev`


### 文件目录
```
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