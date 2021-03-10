import React, { useContext, useState, useEffect } from 'react';
import {auth} from '../firebase';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState();
    // const [isLoading, setIsLoading] = useState(true);

    function signUp(email,password) {
        return auth.createUserWithEmailAndPassword(email,password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user)
        //   setIsLoading(false)
        })
    
        return unsubscribe
      }, [])    
    
    const value = {
        currentUser,
        signUp
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}