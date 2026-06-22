import { useState, useEffect } from 'react'

function App() {
  const [users, setUsers] = useState([]);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/all`);
        const data = await response.json();
        setUsers(data);
      } catch(err) {
        console.error(err)
      };
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const newUser = await response.json();

        setUsers((prev) => [...prev, newUser]);
        setUserData({
          username: '',
          password: '',
        });
      };

    } catch(err) {
      console.error(err);
    };
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const user = await response.json();

      if (!response.ok) {
        throw new Error('Login failed');
      }

      localStorage.setItem('token', user.token);
      // setUser(user)

      return user;
    } catch(err) {
      console.error(err)
    };
  };

  useEffect(() => {
  async function checkAuth() {
    const token = localStorage.getItem('token');

    if (!token) return;

    try {
      const response = await fetch(
        'http://localhost:3000/api/users/me',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        localStorage.removeItem('token');
        return;
      }

      const user = await response.json();
      setUser(user);
    } catch (err) {
      console.error(err);
    }
  }

  checkAuth();
}, []);

  return (
    <>
      <h1>Blog Author</h1>
      {user ? <h1>{user.username} is logged in!</h1> :
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" value={loginData.username} onChange={handleChangeLogin} required />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" value={loginData.password} onChange={handleChangeLogin} required />
        <button type="submit">Log In</button>
      </form>
      }
      {users.length > 0 ? 
      users.map((user) => (
        <p key={user.id}>{user.username}</p>
      ))
      : <h1>No Users Found</h1>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" value={userData.username} onChange={handleChange} required />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" value={userData.password} onChange={handleChange} required />
        <button type="submit">Create User</button>
      </form>
    </>
  )
}

export default App;