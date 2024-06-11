import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { fetchCurrentUser } from './api';
import { redirect } from 'react-router-dom';
// Context handler wrapper for passing auth tokens between routing in the app
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);

    const handleSignInToken = async (token) => {
        console.log('Handling sign in token');
        // remove existing tokens on sign in
        console.log('removing existing tokens');
        localStorage.removeItem('token');
        console.log('setting new token', token);
        localStorage.setItem('token', token);
        // set token to storage on sign in
        setIsAuthenticated(true);
        console.log('isAuthenticated set to ', isAuthenticated);
    };

    const handleSignOutToken = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        setIsAuthor(false);
    };

    useEffect(() => {
        // set user credentials from token
        const handleSetUser = async () => {
            console.warn('starting handleSetUser');
            try {
                console.log('fetching user data');
                const userData = await fetchCurrentUser();
                if (!userData) {
                    console.error('failed to fetch current user...');
                    setUser(null);
                    throw new Error('User not found');
                }
                console.log('Done... setting user');
                setUser(userData);
                console.log('User is now set to ', user);
                handleIsAuthor();
            } catch (error) {
                setUser(null);
                console.error('Error finding user ', error);
            }
        };
        handleSetUser();
    }, []);

    const handleIsAuthor = () => {
        console.log('Checking if author');
        try {
            if (!user || user.membership !== 'Author') {
                console.error('User is not found or not author');
                setIsAuthor(false);
            } else {
                setIsAuthor(true);
                console.log('User is author, isAuthor is now ', isAuthor);
            }
        } catch (error) {
            setIsAuthor(false);
            console.error('Author status check failed', error);
        }
    };

    // wrap this component to all children components, w
    return (
        <AuthContext.Provider
            value={{
                handleSignInToken,
                handleSignOutToken,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
