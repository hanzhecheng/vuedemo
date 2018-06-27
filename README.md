# 一个简单的Vue 后台管理项目

## 主要技术 Vue+Vuex+Vue-Router+Element-UI+Axios 

##### 安装依赖
npm install
##### 运行项目
npm run dev
##### 打包项目
npm run build

### 主要目录结构
* api(接口文件)
* assets(资源文件)
* components(复用组件)
* config(配置:服务地址等)
* pages(页面)
* plugins(插件)
* router(路由)
* store(状态管理)
* utils(工具类)

### 主要完成功能
1. 登录
    * 登陆页(简单做了下),根据用户密码,服务端验证,用户信息存储在Vuex中
2. 路由权限控制
  * 首先设置基础路由(参考router下的`basicRouters`),登录成功后,跳转首页
  * 路由设置导航守卫(`router.beforeEach`),根据权限获取可操作菜单,返回可操作路由(参考store下的`permission.js`),动态加载(`router.addRoutes`)到路由中
  * 需要注意的是,动态加载并不会真的把路由信息加载到routers中,因此还需要额外的routes.push操作
  * 用户刷新后vuex中保存的信息会清除,会再次进行上述操作,正常跳转不会每次都查询权限加载路由
  * 路由中的组件选择用懒加载的模式,例如  
    ```const Layout = () => import(/* webpackChunkName: "Layout" */'@/pages/' + 'Layout/Layout'); ```  
    其中`/* */`这部分可以不需要写,这里写出来主要是调试的时候,如果不写这个,js文件名称会变成数字,不方便查找,  
    dev环境下,可以不用懒加载,因为会影响速度,可以在production下走懒加载模式
  
  ### 2018-06-27 更新
  * 修复一些bug,菜单增加tab页签,增加tab页签数量较多时滚动
    

