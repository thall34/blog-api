import getToken from '../utils/getToken';

async function deletePost(postId) {
    const token = getToken()

    if (!token) {
        return null;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (!response.ok) {
            return null;
        }

        return response;
    } catch (err) {
        return err;
    }
}

export default deletePost;