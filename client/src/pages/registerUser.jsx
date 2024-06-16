import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "../api/axios";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { SyncLoader } from 'react-spinners';
import { NavbarSimple } from "../components/navbar";
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterUser() {
    const [isLoading, setIsLoading] = useState(false);

    const RegisterSchema = Yup.object({
        name: Yup.string()
            .required("Name is required"),
        username: Yup.string()
            .required("Username is required"),
        email: Yup.string()
            .required("Email is required")
            .email("Invalid email format"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Minimum 6 characters"),
    });
    const handleSubmit = async (data) => {
        try {
            console.log(data);
            setIsLoading(true)
            const response = await axios.post("users/", data);
            setIsLoading(false)
            toast.success(response.data.message, {
                position: "top-center",
                hideProgressBar: true,
                theme: "colored"
            });
        } catch (err) {
            setIsLoading(false)
            toast.error(err.response.data.message, {
                position: "top-center",
                hideProgressBar: true,
                theme: "colored"
            });
        }
    };
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            username: "",
            password: "",
        },
        validationSchema: RegisterSchema,
        onSubmit: (values, action) => {
            handleSubmit(values);
            action.resetForm();
        },
    });
    return (
        <div className="flex flex-col">
            <NavbarSimple />
            <div className="h-screen flex items-center justify-center p-9 bg-blue-gray-50">
                <div className="grid grid-cols-1 gap-20 items-center -mt-20">
                    <Card color="white" shadow={true} className="p-9">
                        <Typography variant="h4" color="blue-gray">
                            Sign Up
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Enter your details to join PorfolioHub.
                        </Typography>
                        <form onSubmit={formik.handleSubmit} className="mt-8 mb-2 max-w-screen-lg sm:w-96">
                            <div className="mb-1 flex flex-col gap-4">
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Name
                                </Typography>
                                <Input
                                    name="name"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    size="lg"
                                    placeholder="Type your name"
                                    autoComplete="off"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className=" text-red-900 text-xs">
                                        {formik.errors.name}
                                    </div>
                                ) : null}

                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Username
                                </Typography>
                                <Input
                                    name="username"
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    size="lg"
                                    placeholder="Type your username"
                                    autoComplete="off"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                />
                                {formik.touched.username && formik.errors.username ? (
                                    <div className=" text-red-900 text-xs">
                                        {formik.errors.username}
                                    </div>
                                ) : null}

                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Email
                                </Typography>
                                <Input
                                    name="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    size="lg"
                                    placeholder="Type your email"
                                    autoComplete="off"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className=" text-red-900 text-xs">
                                        {formik.errors.email}
                                    </div>
                                ) : null}

                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Password
                                </Typography>
                                <Input
                                    type="password"
                                    size="lg"
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    placeholder="********"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className=" text-red-900 text-xs">
                                        {formik.errors.password}
                                    </div>
                                ) : null}
                            </div>
                            <Button disabled={isLoading} type="submit" variant="outlined" className="mt-6" fullWidth>
                                {isLoading ? <div className="flex justify-center items-center">
                                    <SyncLoader color="#c0cac2" size={9} /></div> : <>Sign up</>}
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    )
}