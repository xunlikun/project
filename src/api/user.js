import request from '@/utils/request'

export function login(data){
    return request({
        url:'/api/project/user/login',
        method:'post',
        data
    })
}
export function checkVerificationCode(data){
    return request({
        url:'/api/project/user/checkVerificationCode',
        method:'post',
        data
    })
}
export function sendVerificationCode(data){
    return request({
        url:'/api/project/user/sendVerificationCode',
        method:'post',
        data
    })
}
export function sendToOss(data){
    return request({
        url:'/api/project/user/sendToOss',
        method:'post',
        data
    })
}
export function getCompanyInfo(){
    return request({
        url:'/api/project/userEntity/getEntityInfo',
        method:'post'
    })
}
export function updataCompanyInfo(data){
    return request({
        url:'/api/project/userEntity/updateEntityInfo',
        method:'post',
        data
    })
}
export function resetUserInfo(data){
    return request({
        url:'/api/project/user/resetUserInfo',
        method:'post',
        data
    })
}