import request from '@/utils/request'

export function getInvoicList(data){
    return request({
        url:'/api/project/invoice/list',
        method:'post',
        data
    })
}
export function getInvoicAmount(data){
    return request({
        url:'/api/project/invoice/amountPayable',
        method:'post',
        data
    })
}
export function getBalance(){
    return request({
        url:'/api/project/invoice/balance',
        method:'post'
    })
}
export function submitInvoic(){
    return request({
        url:'/api/project/invoice/commit',
        method:'post'
    })
}