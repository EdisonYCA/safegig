import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export function StateContext({ children }) {
    const [content, setContent] = useState("Home");
    
    return (
        <Context.Provider value={{ content, setContent }}>
            {children}
        </Context.Provider>
    );
}

export const useStateContext = () => useContext(Context);