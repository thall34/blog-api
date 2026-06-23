import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';

function User() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    return;
  };

  async function deleteUser() {
        try {
          const response = await fetch(`http://localhost:3000/api/users/${user.id}`, 
            { 
                method: 'DELETE' 
            },
        );
    
          if (!response.ok) {
            return null;
          }
    
          localStorage.removeItem('token');
          setUser(null);
          
          navigate('/')

          if (response.status === 204) {
            return true;
          };
          
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

  return (
    <div>
        {user ? (
            <>
                <h1>Welcome to User Page</h1>
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