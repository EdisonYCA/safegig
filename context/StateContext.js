import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export function StateContext({ children }) {
    const [content, setContent] = useState("Home");
    const [user, setUser] = useState(null);
    
    return (
        <Context.Provider value={{ content, setContent, user, setUser }}>
            {children}
        </Context.Provider>
    );
}

export const useStateContext = () => useContext(Context);