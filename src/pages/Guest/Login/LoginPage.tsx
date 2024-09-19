import React, { SyntheticEvent, useEffect, useState } from 'react'
import { FaUser, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { DefaultHeader } from '../../../components';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGetToken } from '../../../hooks/useGetToken';
import { useAuthContext } from '../../../contexts';


const LoginPage = () => {
    const access_token = useGetToken();
    const authContext = useAuthContext();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [_, setCookies] = useCookies(['access_token']);
    const handleTogglePassword = () => setShowPassword(!showPassword);
    const navigate = useNavigate();

    const loginWithGoogle = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            await axios.post<any>("http://localhost:3000/api/auth/google", {})
                .then((res) => {
                    console.log(res.data);
                    window.location.href = res.data.url;
                })
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            await axios.post<any>("http://localhost:3000/api/auth/login", {
                email, password
            }).then((res) => {
                setCookies("access_token", res.data.accessToken);
                authContext.login({
                    email: res.data.email,
                    role: res.data.role,
                    avatar: res.data.avatar
                });
                navigate("/", { replace: true });
            })
        } catch (error) {
            console.log(error)
        }
    }

    // const checkAuthorization = async () => {
    //     try {
    //         console.log(access_token);
    //         if (access_token) {
    //             navigate("/home");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     checkAuthorization();
    // });
    return (
        <>
            <DefaultHeader />
            <div className='min-h-screen bg-slate-100 flex flex-col justify-center items-center'>
                <div className='px-20 py-12 min-w-[40%] bg-white flex flex-col items-center justify-center'>
                    <h2 className='text-2xl font-semibold'>
                        Login to your account
                    </h2>

                    <div className='mt-2 flex justify-center items-center gap-8'>
                        <p className='font-semibold'>Or login with:</p>

                        <button className='flex items-center justify-center rounded-full bg-orange-700 text-white h-7 w-7 cursor-pointer'
                            onClick={loginWithGoogle}>
                            <FaGoogle />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className='mt-6 space-y-4 w-full'>
                        <div>
                            <label htmlFor="email" className='text-xs text-gray-600'>Email</label>
                            <div className='flex items-center relative'>
                                <input type="text" placeholder='Enter your username' id="email" name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full mt-1 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 px-2 py-1 text-gray-400' required />
                                <FaUser className='absolute right-2' />

                            </div>
                        </div>


                        <div>
                            <label htmlFor="password" className='text-xs text-gray-600'>Password</label>
                            <div className='flex items-center relative'>
                                <input type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Enter your password' id="password" name="password"
                                    className='w-full mt-1 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 px-2 py-1 text-gray-400' required />
                                {
                                    showPassword
                                        ? <FaEye className='absolute right-2 cursor-pointer' onClick={handleTogglePassword} />
                                        : <FaEyeSlash className='absolute right-2 cursor-pointer' onClick={handleTogglePassword} />
                                }
                            </div>
                        </div>

                        <div className='flex items-center justify-between py-2'>
                            <div className='flex items-center justify-center'>
                                <input className='w-4 h-4 border-gray-400' type="checkbox" />
                                <label htmlFor="remember-me" className='text-xs ml-3 text-gray-600'>Remember me?</label>
                            </div>

                            <a href="#" className='font-semibold text-xs text-gray-500 hover:underline'>
                                Forgot your password?
                            </a>
                        </div>

                        <button className='text-white bg-gray-800 font-medium text-sm px-5 py-2 rounded-lg hover:bg-gray-600 w-full'>
                            Log in
                        </button>

                        <p className='text-gray-800 text-sm text-center'>
                            Do not have an account?
                            <a className='ml-2 font-semibold hover:underline' href="./signup">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage
