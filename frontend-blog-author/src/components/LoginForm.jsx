import { useState } from 'react';
import handleChange from '../utils/handleChange';
import loginUser from '../api/loginUser';

function LoginForm({ setUser, setError }) {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });

    async function handleSubmit(e) {
    e.preventDefault();

    try {
      const user = await loginUser(userData);
      localStorage.setItem('token', user.token);
      setUser(user.user);
      setUserData({
        username: '',
        password: '',
      });
    } catch(err) {
      setError(err);
    };
  };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label htmlFor='username'>Username: </label>
                <input type='text' name='username' id='username' value={userData.username} onChange={(e) => handleChange(e, setUserData)} required />
                <label htmlFor='password'>Password: </label>
                <input type='password' name='password' id='password' value={userData.password} onChange={(e) => handleChange(e, setUserData)} required />
                <button type='submit'>Log In</button>
            </form>
        </>
    )
}

export default LoginForm;