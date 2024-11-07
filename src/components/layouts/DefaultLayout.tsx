import { Outlet } from 'react-router-dom';
import { Header } from '../header';

function DefaultLayout() {
  return (
    <section className="flex flex-col min-h-dvh">
      <Header />
      <main
        id="default-layout"
        className="h-full grid place-items-center max-w-screen-lg mx-auto my-0 place-content-center flex-1"
      >
        <Outlet />
      </main>
    </section>
  );
}

export default DefaultLayout;
