<template>
  <div>
    <mt-header title="创建教师用户" fixed style="line-height: 20px">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <mt-field label="学工号" placeholder="请输入学工号" v-model="teaId"></mt-field>
    <mt-field label="密码" type="password" placeholder="请输入密码" v-model="password"></mt-field>
    <mt-field label="姓名" placeholder="请输入姓名" v-model="teaName"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phoneNum"></mt-field>
    <div @click="chooseCompType">
      <mt-field label="竞赛类型" placeholder="请选择竞赛类型" readonly v-model="compType" @click="chooseCompType"></mt-field>
    </div>
    <mt-popup
      style="width: 100%;"
      v-model="popupVisible"
      popup-transition="popup-fade"
      closeOnClickModal="true"
      position="bottom">
      <mt-picker ref="typePicker" :slots="popupSlots" @change="onValuesChange" showToolbar>
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
          <div class="">请选择竞赛类型</div>
          <div class="usi-btn-sure" @click="handleOK()">确定</div>
        </div>
      </mt-picker>
    </mt-popup>
    <div class="register-btn" @click="register">注册</div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        popupVisible: false,
        popupSlots: [//问题类型弹框数据
          {
            values: []
          }
        ],
        stuNum: '',
        stuName: '',
        password: '',
        class_: '',
        QQ: '',
        email: '',
        phone: '',
        teaId: '',
        teaName: '',
        phoneNum: '',
        Loading: false,
        compTypes: [],
        compType: '',
        showType: '',
      }
    },
    mounted() {
      this.$axios.get('/teacher/CompTypes').then((res) => {
        this.compTypes = res.data.data
        this.popupSlots[0].values = [];
        _.forEach(this.compTypes, item => {
          this.popupSlots[0].values.push(item.CompName);
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    methods: {
      handleOK() {
        this.compType = _.cloneDeep(this.showType);
        this.popupVisible = false;
      },
      onValuesChange(picker, values) {
        this.showType = values[0];
      },
      chooseCompType() {
        this.popupVisible = true;
        if (this.compType)
          this.$refs.typePicker.setSlotValue(0, this.compType);
      },
      back() {
        this.$router.back(-1);
      },
      register() {
        const params = new URLSearchParams();
        if (!this.teaId || !this.password || !this.phoneNum || !this.teaName || !this.compType) {
          this.$message.error('请填写完整的信息');
          return;

        }
        this.Loading = true;
        params.append('teaId', this.teaId)
        params.append('password', this.password)
        params.append('phoneNum', this.phoneNum)
        params.append('teaName', this.teaName)
        params.append('CompTypeid', _.find(this.compTypes, {CompName: this.compType}).CompTypeid)
        this.$axios.post('/teacher/regist', params).then((res) => {
          if (res.data.result === 'success') {
            this.Loading = false;
            this.$message({
              message: '注册成功',
              type: 'success'
            });
            this.$router.push('/teacher/myself');
          }
          if (res.data.result === 'exist') {
            this.Loading = false;
            this.$message.error('该账户已存在');
          }

        }).catch((err) => {
          this.Loading = false;
          this.$message.error("" + err);
        })
      }
    }
  }
</script>

<style lang="scss">
  /**用div遮盖住input可以让他实现点击input出来弹框效果 */
  #peopleChorseT {
    position: absolute;
    width: 100%;
    top: 1.17rem;
    height: 0.6rem;
  }

  /**问题类型弹框样式 */
  .picker-toolbar-title {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: #eee;
    height: 44px;
    line-height: 44px;
    font-size: 16px;

    .usi-btn-cancel, .usi-btn-sure {
      color: #26a2ff;
      font-size: 16px;
    }
  }

  .mint-field {
    text-align: left;
  }

  .el-main {
    border: aqua 2px;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .nav {
    position: fixed; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top: 0; /* 距离窗口顶部距离 */
    left: 0; /* 距离窗口左边的距离 */
    width: 100%; /* 宽度设置为100% */
    z-index: 99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }

  .register-btn {
    margin-top: 100px;
    text-align: center;
    color: #fff;
    padding: 0.5rem 0;
    border-radius: 0.2rem;
    background-color: #B4282D;
  }

  .el-row {
    line-height: 1.7;
  }
</style>
