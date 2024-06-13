import useFetch from '../hooks/useFetch';
import { fetchCommentById } from '../api';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

function CommentDetailPage({ postId, commentId }) {
    console.warn('WELCOME TO THE COMMENT DETAIL PAGE');

    const fetchCommentFunction = useCallback(
        () => fetchCommentById(postId, commentId),
        [postId, commentId]
    );

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
        </div>
    );
}

export default CommentDetailPage;
