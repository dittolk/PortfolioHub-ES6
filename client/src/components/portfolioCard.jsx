import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";

export function PortfolioCard({ title, description, cover }) {
    return (
        <Card className="w-full max-w-[46rem] h-full max-h-[14rem] transition duration-300 transform hover:scale-105 flex-row cursor-pointer" onClick={() => {}}>
            <CardHeader
                shadow={false}
                floated={false}
                className="m-0 w-2/5 shrink-0 rounded-r-none"
            >
                <img
                    src={cover}
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody>
                <p className='leading-relaxed text-gray-700 text-[14px] md:text-[21px] line-clamp-2 text-start'>{title}</p>
                <p className='leading-relaxed text-gray-700 text-[14px] md:text-[16px] line-clamp-4 text-start'>{description}</p>
                
                {/* <a href="#" className="inline-block">
            <Button variant="text" className="flex items-center gap-2">
              See More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a> */}
            </CardBody>
        </Card>
    );
}