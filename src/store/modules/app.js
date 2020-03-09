const state = {
    name:'app',
    spinShow:false
}

const mutations = {
    SET_GLOADING(state,boole){
        state.spinShow = boole
    }
}

const actions = {
    async down({state,commit},url){
        let a = document.createElement('a')
        a.href = url
        a.click()
       }
}

export default {
    namespace:true,
    state,
    mutations,
    actions
}