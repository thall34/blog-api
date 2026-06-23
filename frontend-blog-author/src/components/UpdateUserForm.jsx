import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';

function UpdateUserForm() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      setUser(user);
      setUserData({
        username: user.username,
        password: '',
      });
    };

    fetchUser();
  }, []);

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
      const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const updatedUser = await response.json();

      if (!response.ok) {
        throw new Error('Update failed');
      }

      setUser(updatedUser.user);
      setUserData({
        username: '',
        password: '',
      });

      navigate('/user');

    //   return user;
    } catch(err) {
      console.error(err)
    };
  };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Update User</h1>
                <label htmlFor='username'>Username: </label>
                <input type='text' name='username' id='username' value={userData.username} onChange={handleChange} required />
                <label htmlFor='password'>Password: </label>
                <input type='password' name='password' id='password' value={userData.password} onChange={handleChange} placeholder='Leave this field blank to keep current password'/>
                <button type='submit'>Submit Update</button>
                <Link to='/user'>
                    <button>Go to Blogs</button>
                </Link>
            </form>
        </>
    )
}

export default UpdateUserForm;