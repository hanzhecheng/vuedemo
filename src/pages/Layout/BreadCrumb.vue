<template>
    <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item,index) in matchRouter" :key="index">
            <span v-if="item.redirect==='noredirect'||index==item.length-1">{{item.name}}</span>
            <router-link v-else :to="item.path">{{item.name}}</router-link>
          </el-breadcrumb-item>
        </el-breadcrumb>
</template>

<script>
export default {
    name:"BreadCrumb",
    props:{
        matchRouter:{
            type:Array,
            default:[]
        }
    }
}
</script>

<style>

</style>
