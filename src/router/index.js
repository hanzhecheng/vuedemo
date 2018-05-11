import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { GetToken } from '@/utils/auth'
const layout = () => import(/* webpackChunkName: "Layout" */'@/pages/' + 'Layout/Layout');
const Home = () => import(/* webpackChunkName: "Home" */'@/pages/' + 'System/Home');
const Commodity_Info = () => import(/* webpackChunkName: "Commodity_Info" */'@/pages/' + 'Commodity/Commodity_Info');
const Login = () => import(/* webpackChunkName: "Login" */'@/pages/' + 'Login/Login');
const User = () => import(/* webpackChunkName: "User" */'@/pages/' + 'System/User');
const Layout = () => import(/* webpackChunkName: "Layout" */'@/pages/' + 'Layout/Layout');
const Err404 = () => import(/* webpackChunkName: "404" */'@/pages/' + 'ErrorPage/404');
Vue.use(Router)
//基础路由
const basicRouters = [
  {
    path: '/Login',
    hidden: true,
    component: Login,
    name: '登录'
  },
  {
    path: '/',
    component: layout,
    redirect: "/Home",
    children: [{ path: '/Home', component: Home, name: '首页', single: true }]
  },
];
//除基础路由外的所有路由，前端根据用户权限动态加载到路由中
export const otherRouter = [
  {
    path: '/a',
    name: "1",
    component: layout,
    redirect: "noredirect",
    children: [
      {
        path: '1',
        name: '1.1',
        component: Commodity_Info,
      },
      {
        path: '2',
        component: Commodity_Info,
        name: '1.2',
      },
      {
        path: '3',
        name: '1.3',
      },
    ]
  },
  {
    path: '/b ',
    name: '2',
    redirect: "noredirect",
    component: layout,
    children: [
      {
        path: '1', component: User, name: '2.1'
      },
      {
        path: '2', component: User, name: '2.2'
      },

    ]

  },
  {
    path: '/c',
    name: '3',
    redirect: "noredirect",
    component: layout,
    children: [
      {
        path: '1', component: User, name: '3.1'
      },
      {
        path: '2', component: User, name: '3.2'
      },
      {
        path: '3', component: User, name: '3.3'
      },
    ]
  },
  {
    path: '/d',
    name: '4',
    redirect: "noredirect",
    component: layout,
  },
  {
    path: '/e',
    name: '5',
    redirect: "noredirect",
    component: layout,
    children: [
      {
        path: '1', component: User, name: '5.1'
      },
      {
        path: '2', component: User, name: '5.2'
      },
      {
        path: '3', component: User, name: '5.3'
      },
      {
        path: '4', component: User, name: '5.4'
      },
      {
        path: '5', component: User, name:'5.5'
      },
    ]
  },
  {
    path: '*',
    name: '404',
    component: Err404,
    hidden: true,
  },
]
const router = new Router({
  routes: basicRouters
});
//导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  //没有token的用户,跳转到登陆页
  if (!GetToken()) {
    NProgress.done()
    if (to.path == "/Login") {
      next()
    } else {
      next('/Login')
    }
  } else {
    NProgress.done()
    //有token,但是刷新页面后vuex中数据清除，需要重新获取权限
    if (!store.getters.roles.length) {
      store.dispatch("SetUserRole", GetToken()).then(() => {
        store.dispatch("GetPermissionRouter", store.getters.roles).then((routers) => {
          //动态挂载路由，否则会找不到对应路由
          router.addRoutes(routers)
          //动态挂载不会将路由添加到router中，需要手动添加
          routers.forEach(item => {
            let inx = router.options.routes.findIndex(it => it.path == item.path);
            if (inx === -1) {
              router.options.routes.push(item)
            }

          })
          next({ ...to, replace: true })
        })
      })
    } else {
      next()
    }
  }
})
export default router;
