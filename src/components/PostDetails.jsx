import useFetch from '../hooks/useFetch';
import { fetchPostById } from '../api';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deletePost } from '../api';
import parse from 'html-react-parser';

function PostDetailPage({ postId }) {
    console.warn('WELCOME TO THE POST DETAIL PAGE');

    const navigate = useNavigate();
    const fetchPostFunction = useCallback(
        () => fetchPostById(postId),
        [postId]
    );

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost(postId);
                alert('The post has been successfully deleted.');
                navigate('/');
            } catch (error) {
                console.error('An error occured during deletion', error);
                alert('Failed to delete post. Please try again.');
            }
        }
    };
    console.log('fetch function: ', fetchPostFunction);
    const { data: post, loading, error } = useFetch(fetchPostFunction);
    console.log('Post ', post);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='post-detail-page-container'>
            <Link
                className='return-link'
                to={'/'}
            >
                Return
            </Link>
            <div className='post-detail-container'>
                <p className='post-detail-title'>{post.title}</p>
                <div className='post-detail-header'>
                    <p className='post-detail-header-item'>
                        {new Date(post.timestamp).toLocaleString()}
                    </p>
                    <p className='post-detail-header-item'>
                        {post.author.username}
                    </p>

                    <p className='post-detail-header-item'>
                        {post.published ? 'Published' : 'Not published'}
                    </p>
                </div>
                <hr />
                <p className='post-detail-content'>{parse(post.text)}</p>
                <hr />
                <h1 className='post-comments-title'>Comments:</h1>
                <div className='post-comments-container'>
                    {post.comments && post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                            <div
                                key={comment._id}
                                className='post-comments-section'
                            >
                                <h2 className='post-comments-title'>
                                    From: {comment.author.username}
                                </h2>
                                <p className='post-comments-text'>
                                    Text: {comment.text}
                                </p>
                                <p className='post-comments-text faded'>
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
            <button
                onClick={handleDelete}
                className='delete-btn'
            >
                Delete Post
            </button>
        </div>
    );
}

export default PostDetailPage;
