import getToken from "../utils/getToken";

async function deleteUser(userId) {
    const token = getToken();

    if (!token) {
        return null;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
        );

        if (!response.ok) {
            return null;
        }

        const success = await response.json();
        return success;
    } catch(err) {
        return null;
    }
}

export default deleteUser;