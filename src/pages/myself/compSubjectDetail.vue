<template>
  <div>
    <mt-header title="题目详情" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <div style="text-align: left;margin-bottom: 15px">
      <mt-cell title="题目名称:" :value="details.questionName"></mt-cell>
      <mt-cell title="题目数量:" :value="details.questionNum"></mt-cell>
      <mt-field label="题目介绍:" :value="details.questionIntro" readonly type="textarea" rows="2"></mt-field>
      <mt-field label="文件名称:" :value="details.fileName" readonly type="textarea" rows="2"></mt-field>
      <mt-field label="文件描述:" :value="details.fileDesc" readonly type="textarea" rows="4"></mt-field>
      <mt-field v-if="this.$route.query.CompState==='发布成绩'" label="文件描述:" :value="details.questionAnsw" readonly type="textarea" rows="4"></mt-field>
    </div>
    <el-button @click="downloadFile" size="mini" type="primary" style="width: 80%">题目下载</el-button>
    <el-divider></el-divider>
    <template v-if="state === '3'">
      <div style="text-align: center;font-size: 24px;width: 100%;margin-bottom: 20px">作品上传</div>
      <upload-file
        :work-name="'test1'"
        @after-upload="afterUpload"
        :introduction="'测试'"
        :question="this.$route.query.questionId"
        :team-comp-id="this.$route.query.teamCompId"></upload-file>
    </template>
    </div>
</template>

<script>
  import * as api from '@/api/api'
  import UploadFile from "@/components/uploadFile";

  export default {
    name: "compSubjectDetail",
    components: {UploadFile},
    data() {
      return {
        details: {},
      }
    },
    computed:{
      state(){
        return this.$route.query.CompState
      }
    },
    mounted() {
      api.question.getDetail({questionId: this.$route.query.questionId}).then((res) => {
        this.details = res.data
      })
    },
    methods: {
      afterUpload(){
        this.$router.push({
          name: 'compSubject',
          params: {CompId: this.$route.query.CompId, CompState: this.$route.query.CompState}
        })
      },
      downloadFile(){
        api.question.downloadFile({savedPath:this.details.files['exp2_simple+query1.doc'],realName:this.details.questionName+'竞赛题目.txt'}).then((res)=>{
          console.log(res)
        })
      },
      back() {
        // this.$router.push({
        //   path: '/backend/budget-filling-config',
        //   query: {
        //     excelId: this.current.id,
        //   }
        // })
        this.$router.push({
          name: 'compSubject',
          params: {CompId: this.$route.query.CompId, CompState: this.$route.query.CompState}
        })
      }
    }
  }
</script>

<style scoped>

</style>
