/**
 * api接口统一管理
 */
import {formDataPost, get, post} from './axios'
export const common = {
  /**
   * 登录接口
   * @param params  stuNum,password
   * @returns {Promise | Promise<unknown>}
   */
  login: (params) => post('/login', params),
  /**
   * 教师端登录
   * @param params teaId,password
   * @returns {Promise<unknown>}
   */
  login_tea: (params) => post('/teacher/login', params),
  register: (params) => post("/register", params),
  getHomeData: (params) => get('/home', params),
  loginOut: () => post('/logout', {}),
  getUserInfo: () => get('/getUserInfo', {}),
}
export const competition = {
  /**
   * 教师端查看竞赛题目
   * @param params CompId
   * @returns {Promise | Promise<unknown>}
   */
  getQuestion: (params) => get('/teacher/Topics', params),
  /**
   * 学生端查看竞赛题目。
   * @param params CompId
   * @returns {Promise | Promise<unknown>}
   */
  getStudentQuestion:(params) => get('/users/showMyTopic', params),
  /**
   * 重新评分，回到上一状态。
   * @param params compStateID,CompId
   * @returns {Promise | Promise<unknown>}
   */
  reScore:(params) => post('/teacher/ChangeCompStateMinus', params),
  listByStatus: (params) => get('/Competitions/show', params),
  getMyComp: (params) => get('/users/myComp', params),
  //修改
  edit: (params) => post('/teacher/manageComp/updateInfo', params),
  //新增
  save: (params) => post('/teacher/submit', params),
  applyComp: (params) => post('users/myteams/applyToComp', params),
  //获取所有竞赛类型
  getCompTypes: (params) => get('/teacher/CompTypes', params),
  // 参数CompId
  detail: (params) => get('/Competitions/detail', params),
  list: (params) => get('/Competitions/show', params),
  latest: (params) => get('/Competitions/latest', params),
  findCompByName: (params) => get('/Competitions/Search', params),

}
export const team = {
  list: (params) => get('/teams/show', params),
  getMyTeam: (params) => get('/users/manage', params),
  findTeamByName: (params) => get('/teams/Search', params),
  detail: (params) => get('/users/manage/detail', params),
  myTeams: (params) => get('/users/myteams', params),
}

export const question = {
  /**
   * 获取题目详情
   * @param params questionId
   * @returns {Promise | Promise<unknown>}
   */
  getDetail: (params) => get('teacher/TopicDetail', params),
  downloadFile: (params) => get('/files/question/download', params),
}

export const work = {
  /**
   *
   * @param params teamCompId:1//团队竞赛id
   workName:xxx//作品名称
   introduction:xxx//作品介绍
   question:1//题目id
   file:xxxx//文件流
   * @returns {Promise | Promise<unknown>}
   */
  uploadWork: (params) => formDataPost('users/uploadWorks', params),

}
