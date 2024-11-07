import DefaultLayout from '@/components/layouts/DefaultLayout';
import { MainPage, MyPage, SignInPage, SignUpPage } from '@/pages';
import ErrorPage from '@/pages/Error.page';
import { ProtectedRoute } from '@/routes';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      element: <DefaultLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/signin',
          element: <SignInPage />,
        },
        {
          path: '/signup',
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
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

export default router;