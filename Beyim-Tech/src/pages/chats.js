import React, { useState } from "react";
import "../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import Talker from "@/components/Talker";
import aldar from "../../public/images/aldar.png";
import scrip from "../../public/images/scrip.png"
import ggg from "../../public/images/ggg.png"
import Navigation from "@/components/Navigation";



const Chats = () => {
    

    return (
        <div className="h-[113px] w-[full] relative">
            {/* <Image src={blueblock} className="w-full h-[113px]" alt="blueblock" /> */}
            <div className="w-full h-[113px] bg-[#815854]"></div>
            <div className="text-white text-2xl absolute top-1/2 ml-10  text-bold">
                Кіммен сөйлескіңіз келеді?
            </div>
            <ul className="flex flex-wrap w-full justify-between px-5">
                <li>
                    <Link href={`/chats/${encodeURIComponent("Aldar")}`}>
                        <Talker image={aldar} name={"Алдар көсе"} />
                    </Link>
                </li>
                <li>
                    <Link href={`/chats/${encodeURIComponent("Scriptonit")}`}>
                        <Talker image={scrip} name={"Скриптонит"} />
                    </Link>
                </li>
                <li>
                    <Link href={`/chats/${encodeURIComponent("GGG")}`}>
                        <Talker image={ggg} name={"Геннадий Головкин"} />
                    </Link>
                </li>
                
            </ul>

            <Navigation />


        </div>
    );
};

export default Chats;
