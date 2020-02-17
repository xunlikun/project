
const getters = {
    //app
    spinShow: state => state.app.spinShow,
    //user
    userInfo: state => state.user.userInfo,
    token: state => state.user.token,
    tempToken: state => state.user.tempToken
}

export default getters