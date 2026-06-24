import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';
import deleteUser from '../api/deleteUser';

function User() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    setUser(null);
    return;
  };

  async function deleteCurrentUser() {
    try {
      const success = await deleteUser(user.id);

      if (!success) {
        const error = new Error('Error Deleting User');
        error.status = 400;
        setError(error);
      };

      localStorage.removeItem('token');
      setUser(null);

      navigate('/')
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
        <Link to='/'>
          <button onClick={() => setError(null)}>Back to Homepage</button>
        </Link>
      </div>
    )
  };
  
  if (user) {
    return (
      <div>
        <h1>Welcome to User Page {user.username}</h1>
        <Link to='/'>
          <button onClick={handleLogout}>Log Out</button>
        </Link>
        <Link to='/user/update'>
          <button>Update User</button>
        </Link>
        <button onClick={deleteUser}>Delete User</button>
        <Link to='/user/blogs'>
          <button>Go to Blogs</button>
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

export default User;