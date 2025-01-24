import { useQuery } from "@tanstack/react-query";
import { getOwnerAppointments } from "../../QueryHelpers/appointmentQuery";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import AppointmentTable from "./AppointmentTable";

export default function OwnerAppointments() {
    const today = new Date()
    const { data:appointments } = useQuery({ queryKey:['appointments','owner'], queryFn:getOwnerAppointments,enabled:true})

    const upComingAppts = appointments?.appointments.filter(appointment=>{
        const startTime = new Date(appointment.start_time)
        return startTime > today
    }) ?? []

    const pastAppts = appointments?.appointments.filter(appointment=>{
        const startTime = new Date(appointment.start_time)
        return startTime < today
    }) ?? []
    return (
        <>
        <h1>appointments</h1>
        <Tabs width='1000px' variant="unstyled">
            <TabList>
                <Tab bg='#534734'>Upcoming appointments</Tab>
                <Tab bg='#534734'>Past Appointments</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <AppointmentTable appointments={upComingAppts}/>
                </TabPanel>
                <TabPanel>
                    <AppointmentTable appointments={pastAppts}/>
                </TabPanel>
            </TabPanels>
        </Tabs>
        </>
    )
}
