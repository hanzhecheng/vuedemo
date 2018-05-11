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
  // {
  //   path: '/g',
  //   name: "系统管理",
  //   component: layout,
  //   redirect: "noredirect",
  //   children: [
  //     {
  //       path: '23',
  //       name: '基础商户',
  //       component: Commodity_Info,
  //     },
  //     {
  //       path: '24',
  //       component: Commodity_Info,
  //       name: '用户管理',
  //     },
  //   ]
  // },
  {
    path: '/BusinessCircle',
    name: "智慧商圈",
    component: layout,
    redirect: "noredirect",
    children: [
      {
        path: '1',
        name: '商圈分析',
        component: Commodity_Info,
      },
      {
        path: '2',
        component: Commodity_Info,
        name: '商圈业种/品牌 关联度分析',
      },
      {
        path: '3',
        name: '商圈热力图',
      },
    ]
  },
  {
    path: '/PassengerFlow ',
    name: '智慧客流',
    redirect: "noredirect",
    component: layout,
    children: [
      {
        path: 'ArrivalAnalysis', component: User, name: '到店分析'
      },
      {
        path: 'ArrivalStructAnalysis', component: User, name: '到店结构分析'
      },

    ]

  },
  {
    path: '/Operating',
    name: '智慧运营',
    redirect: "noredirect",
    component: layout,
    children: [
      {
        path: '6', component: User, name: '分时段 空间布局热力图'
      },
      {
        path: 'POICatogory', component: User, name: '到店POI类型分析'
      },
      {
        path: 'POIBrand', component: User, name: '到店POI品牌分析'
      },
    ]
  },
  {
    path: '/Marketing',
    name: '智慧营销',
    redirect: "noredirect",
    component: layout,
  },
  {
    path: '/CompetitorAnalysis',
    name: '竞争对手分析',
    redirect: "noredirect",
    component: layout,
    children: [
      {
        path: '9', component: User, name: '到店分析'
      },
      {
        path: '10', component: User, name: '到店结构分析'
      },
      {
        path: '11', component: User, name: '商圈分析'
      },
      {
        path: '12', component: User, name: '商圈POI类型分析'
      },
      {
        path: '13', component: User, name: '商圈POI 分析'
      },
    ]
  },
  {
    path: '/UserPortrait',
    name: '客群画像',
    redirect: "noredirect",
    component: layout,
    children: [
      {
        path: 'ConsumptionDirection', component: User, name: '消费去向分析'
      },
      {
        path: '15', component: User, name: '消费关联分析'
      },
      {
        path: '16', component: User, name: '结构/POI类型/POI分析'
      },
    ]
  },
  {
    path: '/LaunchPlatform',
    name: '投放管理平台',
    redirect: "noredirect",
    component: layout,
  },
  {
    path: '/DataAsset',
    name: '数据资产',
    redirect: "noredirect",
    component: layout,
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
