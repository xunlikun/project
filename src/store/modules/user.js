import { localStorages } from '@/utils/cache.js'
const state = {
    name:'user',
    tempToken:''
}

const mutations = {
    SET_TEMP_TOKEN(state,value){
        localStorages.set('tempToken',value,1000*60*10)
        state.tempToken = value
    }
}

const actions = {
   
}

export default {
    namespace:true,
    state,
    mutations,
    actions
}