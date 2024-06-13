import useFetch from '../hooks/useFetch';
import { fetchPostById } from '../api';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

function PostDetailPage({ postId }) {
    console.warn('WELCOME TO THE POST DETAIL PAGE');

    const fetchPostFunction = useCallback(
        () => fetchPostById(postId),
        [postId]
    );

    console.log('fetch function: ', fetchPostFunction);
    const { data: post, loading, error } = useFetch(fetchPostFunction);
    console.log('Post ', post);

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
                <h1 className='detail-title'>Title</h1>
                <p className='detail-content'>{post.title}</p>
            </div>
            <div className='detail-container'>
                <h1 className='detail-title'>Author:</h1>
                <p className='detail-content'>{post.author.username}</p>
            </div>
            <div className='detail-container'>
                <h1 className='detail-title'>Published:</h1>
                <p className='detail-content'>
                    {post.published ? 'Published' : 'Not published'}
                </p>
            </div>
            <div className='detail-container'>
                <h1 className='detail-title'>Content:</h1>
                <p className='detail-content'>{post.text}</p>
            </div>
            <div className='detail-container'>
                <h1 className='detail-title'>timestamp:</h1>
                <p className='detail-content faded'>
                    {new Date(post.timestamp).toLocaleString()}
                </p>
            </div>
            <div className='detail-container'>
                <h1 className='detail-title'>Comments:</h1>
                <div className='detail-map-container'>
                    {post.comments && post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                            <div
                                key={comment._id}
                                className='detail-map-section'
                            >
                                <h2 className='detail-map-title'>
                                    From: {comment.author.username}
                                </h2>
                                <p className='detail-map-text'>
                                    Text: {comment.text}
                                </p>
                                <p className='detail-map-text faded'>
                                    Timestamp:
                                    {new Date(
                                        comment.timestamp
                                    ).toLocaleString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className='no-map'>No Comments available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PostDetailPage;
