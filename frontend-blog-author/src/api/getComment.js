import getToken from "../utils/getToken";

async function getComment(commentId) {
    const token = getToken();
    try {
        const response = await fetch(`http://localhost:3000/api/comments/${commentId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (!response.ok) {
            return null;
        };

        const comment = await response.json();
        return comment;
    } catch(err) {
        return null;
    };
};

export default getComment;