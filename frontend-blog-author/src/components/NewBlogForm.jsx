import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';
import handleChange from '../utils/handleChange';
import createBlog from '../api/createBlog';

function NewBlogForm() {
  const [user, setUser] = useState(null);
  const [blogData, setBlogData] = useState({
    title: '',
    text: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const success = await createBlog();

      if (!success) {
        const error = new Error('Error Creating Post');
        error.status = 400;
        setError(error);
      };

      setBlogData({
        title: '',
        text: '',
      });

      navigate('/user/blogs');
    } catch (err) {
      setError(err);
    };
  };

  useEffect(() => {
    async function initializePage() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
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
        <Link to='/user/blog'>
          <button onClick={() => setError(null)}>Back to Blogs</button>
        </Link>
      </div>
    )
  };

  if (user) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h1>New Blog Post</h1>
          <label htmlFor='title'>Title: </label>
          <input type="text" name='title' id='title' onChange={(e) => handleChange(e, setBlogData)} required />
          <label htmlFor='title'>Text: </label>
          <input type="text" name='text' id='text' onChange={(e) => handleChange(e, setBlogData)} required />
          <button type='submit'>Create Blog</button>
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
};

  export default NewBlogForm;