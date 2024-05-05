import "../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import background from '../../public/images/background.png';
import hello from "../../public/images/Hello.png";
import kitty from '../../public/images/kitty.png'
import button from '../../public/images/button.png'
import Navbar from "@/components/Navbar";

const First = () => {
    

    return (
        <div className="w-full bg-white relative flex flex-col items-center h-[100vh]">
            <Navbar />
            {/* <Image src={hello} className="z-10 " alt="hello"/>
            <Image src={kitty} className="z-10 mt-10" alt="kitty"/> */}
            
        </div>
       
    );
};
export default First;
