import getToken from '../utils/getToken';

async function getAllBlogs() {
    const token = getToken();

    if (!token) {
        return null;
    }

    try {
        const response = await fetch('http://localhost:3000/api/posts/all', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        );

        if (!response.ok) {
            return null;
        };

        const posts = await response.json();
        return posts;
    } catch (err) {
        return err;
    };
};

export default getAllBlogs;