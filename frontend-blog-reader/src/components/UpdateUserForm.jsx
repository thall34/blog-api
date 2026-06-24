import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';
import handleChange from '../utils/handleChange';
import updateUser from '../api/updateUser';

function UpdateUserForm() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const updatedUser = await updateUser(user.id, userData);

      if (!updatedUser) {
        const error = new Error('Error Updating User');
        error.status = 400;
        setError(error)
      };

      setUserData({
        username: '',
        password: '',
      });

      navigate('/user');
    } catch (err) {
      setError(err);
    };
  };

  useEffect(() => {
    async function initializePage() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setUserData({
          username: currentUser.username,
          password: '',
        });
      } catch(err) {
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
        <Link to='/user'>
          <button onClick={() => setError(null)}>Back to User</button>
        </Link>
      </div>
    )
  };

  if (user) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Update User</h1>
          <label htmlFor='username'>Username: </label>
          <input type='text' name='username' id='username' value={userData.username} onChange={(e) => handleChange(e, setUserData)} required />
          <label htmlFor='password'>Password: </label>
          <input type='password' name='password' id='password' value={userData.password} onChange={(e) => handleChange(e, setUserData)} placeholder='Leave this field blank to keep current password' />
          <button type='submit'>Submit Update</button>
          <Link to='/user'>
            <button>Go to User</button>
          </Link>
        </form>
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

export default UpdateUserForm;