import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';

function Comments() {
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);

    const location = useLocation();
    const blog = location.state?.blog;

    async function getAllCommentsByBlogId() {
        const token = localStorage.getItem('token');

        if (!token) return;

        try {
            const response = await fetch(`http://localhost:3000/api/comments/all/${blog.id}`,
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
            setComments(comments);
        } catch(err) {
            console.error(err);
        };
    };

    async function deleteComment(commentId) {
        const token = localStorage.getItem('token');

        if (!token) return;

        try {
            const response = await fetch(`http://localhost:3000/api/comments/${commentId}`,
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

            setComments((prevComments) => {
                return prevComments.filter((comment) => comment.id !== commentId)
            })

            if (response.status === 204) {
                return true;
            };

        } catch (err) {
            console.error(err);
        }
    }

    async function checkAuthorization() {
        const user = await getCurrentUser();
        setUser(user)
    }

    useEffect(() => {
        checkAuthorization();
        getAllCommentsByBlogId();
    }, []);

    return (
        <div>
            {user ? (
                <>
                    <div key={blog.id}>
                        <h1>{blog.title}</h1>
                        <h3>Author: {blog.user.username}</h3>
                        <p>{blog.text}</p>
                    </div>
                    {comments.length > 0 ? (
                        <>
                        {comments.map((comment) => (
                            <div key={comment.id}>
                                <h1>{comment.user.username}</h1>
                                <p>{comment.text}</p>
                                <p>{new Date(comment.updatedAt).toLocaleString()}</p>
                                {user.id === comment.authorId ? (
                                    <>
                                    <Link to='/user/blog/comments/update' state={{ commentId: comment.id, blog: blog }}>
                                        <button>Edit Comment</button>
                                    </Link>
                                    <button onClick={deleteComment}>Delete Comment</button>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        ))}
                        </>
                    ) : (
                        <h1>No Comments Yet</h1>
                    )}
                    <Link to='/user/blog/comments/new' state={{ blog: blog }}>
                        <button>Add a Comment</button>
                    </Link>
                    <Link to='/user/blogs'>
                        <button>Go Back to Blogs</button>
                    </Link>
                </>
            ) : (
                <>
                    <h1>Not Authenticated</h1>
                    <Link to='/'>
                        <button>Go to Homepage</button>
                    </Link>
                </>
            )}
        </div>
    )
}

export default Comments;