import useFetch from '../hooks/useFetch';
import { fetchUserById } from '../api';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

function UserDetailPage({ userId }) {
    const fetchUserFunction = useCallback(
        () => fetchUserById(userId),
        [userId]
    );

    const { data: user, loading, error } = useFetch(fetchUserFunction);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='detail-page-container'>
            <Link
                className='return-link'
                to={'/'}
            >
                Return
            </Link>
            <div className='detail-container'>
                <h1 className='detail-title'>Username:</h1>
                <p className='detail-content'>{user.username}</p>
            </div>
            <div className='detail-container'>
                <h1 className='detail-title'>First name:</h1>
                <p className='detail-content'>{user.first_name}</p>
            </div>
            <div className='detail-container'>
                <h1 className='detail-title'>Last name:</h1>
                <p className='detail-content'>{user.last_name}</p>
            </div>
            <div className='detail-container'>
                <h1 className='detail-title'>Email:</h1>
                <p className='detail-content'>{user.email}</p>
            </div>
            <div className='detail-container'>
                <h1 className='detail-title'>Membership:</h1>
                <p className='detail-content'>{user.membership}</p>
            </div>
            <div className='detail-container'>
                <h1 className='detail-title'>Posts:</h1>
                {user.posts && user.posts.length > 0 ? (
                    user.posts.map((post) => (
                        <div
                            key={post._id}
                            className='detail-map-section'
                        >
                            <p className='detail-map-text'>
                                Title: {post.title}
                            </p>
                            <p className='detail-map-content faded'>
                                Timestamp:
                                {new Date(post.timestamp).toLocaleString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className='no-map'>No posts available.</p>
                )}
            </div>
            <div className='detail-container'>
                <h1 className='detail-title'>Comments:</h1>
                {user.comments && user.comments.length > 0 ? (
                    user.comments.map((comment) => (
                        <div
                            key={comment._id}
                            className='detail-map-section'
                        >
                            <p className='detail-map-text'>
                                Text: {comment.text}
                            </p>
                            <p className='detail-map-text faded'>
                                Timestamp:
                                {new Date(comment.timestamp).toLocaleString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className='no-map'>No Comments available.</p>
                )}
            </div>
        </div>
    );
}

export default UserDetailPage;
