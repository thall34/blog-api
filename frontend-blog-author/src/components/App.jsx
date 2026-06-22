import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import LoginForm from './LoginForm';
import getCurrentUser from '../api/getCurrentUser';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkAuthorization() {
      const user = await getCurrentUser();
      setUser(user);
    };

    checkAuthorization();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <h1>{user.username} successfully logged in!</h1>
          <Link to='/user'>
            <button>Go to User Dashboard</button>
          </Link>
        </> ) : (
          <> 
            <LoginForm setUser={setUser} />
            <Link to='/user/new'>
              <button>Register New User</button>
            </Link>
          </> 
        )}
    </div>
  )
}

export default App;