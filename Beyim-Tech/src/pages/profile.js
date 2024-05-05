import "../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import background from "../../public/images/background.png";
import hello from "../../public/images/Hello.png";
import kitty from "../../public/images/kitty.png";
import button from "../../public/images/button.png";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [companyType, setCompanyType] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const companyName = "BeyimPharmo";
    const userName = "Zhanbolat Mukan";

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    // useEffect(() => {
    //     const fetchProfileData = async () => {
    //         try {
    //             console.log('asdad')
    //             const response = await axios.get("https://tolqyn-production-fbd9.up.railway.app/api/v1/profile");
    //             setProfileData(response.data);
    //             console.log('profileData', profileData)
    //         } catch (error) {
    //             setError(error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchProfileData();
    // }, []);
    useEffect(() => {
        const fetchBattle = async () => {
            try {
                const res = await axios.get(
                    `https://tolqyn-production-fbd9.up.railway.app/api/v1/profile`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("accessToken"),
                        },
                    }
                );

                setProfileData(res.data);
                console.log("profileData", profileData);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBattle();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleSubmit = async (e)  => {
        e.preventDefault();
        const requestBody = {
            title: title,
            description: description,
            type_company: companyType,
        };
        try {
            // Send POST request to create company
            const response = await axios.post("https://tolqyn-production-fbd9.up.railway.app/api/v1/companies/", requestBody, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            });
            console.log("Company created successfully:", response.data);
            // Clear form fields after successful submission
            setTitle("");
            setDescription("");
            setCompanyType("");
        } catch (error) {
            console.error("Error creating company:", error);
        }
        
    }

    return (
        <div className="w-full bg-white relative flex flex-col items-center h-[100vh]">
            <Navbar />
            <div className="w-full h-[400px]  flex justify-center">
                <div className="w-[80%] h-[250px]  mt-4">
                    <h1 className="text-3xl">{profileData.username}</h1>

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
                        className="flex items-center justify-center text-center px-5 py-3 mt-4 bg-green-400 text-white hover:bg-blue-300 rounded-xl"
                    >
                        Create Company
                    </button>

                    {isOpen && (
                        <div className="w-[40%] h-[400px]  flex flex-col mt-4 justify-center items-center border-2 border-black rounded-2xl">
                            <div className="text-xl mt-4">Create Company</div>

                            <p className="mt-4 self-start ml-7">Company name</p>
                            <input
                                id="name"
                                className="w-[327px] h-[50px] rounded-xl border-2 relative shadow-gray-500 text-xs p-3 mt-2 "
                                placeholder="company name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <p className="mt-4 self-start ml-7">Company description</p>
                            <input
                                id="description"
                                className="w-[327px] h-[50px] rounded-xl border-2 relative shadow-gray-500 text-xs p-3 mt-2 "
                                placeholder="company name"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <p className="mt-4 self-start ml-7">Company type</p>
                            <input
                                id="type"
                                className="w-[327px] h-[50px] rounded-xl border-2 relative shadow-gray-500 text-xs p-3 mt-2 "
                                placeholder="company type"
                                value={companyType}
                                onChange={(e) => setCompanyType(e.target.value)}
                            />

                            <button onClick={handleSubmit} className="h-10 w-44 mt-8 mb-3 text-white bg-green-500 rounded-2xl border-2 border-black text-center">Create</button>
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
