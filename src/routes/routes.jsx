import ProtectedRoute from './ProtectedRoutes';

import App from '../App';
import ErrorPage from '../pages/ErrorPage';
import Dashboard from '../pages/Dashboard';
import Posts from '../components/Posts';
import CreatePost from '../components/createPost';
import Users from '../components/Users';
import SignIn from '../pages/SignIn';

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: 'posts',
                        element: (
                            <ProtectedRoute>
                                <Posts />
                            </ProtectedRoute>
                        ),
                        children: [
                            {
                                path: 'create-post',
                                element: (
                                    <ProtectedRoute>
                                        <CreatePost />
                                    </ProtectedRoute>
                                ),
                            },
                        ],
                    },
                    {
                        path: 'users',
                        element: (
                            <ProtectedRoute>
                                <Users />
                            </ProtectedRoute>
                        ),
                    },
                ],
            },
        ],
    },
    { path: 'signin', element: <SignIn /> },
];

export default routes;
