<template>
  <div>
    <mt-header fixed title="我的相关信息" style="line-height: 20px;background-color: #F56C6C">
    </mt-header>
    <div>
      <div style="float: left" @click="myDetail">
        <el-button type="text">
          <el-avatar :size="80"> {{formLabelAlign.teaName}}</el-avatar>
        </el-button>
      </div>
      <br/>
      <div style="text-align: left" @click="myDetail">
        竞赛类型：{{formLabelAlign.CompName}}
      </div>
      <br/>
      <div style="text-align: left" @click="myDetail">
        教师ID:{{formLabelAlign.teaId}}
      </div>
      <br/>
    </div>
    <div style="margin-top: 20px">
      <mt-cell title="修改信息" is-link to="/teacher/editInfo"></mt-cell>
      <mt-cell v-if="formLabelAlign.teaId ===1001" title="添加教师账号" is-link to="/register_tea"></mt-cell>
      <mt-cell title="关于" is-link to="/myself/about"></mt-cell>
    </div>
    <div @click="login">
      <mt-cell style="text-align: center;color: #bfbfbf" title="注销"></mt-cell>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Footer from './teacherTabbar'
  import {mapState} from 'vuex'

  export default {
    name: "teacherMyself",
    components: {Footer},
    data() {
      return {
        version: '1.2',
        introduce: '初次开发系统，bug会有许多，如遇未知错误，请联系我们进行反馈，我们将尽快修复或优化相关细节，感谢您的支持',
        QQ: '12345678',
        wechat: '12345678'
      }
    },

    mounted() {
    },
    computed: {
      ...mapState(['user']),
      formLabelAlign(){
        return this.$store.state.user;
      }
    },
    methods: {
      login() {
        if (this.button1 === '登录')
          this.$router.push('/login');
        else {
          sessionStorage.clear()
          // this.button1="登录"
          // this.button2='注册'
          // this.isShow=false
          this.$router.push('/login_tea');
        }
      },
      register() {
        if (this.button1 === '登录')
          this.$router.push('/register_tea');
        else {

          this.$router.push({name: 'editInfo', params: {isEdit: '1'}});
        }
      },
      myDetail() {
        this.$router.push('/teacher/editInfo')
      },
      pubComp() {
        this.$router.push('/teacher/pubComp')
      }
    }
  }
</script>

<style scoped>
  .nav {
    background-color: #545c64;
    position: absolute; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top: 0; /* 距离窗口顶部距离 */
    left: 0; /* 距离窗口左边的距离 */
    width: 100%; /* 宽度设置为100% */
    z-index: 99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }

  .mint-cell {
    text-align: left;
  }
</style>
