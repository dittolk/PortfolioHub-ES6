import { PaperClipIcon } from '@heroicons/react/20/solid'
import { NavbarSimple } from '../components/navbar'
import { useSelector } from 'react-redux';
import { Button } from '@material-tailwind/react';

export default function ProfileSettings() {
    const user = useSelector((state) => state.user.value);

    return (
        <div>
            <NavbarSimple />
            <div className='p-10 md:p-20 bg-blue-gray-50 min-h-screen'>
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Profile</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and settings.</p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <div className='flex flex-row gap-1 justify-between'>
                                    {user.name}
                                    <Button color='purple' variant='text' size='sm'>Update</Button>
                                </div>
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Username</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <div className='flex flex-row gap-1 justify-between'>
                                    {user.username}
                                    <Button color='purple' variant='text' size='sm'>Update</Button>
                                </div>
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <div className='flex flex-row gap-1 justify-between'>
                                    {user.email}
                                    <Button color='purple' variant='text' size='sm'>Update</Button>
                                </div>
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Password</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <div className='flex flex-row gap-1 justify-between'>
                                    * * * * * *
                                    <Button color='purple' variant='text' size='sm'>Update</Button>
                                </div>
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Bio</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {user.bio}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                                                <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Download
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                                                <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Download
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}