<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="http://localhost:8085/users/uploadWorks"
      :before-upload="beforeUpload"
      :on-success="onSuccessData"
      :file-list="fileList">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <!--      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      <div slot="tip" class="el-upload-list__item-name">
        <div v-for="(item,index) in this.files" :key="`user${index}`">{{item.name}}</div>
      </div>
    </el-upload>
  </div>
</template>

<script>
  import * as api from '@/api/api'

  export default {

    data() {
      return {
        fileList: [],
        fileName: '',
        files: [],
      };
    },
    methods: {
      // 文件上传时的验证,自定义验证规则,
      beforeUpload(file) {
        // debugger(打断点)
        console.log(file, '文件');
        this.files.push(file);
        // const extension = file.name.split('.')[1] === 'xls'
        // const extension2 = file.name.split('.')[1] === 'xlsx'
        const isLt2M = file.size / 1024 / 1024 < 5
        // if (!extension && !extension2) {
        //   this.$message.warning('上传模板只能是 xls、xlsx格式!')
        //   return
        // }
        if (!isLt2M) {
          this.$message.warning('上传模板大小不能超过 5MB!')
          return
        }
        return false // 返回false不会自动上传
      },
      // 手动上传文件到服务器
      submitUpload() {
        console.log('上传' + this.files[0].name)
        let fileFormData = new FormData();
        for (let index in this.files) {
          fileFormData.append('file', this.files[index]);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
        }
        fileFormData.append('workName', 'test');
        fileFormData.append('teamCompId', 1);
        fileFormData.append('question', 1);
        fileFormData.append('introduction', 'abc');
        let requestConfig = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }
        this.$axios.post(`/users/uploadWorks`, fileFormData, requestConfig)
          .then((res) => {
            console.log('上传数据后返或数据')
            console.log(res)
            if (res.data.status === "success") {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
              })
            } else {
              this.$message.error(res.data.msg)
            }
          })
      },
      onSuccessData(response, file, fileList) {
        console.log(response)
        console.log(file)
        console.log(fileList)
      },
    }
  }
</script>

<style scoped>

</style>
