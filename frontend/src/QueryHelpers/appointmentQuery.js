import Cookies from 'js-cookie'
import { MyError } from './sessionQuery'

export async function getOwnerAppointments(){
    const response = await fetch('api/owner/appointments')
    if(response.ok){
        const data = await response.json()
        return data
    }else{
        throw new Error('there was an error')
    }

}

export async function cancelAppointment(appointmentId){
    const response = await fetch(`api/appointments/${appointmentId}`,{
        method:'DELETE',
        headers:{
            'X-CSRFToken':Cookies.get('csrftoken')
        },
    })
    const data = await response.json()
    if(response.ok){
        return data
    }else{
        throw new MyError(data)
    }
}
export async function bookAppointment(appointmentId,formData){
    const response = await fetch(`api/appointments/${appointmentId}/`,{
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
