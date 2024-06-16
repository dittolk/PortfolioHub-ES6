import { Button, Typography } from "@material-tailwind/react";
import { NavbarSimple } from "../components/navbar";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    return (
        <>
            <NavbarSimple />
            <div className="relative h-screen">
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <Typography variant="h1" className="z-10 text-blue-gray-900">
                        Welcome to PortfolioHub!
                    </Typography>
                    <Typography variant="h4" className="z-10 text-blue-gray-900 mt-7">
                        Create and share your portfolios
                    </Typography>
                    <Button variant="outlined" className="z-10 mt-7" onClick={()=>{navigate('/create-portfolio')}}>
                        Create portfolio
                    </Button>
                    <img
                        src="https://images.unsplash.com/photo-1664706599545-41abae195a57?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                </div>
            </div>
        </>
    )
}