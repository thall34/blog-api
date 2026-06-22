import App from './components/App';
import User from './components/User';
import Blogs from './components/Blogs';
import NewBlogForm from './components/NewBlogForm';
import NewUserForm from './components/NewUserForm';
import UpdateUserForm from './components/UpdateUserForm';
import UpdateBlogForm from './components/UpdateBlogForm';

const routes = [
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/user',
        element: <User />,
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
        path: '/blogs',
        element: <Blogs />,
    },
    {
        path: '/blogs/new',
        element: <NewBlogForm />
    },
    {
        path: '/blogs/update',
        element: <UpdateBlogForm />
    }
];

export default routes;