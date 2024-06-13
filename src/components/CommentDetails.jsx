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
        <div>
            <Link to={'/'}>Return</Link>
            <div>
                <h1>From post:</h1>
                <p>{comment.post.title}</p>
            </div>
            <div>
                <h1>Author:</h1>
                <p>{comment.author.username}</p>
            </div>
            <div>
                <h1>Content:</h1>
                <p>{comment.text}</p>
            </div>
            <div>
                <h1>timestamp:</h1>
                <p> {new Date(comment.timestamp).toLocaleString()}</p>
            </div>
        </div>
    );
}

export default CommentDetailPage;
