import useFetch from '../hooks/useFetch';
import { fetchUserById } from '../api';
import { useCallback } from 'react';

function UserDetailPage({ userId }) {
    const fetchFunction = useCallback(() => fetchUserById(userId), [userId]);

    const { data: user, loading, error } = useFetch(fetchFunction);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div>
                <h1>Username:</h1>
                <p>{user.username}</p>
            </div>
            <div>
                <h1>First name:</h1>
                <p>{user.first_name}</p>
            </div>
            <div>
                <h1>Last name:</h1>
                <p>{user.last_name}</p>
            </div>
            <div>
                <h1>Email:</h1>
                <p>{user.email}</p>
            </div>
            <div>
                <h1>Membership:</h1>
                <p>{user.membership}</p>
            </div>
            <div>
                <h1>Posts:</h1>
                {user.posts && user.posts.length > 0 ? (
                    user.posts.map((post) => (
                        <div key={post._id}>
                            <p>Title: {post.title}</p>
                            <p>
                                Timestamp:
                                {new Date(post.timestamp).toLocaleString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
            <div>
                <h1>Comments:</h1>
                {user.comments && user.comments.length > 0 ? (
                    user.comments.map((comment) => (
                        <div key={comment._id}>
                            <p>Text: {comment.text}</p>
                            <p>
                                Timestamp:
                                {new Date(comment.timestamp).toLocaleString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No Comments available.</p>
                )}
            </div>
        </div>
    );
}

export default UserDetailPage;
