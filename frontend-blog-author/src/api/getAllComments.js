import getToken from '../utils/getToken';

async function getAllComments(blogId) {
    const token = getToken();

    if (!token) return null;

    try {
        const response = await fetch(`http://localhost:3000/api/comments/all/${blogId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (!response.ok) {
            return null;
        };

        const comments = await response.json();
        return comments;
    } catch (err) {
        return err;
    }
}

export default getAllComments;