import { Box, Button, FormLabel, Stack, useDisclosure } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createCompanion } from "../../QueryHelpers/companionQuery";


export default function CompanionForm({modalContexts}) {
    const [name, setName] = useState('')
    const [age, setAge] = useState()
    const [breed, setBreed] = useState('')
    const [petAddress, setPetAddress] = useState('')
    const [notes, setNotes] = useState('')
    const [weight, setWeight] = useState()
    const [formErr,setFormErr] = useState({})
    const clientQuery = useQueryClient()
    const {onClose} = modalContexts
    console.log('onClose',onClose)
    const companionMutation = useMutation({
        queryKey:['companions'],
        mutationFn:(formData)=>createCompanion(formData)
    })

    const handleSubmit = (e) => {
        console.log('entered')
        e.preventDefault();
        let formData = new FormData()
        formData.append('name',name)
        formData.append('breed',breed)
        formData.append('weight',weight)
        formData.append('age',age)
        formData.append('companion_notes',notes)
        formData.append('pet_address',petAddress)

        companionMutation.mutate(formData,{
            onSuccess: ()=>{
                clientQuery.invalidateQueries(['companions'])
                onClose()
            },
            onError: (error)=>{
                setFormErr(error.errObj)
            }
        })
    };


    return (
        <form onSubmit={handleSubmit} className="companion-form" width='200px'>
            <h2>Enter Companion Information</h2>
            <Stack margin='center' width='50%'>
                <Box>
                    <FormLabel>Name</FormLabel>
                    <input type="text" name="name" placeholder="Pet's Name" onChange={(e)=>setName(e.target.value)} required />
                </Box>
                <Box>
                    <FormLabel>Age</FormLabel>
                    <input type="number" name="age" placeholder="Age" onChange={(e)=>setAge(e.target.value)} required />
                </Box>
                <Box>
                    <FormLabel>Breed</FormLabel>
                    <input type="text" name="breed" placeholder="Breed" onChange={(e)=>setBreed(e.target.value)} required />
                </Box>
                <Box>
                    <FormLabel>Weight</FormLabel>
                    <input type='text' required onChange={(e)=>setWeight(e.target.value)}></input>
                </Box>
                <Box>
                    <FormLabel>Pet Address</FormLabel>
                    <input type='text' required onChange={(e)=>setPetAddress(e.target.value)}></input>
                </Box>
                <Box>
                    <FormLabel>Notes</FormLabel>
                    <input type='text'onChange={(e)=>setNotes(e.target.value)}></input>
                </Box>
            </Stack>
            <Button type='submit'>Save</Button>
        </form>

    )
}
