import ProtectedRoute from './ProtectedRoutes';

import App from '../App';
import ErrorPage from '../pages/ErrorPage';
import Dashboard from '../pages/Dashboard';
import Posts from '../pages/Posts';
import Users from '../pages/Users';
import Comments from '../pages/Comments';
import SignIn from '../pages/SignIn';
import CreatePost from '../components/CreatePost';

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
                path: 'posts',
                children: [
                    {
                        path: ':postId',
                        element: (
                            <ProtectedRoute>
                                <Posts />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: 'new-post',
                        element: (
                            <ProtectedRoute>
                                <CreatePost />
                            </ProtectedRoute>
                        ),
                    },
                ],
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
