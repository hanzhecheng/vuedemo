<template>
    <div>
        <template v-for="(item,index) in routers" v-if="item.children&&item.children.length>0">
            <el-submenu v-if="!isSingle(item.children)" :index="item.path" :key="index">
                <template slot="title">
                    <span> {{item.meta.title}}</span>
                </template>
                <template v-for="(child,cindex) in item.children">
                    <item-menu v-if="child.children&&child.children.length" :routers="[child]" :key="cindex"></item-menu>
                    <el-menu-item v-else :key="cindex" :index="item.path+'/'+child.path">
                        <span> {{child.meta.title}}</span>
                    </el-menu-item>
                </template>

            </el-submenu>
            <el-menu-item :index="item.children[0].path" v-else :key="index">
                <span>{{item.children[0].meta.title}}</span>
            </el-menu-item>
        </template>
        <el-menu-item :index="item.path" v-else :key=index>
            {{item.meta.title}}
        </el-menu-item>
    </div>

</template>

<script>
export default {
  name: 'ItemMenu',
  props: {
    routers: {
      type: Array
    }
  },
  methods: {
    //router有single属性的，单独列出来，不需要有sub
    isSingle(children) {
      let single = children.filter(item => {
        return item.single
      })
      return single.length ? true : false
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

