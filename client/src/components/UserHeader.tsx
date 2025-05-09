import { useLocation, useNavigate } from 'react-router-dom';
import User from '../types/User';
import { FaChevronLeft } from 'react-icons/fa';
import { NO_USER } from '../const';

type Props = {
  isBanned: boolean;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isQROpened: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserHeader = (props: Props) => {
  const navigate = useNavigate();
  const loc = useLocation();

  const onLogoutClick = () => {
    if (!props.isQROpened) {
      if (!window.confirm('ログアウトしてもよろしいですか?')) {
        return;
      }

      props.setUser(NO_USER);
      localStorage.removeItem('token');
      navigate('/');
      location.reload();
    }
  };

  return (
    <>
      {loc.pathname === '/reader' || loc.pathname === '/reader-admin' ? (
        <></>
      ) : (
        <>
          {loc.pathname === '/' ? (
            <></>
          ) : (
            <div
              className="fixed block left-0 m-[5px] top-[5px] p-[8px] rounded-[20px] cursor-pointer hover:bg-[#f9f9fa] bg-white"
              onClick={() => navigate('/')}>
              <FaChevronLeft size={'30px'} />
            </div>
          )}
          <div className={props.isQROpened ? 'blur-sm transition-[.1s]' : ''}>
            <div className="bg-white flex flex-row p-[10px] items-center justify-center x-50">
              {props.isBanned ? (
                <></>
              ) : (
                <button
                  className="bg-[#219bce] rounded-[20px] px-[15px] py-[10px] text-white cursor-pointer hover:bg-[#008fc0] anim"
                  onClick={() => {
                    if (!props.isQROpened) {
                      props.setIsMenuOpen(!props.isMenuOpen);
                    }
                  }}>
                  {'メニュー'}
                </button>
              )}
              {/* <h1 className="p-[10px] cursor-default">{'BUTSURY DAYS'}</h1> */}
              <img
                src="/logo.png"
                alt="LOGO"
                className="w-[100px] cursor-pointer"
                onClick={() => {
                  if (!props.isQROpened) {
                    navigate('/');
                  }
                }}
              />
              {
                <button
                  className="bg-[#219bce] rounded-[20px] px-[15px] py-[10px] text-white cursor-pointer hover:bg-[#008fc0] anim"
                  onClick={onLogoutClick}>
                  {'ログアウト'}
                </button>
              }
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserHeader;
