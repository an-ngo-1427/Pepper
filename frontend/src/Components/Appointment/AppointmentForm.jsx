import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getCompanions } from "../../QueryHelpers/companionQuery"
import { Card, CardHeader, CardBody, CardFooter, Heading, Stack, StackDivider, Container,Text, Box, Select, Avatar, Textarea,Button } from '@chakra-ui/react'
import { LuDog } from "react-icons/lu";
import { useState } from "react";
import { bookAppointment, getOwnerAppointments } from "../../QueryHelpers/appointmentQuery";
import { useEffect } from "react";

export default function AppointmentForm({appointment,modalContexts}){
    const {onClose} = modalContexts
    const {start_time,end_time} = appointment
    const {data:companions} = useQuery({queryKey:['companions'],queryFn:getCompanions})
    const {data:appointments} = useQuery({queryKey:['appointments','owner'],queryFn:getOwnerAppointments})
    const [bookedCompanionId,setBookedCompanionId] = useState('')
    const [appointmentAddress,setAppointmentAddress] = useState('')
    const [appointmentType,setAppointmentType] = useState('')
    const [appointmentNotes,setAppointmentNotes] = useState('')
    const [formErr,setFormErr] = useState({})
    const clientQuery = useQueryClient()

    console.log('this is appointnment',appointments?.appointments)
    const appointmentMutation = useMutation({
        mutationFn: ({appointmentId,formData})=>{ return bookAppointment(appointmentId,formData)},
        // onSuccess: ()=>{
        //     clientQuery.invalidateQueries({queryKey:['appointments','owner']})
        // },
        onError: (error)=>{
            setFormErr(error.errObj)
        }
    })

    const availableComps = companions?.companions.filter(companion=>{
        const compScheduledAppts = appointments?.appointments.filter(appointment=>appointment.companion.id == companion.id) ?? []
        return isValidSlot(start_time,end_time,compScheduledAppts)
    }) ?? []

    useEffect(()=>{
        const petAddress = availableComps?.find(companion=>companion.id == bookedCompanionId)?.pet_address
        setAppointmentAddress(petAddress ?? '')
    },[bookedCompanionId])

    // formatting date object of the appointment to readable string
    const startDate = new Date(start_time).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})
    const startTime = new Date(start_time).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})
    const endTime = new Date(end_time).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})

    const handleBookAppointment = ()=>{
        let errObj = {}
        if(!bookedCompanionId.length) errObj['companion'] = 'companion is required'
        if(!appointmentAddress.length) errObj['appointment address'] = 'appointment address is required'
        if(!appointmentType.length) errObj['service type'] = 'service type is required'

        if(Object.keys(errObj).length){
            setFormErr(errObj)
            return
        }

        let formData = new FormData()
        formData.append('appointment_address',appointmentAddress)
        formData.append('type',appointmentType)
        formData.append('appointment_notes',appointmentNotes)
        formData.append('companionId',bookedCompanionId)

        const appointmentId = appointment.id
        appointmentMutation.mutate({appointmentId,formData},{onSuccess:()=>{
            onClose()
            clientQuery.invalidateQueries(['appointments'])
            clientQuery.invalidateQueries(['appointments','owner'])
        },
        })
    }

    return(
            <Card >
                <CardHeader>
                    <Heading size='md'>Book Appointment</Heading>
                </CardHeader>
                <CardBody >
                    <Stack divider={<StackDivider/>}>
                        <Box>
                            {Object.keys(formErr).map(err=><div style={{color:'red'}}>{err} : {formErr[err]}</div>)}
                        </Box>
                        <Box>
                            <Select value={bookedCompanionId} onChange={(e)=>{setBookedCompanionId(e.target.value)}}>
                                <option disabled value=''>Select a companion</option>
                                {
                                    availableComps.map((companion=>
                                        <option value={companion.id} key={companion.id}>
                                            <Avatar icon={<LuDog />}/>
                                            {companion.name}
                                        </option>))
                                }
                            </Select>
                        </Box>
                        <Box>
                            <Text>Date: {startDate}</Text>
                            <Text>Start time: {startTime}</Text>
                            <Text>End time: {endTime}</Text>
                        </Box>
                        <Box>
                            <Text>Appointment address</Text>
                            <Textarea value={appointmentAddress} onChange={(e)=>setAppointmentAddress(e.target.value)}></Textarea>
                        </Box>
                        <Box>
                            <Select value={appointmentType}
                                onChange={(e)=>{setAppointmentType(e.target.value)}}
                            >
                                <option disabled value=''>Choose type of service</option>
                                <option value='sitting'>sitting</option>
                                <option value='walking'>walking</option>
                            </Select>
                        </Box>
                        <Box>
                            <label>Appointment notes</label>
                            <Textarea onChange={(e)=>{setAppointmentNotes(e.target.value)}}></Textarea>
                        </Box>
                    </Stack>
                </CardBody>
                <CardFooter>
                    <Button disabled={appointmentMutation.isError} isLoading={appointmentMutation.isLoading} onClick={handleBookAppointment}>Book Appointment</Button>
                </CardFooter>
            </Card>

    )
}

function isValidSlot(startTime,endTime,scheduledSlots){
    let isValid = true
    for (let slot of scheduledSlots){
        const bookedStartTime = slot.start_time
        const bookedEndTime = slot.end_time
        if(startTime < bookedEndTime && endTime >= bookedStartTime){
            isValid = false
            break
        }
    }

    return isValid
}
