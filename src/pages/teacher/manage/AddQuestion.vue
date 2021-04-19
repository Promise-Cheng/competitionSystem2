<template>
  <div class="background-default">
    <mt-header title="竞赛题目查看" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <mt-field label="题目" placeholder="请输入题目名称" v-model="formData.questionName"></mt-field>
    <mt-field type="textarea" label="题目描述" placeholder="请输入题目描述" rows="4" v-model="formData.questionIntro"></mt-field>
    <mt-field type="textarea" label="答案" placeholder="请输入题目答案" rows="4" v-model="formData.questionAnsw"></mt-field>
    <div class="title" style="border-top: 1px solid #ddd">附件</div>
    <upload-question ref="questionFile"></upload-question>
    <el-divider />
    <div class="operate-buttons">
      <el-button type="primary" @click="handleSave">提交</el-button>
    </div>
  </div>
</template>

<script>
  import UploadFile from "../../../components/uploadFile";
  import UploadQuestion from "../../../components/uploadQuestion";
  export default {
    name: "AddQuestion",
    components: {UploadQuestion, UploadFile},
    data() {
      return {
        formData: {
          questionName: '',
          questionIntro: '',
          questionAnsw: '',
          files: '',
        }
      }
    },
    methods: {
      handleSave() {
        let CompId = this.$route.query.compId || ''
        let fileFormData = new FormData()
        let files = this.$refs.questionFile.getFileList()
        console.log(files)
        for (let index in files) {
          fileFormData.append('files', files[index].raw);
        }
        fileFormData.append('questionName', this.formData.questionName);
        fileFormData.append('questionIntro', this.formData.questionIntro);
        fileFormData.append('questionAnsw', this.formData.questionAnsw);
        fileFormData.append('CompId', CompId);
        let requestConfig = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }
        this.$axios.post(`/files/question/uploadWorks`, fileFormData, requestConfig)
          .then((res) => {
            if (res.data.status === "success") {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
              })
            } else {
              this.$message.error("上传失败！请重新操作")
            }
          })
      },
      afterUpload() {
        this.back();
      },
      back() {
        this.$router.back(-1)
      }
    }
  }
</script>

<style scoped>

</style>
