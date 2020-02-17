import { login,register,getCompanyInfo } from '@/api/user.js'
import { localStorages } from '@/utils/cache.js'
import { getToken,setToken,delToken } from '@/utils/auth.js'
import ViewUI from 'view-design'
import Router from '@/router'
const state = {
    name:'user',
    tempToken:localStorages.get('tempToken') ? localStorages.get('tempToken') : '',
    token:getToken(),
    userInfo:localStorages.get('userInfo') ? JSON.parse(localStorages.get('userInfo')) : {}
}

const mutations = {
    SET_TEMP_TOKEN(state,value){
        localStorages.set('tempToken',value,1000*60*10)
        state.tempToken = value
    },
    SET_USER_STATUS(state,value){
        let temp = JSON.parse(JSON.stringify(state.userInfo))
        localStorages.set('userInfo',{...temp,userStatus:value})
        state.userInfo = {...temp,userStatus:value}
    },
    SET_TOKEN(state){
        setToken(getToken(),{expires:1000*60*60})
        state.token = getToken()
    },
    DELETE_TOKEN(state){
        delToken()
        state.token = ''
        localStorages.clear()
        ViewUI.Message.warning('您已登出！')
        // Router.replace({name:'Login'})
        setTimeout(()=>{
            window.location.reload()
          },500)
    }
}

const actions = {
   login({commit,state},op){
    login(op).then(res => {
        if(res.status == 200){
            localStorages.clear()
            localStorages.set('userInfo',{loginName:res.data.loginName,userName:res.data.userName,userStatus:res.data.userStatus,mobile:res.data.mobile})
            state.userInfo = {loginName:res.data.loginName,userName:res.data.userName,userStatus:res.data.userStatus,mobile:res.data.mobile}
            setToken(res.data.token,{expires:1000*60*60})
            state.token = res.data.token
            
            if(state.userInfo.userStatus){
                ViewUI.Message.success('登录成功！')
                Router.replace({path:'/manager'})
            }else{
                ViewUI.Message.success('请继续认证')
                Router.replace({path:'/firstLogin'})
            }
            
        }else{
            ViewUI.Message.error('登录失败！')
            Router.replace({path:'/login'})
        }
    })
   }
}

export default {
    namespace:true,
    state,
    mutations,
    actions
}