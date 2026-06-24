import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import getCurrentUser from '../api/getCurrentUser';
import handleChange from '../utils/handleChange';
import getComment from '../api/getComment';
import updateComment from '../api/updateComment';

function UpdateCommentForm() {
    const [user, setUser] = useState(null);
    const [commentData, setCommentData] = useState({ text: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const commentId = location.state?.commentId;
    const blog = location.state?.blog;

    async function getCommentContents() {
        try {
            const comment = await getComment(commentId);
            return comment;
        } catch (err) {
            setError(err);
        };
    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const success = await updateComment(commentId, commentData);

            if (!success) {
                const error = new Error('Error Updating Comment');
                error.status = 400;
                setError(error);
            };

            setCommentData({ text: '' });

            navigate('/user/blog/comments', { state: { blog: blog } })
        } catch (err) {
            setError(err);
        };
    };

    useEffect(() => {
        async function initializePage() {
            try {
                const currentUser = await getCurrentUser();
                const currentComment = await getCommentContents();
                setUser(currentUser);
                setCommentData({
                    text: currentComment.text,
                });
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
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
                <form onSubmit={handleSubmit}>
                    <h1>Edit Comment</h1>
                    <label htmlFor='text'>Text: </label>
                    <input type="text" name='text' id='text' onChange={(e) => handleChange(e, setCommentData)} value={commentData.text} required />
                    <button type='submit'>Submit Edit</button>
                </form>
                <Link to='/user/blog/comments' state={{ blog: blog }}>
                    <button>Go to Comments</button>
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
}

export default UpdateCommentForm;