import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = ({ children, allowedRoles = [] }) => { // Default to an empty array
  const { token, role } = useContext(AuthContext);

  console.log('Token:', token);
  console.log('Role:', role);
  console.log('Allowed Roles:', allowedRoles);

  const isAllowed = allowedRoles.includes(role);
  const accessibleRoute = token && isAllowed ? children : <Navigate to='/login' replace={true} />;

  return accessibleRoute;
};


export default ProtectedRoute;