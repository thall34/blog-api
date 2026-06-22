import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';

function Blogs() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  async function getAllBlogs() {
    const token = localStorage.getItem('token');

    if (!token) return;

    try {
      const response = await fetch('http://localhost:3000/api/posts/all', {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );

      if (!response.ok) {
        return null;
      }

      const posts = await response.json();
      setBlogs(posts);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function checkAuthorization() {
        const user = await getCurrentUser();
        setUser(user)
    }

    checkAuthorization();
  }, []);

  useEffect(() => {
    getAllBlogs()
  }, []);

  return (
    <div>
        {user ? (
            <>
                {(blogs.length > 0) ? (
                    <>
                    {blogs.map((blog) => (
                       <h1 key={blog.id}>{blog.title}</h1> 
                    ))}
                    </>
                ) : (
                    <>
                        <h1>No Blogs Found</h1>
                    </>
                )}
                <Link to='/blogs/new'>
                            <button>Create New Blog Post</button>
                        </Link>  
                <Link to='/user'>
                    <button>Go Back to User Dashboard</button>
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

export default Blogs;