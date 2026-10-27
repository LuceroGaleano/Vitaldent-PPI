import { useState } from 'react';
import { ItemContext } from './ItemContext';

export const ItemProvider = ({children}) =>{
    const [item, setItem] = useState(null);

    return (
        <ItemContext.Provider value={{ item, setItem }}>
        {children}
        </ItemContext.Provider>
    );
}