import "../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import background from '../../public/images/background.png';
import hello from "../../public/images/Hello.png";
import kitty from '../../public/images/kitty.png'
import button from '../../public/images/button.png'
import Navbar from "@/components/Navbar";

const Profile = () => {
    
    const companyName = "BeyimPharmo"

    return (
        <div className="w-full bg-white relative flex flex-col items-center h-[100vh]">
            <Navbar />
            <div className="w-full h-[400px] bg-green-200 flex justify-center">
                <div className="w-[80%] h-[250px] bg-yellow-200">
                    <h1 className="text-3xl">{companyName}</h1>
                </div>
            </div>
        </div>
       
    );
};
export default Profile;
