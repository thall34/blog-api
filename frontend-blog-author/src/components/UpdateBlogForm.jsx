import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';
import handleChange from '../utils/handleChange';
import updateBlog from '../api/updateBlog';
import getPost from '../api/getPost';

function UpdateBlogForm() {
    const [user, setUser] = useState(null);
    const [blogData, setBlogData] = useState({
        title: '',
        text: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const blogId = location.state?.blogId;

    async function getPostContents() {
        try {
            const post = await getPost(blogId);

            if (!post) {
                const error = new Error('Error Getting Post');
                error.status = 400;
                setError(error);
            };

            return post;
        } catch (err) {
            setError(err);
        };
    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const success = await updateBlog();

            if (!success) {
                const error = new Error('Error Updating Blog');
                error.status = 400;
                setError(error);
            };

            setBlogData({
                title: '',
                text: '',
            });

            navigate('/user/blogs')
        } catch (err) {
            setError(err);
        };
    };

    useEffect(() => {
        async function initializePage() {
            try {
                const currentUser = await getCurrentUser();
                const currentPost = await getPostContents();
                setUser(currentUser);
                setBlogData({
                    title: currentPost.title,
                    text: currentPost.text,
                });
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            };
        };

        initializePage();
    }, []);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    };

    if (error) {
        return (
            <div>
                <h1>{error.message}</h1>
                <Link to='/user/blogs'>
                    <button onClick={() => setError(null)}>Back to Blogs</button>
                </Link>
            </div>
        )
    };

    if (user) {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Update Blog Post</h1>
                    <label htmlFor='title'>Title: </label>
                    <input type="text" name='title' id='title' onChange={(e) => handleChange(e, setBlogData)} value={blogData.title} required />
                    <label htmlFor='text'>Text: </label>
                    <input type="text" name='text' id='text' onChange={(e) => handleChange(e, setBlogData)} value={blogData.text} required />
                    <button type='submit'>Submit Update</button>
                </form>
                <Link to='/user/blogs'>
                    <button>Go to Blogs</button>
                </Link>
            </div>
        )
    };

    return (
        <div>
            <h1>Not Authenticated</h1>
            <Link to='/'>
                <button>Go to Homepage</button>
            </Link>
        </div>
    )
}

export default UpdateBlogForm;