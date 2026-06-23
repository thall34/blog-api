import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';

function UpdateBlogForm() {
  const [user, setUser] = useState(null);
  const [blogData, setBlogData] = useState({
    title: '',
    text: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const blogId = location.state?.blogId;

    useEffect(() => {
        async function checkAuthorization() {
            const user = await getCurrentUser();
            setUser(user)
        }

        async function getPostContents() {
            const token = localStorage.getItem('token');

            if (!token) return;
            try {
                const response = await fetch(`http://localhost:3000/api/posts/${blogId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                if (!response.ok) {
                    return null;
                };

                const post = await response.json();
                setBlogData({
                    title: post.title,
                    text: post.text,
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
        setBlogData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:3000/api/posts/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(blogData),
      });

      const post = await response.json();

      if (!response.ok) {
        throw new Error('Blog Post Update Failed');
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
                    <h1>Update Blog Post</h1>
                    <label htmlFor='title'>Title: </label>
                    <input type="text" name='title' id='title' onChange={handleChange} value={blogData.title} required/>
                    <label htmlFor='text'>Text: </label>
                    <input type="text" name='text' id='text' onChange={handleChange} value={blogData.text} required/>
                    <button type='submit'>Submit Update</button>
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

export default UpdateBlogForm;