import { useState } from 'react'

function LoginForm({ setUser }) {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const user = await response.json();

      if (!response.ok) {
        throw new Error('Login failed');
      }

      localStorage.setItem('token', user.token);
      setUser(user.user);
      setUserData({
        username: '',
        password: '',
      });

    //   return user;
    } catch(err) {
      console.error(err)
    };
  };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label htmlFor='username'>Username: </label>
                <input type='text' name='username' id='username' value={userData.username} onChange={handleChange} required />
                <label htmlFor='password'>Password: </label>
                <input type='password' name='password' id='password' value={userData.password} onChange={handleChange} required />
                <button type='submit'>Log In</button>
            </form>
        </>
    )
}

export default LoginForm;