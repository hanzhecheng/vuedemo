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
      <el-header style="height:40px;">
        <el-row class="headrow">
          <!-- <el-col :span="10">
            <bread-crumb :matchRouter="matchRouter"></bread-crumb>
          </el-col>
          <el-col :span="6" :offset="8">
            <top-setting></top-setting>
           
          </el-col> -->
          <el-col :span="24">
            <MenuTag></MenuTag>
          </el-col>
        </el-row>

      </el-header>
      <el-main class="main">
        <transition name="fade" mode="out-in">
          <keep-alive :include="cacheView">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
const Menu = () => import('@/pages/Layout/Menu')
const BreadCrumb = () => import('@/pages/Layout/BreadCrumb')
const TopSetting = () => import('@/pages/Layout/TopSetting')
const MenuTag = () => import('@/pages/Layout/MenuTag')
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
    TopSetting,
    MenuTag
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
    },
    cacheView() {
      return this.$store.getters.cacheView
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
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
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
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.headrow {
  width: 100%;
  height: 40px;
}
.main {
  background-color: #e9ecf3;
}
</style>
