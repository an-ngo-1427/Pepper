import { useQuery } from "@tanstack/react-query";
import { getAllAppointments } from "../../QueryHelpers/sessionQuery";
import { Button, Container, Heading, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
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
import AppointmentRow from "./AppointmentRow.jsx";
import AppointmentForm from "./AppointmentForm.jsx";
export default function AppointmentPage() {
    const { data } = useQuery({
        queryKey: ['appointments'],
        queryFn: getAllAppointments,
        // onSuc
    })
    // console.log(data)
    const [days, setDays] = useState([])
    const months = Array.from({ length: 12 }, (item, index) => {
        return [new Date(0, index).toLocaleString('en-US', { month: 'long' }), index]
    })
    const today = new Date()

    const years = Array.from(
        { length: 50 },
        (value, index) => today.getFullYear() + index
    )


    const [filteredAppts, setFilteredAppts] = useState([])
    const [filterMonth, setFilterMonth] = useState(today.getMonth())
    const [filterYear, setFilterYear] = useState(today.getFullYear())
    const [filterDate, setFilterDate] = useState(today.getDate())
    const [daysOfMonth, setDaysOfMonth] = useState(getDaysOfMonth(filterMonth, filterYear))
    const [selectedAppointment, setSelectedAppointment] = useState()
    const handleMonthSelect = (e) => {
        e.preventDefault()
        setFilterMonth(e.target.value)
        setDaysOfMonth(getDaysOfMonth(filterMonth, filterYear))
    }

    const handleYearSelect = (e) => {
        e.preventDefault()
        setFilterYear(e.target.value)

    }

    console.log('appointments', selectedAppointment == false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <div>
            <Heading>Book Appointments</Heading>
            <Container>
                <select value={filterMonth} onChange={handleMonthSelect}>
                    {months.map(month => <option value={month[1]}>{month[0]}</option>)}
                </select>
                <select value={filterYear} onChange={handleYearSelect}>
                    {years.map(year => <option value={year}>{year}</option>)}
                </select>
            </Container>
            {/* <Container>
                {daysOfMonth.map(date => <Button onClick={(e) => { e.preventDefault(), setFilterDate(date) }}>{date.toLocaleDateString('en-US', { day: 'numeric', weekday: 'short' })}</Button>)}
            </Container> */}
            <TableContainer margin='auto'>
                <Table variant='striped' colorScheme='#d4c6af' width='1000px' margin='auto'>
                    <Thead>
                        <Tr bg='#d4c6af'>
                            <Th>Walker</Th>
                            <Th>Date</Th>
                            <Th>Start Time</Th>
                            <Th>End Time</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {data?.appointments.map(appointment => <AppointmentRow key={appointment.id}appointment={appointment} modalContexts={{ isOpen, onOpen, onClose, setSelectedAppointment }} ></AppointmentRow>)}
                    </Tbody>

                </Table>
            </TableContainer>
            {!data?.appointments.length && <h1 margin='auto'>No Availabilities</h1>}
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent w='30%' margin='auto' padding='20px' bg='white' color='black'>
                        <ModalCloseButton bg='#aa9f88'onClick={() => setSelectedAppointment({})} />
                        <ModalBody >
                            {/* <Lorem count={2} /> */}
                            <AppointmentForm appointment={selectedAppointment} modalContexts={{ onClose }} />
                        </ModalBody>
                    </ModalContent>
                </Modal>
        </div>
    )
}

function getDaysOfMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}
