import useAuth from '@/auth/hooks';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const { signOut, me } = useAuth();

  const handleHomeClick = () => navigate('/');
  const handleProfileImageclick = () => navigate('/mypage');
  const handleProfileClick = () => navigate('/mypage');
  const handleLogOutClick = () => {
    signOut();
    navigate('/');
  };
  const handleLogInClick = () => navigate('/signin');

  return (
    <header className="flex items-center p-4">
      <nav className="h-full w-full border-gray-200 px-4 lg:px-6 py-2.5 justify-between">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex cursor-pointer">
            <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="Logo" />
            <span
              onClick={handleHomeClick}
              className="self-center text-xl font-semibold whitespace-nowrap cursor-pointer"
            >
              한달인턴 온보딩 테스트
            </span>
          </div>

          {me ? (
            <div className="flex items-center lg:order-2 gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover cursor-pointer"
                  // src={user?.avatar ? user.avatar : '/default-profile.jpg'}
                  src="/default-profile.jpg"
                  alt="header-profile-image"
                  onClick={handleProfileImageclick}
                />
              </div>
              <button
                onClick={handleHomeClick}
                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
              >
                Home
              </button>
              <button
                onClick={handleProfileClick}
                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
              >
                My Profile
              </button>
              <button
                onClick={handleLogOutClick}
                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogInClick}
              className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 animate-bounce"
            >
              Log In
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
