import { useEffect } from 'react';
import { Link, useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <section className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">웁스! 문제가 발생했습니다.</h1>
      <Link to="/" className="text-blue-500">
        홈으로 돌아가기
      </Link>
    </section>
  );
}

export default ErrorPage;
