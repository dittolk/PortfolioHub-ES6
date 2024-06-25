import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'

export default function PortfolioSearchDisplay({ portfolioData }) {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/p/${id}`);
    }

    const handleClickTitle = (username, id) => {
        navigate(`/p/${username}/${id}`);
    }

    return (
        <div className='flex flex-col w-full max-w-[72rem] p-3 border-t rounded-xl shadow-md border-gray-200 bg-white justify-between'>
            <div className='flex flex-col'>
                {portfolioData?.rows?.map((item, index) => (
                    <div key={index} className='flex flex-col text-start p-3'>
                        <div className='flex flex-row gap-4 items-center'>
                            <img src={item.mediaUrl ? item.mediaUrl : logo} className="h-[80px] w-[80px] object-cover rounded-lg"></img>
                            <div>
                                <p onClick={() => {handleClickTitle(item?.User?.username, item.id)}} className='leading-relaxed font-bold text-gray-700 text-[15px] md:text-[18px] line-clamp-1 cursor-pointer'>{item?.title}</p>
                                <div className='flex flex-row gap-2'>
                                    <p onClick={() => handleClick(item?.User?.username)} className='leading-relaxed text-indigo-600 text-[14px] md:text-[16px] line-clamp-4 md:line-clamp-1 cursor-pointer'>{item?.User?.name}</p>
                                    <p onClick={() => handleClick(item?.User?.username)} className='leading-relaxed text-gray-700 text-[14px] md:text-[16px] line-clamp-4 md:line-clamp-1 cursor-pointer'>{item?.User?.email}</p>
                                </div>
                                <p className='leading-relaxed text-gray-700 text-[14px] md:text-[16px] line-clamp-4 md:line-clamp-2'>{item?.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </a>
                    <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                            <span className="font-medium">{portfolioData?.count}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <a
                                href="#"
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                            <a
                                href="#"
                                aria-current="page"
                                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                1
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                2
                            </a>
                            <a
                                href="#"
                                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                            >
                                3
                            </a>
                            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                ...
                            </span>
                            <a
                                href="#"
                                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                            >
                                8
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                9
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                10
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}