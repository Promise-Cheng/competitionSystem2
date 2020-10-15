<template>
  <div class="main">
    <mt-header fixed title="我的相关信息" style="line-height: 30px;background-color: #F56C6C">
    </mt-header>
    <div>
      <div style="float: left">
        <el-button type="text">
          <el-avatar :size="80"> {{formLabelAlign.stuName}}</el-avatar>
        </el-button>
      </div>
      <br/>
      <div style="text-align: left">
        班级：{{formLabelAlign.class}}
      </div>
      <br/>
      <div style="text-align: left">
        学生ID:{{formLabelAlign.stuNum}}
      </div>
      <br/>
    </div>
    <div style="margin-top: 20px">
      <mt-cell title="修改信息" is-link to="/myself/myDetail"></mt-cell>
      <mt-cell title="修改密码" is-link to="/myself/editPassword"></mt-cell>
      <mt-cell title="关于" is-link to="/myself/about"></mt-cell>
      <div @click="login">
        <mt-cell style="text-align: center;color: #bfbfbf" title="注销"></mt-cell>
      </div>
    </div>
    <Footer1/>
  </div>

</template>

<script>
  import Footer1 from '../../components/tabbar'
  import {mapState} from 'vuex'

  export default {
    name: "index",
    components: {Footer1},
    data() {
      return {
        button1: '登录',
        button2: '注册',
        isShow: false,
        index: '1',
        search: '',
        tableData: [],
        formLabelAlign: {},
        version: '1.2',
        introduce: '初次开发系统，bug会有许多，如遇未知错误，请联系我们进行反馈，我们将尽快修复或优化相关细节，感谢您的支持',
        QQ: '12345678',
        wechat: '12345678'
      }
    },
    mounted() {
      if (!this.$store.state.user) {
        this.isShow = false
      } else {
        this.formLabelAlign = this.$store.state.user.info
        this.button1 = "退出登录"
        this.button2 = '修改信息'
        this.isShow = true
      }
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      login() {
        if (this.button1 === '登录')
          this.$router.push('/login');
        else {
          this.$store.state.user = {};
          sessionStorage.clear();
          // this.button1="登录"
          // this.button2='注册'
          // this.isShow=false
          this.$router.push('/login');
        }
      },
      register() {
        if (this.button1 === '登录')
          this.$router.push('/register');
        else {
          this.$router.push({name: 'myDetail', params: {isEdit: '1'}});
        }
      },
      myDetail() {
        this.$router.push('/myself/myDetail')
      },
      myComp() {
        this.$router.push('/myself/start')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mint-cell {
    text-align: left;
  }

  .nav {
    background-color: #545c64;
    position: absolute; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top: 0; /* 距离窗口顶部距离 */
    left: 0; /* 距离窗口左边的距离 */
    width: 100%; /* 宽度设置为100% */
    z-index: 99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }
</style>
