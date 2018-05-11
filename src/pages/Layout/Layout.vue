<template>
  <el-container>
    <el-aside width="220px">
      <el-row>
        <el-col :span="24">
          <el-menu :default-active="this.$route.path" class="el-menu-hy" router unique-opened textColor="#bfcbd9" activeTextColor="#409EFF" backgroundColor="#304156">
            <Menu :routers="routers"></Menu>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-container>
      <el-header>
        <el-row class="headrow">
          <el-col :span="10">
            <bread-crumb :matchRouter="matchRouter"></bread-crumb>
          </el-col>
          <el-col :span="6" :offset="8">
            <top-setting></top-setting>
          </el-col>
        </el-row>

      </el-header>
      <el-main>
        <transition name="fade" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
const Menu = () => import(/* webpackChunkName: "Menu" */ '@/pages/Layout/Menu')
const BreadCrumb = () =>
  import(/* webpackChunkName: "BreadCrumb" */ '@/pages/Layout/BreadCrumb')
const BasicTrans = () =>
  import(/* webpackChunkName: "BasicTrans" */ '@/pages/Transition/BasicTrans')
const TopSetting = () =>
  import(/* webpackChunkName: "TopSetting" */ '@/pages/Layout/TopSetting')

export default {
  name: 'Layout',
  methods: {
    isSingle(children) {
      let single = children.filter(item => {
        return item.single
      })
      return single.length ? true : false
    }
  },
  components: {
    Menu,
    BreadCrumb,
    TopSetting
  },
  computed: {
    routers() {
      let router = this.$router.options.routes.filter(item => {
        return !item.hidden
      })
      return router
    },
    matchRouter() {
      let matched = this.$route.matched.filter(item => {
        return item.path !== ''
      })
      let home = matched[0]
      if (home && home.path !== '/Home') {
        matched.unshift({ path: '/Home', name: '首页', single: true })
      }
      return matched
    }
  }
}
</script>

<style scoped>
.el-container {
  height: 100vh;
}
.el-menu-hy {
  height: 100vh;
}
.el-header {
  height: 30px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
.el-submenu__title > span {
  font-size: 16px;
  font-family: 'Microsoft YaHei';
}
.el-submenu > ul > li {
  font-size: 14px;
  font-family: 'Microsoft YaHei';
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.headrow {
  width: 100%;
}
</style>
