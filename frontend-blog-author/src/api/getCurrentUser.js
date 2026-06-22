import authHeader from "./authHeader";

async function getCurrentUser() {
    const token = localStorage.getItem('token');

    if (!token) return;

    try {
      const response = await fetch(
        'http://localhost:3000/api/users/me',
        {
          headers: authHeader()
        }
      );

      if (!response.ok) {
        localStorage.removeItem('token');
        return null;
      }

      return response.json();
    } catch (err) {
      console.error(err);
    }
  };

export default getCurrentUser;