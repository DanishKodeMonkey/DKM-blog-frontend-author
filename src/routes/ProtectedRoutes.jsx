import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../AuthContext';

const ProtectedRoute = ({ children }) => {
    console.warn('Trying to access protected route');
    const { isAuthenticated, isAuthor, loading } = useContext(AuthContext);

    if (loading) {
        console.log('Loading...', loading);
        return <p>Loading...</p>;
    }

    if (!isAuthenticated || !isAuthor) {
        console.warn(
            'User is not authenticated or author',
            isAuthenticated,
            isAuthor
        );
        return <Navigate to='/signin' />;
    }
    console.log('User succesfully authenticated', isAuthenticated, isAuthor);
    return children;
};

export default ProtectedRoute;
