import { Button, Text,Heading} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cancelAppointment } from "../../QueryHelpers/appointmentQuery"
import { Card, CardHeader, CardBody, CardFooter,Stack,StackDivider,Box } from '@chakra-ui/react'
function AppointmentDetails({appointment,modalContexts}){

    if(!appointment) return
    const {start_time,end_time,type,appointment_notes,appointment_address,status} = appointment
    const startDate = new Date(start_time).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})
    const startTime = new Date(start_time).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})
    const endTime = new Date(end_time).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})
    const clientQuery = useQueryClient()
    const {onClose} = modalContexts
    const appointmentMutation = useMutation(
        {
            queryKey:['appointments','owner'],
            mutationFn:(appointmentId)=>cancelAppointment(appointmentId),
        }
    )
    const handleCancelAppointment = ()=>{
        appointmentMutation.mutate(
            appointment.id,
            {onSuccess:()=>{
                clientQuery.invalidateQueries(['appointments','owner'])
                onClose()
            }}
        )
    }
    return(
        <Card >
                <CardHeader>
                    <Heading size='md'>Appointment</Heading>
                </CardHeader>
                <CardBody >
                    <Stack divider={<StackDivider/>}>
                        <Box>
                            <Text>Date: {startDate}</Text>
                            <Text>Start time: {startTime}</Text>
                            <Text>End time: {endTime}</Text>
                        </Box>
                        <Box>
                            <label>Appointment address:</label>
                            <Text>{appointment_address}</Text>

                        </Box>
                        <Box>

                        </Box>
                        <Box>
                            <label>Appointment notes:</label>
                            <Text>{appointment_notes}</Text>
                        </Box>
                        <Box>
                            <label>Type:</label>
                            <Text>{type}</Text>
                        </Box>
                    </Stack>
                </CardBody>
                <CardFooter>
                    {status != 'cancelled' &&  <Button variant='ghost' _hover={{bg:'red'}} onClick={handleCancelAppointment}>Cancel Appointment</Button>}
                </CardFooter>
            </Card>
    )
}

export default AppointmentDetails
