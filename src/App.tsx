import { QueryProvider } from '@/providers';
import { router } from '@/routes';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default App;
