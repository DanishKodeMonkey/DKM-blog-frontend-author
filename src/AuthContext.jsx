import { createContext, useState, useEffect } from 'react';
import { fetchCurrentUser } from './api';

// Context handler wrapper for passing auth tokens between routing in the app
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [loading, setLoading] = useState(true);

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
        // Fetch user data after setting token
        await handleSetUser();
    };

    const handleSignOutToken = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        setIsAuthor(false);
    };
    const handleSetUser = async () => {
        setLoading(true);
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
            console.log('User is now set to ', userData);
        } catch (error) {
            setUser(null);
            console.error('Error finding user ', error);
        }
    };

    const handleIsAuthor = () => {
        console.log('Checking if author');
        try {
            if (!user || user.membership !== 'Author') {
                console.error('User is not found or not author', user);
                setIsAuthor(false);
            } else {
                setIsAuthor(true);
                console.log('User is author, isAuthor is now ', isAuthor);
            }
        } catch (error) {
            setIsAuthor(false);
            console.error('Author status check failed', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // set user credentials from token

        handleSetUser();
    }, []);

    useEffect(() => {
        // check if user is author
        handleIsAuthor();
    }, [user]);

    // wrap this component to all children components, w
    return (
        <AuthContext.Provider
            value={{
                handleSignInToken,
                handleSignOutToken,
                user,
                isAuthenticated,
                isAuthor,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
