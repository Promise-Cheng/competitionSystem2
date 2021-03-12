import * as api from '@/api/api';

export default {
  getCompTypes(context) {
    api.competition.getCompTypes(null).then(res => {
      context.commit('init', {key: 'compTypes', value: res.data.data});
    })
  },

  getUserInfo(context) {
    api.common.getUserInfo().then((res) => {
      if (res.result === 'success') {
        context.commit('init', {key: 'user', value: res.data})
        context.commit('init', {key: 'isLoaded', value: true})
      } else {
        Toast('未知错误！')
      }
    })
  },
  async clearSystems(context) {
    await api.common.loginOut()
    context.commit('init', {key: 'user', value: null})
    context.commit('init', {key: 'isLoaded', value: false})
  }
}
