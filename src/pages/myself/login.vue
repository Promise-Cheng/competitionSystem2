<template>
  <div>
    <h2 style="line-height: 3 ">欢迎登录</h2>
    <el-divider></el-divider>
    <div class="el-main">

      <el-menu
        :default-active="this.$route.path"
        class="el-menu-demo"
        mode="horizontal"
        router>
        <el-menu-item index="/login" style="width: 50%">登录</el-menu-item>
        <el-menu-item index="/register" style="width: 50%">注册</el-menu-item>
      </el-menu>

      <el-row class="el-row">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-input
              placeholder="请输入学号"
              prefix-icon="el-icon-user"
              v-model="stuId" style="width: 85%">
            </el-input>
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              show-password
              v-model="password" style="width: 85%">
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row class="el-row">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-button @click="login" v-loading.fullscreen.lock="Loading"
                       type="primary" style="width: 60%" round>登录
            </el-button>
          </div>
        </el-col>
      </el-row>

    </div>
  </div>

</template>

<script>
  import * as api from '@/api/api'

  export default {
    name: "login",
    data() {
      return {
        radio: '1',
        stuId: '',
        password: '',
        activeIndex: '1',
        Loading: false
      };
    },
    methods: {
      login() {
        const params = new URLSearchParams();
        if (this.radio === '1') {
          params.append('stuNum', this.stuId);
        } else {
          params.append('teaId', this.stuId);       //你要传给后台的参数值 key/value
        }
        params.append('password', this.password);
        this.Loading = true;
        api.common.login({stuNum: this.stuId, password: this.password}).then((res) => {
          if (res.result === 'success') {
            this.$store.dispatch('getUserInfo', res.info)
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            this.$router.push('/home')
          } else {
            this.Loading = false
            this.$message({
              message: '用户名或密码错误',
              type: 'error'
            });
          }
        }).catch((err) => {
          Toast.fail(err)
          this.Loading = false
        })
      },
    }
  }
</script>

<style>
  .el-main {
    border: aqua 2px;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .el-row {
    line-height: 1.7;
  }
</style>
