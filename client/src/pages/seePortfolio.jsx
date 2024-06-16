import { useParams } from "react-router-dom"
import axios from "../api/axios"
import { useEffect, useState } from "react";
import { NavbarSimple } from "../components/navbar";
import { PortfolioCard } from "../components/portfolioCard";
import { ProfileCard } from "../components/profileCard";

export default function SeePortfolio() {

    const [portfolioData, setPortfolioData] = useState();

    const { userId } = useParams();
    const [profile, setProfile] = useState([])

    const getPortfolios = async () => {
        try {
            const response = await axios.get(`portfolios/${userId}/portfolios/?page=1`)
            const response_profile = await axios.get(`users/${userId}`)
            setPortfolioData(response.data.result.rows);
            setProfile(response_profile.data.result)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPortfolios();
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <NavbarSimple />
            <div className="flex flex-col md:p-5 md:flex-row justify-between bg-blue-gray-50 flex-grow">
                <ProfileCard profile={profile}/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-9 items-center text-center text-white">
                    {portfolioData?.map((item, index) => (
                        <PortfolioCard
                            key={index}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
