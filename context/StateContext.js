import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export function StateContext({ children }) {
    const [content, setContent] = useState("Home");
    const [loggedIn, setLoggedIn] = useState(false);
    
    return (
        <Context.Provider value={{ content, setContent, loggedIn, setLoggedIn, logout }}>
            {children}
        </Context.Provider>
    );
}

export const useStateContext = () => useContext(Context);