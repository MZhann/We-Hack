import "../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import background from '../../public/images/background.png';
import hello from "../../public/images/Hello.png";
import kitty from '../../public/images/kitty.png'
import button from '../../public/images/button.png'

const First = () => {
    

    return (
        <div className="w-full relative flex flex-col items-center min-h-screen">
            <Image src={background} className="absolute w-full h-full" alt="bg"/>
            <Image src={hello} className="z-10 mt-[50%]" alt="hello"/>
            <Image src={kitty} className="z-10 mt-10" alt="kitty"/>
            <Link href={"/auth"} className="relative w-[320px] h-[52px] flex justify-center items-center z-30">
                <div className="text-white font-bold text-2xl mt-[40%] z-20">Let&apos;s go</div>
                <Image src={button} className="absolute z-10 mt-[40%]" alt="button" />
            </Link>
        </div>
       
    );
};
export default First;
