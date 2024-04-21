import React, { createContext, useReducer } from 'react';

// Define the initial state for the Auth context
const initialState = {
  user: null,
  role: null,
  token: null,
};

// Create a new context
export const AuthContext = createContext();

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

  return (
    <AuthContext.Provider value={{ user: state.user, token: state.token, role: state.role, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
