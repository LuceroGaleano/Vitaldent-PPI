import { useState } from 'react';
import { TreatmentContext } from './TreatmentContext';



export const TreatmentProvider = ({children}) =>{
    const [treatment, setTreatment] = useState(null);

    return (
        <TreatmentContext.Provider value={{ treatment, setTreatment }}>
        {children}
        </TreatmentContext.Provider>
    );
}