
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useDisclosure,
    Button,
    Badge
} from '@chakra-ui/react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import AppointmentDetails from './AppointmentDetails'
import { useState } from 'react'
export default function AppointmentTable({ appointments }) {
    const options = { month: 'short', weekday: 'short', day: 'numeric' }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [currAppointment,setCurrAppointment] = useState()
    const statusColorScheme = {cancelled:'#cb1414',booked:'#5f9c62',completed:'#5f9c62'}
    return (
        <>
            <TableContainer height='700px'>
                <Table variant='simple' colorScheme='#d4c6af' width='100%' margin='auto'>
                    <Thead>
                        <Tr textAlign={'left'} bg='#d4c6af'>
                            <Th>Companions</Th>
                            <Th>Date</Th>
                            <Th>Start Time</Th>
                            <Th>End Time</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {appointments?.map(appointment => {
                            const startTime = new Date(appointment.start_time)
                            const endTime = new Date(appointment.end_time)
                            return (
                                <Tr
                                    key={appointment.id}
                                    onClick={()=>{onOpen(),setCurrAppointment(appointment)}}
                                    margin='10px'
                                    _hover={{cursor:'pointer',bg:'#d4c6af'}}
                                    height="50px"
                                >
                                    <Td>{appointment.companion.name}</Td>
                                    <Td>{startTime.toLocaleDateString('en-US', options)}</Td>
                                    <Td>{startTime.getHours()}:{startTime.getMinutes()}</Td>
                                    <Td>{endTime.getHours()}:{endTime.getMinutes()}</Td>
                                    <Td textAlign={'center'}><Badge width='80px' paddingX='5px' bg={statusColorScheme[appointment.status]}>{appointment.status}</Badge></Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            {!appointments.length && <h1>No Appointments Scheduled</h1>}


            <Modal isOpen={isOpen} onClose={()=>{onClose(),setCurrAppointment()}}>
                <ModalOverlay />
                <ModalContent w='30%' margin='auto' padding='20px' bg='white' color='black'>
                    <ModalCloseButton bg='#d4c6af'/>
                    <ModalBody>
                        <AppointmentDetails appointment={currAppointment} modalContexts={onClose}/>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </>
    )
}
