<template>
  <div>
    <mt-header title="详情信息" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <div style="margin-bottom: 30px">
      <mt-cell title="竞赛名称:" :value="details.compName"></mt-cell>
      <mt-cell title="竞赛类型:" :value="details.CompName"></mt-cell>
      <mt-cell title="开始时间:" :value="details.startTime"></mt-cell>
      <mt-cell title="结束时间:" :value="details.endTime"></mt-cell>
      <mt-cell title="人数限制:" :value="details.personNum"></mt-cell>
      <mt-cell title="指导老师:" :value="details.teacher"></mt-cell>
             <mt-field label="竞赛描述:" :value="details.compIntro" readonly type="textarea" rows="4"></mt-field>
      <mt-cell title="竞赛状态:" :value="$route.query.compStateName"></mt-cell>
    </div>
    <div v-if="!isSignUp">
      <el-button @click="back" type="primary" style="width: 60%">返回</el-button>
    </div>
    <div v-else>
      <el-button @click="signUp" type="primary" style="width: 40%">报名</el-button>
      <el-button @click="back" type="primary" style="width: 40%">返回</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "detail",
    data() {
      return {
        details: []
      }
    },
    computed: {
      isSignUp() {
        return this.$route.query.compStateName === "开始报名"
      }
    },
    mounted() {
      this.$axios.get('/Competitions/detail', {params: {CompId: this.$route.query.CompId}}).then((res) => {
        this.details = res.data.data
      }).catch((err) => {
        console.log(err);
      })
    },
    methods: {
      signUp() {
        if (this.details.personNum === 1) {
          const params = new URLSearchParams()
          params.append('CompId', this.$route.query.CompId)
          this.$messagebox.confirm('该竞赛为个人竞赛，是否直接报名？', '提示').then(() => {
            this.$axios.post('users/PapplyToComp', params).then(
              (res) => {
                if (res.data.result === 'success') {
                  this.$message({
                    message: '报名成功',
                    type: 'success'
                  });
                  this.$router.push('/competition/start')
                } else if (res.data.result === 'exist') {
                  this.$message.error('该队伍已报名该竞赛');
                } else {
                  this.$message.error('人数超过限制');
                }
              }
            ).catch((err) => {
              console.log(err)
            })
          }).catch(() => {

          })
        } else
          this.$router.push({
            name: 'signUp',
            query: {
              CompId: this.$route.query.CompId,
              personNum: this.details.personNum,
              compStateName: this.$route.query.compStateName
            }
          })
      },
      back() {
        if (this.$route.query.isHome) {
          this.$router.back(-1)
          return;
        }
        let select = '';
        if (this.isSignUp) {
          select = 'start'
        } else if (this.$route.query.compStateName === '截至报名' || this.$route.query.compStateName === '开始竞赛') {
          select = 'ing'
        } else {
          select = 'end'
        }
        this.$router.push({name: 'start', params: {selected: select}})
      }
    }
  }
</script>

<style scoped>
  .nav {
    position: absolute; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top: 20px; /* 距离窗口顶部距离 */
    left: 10px; /* 距离窗口左边的距离 */
    width: 100%; /* 宽度设置为100% */
    z-index: 99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }
  .mint-cell{
    text-align: left;
  }
</style>
