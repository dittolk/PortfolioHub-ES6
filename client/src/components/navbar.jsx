import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import searchIcon from '../assets/navbar/search.svg';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function NavList() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState([]);
  const usertoken = localStorage.getItem("usertoken");

  const handleLoginButton = () => {
    navigate('/login-user')
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigate(`/browse?page=1&name=${searchValue}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('usertoken');
    window.location.reload();
  }

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {/* Search Bar */}
      <div className="flex grow ml-3 rounded-md md:ml-0 px-0 md:pl-1 md:pr-3 lg:pl-2">
        <label htmlFor="table-search" className="sr-only">
          Search users
        </label>
        <div className="relative w-full">
          <div
            onClick={() => navigate(`/browse?page=1&name=${searchValue}`)}
            className="absolute inset-y-0 left-0 flex cursor-pointer items-center pl-3"
          >
            <img src={searchIcon}></img>
          </div>
          <input
            type="text"
            id="table-search"
            className="block w-full rounded-full border border-[#F6F7F8] bg-[#F6F7F8] p-2.5 pl-10 text-sm text-gray-900 transition-colors  duration-300 focus:border-blue-500 focus:outline-none focus:ring-blue-500 "
            placeholder="Search here..."
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
      <Button variant="outlined" size="sm" onClick={() => navigate('/create-portfolio')}>
        Create Portfolio
      </Button>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
          About Us
        </a>
      </Typography>
      {usertoken ?
        <div className="gap-2 lg:flex">
          <Button onClick={() => navigate('/profile-settings')} variant="outlined" size="sm">
            Profile
          </Button>
          <Button onClick={handleLogout} variant="outlined" size="sm">
            Logout
          </Button>
        </div>
        :
        <>
          <Button variant="text" size="sm" color="blue-gray" onClick={handleLoginButton}>
            Log In
          </Button>
          <Button onClick={() => { navigate('/register-user') }} variant="outlined" size="sm">
            Sign up
          </Button>
        </>}
    </ul>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const usertoken = localStorage.getItem("usertoken");

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto w-full px-6 py-3 rounded-none shadow-none">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
          onClick={() => { usertoken ? navigate('/dashboard') : navigate('/')}}
        >
          PortfolioHub
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}