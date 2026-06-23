import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';

function UpdateCommentForm() {
  const [user, setUser] = useState(null);
  const [commentData, setCommentData] = useState({ text: '' });

  const navigate = useNavigate();
  const location = useLocation();
  const commentId = location.state?.commentId;
  const blog = location.state?.blog;

    useEffect(() => {
        async function checkAuthorization() {
            const user = await getCurrentUser();
            setUser(user)
        }

        async function getPostContents() {
            const token = localStorage.getItem('token');

            if (!token) return;
            try {
                const response = await fetch(`http://localhost:3000/api/comments/${commentId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                if (!response.ok) {
                    return null;
                };

                const comment = await response.json();
                setCommentData({
                    text: comment.text,
                });
            } catch (err) {
                console.error(err);
            };
        }

        checkAuthorization();
        getPostContents();
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
      const response = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(commentData),
      });

      const comment = await response.json();

      if (!response.ok) {
        throw new Error('Comment Update Failed');
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
                    <h1>Edit Comment</h1>
                    <label htmlFor='text'>Text: </label>
                    <input type="text" name='text' id='text' onChange={handleChange} value={commentData.text} required/>
                    <button type='submit'>Submit Edit</button>
                </form>
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

export default UpdateCommentForm;