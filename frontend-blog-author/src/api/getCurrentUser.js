import getToken from "../utils/getToken";

async function getCurrentUser() {
    const token = getToken();

    if (!token) {
      return null;
    }

    try {
      const response = await fetch(
        'http://localhost:3000/api/users/me',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        localStorage.removeItem('token');
        return null;
      };

      // return response.json();
      const user = await response.json();
      return user;
    } catch (err) {
      return null;
    };
  };

export default getCurrentUser;