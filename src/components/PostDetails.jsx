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
        <div>
            <Link to={'/'}>Return</Link>
            <div>
                <h1>Title</h1>
                <p>{post.title}</p>
            </div>
            <div>
                <h1>Author:</h1>
                <p>{post.author.username}</p>
            </div>
            <div>
                <h1>Published:</h1>
                <p>{post.published}</p>
            </div>
            <div>
                <h1>Content:</h1>
                <p>{post.text}</p>
            </div>
            <div>
                <h1>timestamp:</h1>
                <p> {new Date(post.timestamp).toLocaleString()}</p>
            </div>
            <div>
                <h1>Comments:</h1>
                {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                        <div key={comment._id}>
                            <h2>From: {comment.author.username}</h2>
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

export default PostDetailPage;
