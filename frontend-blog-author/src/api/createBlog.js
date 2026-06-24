import getToken from "../utils/getToken";

async function createBlog(blogData) {
    const token = getToken();

    if (!token) {
        return null;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(blogData),
        });

        if (!response.ok) {
            return null;
        };

        const post = await response.json();
        return post;
    } catch (err) {
        return err;
    }
}

export default createBlog;