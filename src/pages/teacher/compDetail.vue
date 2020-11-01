<template>
  <div>
    <mt-header title="详情信息" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change="handleTopChange">
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
      <div v-if="!isManager">
        <el-button @click="back" type="primary" style="width: 60%">返回</el-button>
      </div>
      <div v-else>
        <el-button @click="manage" type="primary" style="width: 40%">管理</el-button>
        <el-button @click="back" type="primary" style="width: 40%">返回</el-button>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
  import Const from '@/pages/public/Const';

  export default {
    name: "compDetail",
    data() {
      return {
        details: []
      }
    },
    computed: {
      isManager() {
        return this.$route.query.manage
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.$axios.get('/Competitions/detail', {params: {CompId: this.$route.query.CompId}}).then((res) => {
          this.details = res.data.data
        }).catch((err) => {
          console.log(err);
        })
      },
      loadTop() {
        setTimeout(() => {
          this.getData();
          this.$refs.loadmore.onTopLoaded();
        }, 1000);
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      manage() {
        this.$router.push({
          path: '/teacher/manageTeam',
          query: {
            CompId: this.$route.query.CompId,
            CompStateName: this.$route.query.CompStateName
          }
        })
      },
      back() {
        if (this.$route.query.isHome || this.isManager)
          this.$router.back(-1)
        else {
          let select = '';
          if (this.$route.query.compStateName === '开始报名') {
            select = 'start'
          } else if (this.$route.query.compStateName === '截至报名' || this.$route.query.compStateName === '开始竞赛') {
            select = 'ing'
          } else if(this.$route.query.compStateName === '提交成果关闭' || this.$route.query.compStateName === '发布成绩'){
            select = 'end'
          }
          else{
            select = 'all'
          }
          this.$router.push({
            name: 'teacherComp',
            params: {
              selected: select
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .mint-cell {
    text-align: left;
  }

  .nav {
    position: absolute; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top: 20px; /* 距离窗口顶部距离 */
    left: 10px; /* 距离窗口左边的距离 */
    width: 100%; /* 宽度设置为100% */
    z-index: 99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }
</style>
