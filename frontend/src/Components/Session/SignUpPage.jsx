import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUser, userSignup } from '../../QueryHelpers/sessionQuery'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, FormErrorMessage, Heading, Stack } from '@chakra-ui/react'
export default function SignUp() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [userName, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [email, setEmail] = useState('')
    const [formErr, setFormErr] = useState({})
    const [image, setImage] = useState('')
    const { data } = useQuery({ queryKey: ['user'], queryFn: getUser })

    useEffect(() => {
        if (data?.user) {
            console.log('entered')
            navigate('/profile')
        }
    }, [data])
    const userMutation = useMutation({
        mutationFn: userSignup,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
            navigate('/profile')
        },
        onError: (error) => {
            setFormErr(error.errObj)
        }
    })

    const handleFormSubmit = (e) => {
        e.preventDefault()
        // userMutation.reset()
        console.log('entered submit')

        if (confirmedPassword !== password) {
            let errObj = {}
            errObj.password = 'passwords not matching'
            console.log(errObj)
            setFormErr(errObj)
            return
        }
        // creating form data
        const formData = new FormData()
        console.log(userName, firstName, lastName, email)
        formData.append('username', userName)
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        formData.append('email', email)
        formData.append('photo_url', image)
        formData.append('password', password)

        userMutation.mutate(formData)
        if (userMutation.isPending) {
            console.log('pending')
        }
        if (userMutation.isError) {
            setFormErr(userMutation.error.errObj)
        }
        if (userMutation.isSuccess) {
            navigate('/profile')
        }
    }

    console.log(formErr)
    return (
        <div witdh = '200px'>

            <form onSubmit={handleFormSubmit} bg='white' >
                <Stack width='30%' bg='gray' padding={'20px'} margin='auto'>
                    <Heading>Sign Up</Heading>
                    {Object.keys(formErr).map(err => <div style={{color:'#cb1d14'}}>{err}: {formErr[err]}</div>)}
                    <input label='username' onChange={(e) => setUsername(e.target.value)} placeholder='Username' required />
                    <input label='firstName' onChange={(e) => setFirstName(e.target.value)} placeholder='First name' required />
                    <input label='lastName' onChange={(e) => setLastName(e.target.value)} placeholder='Last name' required />
                    <input label='email' onChange={(e) => setEmail(e.target.value)} placeholder='email' type='email' required />
                    <input label='password' onChange={(e) => setPassword(e.target.value)} placeholder='password' type='password' required />
                    <input label='confirm' onChange={(e) => setConfirmedPassword(e.target.value)} type='password' placeholder='confirm your password' required />
                    <input label='image' onChange={(e) => setImage(e.target.value)} placeholder='Image url' />
                    <Button width = '15%' isLoading={userMutation.isPending} type='submit'>Submit</Button>
                </Stack>
            </form>
        </div>
    )
}
