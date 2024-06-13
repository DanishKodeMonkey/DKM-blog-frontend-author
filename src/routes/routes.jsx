import ProtectedRoute from './ProtectedRoutes';

import App from '../App';
import ErrorPage from '../pages/ErrorPage';
import Dashboard from '../pages/Dashboard';
import Posts from '../pages/Posts';
import CreatePost from '../components/createPost';
import Users from '../pages/Users';
import SignIn from '../pages/SignIn';
import UserDetailPage from '../components/UserDetails';

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
                ],
            },
            {
                path: 'users',
                element: (
                    <ProtectedRoute>
                        <Users />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: ':userId',
                        element: (
                            <ProtectedRoute>
                                <UserDetailPage />
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
