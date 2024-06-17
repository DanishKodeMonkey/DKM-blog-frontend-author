import { useState, useEffect, useContext, useRef } from 'react';
import AuthContext from '../AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, fetchPostById, editPost } from '../api';
import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

const CreatePost = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { postId } = useParams();
    const editorRef = useRef(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (postId) {
            console.log('PostId received, setting edit mode to true', postId);
            setIsEditing(true);
            fetchPost();
        } else {
            // no data to fetch (new post)
            setLoading(false);
        }
    }, [postId]);

    const fetchPost = async () => {
        console.log('fetching post...');
        try {
            const fetchedPost = await fetchPostById(postId);
            console.log('Post fetched', fetchedPost);
            setTitle(fetchedPost.title);
            setContent(fetchedPost.text);
            setPublished(fetchedPost.published);
            setLoading(false);
        } catch (error) {
            setError(error.message || 'Failed to fetch post');
            setLoading(false);
        }
    };

    const handleEditorChange = (content) => {
        setContent(content);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const post = {
            title,
            text: content,
            published,
            author: user._id || 'Anonymous',
        };
        try {
            if (isEditing) {
                await editPost(postId, post);
                alert('Post updated successfully!');
            } else {
                await createPost(post);
                alert('Post created successfully!');
            }
            navigate('/');
        } catch (error) {
            console.error('Error creating post:', error.message);
            setError(error.message || 'Failed to create post');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className='max-w-5xl mx-auto px-4 py-8 bg-slate-200 rounded-lg'>
            <Link
                className='return-link text-center'
                to={'/'}
            >
                Return
            </Link>
            <h1 className='text-3xl font-bold mb-4'>
                {isEditing ? 'Edit post' : 'Create New Post'}
            </h1>
            {error && <p className='text-red-500'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label
                        htmlFor='title'
                        className='block text-sm font-medium text-gray-700 mb-2'
                    >
                        Title
                    </label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        maxLength={50}
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Content
                    </label>
                    <Editor
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table code help wordcount',
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                            content_style:
                                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                        value={content}
                        onEditorChange={handleEditorChange}
                    />
                </div>
                <div className='mb-4'>
                    <label
                        htmlFor='published'
                        className='block text-sm font-medium text-gray-700 mb-2'
                    >
                        Published
                    </label>
                    <input
                        type='checkbox'
                        name='published'
                        id='published'
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        className='mt-1 block'
                    />
                </div>
                <div>
                    <button className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-offset-2 focus:ring-teal-500'>
                        {isEditing ? 'Update Post' : 'Create post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
