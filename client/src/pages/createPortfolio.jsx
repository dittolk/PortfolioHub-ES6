import { useState } from "react";
import { NavbarSimple } from "../components/navbar"
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../api/axios";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { AddProjectModal } from "../components/addProjectModal";
import ProjectList from "../components/projectList";

export default function CreatePortfolio() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.user.value);
    const token = localStorage.getItem('usertoken')
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [projects, setProjects] = useState([])

    const addProject = (project) => {
        const newProject = { ...project, position: projects.length };
        setProjects([...projects, newProject]);
        // setOpen(false);
        handleOpen();
    };

    const removeProject = (index) => {
        const updatedProjects = projects.filter((_, i) => i !== index);
        setProjects(updatedProjects.map((project, i) => ({ ...project, position: i })));
    };

    const moveProjectUp = (index) => {
        if (index === 0) return;
        const updatedProjects = [...projects];
        [updatedProjects[index - 1], updatedProjects[index]] = [updatedProjects[index], updatedProjects[index - 1]];
        setProjects(updatedProjects.map((project, i) => ({ ...project, position: i })));
    };

    const moveProjectDown = (index) => {
        if (index === projects.length - 1) return;
        const updatedProjects = [...projects];
        [updatedProjects[index + 1], updatedProjects[index]] = [updatedProjects[index], updatedProjects[index + 1]];
        setProjects(updatedProjects.map((project, i) => ({ ...project, position: i })));
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleCreateProjects = async (portfolioId, portfolioTitle) => {
        try {
            for (const project of projects) {
                const projectFormData = new FormData();
                projectFormData.append("title", project.title);
                projectFormData.append("portfolioTitle", portfolioTitle)
                projectFormData.append("description", project.description);
                projectFormData.append("position", project.position);
                project.images.forEach((image) => {
                    projectFormData.append("project_photos", image);
                });
                await axios.post(`portfolios/${portfolioId}/projects/`, projectFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        } catch (err) {
            console.log(err);
            toast.error('Error creating projects', { position: "top-center", hideProgressBar: true, theme: "colored" });
        }
    };

    const handleSubmit = async (data) => {
        try {
            setIsLoading(true)
            const response = await axios.post("portfolios/", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            await handleCreateProjects(response.data.result.id, response.data.result.title)
            setIsLoading(false)
            toast.success(response.data.message, {
                position: "top-center",
                hideProgressBar: true,
                theme: "colored"
            });
            setSelectedFile(null)
        } catch (err) {
            setIsLoading(false)
            console.log(err);
            toast.error(err, { position: "top-center", hideProgressBar: true, theme: "colored" });
        }
    };

    const CreateSchema = Yup.object({
        title: Yup.string().required("Please provide a title."),
        description: Yup.string().required("Description can't be empty."),
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            description: ""
        },
        validationSchema: CreateSchema,
        onSubmit: (values, action) => {
            const formData = new FormData();
            formData.append("title", values.title)
            formData.append("description", values.description);
            formData.append("image_cover", selectedFile)
            formData.append("user_id", user.id)
            if (selectedFile === null) {
                toast.error('Cover picture is required', { position: "top-center", hideProgressBar: true, theme: "colored" });
            } else {
                handleSubmit(formData);
            }
            action.resetForm();
        },
    });


    return (
        <div className="flex flex-col">
            <NavbarSimple />
            <form className="p-10 md:p-16" onSubmit={formik.handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Portfolio</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            onChange={formik.handleChange}
                                            value={formik.values.title}
                                            error={formik.touched.title && Boolean(formik.errors.title)}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                        {formik.touched.title && formik.errors.title ? (
                                            <div className=" text-red-900 text-xs mt-2">
                                                {formik.errors.title}
                                            </div>
                                        ) : null}
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        className="block w-full h-[10rem] md:h-[18rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                    {formik.touched.description && formik.errors.description ? (
                                        <div className=" text-red-900 text-xs mt-2">
                                            {formik.errors.description}
                                        </div>
                                    ) : null}
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your portfolio.</p>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Cover photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            {selectedFile && <img src={selectedFile ? URL.createObjectURL(selectedFile) : ''} className="w-32 h-32 rounded-lg object-cover"></img>}
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a picture</span>
                                                <input id="file-upload" name="image_cover" type="file" className="sr-only" onChange={handleFileChange} />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <Button onClick={handleOpen} size="sm" variant="outlined" className="flex items-center gap-3">
                                    Add Project
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </Button>
                            </div>
                            <div className="sm:col-span-4">
                                {projects.length > 0 &&
                                    <label htmlFor="projects" className="block text-sm font-medium leading-6 text-gray-900">
                                        Projects
                                    </label>
                                }
                                <ProjectList projects={projects} removeProject={removeProject} moveProjectUp={moveProjectUp} moveProjectDown={moveProjectDown} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sticky bottom-0 bg-white py-4 flex items-center justify-end gap-x-6 border-t border-gray-200">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
            <AddProjectModal open={open} handleOpen={() => setOpen(!open)} onSave={addProject} />
        </div>
    )
}