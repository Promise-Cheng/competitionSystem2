<template>
  <div>
    <mt-header title="竞赛题目" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <el-table
      style="width: 100%"
      max-height="500"
      max-width="100%"
      :data="tableData.filter(data => !search || data.questionNum.toLowerCase().includes(search.toLowerCase())
       || data.questionName.toLowerCase().includes(search.toLowerCase()))"
    >
      <el-table-column
        prop="questionNum"
        label="题号"
        width="50%">
      </el-table-column>
      <el-table-column
        prop="questionName"
        label="题目名称"
        width="80%">
      </el-table-column>
      <el-table-column
        prop="subWorkSum"
        label="已上交数"
        width="80%">
      </el-table-column>
      <el-table-column width="">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button @click="getDetail(scope)" size="mini" icon="el-icon-info">题目详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <el-button @click="back" type="primary" style="width: 60%">返回</el-button>
    <el-divider></el-divider>
  </div>
</template>

<script>
  import * as api from '@/api/api'

  export default {
    name: "compSubject",
    mounted() {
      api.competition.getStudentQuestion({CompId: this.$route.query.CompId}).then((res) => {
        this.tableData = res.data
      })
    },
    data() {
      return {
        search: '',
        tableData: [],
      }
    },
    methods: {
      getDetail(scope) {
        let tableData = this.tableData.filter(data => !this.search || data.questionNum.toLowerCase().includes(this.search.toLowerCase())
          || data.questionName.toLowerCase().includes(this.search.toLowerCase()))
        this.$router.push({
          path: '/myself/compSubjectDetail',
          query: {
            questionId: tableData[scope.$index].questionId,
            CompId: this.$route.query.CompId,
            CompState: this.$route.query.CompState,
            teamCompId: tableData[scope.$index].teamCompId,
          }
        })
      },
      back() {
        this.$router.back(-1);
      }
    }
  }
</script>

<style scoped>

</style>
