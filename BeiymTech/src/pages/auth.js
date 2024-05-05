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

const Auth = () => {
    
    return (
        <div className="w-full flex flex-col items-center bg-[#F9EBDE] min-h-screen ">
            <Image src={girl} alt="girl" className="mt-40" />
            <Image src={LetsGetStarted} alt="text" className="mt-10" />

            <div className="w-full flex flex-col items-center mt-10">
                <Link href={"/sign-in"}>
                    <button className="w-[320px] h-[50px] text-white bg-[#D5948D] rounded-3xl mb-3">
                        Log In
                    </button>
                </Link>
                <Link href={"/sign-up"}>
                    <button className="w-[320px] h-[50px] text-white bg-[#D5948D] rounded-3xl">
                        Sign Up
                    </button>
                </Link>
            </div>

            <Image src={terms} alt="terms" className="mt-20" />
        </div>

        
    );
};
export default Auth;
