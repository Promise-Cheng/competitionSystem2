<template>
  <div>
    <div>
      <mt-header title="详情信息" fixed style="line-height: 20px">
        <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      </mt-header>
      <el-divider></el-divider>
      <div style="margin-bottom: 30px">
        <mt-cell title="竞赛名称:" :value="details.compName"></mt-cell>
        <mt-cell title="竞赛类型:" :value="details.CompName"></mt-cell>
        <mt-cell title="开始时间:" :value="details.startTime"></mt-cell>
        <mt-cell title="结束时间:" :value="details.endTime"></mt-cell>
        <mt-cell title="人数限制:" :value="details.personNum"></mt-cell>
        <mt-cell title="指导老师:" :value="details.teacher"></mt-cell>
        <mt-field label="竞赛描述:" :value="details.compIntro" readonly type="textarea" rows="4"></mt-field>
        <mt-cell title="竞赛状态:" :value="getNameByCode($route.params.CompState)"></mt-cell>
      </div>
      <div v-if="isEnd">
        <el-button @click="getDetail" type="primary" style="width: 30%">竞赛题目</el-button>
        <el-button type="primary" style="width: 30%" @click="getResult">查看榜单</el-button>
        <el-button @click="back" type="primary" style="width: 30%">返回</el-button>
      </div>
      <div v-else-if="isStart">
        <el-button @click="back" type="primary" style="width: 60%">返回</el-button>
      </div>
      <div v-else-if="isIng">
        <el-button @click="getDetail" type="primary" style="width: 30%">竞赛题目</el-button>
        <el-button @click="back" type="primary" style="width: 30%">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Const from '@/pages/public/Const';
  export default {
    name: "myCompDetail",
    data() {
      return {
        details: [],
        isEnd: false,
        isStart: false,
        isIng: false
      }
    },
    mounted() {
      if (this.$route.params.CompState === '5')
        this.isEnd = true
      else if (this.$route.params.CompState === '1')
        this.isStart = true
      else if (this.$route.params.CompState === '2') {

      } else this.isIng = true
      this.$axios.get('/Competitions/detail', {params: {CompId: this.$route.params.CompId}}).then((res) => {
        this.details = res.data.data
      }).catch((err) => {
        console.log(err);
      })
    },
    methods: {
      getNameByCode(code){
        return _.find(Const['compStatus'],{code:code}).name;
      },
      getDetail() {
        this.$router.push({
          name: 'compSubject',
          params: {CompId: this.$route.params.CompId, CompState: this.$route.params.CompState}
        })
      },
      getResult() {
        this.$router.push({
          name: 'queryResult',
          params: {CompId: this.$route.params.CompId, CompState: this.$route.params.CompState}
        })
      },
      back() {
        let select = '';
        if (this.$route.params.CompState === '1') {
          select = 'start'
        } else if (this.$route.params.CompState <= 3) {
          select = 'ing';
        } else {
          select = 'end';
        }
        this.$router.replace({name: 'myStart', params: {selected1: select}})
      }
    }
  }
</script>

<style scoped>
  .mint-cell {
    text-align: left;
  }
</style>
