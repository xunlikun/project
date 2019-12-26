import Cookies from 'js-cookie'
export function getToken(){

    
    if(Cookies.get('token')){
        let token = Cookies.get('token')
        if(token.length<100){
            return false
        }
        return Cookies.get('token')
    }else{
        // localStorages.clear()
    }

}
export function setToken(payload,expires){
  

        
        if(expires) {
            // console.log(expires.expires)
            let date = new Date((new Date).getTime() + expires.expires)
                expires.expires = date
            return Cookies.set('token',payload,expires)
        }else{
            return Cookies.set('token',payload)
        }
            

    
}
export function delToken(){
    return Cookies.remove('token')
}