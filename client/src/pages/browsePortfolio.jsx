import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useEffect, useState } from 'react';
import { NavbarSimple } from '../components/navbar';
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
} from "@material-tailwind/react";
import PortfolioSearchDisplay from '../components/portfolioSearchDisplay';

const BrowsePortfolio = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');
    const name = queryParams.get('name');
    const navigate = useNavigate();

    const [userData, setUserData] = useState([]);
    const [portfolioData, setPortfolioData] = useState([])
    
    const getUserData = async () => {
        try {
            const response = await axios.get(`users/?page=${page}&search=${name}`);
            setUserData(response.data.result.rows)
        } catch (error) {
            console.log(error);
        }
    }

    const getPortfolioData = async () => {
        try{
            const response = await axios.get(`portfolios/?page=${page}&search=${name}`);
            setPortfolioData(response.data.result)
            console.log(response);
        }catch(error){
            console.log(error);
        }
    }

    const handleClick = (id) => {
        navigate(`/p/${id}`);
    }

    useEffect(() => {
        getUserData();
        getPortfolioData();
    }, [page, name])

    return (
        <div>
            <NavbarSimple />
            <div className='flex flex-col md:flex-row h-screen md:justify-between text-center md:p-5 bg-blue-gray-50'>
                <Card className="w-96">
                    <List>
                        {userData?.map((item, index) => (
                            <ListItem key={index} onClick={() => handleClick(item.id)}>
                                <ListItemPrefix>
                                    <Avatar variant="circular" alt="candice" src="https://docs.material-tailwind.com/img/face-1.jpg" />
                                </ListItemPrefix>
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="small" color="gray" className="font-normal">
                                        {item.email}
                                    </Typography>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </Card>
                <PortfolioSearchDisplay portfolioData={portfolioData}/>
            </div>
        </div>
    );
}

export default BrowsePortfolio;