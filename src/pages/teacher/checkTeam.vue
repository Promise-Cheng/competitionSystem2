<template>
  <div>
    <div v-if="isSearch">
      <mt-header fixed title="校内团队信息" style="line-height: 20px;background-color:#409eff ">
        <mt-button icon="back" slot="left" @click="isSearch=!isSearch">返回</mt-button>
      </mt-header>
      <div>
        <el-table ref="topicTable"
                  :height="max1"
                  :max-height="max1"
                  :max-width="maxWidth"
                  highlight-current-row
                  @row-click="handleCurrentChange"
                  :data="tableData"
        >
          <el-table-column
            prop="teamName"
            label="团队名称"
            width="80%">
          </el-table-column>
          <el-table-column
            prop="stuName"
            label="队长名称"
            width="80%">
          </el-table-column>
          <el-table-column
            prop="stuNum"
            label="队长学号"
            width="">
          </el-table-column>
        </el-table>
      </div>
      <el-button type="primary" style="width: 100%" icon="el-icon-back" @click="isSearch=!isSearch">返回</el-button>
    </div>
    <div v-else>
      <mt-header fixed title="校内团队信息" style="line-height: 20px;background-color:#409eff ">
        <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      </mt-header>
      <el-input
        placeholder="请输入团队名称"
        prefix-icon="el-icon-search"
        v-model="search" style="width: 70%"></el-input>
      <el-button icon="el-icon-search" @click="ToSearch" style="width: 20%"></el-button>
      <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change="handleTopChange">
        <el-table
          highlight-current-row
          @row-click="handleCurrentChange"
          :max-height="max"
          :max-width="maxWidth"
          :data="tableData"
        >
          <el-table-column
            prop="teamName"
            label="团队名称"
            width="80%">
          </el-table-column>
          <el-table-column
            prop="stuName"
            label="队长名称"
            width="80%">
          </el-table-column>
          <el-table-column
            prop="stuNum"
            label="队长学号"
            width="">
          </el-table-column>

        </el-table>
        <div>
          <el-pagination
            background
            small
            layout="sizes,prev, pager, next"
            :pager-count="5"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange1"
            :current-page.sync="num"
            :page-sizes=[5,6,7,8,10]
            :page-size="pageSize"
            :total="total">
          </el-pagination>
        </div>
        <br/>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>

  export default {
    name: "checkTeam",
    mounted() {
      this.getData()
    },
    data() {
      return {
        tableData: [],
        search: '',
        max1: document.documentElement.clientHeight - 150,
        max: document.documentElement.clientHeight - 210,
        maxWidth: document.documentElement.clientWidth,
        num: 1,
        total: 100,
        pageSize: 5,
        selected: 'start',
        state: 1,
        isSearch: false,
      }
    },
    watch: {
      isSearch(val, oldVal) {
        this.getData()
      }
    },
    methods: {
      getData() {
        if (!this.isSearch) {
          this.$axios.get('/teams/show', {params: {page: this.num, size: this.pageSize}})
            .then((res) => {
              this.tableData = res.data.data
              this.total = res.data.Sum

            }).catch((err) => {
            console.log(err)
          })
        } else {
          this.$axios.get('/teams/Search', {params: {content: this.search}}).then((res) => {
            this.tableData = res.data.data
          }).catch((err) => {
            console.log(err);
          })
        }
      },
      handleCurrentChange(val) {
        this.$router.push({
          path: '/teacher/checkTeamDetail',
          query: {
            teamId: val.teamId
          }
        })
      },
      Detail(index) {
        let tableData = this.tableData.filter(data => !this.search || data.teamName.toLowerCase().includes(this.search.toLowerCase())
          || data.stuName.toLowerCase().includes(this.search.toLowerCase())
          || data.stuNum.toLowerCase().includes(this.search.toLowerCase()))
        this.$router.replace({name: 'checkTeamDetail', params: {'teamId': tableData[index].teamId}})
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
      handleSizeChange(val) {
        this.pageSize = val
        this.getData()
      },
      handleCurrentChange1(val) {
        this.getData();
      },
      ToSearch() {
        this.isSearch = (this.search !== "")
      },
      back() {
        this.$router.back(-1);
      },
    }

  }
</script>

<style scoped>

</style>


