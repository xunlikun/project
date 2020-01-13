import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/manager',
      name: 'index',
      component: () => import('@/layout'),
      redirect:'/manager/project',
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
          path: '/manager/project',
          name:'Project',
          component: () => import('@/components/manager/project'),
          meta:{keepAlive:true,title:['Project']}
        },
      ]
    }
  ]
})
