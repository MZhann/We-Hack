import "../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import background from "../../public/images/background.png";
import hello from "../../public/images/Hello.png";
import kitty from "../../public/images/kitty.png";
import button from "../../public/images/button.png";
import Navbar from "@/components/Navbar";
import { useState } from "react";

const Profile = () => {
    const [title, setTitle] = useState("");
    const [description, setDesctiption] = useState("");
    const [companyType, setCompanyType] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const companyName = "BeyimPharmo";
    const userName = "Zhanbolat Mukan";

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full bg-white relative flex flex-col items-center h-[100vh]">
            <Navbar />
            <div className="w-full h-[400px] bg-green-200 flex justify-center">
                <div className="w-[80%] h-[250px] bg-yellow-200 mt-4">
                    <h1 className="text-3xl">{userName}</h1>

                    <div className="text-lg mt-5">
                        Lorem Ipsum the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in
                        the 1960s with the release of Letraset sheets containing
                        Lorem Ipsum passages, and more recently with desktop
                        publishing software like Aldus PageMaker including
                        versions of Lorem Ipsum
                    </div>

                    <button
                        onClick={handleToggle}
                        className="flex items-center justify-center text-center px-5 py-3 mt-4 bg-blue-400 text-white hover:bg-blue-300 rounded-xl"
                    >
                        Create Company
                    </button>

                    {isOpen && (
                        <div className="w-[40%] h-[400px] bg-red-300">
                            <div>Company name</div>
                            <input
                                id="name"
                                className="w-[327px] h-[50px] rounded-xl border-2 relative shadow-gray-500 text-xs p-3 mt-2 "
                                placeholder="company name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                {/* <div className="w-[80%] h-[250px] bg-yellow-200 mt-4">
                    <h1 className="text-3xl">{companyName}</h1>

                    <div className="text-lg mt-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</div>
                </div> */}
            </div>
        </div>
    );
};
export default Profile;
