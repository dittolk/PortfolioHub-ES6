import HomePage from "./pages/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginUser from "./pages/loginUser";
import Required from "./components/required";
import Dashboard from "./pages/dashboard";
import CreatePortfolio from "./pages/createPortfolio";
import BrowsePortfolio from "./pages/browsePortfolio";
import SeePortfolio from "./pages/seePortfolio";
import RegisterUser from "./pages/registerUser";
import ProfileSettings from "./pages/profileSettings";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setDataUser } from "./redux/userSlice";
import axios from "./api/axios";
import ProfileMain from "./pages/profileMain";
import PortfolioDetail from "./pages/portfolioDetail";

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <HomePage/> },
    { path: "/login-user", element: <LoginUser/> },
    { path: "/register-user", element: <RegisterUser/> },
    { path: "/browse", element: <BrowsePortfolio/> },
    { path: "/p/:username", element: <SeePortfolio/>},
    { path: "/p/:username/:portfolioId", element: <PortfolioDetail/>},
    
    {
      element: <Required />,
      children: [
        { path: '/dashboard', element: <Dashboard/> },
        { path: '/create-portfolio', element: <CreatePortfolio/> },
        { path: '/profile/:userId', element: <ProfileMain/> },
        { path: '/profile-settings', element: <ProfileSettings/> },

      ],
    },
  ]);

  const token = localStorage.getItem('usertoken');
  const dispatch = useDispatch();

  const keepLoginUser = async () => {
    try {
      const response = await axios.get('users/keeplogin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setDataUser(response.data.result));
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-center",
        hideProgressBar: true,
        theme: "colored"
      });
    }
  };

  useEffect(() => {
    if (token) {
      keepLoginUser();
    }
  }, []);
  return (
    
    <div>
      <RouterProvider router={router}>
      </RouterProvider>
    </div>
  );
}

export default App;
