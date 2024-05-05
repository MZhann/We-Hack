import "../app/globals.css";
import logo from "../../public/images/SmartCookLogo.png";
import Image from "next/image";
import cook from "../../public/images/cook.png";
import cooker from "../../public/images/cooker.png";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { config } from "../../config";
import show from "../../public/images/show.png";
import hide from "../../public/images/hide.png";
import loading from "../../public/loading.gif";
import { useRouter } from "next/router";
import oyu from "../../public/images/oyu.png";
import back from "../../public/images/back.png";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [isPasswordValidated, setIsPasswordValidated] = useState(true);
    const validate = () => {
        let error = "";

        if (!name) {
            error = "Please enter your first name.";
        } else if (!validateEmail(email)) {
            error = "Please enter a valid email address.";
        } else if (password.length < 6) {
            error = "Password must be at least 6 characters long.";
        }

        setErrorMessage(error);
        return !error;
    };

    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        console.log('clicked');
        e.preventDefault();

        const isValidPassword = (password) =>
            /^[A-Za-z](?=.*\d)[A-Za-z\d]{7,39}$/.test(password);

        console.log(isValidPassword(password));
        if (isValidPassword(password)) {
            setIsPasswordValidated(true);
        } else {
            setIsPasswordValidated(false);
            return;
        }

        if (validate()) {
            const requestBody = {
                first_name: name,
                last_name: null,
                email: email,
                password: password,
                photo: null
            };

            try {
                setIsLoading(true);
                await axios
                    .post(`${config.baseUrl}/api/v1/register/`, requestBody)
                    .then((res) => {
                        localStorage.setItem("accessToken", res.data.access);
                        localStorage.setItem("refreshToken", res.data.refresh);
                    });
                setIsLoading(false);
                await handleLogin();
            } catch (error) {
                setIsLoading(false);
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.error
                ) {
                    setErrorMessage(error.response.data.error);
                }
                console.error(error);
            }
        }
    };
    const router = useRouter();
    async function handleLogin() {
        const requestBody = {
            email: email,
            password: password,
        };

        try {
            setIsLoading(true);
            const response = await axios.post(
                `${config.baseUrl}/api/v1/login/`,
                requestBody
            );
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
            setIsLoading(false);

            // Redirect to home page
            router.push("/test");
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                setErrorMessage(error.response.data.error);
            }
        }
    }
    return (
        <div className="w-full flex flex-col items-center bg-[#F9EBDE] min-h-screen ">
            <Image src={oyu} alt="oyu" className="absolute z-40" />
            <div className="absolute text-white font-bold text-2xl z-50 mt-14">
                Sign Up
            </div>
            <div className="w-full h-[110px] bg-[#815854] z-40 ">
                <Link href="/first" className="z-40">
                    <Image
                        src={back}
                        alt="back"
                        className="mt-10 ml-8 w-[20px] z-10"
                    />
                </Link>
            </div>
            <input
                id="email"
                className={`w-[327px] h-[50px] rounded-xl border-2 shadow-gray-500 text-xs p-3 mt-24 ${
                    !validateEmail(email) && "border-red-500"
                }`}
                placeholder="your.email@gmail.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex flex-col items-center relative mt-4">
                <input
                    id="name"
                    
                    className={`w-full rounded-xl border-2 h-[50px] shadow-gray-500 text-xs p-3 mt-2 ${
                        password.length < 6 && "border-red-500"
                    }`}
                    placeholder="name"
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                        className="w-[20px] h-[20px] absolute top-[80px] right-3"
                    />
                ) : (
                    <Image
                        onClick={() => setPasswordShown(true)}
                        src={show}
                        alt="eye"
                        className="w-[20px] h-[20px] absolute top-[80px] right-3"
                    />
                )}
                <button
                    className={`text-white bg-[#815854] w-full h-[52px] rounded-3xl mt-24 ${
                        errorMessage && "disabled"
                    }`}
                    onClick={handleSubmit}
                >
                    Sign Up
                </button>
            </div>

            <div className="absolute bottom-5 text-gray-700">
                Alredy have  an account?{" "}
                <Link href="/sign-in" className="underline text-blue-400">
                    Sign in
                </Link>
            </div>
        </div>
        
        
    );
};

export default SignUp;
