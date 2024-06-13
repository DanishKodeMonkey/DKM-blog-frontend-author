import { useParams } from 'react-router-dom';
import CommentDetailPage from '../components/CommentDetails';

function Comments() {
    const { commentId } = useParams();

    return (
        <div className='w-full max-w-5xl bg-white'>
            <div className='text-center py-10 '>
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
