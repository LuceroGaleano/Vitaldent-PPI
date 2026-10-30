import { useState } from 'react';
import { PatientContext } from './PatientContext';


export const Patientrovider = ({children}) =>{
    const [patient, setPatient] = useState(null);

    return (
        <PatientContext.Provider value={{ patient, setPatient }}>
        {children}
        </PatientContext.Provider>
    );
}