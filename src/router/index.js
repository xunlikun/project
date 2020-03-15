import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',
      // beforeEnter(to,from,next){
      //   if(store.getters.token){
      //     next('/manager')
      //   }else{
      //     next()
      //   }
      // }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login'),
      // beforeEnter(to,from,next){
      //   if(store.getters.token){
      //     next('/manager')
      //   }else{
      //     next()
      //   }
      // }
    },
    {
      path: '/firstLogin',
      name: 'FirstLogin',
      component: () => import('@/views/firstLogin'),
      beforeEnter(to,from,next){
        if(store.getters.userInfo.userStatus && store.getters.token){
          next('/manager')
        }else if(!store.getters.userInfo.userStatus && store.getters.token){
          next()
        }
      }
    },
    {
      path: '/forget',
      name: 'Forget',
      component: () => import('@/views/forget'),
      // beforeEnter(to,from,next){
      //   if(store.getters.token){
      //     next('/manager')
      //   }else{
      //     next()
      //   }
      // }
    },
    {
      path: '/reset',
      name: 'Reset',
      component: () => import('@/views/reset'),
      // beforeEnter(to,from,next){
      //   if(store.getters.token){
      //     next('/manager')
      //   }else{
      //     next()
      //   }
      // }
    },
    {
      path: '/manager',
      name: 'index',
      component: () => import('@/layout'),
      redirect:'/manager/contract',
      beforeEnter(to,from,next){
        if(store.getters.token && store.getters.userInfo.userStatus){
          next()
        }else if(store.getters.token && !store.getters.userInfo.userStatus){
          next('/firstLogin')
        }else{
          store.commit('DELETE_TOKEN')
          next('/login')
        }
      },
      children:[
        {
          path: '/manager/invoic',
          name:'Invoic',
          component: () => import('@/components/manager/invoic'),
          meta:{keepAlive:true,title:['Invoic']}
        },
        {
          path:'/manager/invoic/upload',
          name:"InvoicUpload",
          component: () => import('@/components/manager/invoic/upload'),
          meta:{keepAlive:true,title:['Invoic','Upload'] },
          beforeEnter(to,from,next){
            if(store.getters.userInfo.userStatus == 1){
              next()
            }else{
              next('/manager')
            }
          }
        },
        {
          path: '/manager/contract',
          name:'Contract',
          component: () => import('@/components/manager/contract'),
          meta:{keepAlive:true,title:['Contract']}
        },
        {
          path:'/manager/contract/contractDetail',
          name:"ContractDetail",
          component: () => import('@/components/manager/contract/contractDetail'),
          meta:{keepAlive:true,title:['Contract','ContractDetail'] },
          beforeEnter(to,from,next){
            if(store.getters.userInfo.userStatus == 1){
              next()
            }else{
              next('/manager')
            }
          }
        },
        {
          path: '/manager/employee',
          name:'Employee',
          component: () => import('@/components/manager/employee'),
          meta:{keepAlive:true,title:['Employee']}
        },
        {
          path: '/manager/employee/employeeDetail',
          name:'EmployeeDetail',
          component: () => import('@/components/manager/employee/employeeDetail'),
          meta:{keepAlive:true,title:['Employee','EmployeeDetail']},
          beforeEnter(to,from,next){
            if(store.getters.userInfo.userStatus == 1){
              next()
            }else{
              next('/manager')
            }
          }
        }
      ]
    }
  ]
})
