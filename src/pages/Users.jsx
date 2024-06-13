import { useParams } from 'react-router-dom';
import UserDetailPage from '../components/UserDetails';

function Users() {
    const { userId } = useParams();

    return (
        <div className='w-full max-w-5xl bg-white'>
            <div className='text-center py-10 '>
                {userId ? (
                    <UserDetailPage userId={userId} />
                ) : (
                    <div>
                        <h1 className='text-3xl font-bold underline'>Users</h1>
                        <h2>No user selected...</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Users;
