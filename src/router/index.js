import Vue from 'vue'
import {get} from '../api/axios'
import Router from 'vue-router'
import Home from '../components/home'
import CompSearch from '../components/compSearch'
import TeamSearch from '../components/teamSearch'
import HomeNews from '../components/news'
import CompIntroduce from '../components/compIntroduce'
import store from '@/store'
/* stuMyself */
import Login from '../pages/myself/login'
import Register from '../pages/myself/register'
import Index from '../pages/myself/index'
import Edit from '../pages/myself/edit'
import MyComp from '../pages/myself/myComp'
import MyCompStart from '../pages/myself/myCompStart'
import MyCompIng from '../pages/myself/myComping'
import MyCompEnd from '../pages/myself/myCompend'
import MyDetail from '../pages/myself/myDetail'
import MyCompDetail from '../pages/myself/myCompDetail'
import CompSubject from '../pages/myself/compSubject'
import CompSubjectDetail from '../pages/myself/compSubjectDetail'
import QueryResult from '../pages/myself/queryResult'
import EditPassword from '../pages/myself/editPassword'
import About from "@/pages/myself/About";

/* stuCompetition */
import Start from '../pages/competition/start'
import Detail from '../pages/competition/detail'
import SignUp from '../pages/competition/SignUp'
/* stuTeam */
import TeamIndex from '../pages/team/index'
import AllTeam from '../pages/team/allTeam'
import TeamDetail from '../pages/team/teamDetail'
import NewTeam from '../pages/team/newTeam'
import MyTeamDetail from '../pages/team/myteamDetail'
import TeamApplyment from '../pages/team/teamApplyment'

/* teacher */
import TeacherRegister from '../pages/myself/register_tea'
import TeacherLogin from '../pages/myself/login_tea'
import TeacherHome from '../pages/teacher/teacherHome'
import TeacherComp from '../pages/teacher/allComp'
import TeacherManage from '../pages/teacher/compManage'
import TeacherMyself from '../pages/teacher/teacherMyself'
import CompSearch1 from '../pages/teacher/compSearch'
import PubComp from '../pages/teacher/pubComp'
import CompDetail from '../pages/teacher/compDetail'
import ManageTeam from '../pages/teacher/manageTeam'
import ManageTeamDetail from '../pages/teacher/manageTeamDetail'
import InformationEdit from '../pages/teacher/manage/informationEdit'
import TitleEdit from '../pages/teacher/manage/titleEdit'
import PersonnelManage from '../pages/teacher/manage/personnelManage'
import MakeScore from '../pages/teacher/endComp/makeScore'
import Score from '../pages/teacher/endComp/score'
import EditInfo from '../pages/teacher/editInfo'
import PerRank from '../pages/teacher/endComp/perRank'
import AddCompList from '../pages/teacher/endComp/addComplist'
import EditScore from '../pages/teacher/endComp/editScore'
import CheckTeam from '../pages/teacher/checkTeam'
import CheckTeamDetail from '../pages/teacher/teamDetail'

/* manager */

