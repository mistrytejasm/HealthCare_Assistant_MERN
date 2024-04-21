import React, { createContext, useReducer, useEffect } from 'react';

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  // Check if 'user' is not null or undefined before parsing
  if (user) {
    try {
      return JSON.parse(user);
    } catch (e) {
      console.error("Error parsing 'user' from localStorage:", e);
      return null;
    }
  }
  return null;
};

const initialState = {
  user: getUserFromLocalStorage(), // safely get and parse 'user'
  role: localStorage.getItem('role') || null,
  token: localStorage.getItem('token') || null,
};


// Create a new context
export const AuthContext = createContext(initialState);

// Define the reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { user: null, role: null, token: null };

    case 'LOGIN_SUCCESS':
      return {
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.token,
      };

    case 'LOGOUT':
      return { user: null, role: null, token: null };

    default:
      return state;
  }
};

// Define the context provider component
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token);
    localStorage.setItem("role", state.role)
  }, [state]); 

  return (
    <AuthContext.Provider value={{ user: state.user, token: state.token, role: state.role, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
