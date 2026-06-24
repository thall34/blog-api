import getToken from "../utils/getToken";

async function updateComment(commentId, commentData) {
    const token = getToken();

    if (!token) {
        return null;
    };

    try {
        const response = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(commentData),
        });

        

        if (!response.ok) {
            return null;
        };

        const comment = await response.json();
        return comment;
    } catch(err) {
        return null;
    };
};

export default updateComment;