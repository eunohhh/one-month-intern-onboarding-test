import { Outlet } from 'react-router-dom';
import { Header } from '../header';

function DefaultLayout() {
  return (
    <>
      <Header />
      <main
        id="default-layout"
        className="h-full grid place-items-center max-w-screen-lg mx-auto my-0 place-content-center"
      >
        <Outlet />
      </main>
    </>
  );
}

export default DefaultLayout;
