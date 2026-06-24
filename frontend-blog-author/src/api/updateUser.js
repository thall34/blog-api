import getToken from "../utils/getToken";

async function updateUser(userId, userData) {
    const token = getToken();

    if (!token) {
        return null;
    };

    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        return null;
      }

      const updatedUser = await response.json();
      return updatedUser;
}

export default updateUser;