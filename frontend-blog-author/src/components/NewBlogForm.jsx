import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';

function NewBlogForm() {
  const [user, setUser] = useState(null);
  const [blogData, setBlogData] = useState({
    title: '',
    text: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuthorization() {
        const user = await getCurrentUser();
        setUser(user)
    }

    checkAuthorization();
  }, []);

  const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:3000/api/posts/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(blogData),
      });

      const post = await response.json();

      if (!response.ok) {
        throw new Error('Blog Post Creation Failed');
      }

      setBlogData({
        title: '',
        text: '',
      });

      navigate('/user/blogs')

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
                    <h1>New Blog Post</h1>
                    <label htmlFor='title'>Title: </label>
                    <input type="text" name='title' id='title' onChange={handleChange} required/>
                    <label htmlFor='title'>Text: </label>
                    <input type="text" name='text' id='text' onChange={handleChange} required/>
                    <button type='submit'>Create Blog</button>
                </form>
                <Link to='/user/blogs'>
                    <button>Go to Blogs</button>
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

export default NewBlogForm;