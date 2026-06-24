import getToken from "../utils/getToken";

async function updateBlog(blogId, blogData) {
    const token = getToken();

    if (!token) {
        return null;
    };
    
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${blogId}`, {
        method: 'PUT',
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
    } catch(err) {
        return null;
    };
};

export default updateBlog;