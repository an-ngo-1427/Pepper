import {useQuery,useMutation, useQueryClient} from '@tanstack/react-query'
import { getUser, userSignup } from '../../QueryHelpers/sessionQuery'
import { Container, useEditable } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import NotFound from '../../NotFound'
export default function UserProfile({user}){
    const navigate = useNavigate()
    // const {data} = useQuery({queryKey:['user'],queryFn:getUser})
    // const user = data?.user
    console.log('this is user',user)
    useEffect(()=>{
        if(!user) navigate('/login')
    },[user])
    console.log(user)
    return(
        <>
            {user && (
                <Container>
                    <button onClick={()=>{fetch('api/signout').then(navigate('/'))}}>Log Out</button>
                    <h1>User profile</h1>
                    <div>{user.firstname} {user.lastname}</div>
                    <div>Email: {user.email}</div>
                </Container>
            )}
        </>
    )
}
