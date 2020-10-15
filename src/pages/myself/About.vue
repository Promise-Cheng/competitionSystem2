<template>
  <div>
    <mt-header fixed title="关于" style="line-height: 30px;background-color: #F56C6C">
      <mt-button icon="back" slot="left" @click="back">返回</mt-button>
    </mt-header>
    <div style="text-align: center;margin:15px;font-size: 24px;">
      大学生学科竞赛平台2020
    </div>
    <mt-cell :title="'版本号:'+version"></mt-cell>
    <mt-cell style="text-align: left;">
      <template #title>
        <div style="text-align: left;font-size: 20px;">
          联系我们：
        </div>
      </template>
    </mt-cell>
    <mt-cell :title="'QQ:'+QQ"></mt-cell>
    <mt-cell :title="'wechat:'+wechat"></mt-cell>
    <mt-cell>
      <template #title>
        <div style="padding-top: 15px">
          介绍：{{introduce}}
        </div>
      </template>
    </mt-cell>
    <div class="text-desc text-center bottom_positon">{{ footerTips }}</div>
  </div>
</template>

<script>
  export default {
    name: "About",
    data() {
      return {
        footerTips:'Copyright@2020 浙江理工大学 ALL rights reserved',
        version: '1.2',
        introduce: '初次开发系统，bug会有许多，如遇未知错误，请联系我们进行反馈，我们将尽快修复或优化相关细节，感谢您的支持',
        QQ: '12345678',
        wechat: '12345678'
      }
    },
    methods:{
      back(){
        this.$router.back(-1)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .bottom_positon {
    position: absolute;
    bottom: 30px;
    width: 100%;
  }
  .text-desc{
    font-size:12px;
    color: #999;
  }
</style>
