<template>
  <div class="menu-panel" ref="menupanel">
    <div class="menuscroll" ref="menuscroll" :style="{transform:'translateX('+translate+'px)'}" @wheel="scroll">
      <div class="menu-panel-item" :class="{active:item.active}" @contextmenu.prevent="showOpera(index,$event)" v-for="(item,index) in router" :key="index" @click="setActive(index)">
        <router-link :to="item.path">{{item.title}}</router-link>
        <span v-if="item.path!=='/Home'" class="el-icon-close" @click.stop="removeMenu(index)"></span>
      </div>
    </div>

    <div class="operation" :style="{top:top+'px',left:left+'px'}" v-if="operaVis">
      <ul>
        <!-- <li @click="refresh">刷新</li> -->
        <li @click="closeCurrent">关闭当前</li>
        <li @click="closeLeft">关闭左侧</li>
        <li @click="closeRight">关闭右侧</li>
        <li @click="closeOther">关闭其它</li>
        <li @click="closeAll">关闭全部</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuTag',
  data() {
    return {
      router: [{ path: '/Home', title: '首页', name: 'Home', active: true }],
      top: 10,
      left: 10,
      operaVis: false,
      currentTag: '',
      translate: 0
    }
  },
  mounted() {
    this.$router.push({ path: '/Home' })
  },
  computed: {},
  methods: {
    setActive(index) {
      this.router.forEach((item, inx) => {
        inx === index
          ? this.$set(item, 'active', true)
          : this.$set(item, 'active', false)
      })
    },
    addRouter() {
      let index = this.router.findIndex(item => item.path == this.$route.path)
      if (index === -1) {
        // if (this.router.length == 8) {
        //   this.$message('打开的页签过多,请先关闭不用的页签')
        //   let currentInx = this.router.findIndex(item => item.active)
        //   this.$router.push({ path: this.router[currentInx].path })
        //   return
        // }
        let newrouter = {
          path: this.$route.path,
          name: this.$route.name,
          title: this.$route.meta.title
        }
        let arrlen = this.router.push(newrouter)
        this.$store.dispatch('add_Menus', newrouter)
        this.setActive(arrlen - 1)
      } else {
        this.setActive(index)
      }
    },
    removeMenu(index) {
      this.$store.dispatch('del_Menus', this.router[index])
      this.router.splice(index, 1)
      let len = this.router.length
      this.$router.push({ path: this.router[len - 1].path })
      this.setActive(len - 1)
      this.scrolltoCurrent();
    },
    hideOpera() {
      this.operaVis = false
    },
    showOpera(index, event) {
      if (index === 0) {
        return false
      }
      this.operaVis = true
      this.currentTag = index
      this.top = event.clientY
      this.left = event.clientX
    },
    refresh() {},
    closeCurrent() {
      this.removeMenu(this.currentTag)
    },
    closeLeft() {
      for (let index = 1; index < this.currentTag; index++) {
        this.$store.dispatch('del_Menus', this.router[1])
        this.router.splice(1, 1)
      }
      this.$router.push({ path: this.router[1].path })
      this.setActive(1)
    },
    closeRight() {
      let count = this.router.length
      for (let index = 1; index < count - this.currentTag; index++) {
        this.$store.dispatch('del_Menus', this.router[this.currentTag + 1])
        this.router.splice(this.currentTag + 1, 1)
      }
      this.$router.push({ path: this.router[this.currentTag].path })
      this.setActive(this.currentTag)
    },
    closeOther() {
      this.closeRight()
      this.closeLeft()
    },
    closeAll() {
      for (let index = this.router.length - 1; index > 0; index--) {
        this.$store.dispatch('del_Menus', this.router[index])
        this.router.splice(index, 1)
      }
      this.$router.push({ path: this.router[0].path })
      this.setActive(0)
    },
    scroll(event) {
      if (event.wheelDelta > 0) {
        this.translate = Math.min(0, this.translate + event.wheelDelta)
      } else {
        let realwidth = this.$refs.menuscroll.offsetWidth
        let maxwidth = this.$refs.menupanel.offsetWidth
        if (realwidth > maxwidth) {
          this.translate = maxwidth - realwidth
        } else {
          this.translate = 0
        }
      }
    },
    scrolltoCurrent() {
      let index = this.router.findIndex(item => item.path == this.$route.path)
      this.$nextTick(function() {
        let events = document.querySelectorAll('.menu-panel-item')
        let realwidth = this.$refs.menuscroll.offsetWidth
        let maxwidth = this.$refs.menupanel.offsetWidth
        let offsetLeft = events[index].offsetLeft
        let width = events[index].offsetWidth
        if (-this.translate + maxwidth < offsetLeft) {
          this.translate = maxwidth - offsetLeft - width
        } else if (offsetLeft + this.translate < maxwidth) {
          if (offsetLeft + width < maxwidth) {
            this.translate = 0
          } else {
            this.translate = maxwidth - (offsetLeft + width)
          }
        } else {
          this.translate = offsetLeft - (-this.translate + maxwidth) - 20
        }
      })
    }
  },
  watch: {
    $route() {
      this.addRouter()
      this.scrolltoCurrent()
    },
    operaVis() {
      if (this.operaVis) {
        document.body.addEventListener('click', this.hideOpera)
      } else {
        document.body.removeEventListener('click', this.hideOpera)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-panel {
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  display: flex;
  overflow: hidden;
}
.menuscroll {
  position: relative;
  white-space: nowrap;
  transition: transform 0.5s ease-in-out;
}
.menu-panel-item {
  display: inline-block;
  border: 1px solid #ddd;
  min-width: 50px;
  height: 30px;
  margin: 0 2px;
  margin-top: 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom: none;
  z-index: 10;
  a {
    padding: 10px;
    text-decoration: none;
    line-height: 30px;
    font-size: 0.8rem;
    &:visited {
      color: inherit;
    }
  }
}
.active {
  background-color: #e9ecf3;
  a {
    color: #6593ea !important;
  }
}
.el-icon-close {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  &:hover {
    background-color: #b4bccc;
    color: #fff;
  }
  &:before {
    transform: scale(0.7);
    display: inline-block;
  }
}
.operation {
  width: 120px;
  background: white;
  border-radius: 3px;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  position: fixed;
  z-index: 9999;
  ul {
    list-style-type: none;
    font-size: 12px;
    color: #333;
    font-weight: 400;
    padding: 0;
    margin: 0;
    li {
      cursor: pointer;
      padding: 5px;
      &:hover {
        background: #f3f3f3;
      }
    }
  }
}
</style>

