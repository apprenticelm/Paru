import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../../../hooks/useAuth';
import { Divider, Input } from 'antd';
import useDebounce from '../../../../hooks/debounce';
const { Search } = Input;

const Navbar = () => {
  const { user, logout } = useAuth();

  const [searchString, setSearchString] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const debouncedSearchTerm = useDebounce(searchString, 800);

  const handleSearch = (e) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      navigate(`/search-event?search=${debouncedSearchTerm}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <div className="main-container">
      <div className="container">
        <div className="w-full h-[70px] bg-white sticky top-0 flex items-center justify-between px-[45px] z-10 nav-bar-padding">
          <Link to="/">
            <img
              className="w-[350px] nav-logo h-[200px] object-contain"
              src="/images/paru-logo.png"
              alt="NisLogo"
            />
          </Link>
          {/* {!location?.pathname?.includes('search-event') && (
            <div className="custom-search-in-nav">
              <Search
                onChange={handleSearch}
                placeholder="What are you interested in?"
                onSearch={handleSearch}
                allowClear
                style={{
                  width: '100%',
                }}
              />
            </div>
          )} */}
          <div className=" text-[14px] gap-5 flex items-center justify-center ">
            {/* <button className="hideInSmall search-login-button border-none flex items-center gap-1  px-6 py-2 rounded cursor-pointer hover:bg-[rgb(248,248,250)] duration-300 min-w-[200px]">
              <AiOutlineSearch className=" text-[19px] font-[600]" />{' '}
              <span>Search</span>
            </button> */}
            {user && (
              <Link
                className="no-underline"
                to={
                  user?.user?.role === 'user'
                    ? '/dashboard'
                    : '/admin-dashboard'
                }
              >
                <button className=" button-color border-none  text-white h-[40px] bg-[#165887] flex items-center gap-2  px-6 py-2 rounded cursor-pointer hover:bg-[rgb(68,95,216)] duration-300">
                  <span>Dashboard</span>
                </button>
              </Link>
            )}
            {user ? (
              <button
                onClick={() => {
                  logout();
                }}
                className="  border-none  text-white h-[40px] bg-[#165887] flex items-center gap-2  px-6 py-2 rounded cursor-pointer hover:bg-[rgb(68,95,216)] duration-300"
              >
                <span>Log out</span>
              </button>
            ) : (
              <div className="flex h-full items-center">
                <Link
                  to="/search-event"
                  className="no-underline text-black font-bold"
                >
                  {/* <img
                    scr="/images/global-search.png"
                    alt=""
                    height={20}
                    width={30}
                    className="object-contain"
                  /> */}
                  Browse workshop
                  </Link>
                  <Link className="no-underline ml-6" to="/login">
                    <button className=" button-color border-none  text-white h-[40px] bg-[#165887] flex items-center gap-2  px-4 py-2 rounded cursor-pointer hover:bg-[rgb(68,95,216)] duration-300">
                      <span>Log in</span>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* {!location?.pathname?.includes('search-event') && (
          <div className="custom-search-under-nav">
            <Divider />
            <div className="p-20 pt-0 pb-4">
              <Search
                onChange={handleSearch}
                placeholder="What are you interested in?"
                allowClear
                style={{
                  width: '100%',
                }}
              />
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
