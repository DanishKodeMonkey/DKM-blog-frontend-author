import { useParams } from 'react-router-dom';
import UserDetailPage from '../components/UserDetails';

function Users() {
    const { userId } = useParams();

    return (
        <div className='w-full max-w-5xl bg-white mx-auto'>
            <div className='text-center h-full '>
                {userId ? (
                    <UserDetailPage userId={userId} />
                ) : (
                    <div>
                        <p>No users selected...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Users;
