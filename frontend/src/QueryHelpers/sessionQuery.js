// signing up a user
import Cookies from 'js-cookie'
export class MyError extends(Error){
    constructor(errObj,message){
        super(message)
        this.errObj = errObj
    }
}

export async function getUser(){
    const response = await fetch('api/session')
    const user = await response.json()
    return user
}
export async function userSignup(formData){
    // consosle.log('this is cookie',Cookies)
    // console.log(formData.get())
    const response = await fetch('api/signup/',{
        method:'POST',
        headers:{
            'X-CSRFToken':Cookies.get('csrftoken'),
            // 'Content-Type':"application/x-www-form-urlencoded"
        },
        body:formData
    })
    if(response.ok){
        const data = await response.json()
        return data
    }else{
        const error = await response.json()
        throw new MyError(error.error)
    }

}

export async function userLogin(formData){
    const response = await fetch('api/login/',{
        method:'POST',
        headers:{
            'X-CSRFToken':Cookies.get('csrftoken')
        },
        body:formData
    })
    const data = await response.json()
    if(response.ok){
        return data
    }else{
        console.log('this is error',data)
        throw new MyError(data)
    }
}

export async function getAllAppointments(){
    const response = await fetch('api/appointments')
    const data = await response.json()
    if(response.ok){
        return data
    }else{
        throw new MyError(data)
    }
}
export async function logOut(){
    const response = await fetch('api/signout')
    const data = await response.json()
    return data
}