import ManagerIndex from '../pages/manager/index'
import userInfo from '../pages/manager/userInfo'
import Test from '../test/home'


Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: Test
    },

    /*
    学生端
     */
    {
      path: '/',
      name: 'index',
      component: Login
    },
    {
      path: '/home/homeNews',
      name: 'homeNews',
      component: HomeNews
    },
    {
      path: '/myself/about',
      name: 'About',
      component: About
    },
    {
      path: '/home/compIntroduce',
      name: 'compIntroduce',
      component: CompIntroduce
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/home/compSearch',
      name: 'compSearch',
      component: CompSearch
    },
    {
      path: '/home/teamSearch',
      name: 'teamSearch',
      component: TeamSearch
    },
    {
      path: '/myself',
      name: 'myself',
      component: Index,
      meta: {
        keepAlive: true, // 不需要缓存
        bypass: true
      }
    },
    {
      path: '/myself/editPassword',
      name: 'editPassword',
      component: EditPassword,
    },
    {
      path: '/myself/myComp',
      name: 'myComp',
      component: MyComp,
    },
    {
      path: '/competition/start',
      name: 'myStart',
      component: MyCompStart,
    },
    {
      path: '/myself/ing',
      name: 'myIng',
      component: MyCompIng,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/myself/end',
      name: 'myEnd',
      component: MyCompEnd,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/myself/myDetail',
      name: 'myDetail',
      component: MyDetail
    },
    {
      path: '/myself/myCompDetail',
      name: 'myCompDetail',
      component: MyCompDetail,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/myself/compSubject',
      name: 'compSubject',
      component: CompSubject,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/myself/compSubjectDetail',
      name: 'compSubjectDetail',
      component: CompSubjectDetail
    },
    {
      path: '/myself/queryResult',
      name: 'queryResult',
      component: QueryResult
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        next();
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/myself/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/competition/allStart',
      name: 'start',
      component: Start,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/competition/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/competition/signUp',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/team/myteam',
      name: 'teamIndex',
      component: TeamIndex,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/team',
      name: 'allTeam',
      component: AllTeam,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/team/teamDetail',
      name: 'teamDetail',
      component: TeamDetail
    },
    {
      path: '/team/newTeam',
      name: 'newTeam',
      component: NewTeam
    },
    {
      path: '/team/myTeamDetail',
      name: 'myTeamDetail',
      component: MyTeamDetail,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    /*
    教师端
     */
    {
      path: '/teacher/checkTeam',
      name: 'checkTeam',
      component: CheckTeam,
    },
    {
      path: '/teacher/checkTeamDetail',
      name: 'checkTeamDetail',
      component: CheckTeamDetail,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/login_tea',
      name: 'teacherLogin',
      component: TeacherLogin,
    },
    {
      path: '/register_tea',
      name: 'teacherRegister',
      component: TeacherRegister,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/teacher/home',
      name: 'teacherHome',
      component: TeacherHome,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/teacher/competition',
      name: 'teacherComp',
      component: TeacherComp,
      meta: {
        keepAlive: true // 不需要缓存
      }

    },
    {
      path: '/teacher/manage',
      name: 'teacherManage',
      component: TeacherManage,
      meta: {
        bypass: true,
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/teacher/myself',
      name: 'teacherMyself',
      component: TeacherMyself,
      meta: {
        bypass: true,
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/teacher/compSearch',
      name: 'compSearch1',
      component: CompSearch1
    },
    {
      path: '/teacher/pubComp',
      name: 'pubComp',
      component: PubComp
    },
    {
      path: '/teacher/compDetail',
      name: 'compDetail',
      component: CompDetail
    },
    {
      path: '/teacher/manageTeam',
      name: 'manageTeam',
      component: ManageTeam,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/teacher/manageTeamDetail',
      name: 'manageTeamDetail',
      component: ManageTeamDetail
    },
    {
      path: '/teacher/informationEdit',
      name: 'informationEdit',
      component: InformationEdit
    },
    {
      path: '/teacher/titleEdit',
      name: 'titleEdit',
      component: TitleEdit
    },
    {
      path: '/teacher/personnelManage',
      name: 'personnelManage',
      component: PersonnelManage,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/teacher/makeScore',
      name: 'makeScore',
      component: MakeScore
    },
    {
      path: '/teacher/score',
      name: 'score',
      component: Score,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/teacher/editInfo',
      name: 'editInfo',
      component: EditInfo
    },
    {
      path: '/teacher/teamApplyment',
      name: 'teamApplyment',
      component: TeamApplyment,
      meta: {
        keepAlive: true // 不需要缓存
      }

    },
    {
      path: '/teacher/perRank',
      name: 'perRank',
      component: PerRank,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/teacher/addCompList',
      name: 'addCompList',
      component: AddCompList
    },
    {
      path: '/teacher/editScore',
      name: 'editScore',
      component: EditScore
    },
    /* 管理员端 */
    {
      path: '/manager/index',
      name: 'managerIndex',
      component: ManagerIndex
    },
    {
      path: '/manager/userinfo/student',
      name: 'UserInfostudent',
      component: userInfo,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/manager/userinfo/teacher',
      name: 'UserInfoteacher',
      component: userInfo,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/manager/userinfo/manager',
      name: 'UserInfomanager',
      component: userInfo,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.path === '/login' && store.state.isLoaded) {
    store.dispatch('clearSystems')
  }
  if (!to.meta.bypass) {
    return next()
  }
  try {
    const res = await get('/api/checkSession', {})
    if (res.ok) {
      if (!store.state.isLoaded)
        await store.dispatch('getUserInfo')
      return next()
    }
    if(to.path.indexOf('teacher') !== -1){
      return next({name: 'teacherLogin', query: {next: to.fullPath}})
    }
    return next({name: 'login', query: {next: to.fullPath}})
  } catch (err) {
    if(to.path.indexOf('teacher') !== -1){
      return next({name: 'teacherLogin'})
    }
    return next({name: 'login'})
  }
})
export default router

