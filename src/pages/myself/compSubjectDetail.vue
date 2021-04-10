<template>
  <div>
    <mt-header title="题目详情" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <div style="text-align: left;margin-bottom: 15px">
      <mt-cell title="题目名称:" :value="details.questionName"></mt-cell>
      <mt-cell title="题目数量:" :value="details.questionNum"></mt-cell>
      <mt-field label="题目介绍:" :value="details.questionIntro" readonly type="textarea" rows="2"></mt-field>
      <mt-field label="附件:" :value="details.fileName" readonly type="textarea" rows="2"></mt-field>
      <div class="item-inline1">
        <div class="item-label">
          test
        </div>
        <div class="item-content">
         <div v-for="(item,index) in filesList" :key="index" class="item-content-row">
           <div>
             {{ item.fileName }}
           </div>
           <div class="item-content-column-operate" @click="handleDownload(item)">
             下载
           </div>
         </div>
        </div>
      </div>
      <mt-field label="文件描述:" :value="details.fileDesc" readonly type="textarea" rows="4"></mt-field>
      <mt-field v-if="this.$route.query.CompState==='发布成绩'" label="文件描述:" :value="details.questionAnsw" readonly
                type="textarea" rows="4"></mt-field>
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
      filesList: [],
    }
  },
  computed: {
    state() {
      return this.$route.query.CompState
    }
  },
  mounted() {
    api.question.getDetail({questionId: this.$route.query.questionId}).then((res) => {
      this.details = res.data
      this.getFilesList(this.details)
    })
  },
  methods: {
    getFilesList(data){
      let fileName = data.fileName || ''
      let midData = fileName.split(';')
      let midFileList = []
      midData.forEach(item => {
        if(item)
          midFileList.push({
            fileName: item,
            fileUrl: data.files[item]
          })
      })
      this.filesList = midFileList
    },
    afterUpload() {
      this.back();
    },
    handleDownload(item) {
      api.question.downloadFile({
        savedPath: this.details.files['exp2_simple+query1.doc'],
        realName: this.details.questionName + '竞赛题目.txt'
      }).then((res) => {
        console.log(res)
      })
    },
    back() {
      this.$router.back(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
.item-inline1 {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 10px;
}
.item-label {
  width: 105px;
}
.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.item-content-row {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  padding: 4px;
}
.item-content-column-operate {
  color: #1e88e5;
}
</style>
