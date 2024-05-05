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


const Index = () => {
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                // Send GET request to fetch companies data
                const response = await axios.get(
                    "https://tolqyn-production-fbd9.up.railway.app/api/v1/companies/"
                );
                setCompanies(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="w-full bg-white relative flex flex-col items-center h-[100vh]">
            <Navbar />
            {/* <Image src={hello} className="z-10 " alt="hello"/>
            <Image src={kitty} className="z-10 mt-10" alt="kitty"/> */}
            <div className="flex flex-col w-full items-center h-[100vh] ">
                <div className="w-[80%] h-[500px] mt-10">
                    <div className="text-2xl">
                        <span className="font-bold text-green-600">
                            Beiym Chat
                        </span>{" "}
                        - Сайт для облегчения работы службы поддержки вашей
                        компании. Наш бот, обученный по вашим данным и указаниям
                        поможет{" "}
                        <span className="text-green-600 font-bold">
                            сократить
                        </span>{" "}
                        время ожидания ответа от поддержки, улучшит{" "}
                        <span className="text-green-600 font-bold">
                            user experience
                        </span>
                        .<br></br> <br></br> Кроме того, Beiym Chat{" "}
                        <span className="text-green-600 italic font-bold">
                            сохраняет в памяти историю переписки
                        </span>{" "}
                        и в случае одинаковых запросов от юзеров, быстро
                        достанет их из базы данных и предоставит желаемый ответ
                        пользователю
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-4">
                    Registered Companies
                </h1>
                <div className="w-[80%] h-[550px] flex flex-wrap justify-between">
                    {companies.map((company) => (
                        <Link href={`/companies/${encodeURIComponent(company.id)}`}>
                            <div className="w-[280px] h-[200px] flex flex-col border-2 border-black justify-center items-center m-2 bg-blue-400 rounded-lg" key={company.id}>
                                <strong>{company.title}</strong>
                                <div>{company.type_company}</div>
                                <div className="w-[250px] text-center">{company.description}</div>
                                {/* {company.description} */}
                            </div>
                        </Link>
                        
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Index;
