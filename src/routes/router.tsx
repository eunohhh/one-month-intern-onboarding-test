import DefaultLayout from '@/components/layouts/DefaultLayout';
import { MainPage, MyPage, SignInPage, SignUpPage } from '@/pages';
import { ProtectedRoute } from '@/routes';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/mypage',
            element: <MyPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
