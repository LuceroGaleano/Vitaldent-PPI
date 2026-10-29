import { useState } from 'react';
import { AppointmentContext } from './AppointmentContext';


export const AppointmentProvider = ({children}) =>{
    const [appointment, setAppointment] = useState(null);

    return (
        <AppointmentContext.Provider value={{ appointment, setAppointment }}>
        {children}
        </AppointmentContext.Provider>
    );
}