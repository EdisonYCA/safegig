import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export function StateContext({ children }) {
    const [content, setContent] = useState("Home");
    const [user, setUser] = useState(null);
    const [workRequests, setWorkRequests] = useState([]);
    const [jobRequests, setJobRequests] = useState([]);
  
    
    return (
        <Context.Provider value={{ content, setContent, user, setUser, workRequests, setWorkRequests, jobRequests, setJobRequests }}>
            {children}
        </Context.Provider>
    );
}

export const useStateContext = () => useContext(Context);