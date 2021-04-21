import axios from 'axios'
import {Message} from "element-ui";
// 环境的切换  设置axios的默认请求地址
// 通过node的环境变量来匹配我们的默认的接口url前缀
axios.defaults.baseURL = 'http://172.16.9.139:8085';//http://101.37.13.10:8085   http://localhost:8085 http://8.135.135.96:8085
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//设置请求超时
axios.defaults.timeout = 10000;
axios.interceptors.response.use((res) => {
  if (res.data.code === 401) {
    Message({
      type: 'info',
      message: res.data.message
    })
    let index = window.location.href.indexOf('teacher')
    window.location.href = index === -1 ? '/#/login' : '/#/login_tea'
    return Promise.reject()
  }
  return Promise.resolve(res);
}, (error) => {
  return Promise.reject(error);
})
const request = axios
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const post = (url, ...params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, getPostParams(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
export const formDataPost = (url, ...params) => {
  return axios({
    method: "POST",
    url: url,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: getPostParams(params),
  });
};

export function getPostParams(params) {
  let keyArr = Object.keys(params[0]);
  let urlSearchParams = new URLSearchParams();
  _.forEach(keyArr, item => {
    urlSearchParams.append(item, params[0][item]);
  })
  return urlSearchParams;
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 * delet方法，对应delett请求
 * @param {String} url [请求的url地址]
 * delete关键字会和vue系统关键字冲突，所以这里用delet代替
 * delete用于删除，参数一般带在url
 */
export const delet = url => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
/**
 * patch方法，对应patch请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * 这里根据需求适应了formdata的格式，也可以跟post用一样的封装
 */
export const patch = (url, params) => {
// 将数据转换为formData格式
// 正常情况下可以直接使用参数对象进行patch，如果出错可以尝试转换form Data
  var formData = new FormData()
  formData.append('username', params.username)
  formData.append('password', params.password)
  return new Promise((resolve, reject) => {
    axios
      .patch(url, formData)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export default request
