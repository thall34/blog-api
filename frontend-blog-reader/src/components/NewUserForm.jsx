import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import handleChange from '../utils/handleChange';
import createUser from '../api/createUser';

function NewUserForm() {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const success = await createUser(userData);

      if (!success) {
        const error = new Error('Error Creating User');
        error.status = 400;
        setError(error);
      };

      setUserData({
        username: '',
        password: '',
      });

      navigate('/');
    } catch (err) {
      setError(err);
    };
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Register New User</h1>
        <label htmlFor='username'>Username: </label>
        <input type='text' name='username' id='username' value={userData.username} onChange={(e) => handleChange(e, setUserData)} required />
        <label htmlFor='password'>Password: </label>
        <input type='password' name='password' id='password' value={userData.password} onChange={(e) => handleChange(e, setUserData)} required />
        <button type='submit'>Create User</button>
      </form>
      <Link to='/'>
        <button>Go to Homepage</button>
      </Link>
    </div>
  )
}

export default NewUserForm;