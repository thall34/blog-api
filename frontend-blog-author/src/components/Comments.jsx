import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';
import getAllComments from '../api/getAllComments';
import deleteComment from '../api/deleteComment';

function Comments() {
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const blog = location.state?.blog;

    async function handleDeleteComment(commentId) {
        try {
            const success = await deleteComment();

            if (!success) {
                const error = new Error('Error Deleting Comment');
                error.status = 404;
                setError(error);
                return;
            };

            setComments((prevComments) => {
                return prevComments.filter((comment) => comment.id !== commentId)
            });
        } catch (err) {
            setError(err);
        };
    };

    useEffect(() => {
        async function initializePage() {
            try {
                const currentUser = await getCurrentUser();
                const allComments = await getAllComments(blog.id);
                setUser(currentUser);
                setComments(allComments);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            };
        };

        initializePage();
    }, []);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    };

    if (error) {
        return (
            <div>
                <h1>{error.message}</h1>
                <Link to='/user/blog/comments' state={{ blog: blog }}>
                    <button onClick={() => setError(null)}>Back to Comments</button>
                </Link>
            </div>
        )
    };

    if (user) {
        return (
            <div>
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
                                        <button onClick={() => handleDeleteComment(comment.id)}>Delete Comment</button>
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

            </div>
        )
    };

    return (
        <div>
            <h1>Not Authenticated</h1>
            <Link to='/'>
                <button>Go to Homepage</button>
            </Link>
        </div>
    )
};

export default Comments;