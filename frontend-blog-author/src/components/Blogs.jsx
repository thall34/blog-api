import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';
import getAllBlogs from '../api/getAllBlogs';
import deletePost from '../api/deletePost';

function Blogs() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function handleDeletePost(postId) {
    try {
      const success = await deletePost(postId);

      if (success) {
        setBlogs((prevBlogs) => {
          return prevBlogs.filter((blog) => blog.id !== postId)
        })
      }
    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => {
    async function initializePage() {
      try {
        const currentUser = await getCurrentUser();
        const allBlogs = await getAllBlogs();
        setUser(currentUser);
        setBlogs(allBlogs);
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
      </div>
    )
  };

  if (user) {
    return (
      <div>
        {(blogs.length > 0 ? (
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
                <button onClick={() => handleDeletePost(blog.id)}>Delete Blog</button>
                <Link to='/user/blog/comments' state={{ blog: blog }}>
                  <button>View Comments</button>
                </Link>
              </div>
            ))}
          </>
        ) : (
            <h1>No Blogs Found</h1>
        )
        )}
        <Link to='/user/blogs/new'>
          <button>Create New Blog Post</button>
        </Link>
        <Link to='/user'>
          <button>Go Back to User Dashboard</button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Not Authenticated</h1>
      <Link to='/'>
        <button>Go to Homepage</button>
      </Link>
    </div>
  )
}

export default Blogs;