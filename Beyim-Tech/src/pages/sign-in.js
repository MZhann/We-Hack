import "../app/globals.css";
import logo from "../../public/images/SmartCookLogo.png";
import Image from "next/image";
import cook from "../../public/images/cook.png";
import cooker from "../../public/images/cooker.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../config";
import show from "../../public/images/show.png";
import hide from "../../public/images/hide.png";
import girl from "../../public/images/girl.png";
import LetsGetStarted from "../../public/images/LetsGetStarted.png";
import terms from "../../public/images/terms.png";
import oyu from "../../public/images/oyu.png";
import back from "../../public/images/back.png";

const SignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);

    // const handleSubmit = (e) => {
    //     console.log('clicked')
    //     e.preventDefault();
    
    //     console.log(name, password);
    //     const requestBody = {
    //         username: name,
    //         password: password,
    //     };
    
    //     setIsLoading(true);
    //     console.log('before axios');
    
    //     axios
    //         .post(`https://tolqyn-production-fbd9.up.railway.app/api/v1/sign-in/access-token`, requestBody)
    //         .then((res) => {
    //             console.log('res data: ', res.data);
    //             localStorage.setItem("accessToken", res.data.access);
    //             localStorage.setItem("refreshToken", res.data.refresh);
    //             window.location.href = "/";
    //             setIsLoading(false); // Move inside .then()
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             setIsLoading(false); // Move inside .catch()
    //             if (
    //                 error.response &&
    //                 error.response.data &&
    //                 error.response.data.error
    //             ) {
    //                 setErrorMessage(error.response.data.error);
    //             }
    //         });
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Define request body
        const requestBody = new URLSearchParams();
        requestBody.append('grant_type', '');
        requestBody.append('username', name);
        requestBody.append('password', password);
        requestBody.append('scope', '');
        requestBody.append('client_id', '');
        requestBody.append('client_secret', '');
    
        setIsLoading(true); // Set loading state
    
        // Make POST request using Axios
        axios.post('https://tolqyn-production-fbd9.up.railway.app/api/v1/sign-in/access-token', requestBody)
            .then((res) => {
                console.log('Response:', res.data);
                localStorage.setItem("accessToken", res.data.access_token);
                localStorage.setItem("refreshToken", res.data.refresh_token);
                window.location.href = "/"; // Redirect to home page or desired destination
            })
            .catch((error) => {
                console.error('Error:', error);
                if (error.response && error.response.data && error.response.data.error) {
                    setErrorMessage(error.response.data.error);
                }
            })
            .finally(() => {
                setIsLoading(false); // Set loading state to false regardless of success or failure
            });
    };
    
    

    

    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    return (
        <div className="w-full flex flex-col items-center bg-white min-h-screen ">
            <div className="absolute text-white font-bold text-2xl z-50 mt-5">
                Log In
            </div>
            <div className="w-full h-[70px] bg-blue-400 z-40 ">
                <Link href='/' className="z-40">
                    <Image
                        src={back}
                        alt="back"
                        className="mt-5 ml-8 w-[15px] z-10"
                    />
                </Link>
            </div>
            <input
                id="name"
                className={`w-[327px] h-[50px] rounded-xl border-2 shadow-gray-500 text-xs p-3 mt-24`}
                placeholder="name"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <div className="flex flex-col items-center relative mt-4">
                <input
                    id="password"
                    className={`w-[327px] h-[50px] rounded-xl border-2 relative shadow-gray-500 text-xs p-3 mt-2 ${
                        password.length < 6 && "border-red-500"
                    }`}
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={passwordShown ? "text" : "password"}
                />
                {passwordShown ? (
                    <Image
                        onClick={() => setPasswordShown(false)}
                        src={hide}
                        alt="eye_closed"
                        className="w-[20px] h-[20px] absolute top-[18px] right-3"
                    />
                ) : (
                    <Image
                        onClick={() => setPasswordShown(true)}
                        src={show}
                        alt="eye"
                        className="w-[20px] h-[20px] absolute top-[18px] right-3"
                    />
                )}
                <button
                    className={`text-white bg-blue-400 hover:bg-blue-300 w-full h-[52px] rounded-3xl mt-24 ${
                        errorMessage && "disabled"
                    }`}
                    onClick={handleSubmit}
                >
                    Log in
                </button>
            </div>

            <div className="absolute bottom-5 text-gray-700">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline text-blue-400">
                    Sign up
                </Link>
            </div>
        </div>
       
    );
};
export default SignIn;
