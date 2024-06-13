import ProtectedRoute from './ProtectedRoutes';

import App from '../App';
import ErrorPage from '../pages/ErrorPage';
import Dashboard from '../pages/Dashboard';
import Posts from '../pages/Posts';
import Users from '../pages/Users';
import SignIn from '../pages/SignIn';
import UserDetailPage from '../components/UserDetails';
import PostDetailPage from '../components/PostDetails';

const routes = [
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'users/:userId',
                element: (
                    <ProtectedRoute>
                        <Users />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'posts/:postId',
                element: (
                    <ProtectedRoute>
                        <Posts />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    { path: 'signin', element: <SignIn /> },
];

export default routes;
