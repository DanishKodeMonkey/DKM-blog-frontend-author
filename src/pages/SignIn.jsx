import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../api';
import AuthContext from '../AuthContext';

const SignIn = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // use signIn from AuthContext
    const { handleSignInToken } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signInUser({ username, password });
            // send token to auth context for handling
            handleSignInToken(response.token);
            // navigate to previous page or home page
            navigate('/');
        } catch (err) {
            setError('Incorrect username or password');
        }
    };
    return (
        <div className='flex flex-col items-center bg-white w-full p-4'>
            <h1 className='text-3xl font-bold mb-6'>Sign in</h1>
            <form
                onSubmit={handleSubmit}
                className='w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-md'
            >
                <div className='mb-4'>
                    <label
                        htmlFor='username'
                        className='form-label'
                    >
                        Username
                    </label>
                    <input
                        id='username'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='form-input'
                    />
                </div>
                <div className='mb-4'>
                    <label
                        htmlFor='password'
                        className='form-label'
                    >
                        password
                    </label>
                    <input
                        id='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='form-input'
                    />
                </div>
                {error && <p>{error}</p>}
                <button
                    type='submit'
                    className='w-full bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50 transition ease-in-out duration-150'
                >
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default SignIn;
