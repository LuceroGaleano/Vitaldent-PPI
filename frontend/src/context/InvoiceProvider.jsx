import { useState } from 'react';
import { InvoiceContext } from './InvoiceContext';


export const InvoiceProvider = ({children}) =>{
    const [invoice, setInvoice] = useState(null);

    return (
        <InvoiceContext.Provider value={{ invoice, setInvoice }}>
        {children}
        </InvoiceContext.Provider>
    );
}