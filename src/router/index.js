import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
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
          path: '/manager/finance',
          name:'Finance',
          component: () => import('@/components/manager/finance'),
          meta:{keepAlive:true,title:['Finance']}
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
