<template>
  <div>
    <mt-header fixed title="竞赛管理系统">
      <div class="grid-content bg-purple-dark" slot="right">
        <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link" style="color: white">
               <mt-button icon="more" slot="right"></mt-button>
              </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">竞赛新闻</el-dropdown-item>
            <el-dropdown-item command="b">推荐竞赛</el-dropdown-item>
            <el-dropdown-item command="a">竞赛介绍</el-dropdown-item>
            <el-dropdown-item command="a">最新赛事</el-dropdown-item>
            <el-dropdown-item command="a">关于我们</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </mt-header>
    <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change="handleTopChange">
      <div style="height:200px;margin-bottom: 30px">
        <mt-swipe>
          <template v-for="(item,index) in imgList">
            <mt-swipe-item :key="`user${index}`">
              <img :src="item" height="200" :width="width" alt="加载失败！"/>
            </mt-swipe-item>
          </template>
        </mt-swipe>
      </div>
      <div style="display: flex; justify-content:space-between">
        <div style="background: #E4E7ED;" @click="goTeam">
          <i class="el-icon-s-custom"></i>团队总数：
          <p>{{personNum}}</p>
        </div>
        <div style="background: #E4E7ED;" @click="goComptition">
          <i class="el-icon-s-custom"></i>竞赛总数：
          <p>{{CompNum}}</p>
        </div>
        <!--      <div  style=" background: #E4E7ED; width: 45%;float: right">-->
        <div style="background: #E4E7ED;" @click="goTeam">
          <i class="el-icon-star-off"></i>使用人数：
          <p>{{personNum}}</p>
        </div>
      </div>
      <el-divider></el-divider>
      <div>
        <el-input
          placeholder="请输入竞赛名称"
          prefix-icon="el-icon-search"
          v-model="search" style="width: 70%"></el-input>
        <el-button icon="el-icon-search" @click="ToSearch" style="width: 20%"></el-button>
        <div class="grid-content bg-purple-dark">
        </div>
      </div>
      <el-divider></el-divider>
      <div style="text-align: center"><h2>最新的竞赛</h2></div>
      <div style="height:200px;margin-bottom: 30px">
        <mt-swipe>
          <template v-for="(item,index) in latestComp">
            <mt-swipe-item :key="`user${index}`">
              <div @click="goComptitionDetail(index)" style="background: #bfbfbf">
                <div slot="header" class="clearfix">
                  <h3>{{item.compName}}</h3>
                </div>
                <div class="text item" style="font-size: 12px">
                  {{'竞赛类型：' + item.CompTypeName }}
                </div>
                <div class="text item" style="font-size: 12px">
                  {{'竞赛状态：' + item.CompStateName }}
                </div>
                <div class="text item" style="font-size: 12px">
                  {{'开始时间：' + getDatetimeString(item.obStartTIme)}}
                </div>
                <div class="text item" style="font-size: 12px">
                  {{'结束时间：' + getDatetimeString(item.obEndTime)}}
                </div>
                <div class="text item" style="font-size: 12px">
                  {{'竞赛描述：' + item.compIntro }}
                </div>
              </div>
            </mt-swipe-item>
          </template>
        </mt-swipe>
      </div>
      <el-divider></el-divider>

      <!--      <div>-->
      <!--        <div id="chart_example">-->
      <!--        </div>-->
      <!--      </div>-->
    </mt-loadmore>
    <Footer/>
  </div>

</template>

