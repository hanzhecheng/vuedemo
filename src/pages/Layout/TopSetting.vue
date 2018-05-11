<template>
    <el-dropdown class="eldown">
        <span class="el-dropdown-link">
            <!-- <span class="el-icon-setting"></span> -->
            设置
            <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
                <span @click="LogOut">退出系统</span>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import { SetToken } from '@/utils/auth'
export default {
  name: 'TopSetting',
  props: {},
  methods: {
    LogOut() {
      SetToken('')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style scoped>
.eldown {
  float: right;
}
</style>
