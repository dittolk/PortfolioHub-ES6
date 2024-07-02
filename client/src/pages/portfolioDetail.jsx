import { useNavigate, useParams } from "react-router-dom";
import { NavbarSimple } from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { ImagePreview } from "../components/imagePreview";
import '../styles/styles.css';


export default function PortfolioDetail() {
    const { portfolioId } = useParams();
    const [portfolioData, setPortfolioData] = useState();
    const [projects, setProjects] = useState();
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const handleClick = (username) => {
        navigate(`/p/${username}`);
    }

    const handleOpen = (imageUrl) => {
        setSelectedImage(imageUrl);
        setOpen(!open);
    };

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

    const renderTextWithHTML = (text) => {
        const paragraphs = text.split('\n').filter(paragraph => paragraph.trim() !== '');
        return paragraphs.map(paragraph => `<p class="custom-paragraph">${paragraph}</p>`).join('');
    };

    useEffect(() => {
        getPortfolioDetail();
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <NavbarSimple />
            <div className="flex flex-col md:mt-6">
                <div className="flex justify-center w-full md:p-5">
                    <img
                        className="h-full md:h-[32rem] w-full md:max-w-[80rem] object-cover object-center md:rounded-lg cursor-zoom-in"
                        src={portfolioData?.mediaUrl}
                        alt="cover image"
                        onClick={() => handleOpen(portfolioData?.mediaUrl)}
                    />
                </div>
                <div className="flex flex-col md:p-20 md:pt-4">
                    <div className="flex flex-col p-5">
                        <div className="flex flex-col mb-2">
                            <p className="leading-relaxed font-bold">{portfolioData?.title}</p>
                            <p onClick={() => { handleClick(portfolioData?.User?.username) }} className="leading-relaxed cursor-pointer">by {portfolioData?.User?.name} | {portfolioData?.User?.email}</p>
                        </div>
                        <div
                            className="leading-relaxed text-gray-900"
                            dangerouslySetInnerHTML={{ __html: renderTextWithHTML(portfolioData?.description || '') }}
                        />
                        {/* <p className="leading-relaxed text-gray-900">{portfolioData?.description}</p> */}
                    </div>
                    {projects &&
                        <div className="flex flex-col p-5 gap-4 pt-0">
                            {projects?.map((item, index) => (
                                <div key={index} className="flex flex-col">
                                    <div className="flex flex-row gap-2 mb-3">
                                        <p className="font-bold">{item.title}</p>
                                    </div>
                                    {item.ProjectImages.length > 0 &&
                                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-2 mb-2 p-3 md:p-5 bg-blue-gray-50 rounded-lg" key={index}>
                                            {item.ProjectImages.map((image, index) => (
                                                <div className="grid gap-4">
                                                    <div>
                                                        <img
                                                            className="h-auto max-w-full rounded-lg object-cover object-center transition duration-300 transform hover:scale-105 cursor-pointer"
                                                            src={image.mediaUrl}
                                                            alt="gallery-photo"
                                                            onClick={() => handleOpen(image.mediaUrl)}
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
            <ImagePreview open={open} handleOpen={() => setOpen(!open)} imageUrl={selectedImage} />
        </div>
    )
}