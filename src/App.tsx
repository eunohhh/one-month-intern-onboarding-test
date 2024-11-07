import { QueryProvider } from '@/providers';
import { router } from '@/routes';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <QueryProvider>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </QueryProvider>
  );
}

export default App;
