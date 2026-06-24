import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';
import handleChange from '../utils/handleChange';
import createComment from '../api/createComment';

function NewCommentForm() {
  const [user, setUser] = useState(null);
  const [commentData, setCommentData] = useState({ text: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const blog = location.state?.blog;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const success = await createComment(blog.id, commentData);

      if (!success) {
        const error = new Error('Error Adding Comment');
        error.status = 400;
        setError(error);
      };

      setCommentData({ text: '' });

      navigate('/user/blog/comments', { state: { blog: blog } })
    } catch (err) {
      console.error(err)
    };
  };

  useEffect(() => {
    async function initializePage() {
      try {
        const currentUser = getCurrentUser();
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
        <Link to='/user/blog/comments' state={{ blog: blog }}>
          <button onClick={() => setError(null)}>Back to Comments</button>
        </Link>
      </div>
    )
  };

  if (user) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h1>New Comment</h1>
          <label htmlFor='title'>Text: </label>
          <input type="text" name='text' id='text' onChange={(e) => handleChange(e, setCommentData)} required />
          <button type='submit'>Add Comment</button>
        </form>
        <Link to='/user/blog/comments' state={{ blog: blog }}>
          <button>Go to Comments</button>
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

export default NewCommentForm;