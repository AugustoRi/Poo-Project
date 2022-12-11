import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import RegisterUserPage from './pages/RegisterUserPage';
import RegisterManagerPage from './pages/RegisterManagerPage';

import { useAuth } from './hooks/useAuth';

const ProtectedRoutePage = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <LoginPage /> : <Item />;
};

export default function Router() {
  const { signed } = useAuth();

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <ProtectedRoutePage Item={DashboardLayout} />,
      children: [
        { element: <Navigate to={signed > 0 ? "/dashboard/app" : "/login"} />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'manager/register', element: <RegisterManagerPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    { path: '/user/register', element: <RegisterUserPage /> },
    {
      element: <ProtectedRoutePage Item={SimpleLayout} />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
