//https://blog.csdn.net/weixin_33721344/article/details/87987965

import axios from 'axios'
import QS from 'qs'// 引入qs模块，用来序列化post类型的数据


// 环境的切换  设置axios的默认请求地址
// 通过node的环境变量来匹配我们的默认的接口url前缀
axios.defaults.baseURL = 'http://localhost:8085';//http://101.37.13.10:8085   http://localhost:8085
axios.defaults.withCredentials=true;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// if (process.env.NODE_ENV === 'development') {
//   axios.defaults.baseURL = 'https://localhost:8085';
// } else if (process.env.NODE_ENV === 'debug') {
//   axios.defaults.baseURL = 'https://localhost:8080';
// } else if (process.env.NODE_ENV === 'production') {
//   axios.defaults.baseURL = 'https://localhost:8080';
// }
//设置请求超时
axios.defaults.timeout = 10000;

//post请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置，即设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


// 先导入vuex,因为我们要使用到里面的状态对象
// vuex的路径根据自己的路径去写
import store from '@/store/index';

// 请求拦截器
// axios.interceptors.request.use(
//   config => {
//     // 每次发送请求之前判断vuex中是否存在token
//     // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
//     // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
//     const token = store.state.token;
//     token && (config.headers.Authorization = token);
//     return config;
//   },
//   error => {
//     return Promise.error(error);
//   })

// 响应拦截器
// axios.interceptors.response.use(
//   response => {
//     // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
//     // 否则的话抛出错误
//     if (response.status === 200) {
//       return Promise.resolve(response);
//     } else {
//       return Promise.reject(response);
//     }
//   },
//   // 服务器状态码不是2开头的的情况
//   // 这里可以跟你们的后台开发人员协商好统一的错误状态码
//   // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
//   // 下面列举几个常见的操作，其他需求可自行扩展
//   error => {
//     if (error.response.status) {
//       switch (error.response.status) {
//         // 401: 未登录
//         // 未登录则跳转登录页面，并携带当前页面的路径
//         // 在登录成功后返回当前页面，这一步需要在登录页操作。
//         case 401:
//           router.replace({
//             path: '/login',
//             query: {
//               redirect: router.currentRoute.fullPath
//             }
//           });
//           break;
//
//         // 403 token过期
//         // 登录过期对用户进行提示
//         // 清除本地token和清空vuex中token对象
//         // 跳转登录页面
//         case 403:
//           Toast({
//             message: '登录过期，请重新登录',
//             duration: 1000,
//             forbidClick: true
//           });
//           // 清除token
//           localStorage.removeItem('token');
//           store.commit('loginSuccess', null);
//           // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
//           setTimeout(() => {
//             router.replace({
//               path: '/login',
//               query: {
//                 redirect: router.currentRoute.fullPath
//               }
//             });
//           }, 1000);
//           break;
//
//         // 404请求不存在
//         case 404:
//           Toast({
//             message: '网络请求不存在',
//             duration: 1500,
//             forbidClick: true
//           });
//           break;
//         // 其他错误，直接抛出错误提示
//         default:
//           Toast({
//             message: error.response.data.message,
//             duration: 1500,
//             forbidClick: true
//           });
//       }
//       return Promise.reject(error.response);
//     }
//   })

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const post = (url, ...params) => {
  return new Promise((resolve, reject) => {
    axios //QS.stringify(params)关于这个函数会输出什么结果大家可以自行尝试一下，结果会让你惊喜，也可以自己单独传一个对象进去测试一下
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
    data:getPostParams(params),
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
