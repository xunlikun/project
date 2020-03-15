import { getEmployeeList } from '@/api/employee.js'
const state = {
    name:'employee'
}

const mutations = {
    
}

const actions = {
    async getEmployeeList({state,commit},op){
    return await  getEmployeeList(op)
   }
}

export default {
    namespace:true,
    state,
    mutations,
    actions
}