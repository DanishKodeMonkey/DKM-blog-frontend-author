import { useContext } from 'react';
import AuthContext from '../AuthContext';
import { fetchAllUsers, fetchAllBlogPosts, fetchAllComments } from '../api';
// custom fetch handler hook, accepts API function and returns data/loading/error
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Dashboard() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleUserClick = (userId) => {
        console.log('handleUserClicked, going to userId', userId);
        navigate(`users/${userId}`);
    };
    const handlePostClick = (postId) => {
        console.log(`handlePostClick, going to post with postId`, postId);
        navigate(`posts/${postId}`);
    };
    const handleCommentClick = (commentId, postId) => {
        console.log(
            `handleCommentClick triggered with postId ${postId} and commentId ${commentId}`
        );
        navigate(`comments/${postId}/${commentId}`);
    };

    // use custom fetch handler hook to fetch data
    const {
        data: allUsers,
        loading: loadingUsers,
        error: errorUsers,
    } = useFetch(fetchAllUsers);
    const {
        data: allPosts,
        loading: loadingPosts,
        error: errorPosts,
    } = useFetch(fetchAllBlogPosts);
    const {
        data: allComments,
        loading: loadingComments,
        error: errorComments,
    } = useFetch(fetchAllComments);

    return (
        <div className='w-full max-w-5xl bg-white'>
            <div className='text-center py-10 '>
                <Link
                    to={'/posts/new-post'}
                    className='bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md shadow-sm transition duration-300 ease-in-out'
                >
                    Create New Post
                </Link>
                <div className='mb-3'>
                    <h1 className='text-3xl font-bold underline'>
                        Hello {user.username}
                    </h1>
                    <h2>Welcome to the danish kode monkey author Dashboard</h2>
                </div>
                <div className='flex flex-col border-solid border-2 rounded-lg bg-slate-100 border-sky-500 mx-10 h-96'>
                    <h2 className='text-xl bg-slate-200'>Overview:</h2>
                    <div className='flex h-full'>
                        <div className='flex flex-grow flex-col border-2 border-solid border-sky-200 px-4'>
                            <h3 className='text-lg border-b-2 mb-2'>Users</h3>
                            <div className='card-container'>
                                {loadingUsers ? (
                                    <p>Loading users...</p>
                                ) : errorUsers ? (
                                    <p>{errorUsers}</p>
                                ) : (
                                    <ul>
                                        {allUsers.map((user) => (
                                            <li
                                                className='card'
                                                key={user._id}
                                                onClick={() =>
                                                    handleUserClick(user._id)
                                                }
                                            >
                                                <p className='card-title'>
                                                    {user.username}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-grow flex-col border-2 border-solid border-sky-200 px-4'>
                            <h3 className='text-lg border-b-2 mb-2'>Posts</h3>
                            <div className='card-container'>
                                {loadingPosts ? (
                                    <p>Loading posts...</p>
                                ) : errorPosts ? (
                                    <p>{errorPosts}</p>
                                ) : (
                                    <ul>
                                        {allPosts.map((post) => (
                                            <li
                                                className='card'
                                                key={post._id}
                                                onClick={() =>
                                                    handlePostClick(post._id)
                                                }
                                            >
                                                <h4 className='card-header'>
                                                    title
                                                </h4>
                                                <p className='card-title'>
                                                    {post.title}
                                                </p>

                                                <h4 className='card-header'>
                                                    timestamp
                                                </h4>
                                                <p className='card-text faded'>
                                                    {new Date(
                                                        post.timestamp
                                                    ).toLocaleString()}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-grow flex-col border-2 border-solid border-sky-200 px-4'>
                            <h3 className='text-lg border-b-2 mb-2'>
                                Comments
                            </h3>
                            <div className='card-container'>
                                {loadingComments ? (
                                    <p>Loading comments...</p>
                                ) : errorComments ? (
                                    <p>{errorComments}</p>
                                ) : (
                                    <ul>
                                        {allComments.map((comment) => (
                                            <li
                                                className='card'
                                                key={comment._id}
                                                onClick={() =>
                                                    handleCommentClick(
                                                        comment._id,
                                                        comment.post._id
                                                    )
                                                }
                                            >
                                                <h4 className='card-header'>
                                                    from post:
                                                </h4>
                                                <p>{comment.post.title}</p>
                                                <h4 className='card-header'>
                                                    comment:
                                                </h4>
                                                <p className='card-text'>
                                                    {comment.text}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
