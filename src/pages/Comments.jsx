import { useParams } from 'react-router-dom';
import CommentDetailPage from '../components/CommentDetails';

function Comments() {
    const { commentId } = useParams();

    return (
        <div className='w-full max-w-5xl bg-white mx-auto  h-full'>
            <div className='text-center h-full'>
                {commentId ? (
                    <CommentDetailPage commentId={commentId} />
                ) : (
                    <div>
                        <p>No comment selected...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Comments;
