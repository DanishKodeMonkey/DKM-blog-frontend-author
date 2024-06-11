import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    console.warn('Protected route hit by user ', user);
    if (!user || user == null || user.membership !== 'Author') {
        return <Navigate to='/signin' />;
    }

    return children;
};

export default ProtectedRoute;
