import { getContractList } from '@/api/contract.js'
const state = {
    name:'contract'
}

const mutations = {

}

const actions = {
    async getContractList({state,commit},op){
        return await  getContractList(op)
       }
}

export default {
    namespace:true,
    state,
    mutations,
    actions
}