import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Security: Check for, and include JWT token on API requests
// Use for protected API routes.
const getAuthHeaders = () => {
    console.warn('getAuthHeaders trigger---');
    const token = localStorage.getItem('token');
    // Was a token found? If so attach, otherwise dont.
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Function to get user ID from the token
const getUserIdFromToken = () => {
    console.warn('getUserIdFromToken triggere---');
    const token = localStorage.getItem('token');

    if (token) {
        console.log('decoding token...');
        const decodedToken = jwtDecode(token);
        console.log('Token decoded');
        return decodedToken.sub;
    } else {
        console.error('Token failed to retrieve');
        return null;
    }
};

/// BLOG POSTS ///
// fetch all blog posts
export const fetchAllBlogPosts = async () => {
    console.warn('fetchAllBlogPosts triggere ---');
    try {
        const response = await fetch(`${API_URL}/blog/posts`);
        if (!response.ok) {
            throw new Error('Network response failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Error: fetching blog posts: ', error);
        throw error;
    }
};

/// COMMENTS ///

// Fetch all comments
export const fetchAllComments = async () => {
    console.warn('fetchAllComments triggered ---');
    try {
        const response = await fetch(`${API_URL}/blog/comments`, {
            headers: {
                ...getAuthHeaders(),
                'Content-type': 'application/json',
            },
        });
        if (!response.ok) {
            console.error('fetchAllComments fetch failed');
            throw new Error('fetchAllComments fetch failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Error: fetchAllComments fetch failed');
        throw error;
    }
};

/// USERS ///

// Fetch all users
export const fetchAllUsers = async () => {
    console.warn('fetcHAllUsers triggered ---');
    try {
        const response = await fetch(`${API_URL}/users`, {
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            console.error('Failed to fetch all users');
        }
        console.log('Response valid, jsonifying...');
        return await response.json();
    } catch (error) {
        console.error('An error has occured fetching all users: ', error);
        throw error;
    }
};

// Sign up new user

export const createUser = async (user) => {
    const response = await fetch(`${API_URL}/users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error('Sign up failed');
    }
    return response.json();
};

// Fetch current users information
export const fetchCurrentUser = async () => {
    console.warn('FetchCurrentUser triggered ---');
    const userId = getUserIdFromToken();
    console.log('Received userId');
    if (!userId) {
        console.error('UserId from getUserIdFromToken failed');
        throw new Error('User ID not found in token');
    }
    try {
        console.warn('Attempting to fetch user with userId');
        const response = await fetch(`${API_URL}/users/${userId}`, {
            headers: {
                ...getAuthHeaders(),
                'Content-type': 'application/json',
            },
        });
        if (!response.ok) {
            console.error(
                'response failed...',
                response.status,
                response.statusText
            );
            throw new Error('Failed to fetch user data');
        }
        console.log('Response valid, jsonifying...');
        return await response.json();
    } catch (error) {
        console.error('Error fetching current user data: ', error);
        throw error;
    }
};

// Update current user information

export const updateUser = async (userData) => {
    try {
        const response = await axios.put(
            `${API_URL}/users/${userData._id}`,
            userData,
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error updating user ', error.message);
    }
};

/// AUTH ///

// Sign in user
export const signInUser = async (user) => {
    const response = await fetch(`${API_URL}/auth/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error('Sign in failed');
    }
    return response.json();
};
