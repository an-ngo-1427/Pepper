import { MyError } from "./sessionQuery"
import Cookies from 'js-cookie'
export async function getCompanions(){
    const response = await fetch('api/companions/')
    const data = await response.json()
    console.log('this is data',data)
    if(response.ok){
        return data
    }else{
        throw new MyError(data)
    }
}

export async function createCompanion(formData){
    console.log('formDate',formData)
    const response = await fetch('api/companions/',{
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
        throw new MyError(data.error)
    }
}
