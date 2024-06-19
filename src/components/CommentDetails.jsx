import useFetch from '../hooks/useFetch';
import { fetchCommentById } from '../api';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { deleteComment } from '../api';

function CommentDetailPage({ postId, commentId }) {
    console.warn('WELCOME TO THE COMMENT DETAIL PAGE');
    const navigate = useNavigate();

    const fetchCommentFunction = useCallback(
        () => fetchCommentById(postId, commentId),
        [postId, commentId]
    );

    const handleDelete = async () => {
        console.log('handleDelete triggered with Ids', postId, commentId);
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                console.log('starting operation with ', postId, commentId);
                await deleteComment(postId, commentId);
                alert('The comment has been successfully deleted.');
                navigate('/');
            } catch (error) {
                console.error('An error occured during deletion', error);
                alert('Failed to delete comment. Please try again.');
            }
        }
    };

    console.log('fetch function: ', fetchCommentFunction);
    const { data: comment, loading, error } = useFetch(fetchCommentFunction);
    console.log('Comment ', comment);

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
                <h1 className='detail-title'>From post:</h1>
                <p className='detail-content'>{comment.post.title}</p>
            </div>
            <div className='detail-container'>
                <h1 className='detail-title'>Author:</h1>
                <p className='detail-content'>{comment.author.username}</p>
            </div>
            <div className='detail-container'>
                <h1 className='detail-title'>Content:</h1>
                <p className='detail-content'>{comment.text}</p>
            </div>
            <div className='detail-container'>
                <h1 className='detail-title'>timestamp:</h1>
                <p className='detail-content faded'>
                    {new Date(comment.timestamp).toLocaleString()}
                </p>
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

export default CommentDetailPage;
