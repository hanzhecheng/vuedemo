<template>
    <el-container>
        <el-main>
            <el-row type="flex" justify="center">
                <el-col :span="8">
                    <el-input placeholder="请输入用户名" v-model="userInfo.Name">
                    </el-input>
                    <span class="loginerr" v-if="!userInfo.Name&&loginstate">用户名不能为空!</span>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="8">
                    <el-input placeholder="请输入密码" v-model="userInfo.Password" type="password">
                    </el-input>
                    <span class="loginerr" v-if="!userInfo.Password&&loginstate">密码不能为空!</span>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="8">
                    <el-button type="primary" class="loginbtn" @click="login">登录</el-button>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        Name: 'admin',
        Password: '123456'
      },
      loginstate: false
    }
  },
  methods: {
    login() {
      this.validForm().then(res => {
        let self = this
        this.$store
          .dispatch('LoginByUsername', this.userInfo)
          .then(res => {
            self.$router.push({ path: '/Home' })
          })
          .catch(err => {
            this.log(err)
          })
      }).catch(err=>{
          
      })
    },
    validForm() {
      let self = this
      return new Promise((resolve, reject) => {
        self.loginstate = true
        self.userInfo.Name && self.userInfo.Password ? resolve("true") : reject("cuowu")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.loginbtn {
  width: 100%;
}
.el-row {
  margin-bottom: 2px;
}
.loginerr {
  float: left;
  font-size: 0.8em;
  color: red;
}
</style>
