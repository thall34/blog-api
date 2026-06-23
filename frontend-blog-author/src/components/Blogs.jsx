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

  async function deletePost(postId) {
    const token = localStorage.getItem('token');

    if (!token) return;

        try {
          const response = await fetch(`http://localhost:3000/api/posts/${postId}`, 
            { 
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            },
        );
    
          if (!response.ok) {
            return null;
          }

          setBlogs((prevBlogs) => {
            return prevBlogs.filter((blog) => blog.id !== postId)
          })

          if (response.status === 204) {
            return true;
          };
          
        } catch (err) {
          console.error(err);
        }
  }

  async function checkAuthorization() {
        const user = await getCurrentUser();
        setUser(user)
  }

  useEffect(() => {
    checkAuthorization();
    getAllBlogs();
  }, []);

  return (
    <div>
        {user ? (
            <>
                {(blogs.length > 0) ? (
                    <>
                    {blogs.map((blog) => (
                      <div key={blog.id}>
                       <h1>{blog.title}</h1>
                       <h3>Author: {blog.user.username}</h3>
                       <p>Last Updated: {new Date(blog.updatedAt).toLocaleString()}</p>
                       <p>{blog.text}</p>
                       <Link to='/user/blogs/update' state={{ blogId: blog.id }}>
                          <button>Update Blog</button>
                       </Link>
                       <button onClick={() => deletePost(blog.id)}>Delete Blog</button>
                       <Link to='/user/blog/comments' state={{ blog: blog }}>
                        <button>View Comments</button>
                       </Link>
                      </div>
                    ))}
                    </>
                ) : (
                    <>
                        <h1>No Blogs Found</h1>
                    </>
                )}
                <Link to='/user/blogs/new'>
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