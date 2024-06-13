import { useParams } from 'react-router-dom';
import PostDetailPage from '../components/PostDetails';

function Posts() {
    const { postId } = useParams();

    return (
        <div className='w-full max-w-5xl bg-white'>
            <div className='text-center py-10 '>
                {postId ? (
                    <PostDetailPage postId={postId} />
                ) : (
                    <div>
                        <p>No post selected...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Posts;
