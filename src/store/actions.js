import * as api from '@/api/api';

export default {
  getCompTypes(context) {
    api.competition.getCompTypes(null).then(res => {
      context.commit('init', {key: 'compTypes', value: res.data.data});
    })
  },
  getUserInfo(context) {
    const username = sessionStorage.getItem('ms_username');
    const password = sessionStorage.getItem('ms_password');
    let params = null;
    let urlString = '';
    let dataString = '';
    if(sessionStorage.getItem('userType')==='0'){
      params = {
        stuNum: username,
        password: password
      };
      urlString='login';
      dataString = 'info';
    }else{
      params = {
        teaId: username,
        password: password
      };
      urlString='login_tea';
      dataString = 'data';

    }
    api.common[urlString](params).then(res => {
      context.commit('init', {key: 'user', value: res[dataString]});
      context.commit('init', {key: 'isLoaded', value: true});
    }).catch(err=>{
      context.commit('init', {key: 'user', value: null});
      context.commit('init', {key: 'isLoaded', value: false});
    })
  },
  clearSystems(context){
    context.commit('init', {key: 'user', value: null});
    context.commit('init', {key: 'isLoaded', value: false});
  }
}
