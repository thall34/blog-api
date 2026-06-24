import getToken from "../utils/getToken";

async function getPost(blogId) {
    const token = getToken();

    if (!token) {
        return null;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/posts/${blogId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (!response.ok) {
            return null;
        };

        const post = await response.json();
        return post;
    } catch (err) {
        return null;
    };
};

export default getPost;