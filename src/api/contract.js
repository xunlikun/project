import request from '@/utils/request'

export function getContractList(data){
    return request({
        url:'/api/project/contract/list',
        method:'post',
        data
    })
}
export function getContractDetail(data){
    return request({
        url:'/api/constructor/contract/getContractDetail',
        method:'post',
        data
    })
}
export function getNextContract(data){
    return request({
        url:'/api/constructor/contract/getNextContract',
        method:'post',
        data
    })
}
export function getPreviousContract(data){
    return request({
        url:'/api/constructor/contract/getPreviousContract',
        method:'post',
        data
    })
}
export function sign(data){
    return request({
        url:'/api/project/contract/signed',
        method:'post',
        data,
        headers:{'json':true}
    })
}