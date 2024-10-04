import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getUser, userLogin } from "../../QueryHelpers/sessionQuery"
import { useNavigate } from "react-router-dom"
import { Button, Heading, Stack } from '@chakra-ui/react'

export default function LogInPage(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [formErr,setFormErr] = useState({})
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {data} = useQuery({queryKey:['user'],queryFn:getUser})
    const user = data?.user

    const userMutation = useMutation({
        mutationFn:userLogin,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['user']})
            navigate('/')
        },
        onError:(error)=>{
            setFormErr(error.errObj)
        }
    })

    useEffect(()=>{
        console.log('user',data)
        if (user){
            navigate('/')
        }
    },[data])

    const handleFormSubmit = (e)=>{

        e.preventDefault()
        const formData = new FormData()
        formData.append('username',username)
        formData.append('password',password)
        userMutation.mutate(formData)

        if(userMutation.isError) setFormErr(userMutation.error.errObj)
        if(userMutation.isSuccess) navigate('/')
    }

    return(
        <div>
            <form onSubmit={handleFormSubmit}>
                <Stack width='30%' bg='gray' padding={'20px'} margin='auto'>
                    <Heading>Log In</Heading>
                    {formErr && Object.keys(formErr).map(ele=><div style={{color:'#cb1d14'}}>{ele} : {formErr[ele]}</div>)}
                    <input onChange={(e)=>setUsername(e.target.value)}label='username' placeholder="username" required></input>
                    <input onChange={(e)=>setPassword(e.target.value)}label='password' type='password' placeholder="password" required></input>
                    <Button isLoading={userMutation.isPending} type='submit'>Submit</Button>
                </Stack>
            </form>
        </div>
    )
}
