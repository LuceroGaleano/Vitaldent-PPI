import { useState } from 'react';
import { InoviceContext } from './InvoiceContext';


export const InvoiceProvider = ({children}) =>{
    const [invoice, setInvoice] = useState(null);

    return (
        <InoviceContext.Provider value={{ invoice, setInvoice }}>
        {children}
        </InoviceContext.Provider>
    );
}