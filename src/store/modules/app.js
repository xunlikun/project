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
   
}

export default {
    namespace:true,
    state,
    mutations,
    actions
}