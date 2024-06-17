import { useState, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import AuthContext from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api';
import { Link } from 'react-router-dom';

const CreatePost = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState(false);
    const [error, setError] = useState(null);

    const handleEditorChange = (content, editor) => {
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
            const response = await createPost(post);
            console.log('Post created successfully!', response);
            navigate('/');
        } catch (error) {
            console.error('Error creating post:', error.message);
            setError(error.message || 'Failed to create post');
        }
    };

    return (
        <div className='max-w-5xl mx-auto px-4 py-8 bg-slate-200 rounded-lg'>
            <Link
                className='return-link text-center'
                to={'/'}
            >
                Return
            </Link>
            <h1 className='text-3xl font-bold mb-4'>Create New Post</h1>
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
                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                        value={content}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount',
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help',
                        }}
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
                        Create post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
