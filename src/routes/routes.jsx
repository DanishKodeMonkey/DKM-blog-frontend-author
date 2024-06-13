import ProtectedRoute from './ProtectedRoutes';

import App from '../App';
import ErrorPage from '../pages/ErrorPage';
import Dashboard from '../pages/Dashboard';
import Posts from '../pages/Posts';
import Users from '../pages/Users';
import Comments from '../pages/Comments';
import SignIn from '../pages/SignIn';

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
            {
                path: 'comments/:postId/:commentId',
                element: (
                    <ProtectedRoute>
                        <Comments />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    { path: 'signin', element: <SignIn /> },
];

export default routes;
