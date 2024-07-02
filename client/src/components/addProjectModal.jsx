import React, { useState } from "react";
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
} from "@material-tailwind/react";
import { PhotoIcon } from '@heroicons/react/24/solid'
import * as Yup from "yup";
import { useFormik } from "formik";

export function AddProjectModal({ open, handleOpen, onSave }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);

    const handleCancle = () => {
        formik.resetForm();
        setTitle('');
        setDescription('');
        setImages([]);
        handleOpen();
    }

    const handleFileChange = (event) => {
        if (event.target.files.length + images.length > 4) {
            alert("You can only upload a maximum of 4 images.");
            return;
        }
        setImages([...images, ...Array.from(event.target.files)]);
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Please provide a title."),
            description: Yup.string().required("Description can't be empty."),
        }),
        onSubmit: (values) => {
            const newProject = { ...values, images };
            onSave(newProject);
            formik.resetForm();
            setImages([]);
            handleOpen();
        },
    });

    return (
        <>
            <Dialog
                size="sm"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <form onSubmit={formik.handleSubmit}>
                        <CardBody className="flex flex-col gap-4 max-h-[80vh] overflow-auto">
                            <Typography variant="h4" color="blue-gray">
                                Add Project
                            </Typography>
                            <Typography
                                className="mb-3 font-normal"
                                variant="paragraph"
                                color="gray"
                            >
                                Enter your project details.
                            </Typography>
                            <Typography className="-mb-2" variant="h6">
                                Project title
                            </Typography>
                            <Input 
                                label="Title" 
                                size="lg" 
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                            />
                            {formik.touched.title && formik.errors.title ? (
                                <div className=" text-red-900 text-xs mt-2">
                                    {formik.errors.title}
                                </div>
                            ) : null}
                            <Typography className="-mb-2" variant="h6">
                                Project description
                            </Typography>
                            <Input 
                                label="Description" 
                                size="lg" 
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                            />
                            {formik.touched.description && formik.errors.description ? (
                                <div className=" text-red-900 text-xs mt-2">
                                    {formik.errors.description}
                                </div>
                            ) : null}
                            <Typography className="-mb-2" variant="h6">
                                Project images
                            </Typography>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        {/* {selectedFile && <img src={selectedFile ? URL.createObjectURL(selectedFile) : ''} className="w-32 h-32 rounded-lg object-cover"></img>} */}
                                        <label
                                            htmlFor="project-images-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a picture</span>
                                            <input id="project-images-upload" name="image_cover" type="file" className="sr-only" onChange={handleFileChange} multiple />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    <p className="text-xs leading-5 text-gray-600">Maximum is 4 pictures.</p>
                                    {images.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {images.map((image, index) => (
                                                <div key={index} className="relative justify-center">
                                                    <img src={URL.createObjectURL(image)} alt={`preview-${index}`} className="w-24 h-24 rounded-lg object-cover" />
                                                    <button type="button" onClick={() => handleRemoveImage(index)} className="absolute right-[-0.3rem] bottom-[-0.5rem] bg-[#F44336] text-white text-[14.5px] py-1 px-2 rounded-lg shadow-md cursor-pointer hover:bg-red-600">Delete</button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <div className="flex flex-row justify-center gap-2">
                                <Button type="button" variant="text" onClick={handleCancle} fullWidth>
                                    Cancel
                                </Button>
                                <Button variant="gradient" type="submit" fullWidth>
                                    Save
                                </Button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
        </>
    );
}