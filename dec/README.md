        ------------
        |----[bin]
        |	|-www
        |
        |----[public]
        |	|--------[css]	//css文件夹，若干css文件
        |	|--------[img]	//img文件夹，若干img文件
        |	|--------[less]	//less文件夹，若干less文件
        |	|--------[lib]	//lib文件夹，若干js库和组件
        |	|--------[js]
        |			|------[models]	//js集合，暂未用到
        |			|------[routers]	//js路由
        |			|		|-------router.js
        |			|------[views]	//js视图
        |			|		|----home.js
        |			|------app.js
        |			|------bundle.js
        |			|------templates.js
        |
        |----[routes]
        |	|--------[api]
        |       |               |--------[config]
        |       |               |                |---------config.json          //设置http响应头交互的配置文件
        |       |               |                |---------dataSerialization.js //对http交互返回结果进行解析，判断服务状态码并json序列化
        |       |               |                |---------dateFormat.js        //对日期函数Date()进行原型prototype扩展
        |       |               |                |---------getIP.js             //获得客户端ip地址
        |       |               |                |---------httpInterface.js     //公共的http响应函数接口
        |	|		|------index.js
        |	|
        |	|--------index.js
        |
        |----[views]
        |	|-------danger.html
        |	|-------error.html
        |	|-------footer.html
        |	|-------header.html
        |	|-------home.html
        |	|-------index.html
        |	|-------more.html
        |	|-------safe.html
        |	|-------wuzei.html
        |       |-------等等文件
        |
        |----.gitignore //git过滤文件
        |----app.js     //不解释
        |----create.js  //创建静态js视图模板
        |----package.json       //...
        ------------
