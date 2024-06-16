import { Navigate, Outlet } from "react-router-dom";

function Required() {
    const token = localStorage.getItem("usertoken");
    return (
        <>
            {
                token ? <Outlet></Outlet> : <Navigate to='/login-user' />
            }
        </>
    )
}

export default Required;