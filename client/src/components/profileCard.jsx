import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Button,
} from "@material-tailwind/react";
import ppnull from '../assets/ppnull.jpg'

export function ProfileCard({ profile }) {
    return (
        <Card className="w-full md:max-w-[18rem]">
            <CardHeader floated={false} className="h-30">
                <img src={ppnull} alt="profile-picture" />
            </CardHeader>
            <CardBody className="text-center">
                <div className="flex flex-col leading-relaxed gap-1">
                    <p className='leading-relaxed text-gray-700 text-[14px] md:text-[22px] line-clamp-6 font-bold'>{profile?.name}</p>
                    <p className='leading-relaxed text-gray-700 text-[14px] md:text-[16px] line-clamp-6'>{profile?.email}</p>
                    <p className='leading-relaxed text-gray-700 text-[14px] md:text-[16px] line-clamp-6 text-start'>{profile?.bio}</p>
                    <Button variant="text" size="sm">See full profile</Button>
                </div>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
                <Tooltip content="Like">
                    <Typography
                        as="a"
                        href="#facebook"
                        variant="lead"
                        color="blue"
                        textGradient
                    >
                        <i className="fab fa-facebook" />
                    </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                    <Typography
                        as="a"
                        href="#twitter"
                        variant="lead"
                        color="light-blue"
                        textGradient
                    >
                        <i className="fab fa-twitter" />
                    </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                    <Typography
                        as="a"
                        href="#instagram"
                        variant="lead"
                        color="purple"
                        textGradient
                    >
                        <i className="fab fa-instagram" />
                    </Typography>
                </Tooltip>
            </CardFooter>
        </Card>
    );
}