<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="http://localhost:8085/files/uploadWorks"
      :auto-upload="false"
      :file-list="fileList">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>
  </div>
</template>

<script>

  export default {
    name: "upload-question",
    data() {
      return {
        fileList: [],
      };
    },
    methods: {
      getFileList(){
        return this.$refs.upload.uploadFiles
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
