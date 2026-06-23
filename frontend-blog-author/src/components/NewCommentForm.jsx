import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';

function NewCommentForm() {
  const [user, setUser] = useState(null);
  const [commentData, setCommentData] = useState({ text: '' });

  const navigate = useNavigate();
  const location = useLocation();
  const blog = location.state?.blog;

  useEffect(() => {
    async function checkAuthorization() {
        const user = await getCurrentUser();
        setUser(user)
    }

    checkAuthorization();
  }, []);

  const handleChange = (e) => {
        const { name, value } = e.target;
        setCommentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:3000/api/comments/${blog.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(commentData),
      });

      const comment = await response.json();

      if (!response.ok) {
        throw new Error('Comment Creation Failed');
      }

      setCommentData({ text: '' });

      navigate('/user/blog/comments', { state: { blog: blog }})

    //   return user;
    } catch(err) {
      console.error(err)
    };
  };

  return (
    <div>
        {user ? (
            <>
                <form onSubmit={handleSubmit}>
                    <h1>New Comment</h1>
                    <label htmlFor='title'>Text: </label>
                    <input type="text" name='text' id='text' onChange={handleChange} required/>
                    <button type='submit'>Add Comment</button>
                </form>
                <Link to='/user/blog/comments' state={{ blog: blog }}>
                    <button>Go to Comments</button>
                </Link>
            </>
        ) : (
            <>
                <h1>Not Authenticated</h1>
                <Link to='/'>
                    <button>Go to Homepage</button>
                </Link>
            </>
        )}
    </div>
  )
}

export default NewCommentForm;