<script>
  import echarts from 'echarts'
  import Footer from './teacherTabbar'
  import moment from 'moment'

  export default {
    name: "home",
    components: {Footer},
    data() {
      return {
        imgList: [
          require("@/pictures/acm.jpg"),
          require("@/pictures/BPO.jpg"),
          require("@/pictures/dzsj.jpg"),
          require("@/pictures/immc.jpg"),
        ],
        width: window.innerWidth,
        search: '',
        personNum: 0,
        CompNum: 0,
        CompList: [],
        card1: 'active-card',
        card2: 'box-card',
        card3: 'box-card',
        card4: 'box-card',
        tableData: [],
        latestComp: []
      }
    },
    computed: {},
    methods: {
      getDatetimeString(time) {
        return moment(time).format('YYYY-MM-DD HH:mm:ss');
      },
      goComptitionDetail(index) {
        this.$router.push({
          path: '/teacher/compDetail',
          query: {
            CompId: this.latestComp[index].CompId,
            compStateName: this.latestComp[index].CompStateName,
            isHome: '1'
          }
        })
      },
      goTeam() {
        this.$router.push('/teacher/checkTeam');
      },
      goComptition() {
        this.$router.push('/teacher/competition');
      },
      getLatestComp() {
        this.$axios.get('/Competitions/latest', {params: {status: -1, size: 4}}).then((res) => {
          this.latestComp = res.data.data
        }).catch((err) => {
          console.log(err)
        })
      },
      cardChange(newIndex, oldIndex) {
        switch (oldIndex) {
          case 0:
            this.$set(this, "card1", 'box-card');
            break;
          case 1:
            this.card2 = 'box-card';
            break;
          case 2:
            this.card3 = 'box-card';
            break;
          case 3:
            this.card4 = 'box-card';
            break;
        }
        switch (newIndex) {
          case 0:
            this.$set(this, "card1", 'active-card');
            break;
          case 1:
            this.card2 = 'active-card';
            break;
          case 2:
            this.card3 = 'active-card';
            break;
          case 3:
            this.card4 = 'active-card';
            break;
        }
      },
      ToSearch() {
        this.$router.push({
          name: 'compSearch1',
          query: {
            search: this.search
          }
        })
      },
      handleCommand(command) {
        switch (command) {
          case 'a':
            this.$router.push('/home/homeNews');
            break;
          case 'b':
            this.$router.push('/home/compIntroduce');
            break;
        }
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop() {
        setTimeout(() => {
          this.getData();
          this.$refs.loadmore.onTopLoaded();
        }, 1000);
      },
      getNewCompData() {
        this.$axios.get('/Competitions/show', {params: {status: 0}}).then((res) => {
          this.tableData = res.data.data
        }).catch((err) => {
          console.log(err);
        })
      },
      getData() {
        let CompName = []
        let CompNumber = []
        this.$axios.get('/home').then((res) => {
          this.CompList = res.data.data.CompList
          this.CompNum = res.data.data.CompNum
          this.personNum = res.data.data.personNum
          for (const compList in this.CompList) {
            CompName.push(this.CompList[compList].CompName)
            CompNumber.push(this.CompList[compList].Sum)
          }
          let this_ = this;
          // let myChart = echarts.init(document.getElementById('chart_example'));
          // let option = {
          //   title: {text: '各类竞赛数量统计'},
          //   color: ['#f44'],
          //   tooltip: {
          //     trigger: 'axis',
          //     axisPointer: {
          //       type: 'shadow'
          //     },
          //
          //   },
          //   xAxis: [
          //     {
          //       type: 'category',
          //       data: CompName,
          //       axisLabel:{
          //         interval: 0
          //       },
          //       axisTick: {
          //         alignWithLabel: true
          //       }
          //     }
          //   ],
          //   yAxis: [
          //     {
          //       type: 'value'
          //     }
          //   ],
          //   series: [
          //     {
          //       name: '数量',
          //       type: 'bar',
          //       barWidth: '60%',
          //       data: CompNumber,
          //     }
          //   ]
          // };
          // myChart.setOption(option);
          // //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
          // window.addEventListener('resize', function () {
          //   myChart.resize()
          // });
        }).catch((err) => {
          console.log(err)
        })
      },
    },

    mounted() {
      this.getData();
      this.getLatestComp();
      // this.getNewCompData();
    },
  }
</script>

<style scoped>

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(n) {
    background-color: #99a9bf;
  }

  .active-card {
    background-color: #d3dce6;
    height: 100%;
  }

  .box-card {
    background-color: #99a9bf;
    height: 100%;
  }

  /*.el-carousel__item:nth-child(2n+1) {*/
  /*  background-color: #d3dce6;*/
  /*}*/

  #chart_example {
    width: 80%;
    height: 200px;
    margin: 0 auto;
  }

  .nav {
    background-color: #545c64;
    position: fixed; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top: 0; /* 距离窗口顶部距离 */
    left: 0; /* 距离窗口左边的距离 */
    width: 100%; /* 宽度设置为100% */
    /*z-index:99; !* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 *!*/
  }
</style>
