<template>
  <div>
    <h2 style="line-height: 3 ">欢迎登录</h2>
    <el-divider></el-divider>
    <div class="el-main">
      <el-row class="el-row">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-input
              placeholder="请输入学工号"
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
    <div class="text-desc text-center bottom_positon">{{ footerTips }}</div>
  </div>

</template>

<script>
export default {
  name: "login_tea",
  data() {
    return {
      radio: '2',
      stuId: '',
      password: '',
      activeIndex: '1',
      Loading: false,
      footerTips: '竞赛平台系统——教师端'
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
      this.$axios.post('/teacher/login',
        params
      ).then((res) => {
        if (res) {
          if (res.data.result === 'success') {
            this.Loading = false;
            this.$store.dispatch('getUserInfo')
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            this.$router.push('/teacher/home')
          } else {
            this.Loading = false;
            this.$message.error('用户名或密码错误');
          }
        }
      }).catch((err) => {
        this.Loading = false;
        this.$message.error("" + err);
      })
    }

  },
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

.bottom_positon {
  position: absolute;
  bottom: 30px;
  width: 100%;
}

.text-desc {
  font-size: 12px;
  color: #999;
}
</style>
