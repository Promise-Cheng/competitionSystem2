<template>
  <div>

    <mt-header fixed title="我的竞赛" style="line-height: 20px"></mt-header>
    <mt-navbar v-model="selected1" class="nav">
      <mt-tab-item id="all"><i class="el-icon-s-promotion" style="font-size: 12px"></i>全部竞赛</mt-tab-item>
      <mt-tab-item id="start"><i class="el-icon-s-promotion" style="font-size: 12px"></i>报名中</mt-tab-item>
      <mt-tab-item id="ing"><i class="el-icon-loading" style="font-size: 12px"></i>进行中</mt-tab-item>
      <mt-tab-item id="end"><i class="el-icon-medal-1" style="font-size: 12px"></i>已结束</mt-tab-item>
    </mt-navbar>
    <el-input
      placeholder="请输入竞赛名称"
      prefix-icon="el-icon-search"
      v-model="search" style="width: 100%;margin-top: 40px"></el-input>
    <el-table ref="topicTable"
              :height="max"
              :max-height="max"
              :max-width="maxWidth"
              highlight-current-row
              empty-text="暂未参加竞赛"
              @row-click="handleCurrentChange"
              :data="tableData.filter(data => !search
         || data.compName.toLowerCase().includes(search.toLowerCase())
          || data.CompStateName.toLowerCase().includes(search.toLowerCase()))"
    >
      <el-table-column width="30" type="expand">
        <template slot-scope="props">
          <mt-cell title="竞赛类型" :value="props.row.TypeName"></mt-cell>
          <mt-cell title="竞赛状态" :value="props.row.CompStateName"></mt-cell>
          <mt-cell title="申请状态" :value="props.row.Passtatus"></mt-cell>
        </template>
      </el-table-column>
      <el-table-column
        prop="compName"
        label="竞赛名称"
        width="">
      </el-table-column>
      <el-table-column
        prop="teamName"
        label="参与团队"
        width="">
      </el-table-column>
      <el-table-column
        :prop="columnName"
        sortable
        :label="statuName"
        width="100%">
      </el-table-column>
    </el-table>
    <el-button type="primary" style="width: 100%" @click="goComp" icon="el-icon-back">报名竞赛</el-button>
    <Footer></Footer>
  </div>
</template>

<script>
  import MyHeader from './myHeader'
  import Footer from '../../components/tabbar'

  export default {
    name: "myCompStart",
    components: {MyHeader, Footer},
    data() {
      return {
        search: '',
        tableData: [],
        max: document.documentElement.clientHeight - 240,
        maxWidth: document.documentElement.clientWidth,
        selected1: 'all',
        state: '',
        isStart: false,
        statuName: '申请状态',
        columnName: 'Passtatus'
      }
    },
    watch: {
      selected1: function (val, oldVal) {
        this.num = 1;
        switch (val) {
          case 'all':
            this.statuName = '竞赛状态';
            this.columnName = 'CompStateName';
            this.isStart = false
            this.state = -1;
            this.getData();
            break;
          case 'start':
            this.statuName = '申请状态';
            this.columnName = 'Passtatus';
            this.isStart = true
            this.state = 1;
            this.getData();
            break;
          case 'ing':
            this.statuName = '竞赛状态';
            this.columnName = 'CompStateName';
            this.isStart = false
            this.state = 2;
            this.getData();
            break;
          case 'end':
            this.statuName = '竞赛状态';
            this.columnName = 'CompStateName';
            this.isStart = false
            this.state = 3;
            this.getData();
            break;
        }
      },
    },
    mounted() {
      if (this.$route.params.selected1 === 'start') {
        this.statuName = '申请状态';
        this.columnName = 'Passtatus';
        this.selected1 = this.$route.params.selected1;
        this.state = 1;
        this.isStart = true;
      } else if (this.$route.params.selected1 === 'ing') {
        this.statuName = '竞赛状态';
        this.columnName = 'CompStateName';
        this.selected1 = this.$route.params.selected1;
        this.state = 2;
        this.isStart = false;
      } else if (this.$route.params.selected1 === 'end') {
        this.statuName = '竞赛状态';
        this.columnName = 'CompStateName';
        this.state = 3;
        this.selected1 = this.$route.params.selected1;
        this.isStart = false;
      } else {
        this.statuName = '竞赛状态';
        this.columnName = 'CompStateName';
        this.selected1 = 'all';
        this.state = -1;
        this.isStart = false;
      }
      this.getData();
    },
    methods: {
      goComp() {
        this.$router.push('/competition/allStart');
      },
      handleCurrentChange(val) {
        let compState = ''
        switch (val.CompStateName) {
          case '开始报名':
            compState = '1';
            break;
          case '截至报名':
            compState = '2';
            break;
          case '开始竞赛':
            compState = '3';
            break;
          case '提交成果关闭':
            compState = '4';
            break;
          case '发布成绩':
            compState = '5';
            break;
        }
        this.$router.push({
          path: '/myself/myCompDetail',
          query: {
            CompId: val.CompId,
            CompState: compState
          }
        })
      },
      getData() {
        this.$axios.get('/users/myComp', {params: {status: this.state}}).then((res) => {
          this.tableData = res.data.data
        })
      },
      getDetail(scope) {
        let tableData = this.tableData.filter(data => !this.search || data.compName.toLowerCase().includes(this.search.toLowerCase())
          || data.teacher.toLowerCase().includes(this.search.toLowerCase())
          || data.CompStateName.toLowerCase().includes(this.search.toLowerCase()))
        this.$router.push({name: 'myCompDetail', params: {CompId: tableData[scope.$index].CompId, CompState: '1'}})
      },
      back() {
        this.$router.push('/myself')
      }
    }
  }
</script>

<style scoped>
  .mint-cell /deep/ {
    width: 100%;
    text-align: left;
    color: black;
  }

  .nav {
    position: fixed; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top: 40px; /* 距离窗口顶部距离 */
    left: 0; /* 距离窗口左边的距离 */
    width: 100%; /* 宽度设置为100% */
    /*z-index:99; !* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 *!*/
  }
</style>
