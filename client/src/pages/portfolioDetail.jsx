import { useNavigate, useParams } from "react-router-dom";
import { NavbarSimple } from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function PortfolioDetail() {
    const { portfolioId } = useParams();
    const [portfolioData, setPortfolioData] = useState();
    const [projects, setProjects] = useState();
    const navigate = useNavigate();

    const handleClick = (username) => {
        navigate(`/p/${username}`);
    }

    console.log(projects);

    const getPortfolioDetail = async () => {
        try {
            const response = await axios.get(`portfolios/${portfolioId}`)
            setPortfolioData(response.data.result)
            if (response.data.result.Projects) {
                setProjects(response.data.result.Projects)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPortfolioDetail();
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <NavbarSimple />
            <img
                className="h-full md:h-[30rem] w-full object-cover object-center"
                src={portfolioData?.mediaUrl}
                alt="nature image"
            />
            <div className="flex flex-col md:p-3">
                <div className="flex flex-col p-5">
                    <div className="flex flex-col mb-2">
                        <p className="leading-relaxed font-bold">{portfolioData?.title}</p>
                        <p onClick={() => { handleClick(portfolioData?.User?.username) }} className="leading-relaxed cursor-pointer">by {portfolioData?.User?.name} | {portfolioData?.User?.email}</p>
                    </div>
                    <p className="leading-relaxed text-gray-900">{portfolioData?.description}</p>
                </div>
                {projects &&
                    <div className="flex flex-col p-5 -mt-8">
                        {projects?.map((item, index) => (
                            <div key={index} className="flex flex-col">
                                <div className="flex flex-row gap-2">
                                    <p className="font-bold">{item.title}</p>
                                </div>
                                {item.ProjectImages.length > 0 &&
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-2 mb-2 p-3 md:p-5 bg-blue-gray-50 rounded-lg" key={index}>
                                        {item.ProjectImages.map((image, index) => (
                                            <div className="grid gap-4">
                                                <div>
                                                    <img
                                                        className="h-auto max-w-full rounded-lg object-cover object-center transition duration-300 transform hover:scale-105"
                                                        src={image.mediaUrl}
                                                        alt="gallery-photo"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }
                                <p className="leading-relaxed text-gray-900">{item.description}</p>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}