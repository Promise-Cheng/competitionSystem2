<template>
  <div>
    <mt-header title="竞赛题目查看" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <el-divider></el-divider>
    <el-table
      style="width: 100%"
      max-height="500"
      max-width="100%"
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())
       || data.date.toLowerCase().includes(search.toLowerCase())
        || data.address.toLowerCase().includes(search.toLowerCase()))"
    >
      <el-table-column
        prop="questionId"
        label="题目ID"
        width="70%">
      </el-table-column>
      <el-table-column
        prop="questionName"
        label="题目"
        width="">
      </el-table-column>
      <el-table-column
        prop="subTeamSum"
        label="已上交团队数"
        width="70%">
      </el-table-column>
      <el-table-column
        prop="subWorkSum"
        label="已上交作品数"
        width="70%">
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <el-button type="primary" @click="handleAddQuestion">添加题目</el-button>
    <!--    <upload-file isCustomize @submit-upload="submitUpload" />-->
  </div>
</template>

<script>
  import UploadFile from "../../../components/uploadFile";

  export default {
    name: "titleEdit",
    components: {UploadFile},
    data() {
      return {
        tableData: [],
        search: ''
      }
    },
    mounted() {
      this.$axios.get('/teacher/Topics', {params: {CompId: this.$route.query.CompId}}).then((res) => {
        this.tableData = res.data.data
      })
    },
    methods: {
      handleAddQuestion() {
        this.$router.push({
          path: '/teacher/addQuestion',
          query: {
            compId: this.$route.query.CompId
          }
        })
      },
      back() {
        this.$router.back(-1)
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
</style>
