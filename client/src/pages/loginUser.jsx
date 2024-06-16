import {
    Card,
    Input,
    Checkbox,
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
import { useDispatch } from "react-redux";
import { setDataUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export default function LoginUser() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    }

    const LoginSchema = Yup.object({
        username: Yup.string()
            .required("Username or Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(3, "Minimum 3 characters"),
    });

    const response_process = (response) => {
        console.log("ini response", response);
        if (response.data.token) {
            dispatch(setDataUser(response.data.result));
            localStorage.setItem("usertoken", response.data.token);
            toast.success(response.data.message, {
                position: "top-center",
                hideProgressBar: true,
                theme: "colored"
            });
            navigate('/dashboard')
        }
    }

    const handleSubmit = async (data) => {
        try {
            // data.rememberMe = rememberMe;
            if (/^\S+@\S+\.\S+$/.test(data.username)) {
                data.email = data.username;
                delete data.username;
                setIsLoading(true)
                const response = await axios.post(`users/login`, data)
                setIsLoading(false)
                response_process(response)
            } else {
                setIsLoading(true)
                const response = await axios.post(`users/login`, data)
                setIsLoading(false)
                response_process(response)
            }
        } catch (error) {
            setIsLoading(false)
            toast.error(error.response.data.message, {
                position: "top-center",
                hideProgressBar: true,
                theme: "colored"
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: LoginSchema,
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
                            Sign In
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Enter your details to sign in.
                        </Typography>
                        <form onSubmit={formik.handleSubmit} className="mt-8 mb-2 max-w-screen-lg sm:w-96">
                            <div className="mb-1 flex flex-col gap-6">
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Email or Username
                                </Typography>
                                <Input
                                    name="username"
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    size="lg"
                                    placeholder="Type your email or username"
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
                            <div className="flex flex-row items-center justify-between gap-2">
                                <Checkbox
                                    label={
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="flex items-center font-normal"
                                        >
                                            Remember Me
                                        </Typography>
                                    }
                                    containerProps={{ className: "-ml-2.5" }}
                                    onClick={handleRememberMe}
                                />
                                {/* <div onClick={handleOpen} className="text-sm md:text-[15px] cursor-pointer">Forgot Password</div> */}
                            </div>
                            <Button disabled={isLoading} type="submit" variant="outlined" className="mt-6" fullWidth>
                                {isLoading ? <div className="flex justify-center items-center">
                                    <SyncLoader color="#c0cac2" size={9} /></div> : <>Log In</>}
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    )
}