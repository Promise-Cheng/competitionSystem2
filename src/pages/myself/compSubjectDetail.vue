<template>
  <div>
    <mt-header title="题目详情" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <div style="text-align: left">
      <mt-cell title="题目名称:" :value="details.questionName"></mt-cell>
      <mt-cell title="题目数量:" :value="details.questionNum"></mt-cell>
      <mt-cell title="题目介绍:" :value="details.questionIntro"></mt-cell>
      <mt-field label="文件名称:" :value="details.fileName" readonly type="textarea" rows="2"></mt-field>
      <mt-field label="文件描述:" :value="details.fileDesc" readonly type="textarea" rows="4"></mt-field>
      <mt-field v-if="this.$route.params.CompState==='发布成绩'" label="文件描述:" :value="details.questionAnsw" readonly type="textarea" rows="4"></mt-field>
    </div>
    <el-divider></el-divider>
    <el-button @click="downloadFile" type="primary" style="width: 40%">题目下载</el-button>
    <el-button @click="downloadFile" type="primary" style="width: 40%">作品上传</el-button>
    <el-divider></el-divider>
  </div>
</template>

<script>
  import * as api from '@/api/api'

  export default {
    name: "compSubjectDetail",
    data() {
      return {
        details: {},
      }
    },
    mounted() {
      api.question.getDetail({questionId: this.$route.params.questionId}).then((res) => {
        this.details = res.data
      })
    },
    methods: {
      downloadFile(){
        api.question.downloadFile({savedPath:this.details.files['exp2_simple+query1.doc'],realName:this.details.questionName+'竞赛题目.txt'}).then((res)=>{
          console.log(res)
        })
      },
      back() {
        this.$router.push({
          name: 'compSubject',
          params: {CompId: this.$route.params.CompId, CompState: this.$route.params.CompState}
        })
      }
    }
  }
</script>

<style scoped>

</style>
