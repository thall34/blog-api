import App from './components/App';
import User from './components/User';
import Blogs from './components/Blogs';
import NewBlogForm from './components/NewBlogForm';
import NewUserForm from './components/NewUserForm';
import UpdateUserForm from './components/UpdateUserForm';
import UpdateBlogForm from './components/UpdateBlogForm';
import Comments from './components/Comments';
import NewCommentForm from './components/NewCommentForm';
import UpdateCommentForm from './components/UpdateCommentForm';

const routes = [
    {
        path: '/',
        element: <App />
    },
    {
        path: '/user',
        element: <User />
    },
    {
        path: '/user/new',
        element: <NewUserForm />
    },
    {
        path: '/user/update',
        element: <UpdateUserForm />
    },
    {
        path: '/user/blogs',
        element: <Blogs />
    },
    {
        path: '/user/blogs/new',
        element: <NewBlogForm />
    },
    {
        path: '/user/blogs/update',
        element: <UpdateBlogForm />
    },
    {
        path: '/user/blog/comments',
        element: <Comments />
    },
    {
        path: '/user/blog/comments/new',
        element: <NewCommentForm />
    },
    {
        path: '/user/blog/comments/update',
        element: <UpdateCommentForm />
    },
];

export default routes;