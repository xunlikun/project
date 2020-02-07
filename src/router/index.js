import Vue from 'vue'
import Router from 'vue-router'

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
      // beforeEnter(to,from,next){
      //   if(store.getters.token){
      //     next('/manager')
      //   }else{
      //     next()
      //   }
      // }
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
        // if(store.getters.token){
          next()
        // }else{
        //   store.commit('DELETE_TOKEN')
        //   next('/login')
        // }
      },
      children:[
        {
          path: '/manager/invoic',
          name:'Invoic',
          component: () => import('@/components/manager/invoic'),
          meta:{keepAlive:true,title:['Invoic']}
        },
        {
          path: '/manager/contract',
          name:'Contract',
          component: () => import('@/components/manager/contract'),
          meta:{keepAlive:true,title:['Contract']}
        },
        {
          path: '/manager/employee',
          name:'Employee',
          component: () => import('@/components/manager/employee'),
          meta:{keepAlive:true,title:['Employee']}
        },
      ]
    }
  ]
})
