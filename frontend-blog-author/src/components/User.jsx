import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';

function User() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    return;
  };

  useEffect(() => {
    async function checkAuthorization() {
        const user = await getCurrentUser();
        setUser(user)
    }

    checkAuthorization();
  }, []);

  return (
    <div>
        {user ? (
            <>
                <h1>Welcome to User Page</h1>
                <Link to='/'>
                    <button onClick={handleLogout}>Log Out</button>
                </Link>
                <Link to='/blogs'>
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

export default User;