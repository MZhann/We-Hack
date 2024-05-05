import Image from "next/image";
import Link from "next/link";
import back from "../../public/images/back.png";
import "../app/globals.css";
import kaz from "../../public/images/kaz.png";
import book1 from "../../public/images/book1.png";
import book2 from "../../public/images/book2.png";
import book3 from "../../public/images/book3.png";
import Navigation from "@/components/Navigation";


const Makta = () => {
    return (
        <div className="w-full h-screen bg-[#F9EBDE]">
            <Image
                src={back}
                alt="back"
                className="mt-14 ml-8 w-[20px] z-10 absolute"
            />
            <div className="h-[120px] w-full bg-[#815854] flex justify-center items-center">
                <div className="text-white font-bold text-3xl mt-4">Maqta</div>
            </div>
            <div className="w-full flex justify-end font-bold text-xl text-[#815854] mt-2 mr-4">
                Kazakh{" "}
                <Image
                    className="w-[40px] h-[25px] ml-2 mr-3"
                    src={kaz}
                    alt="kaz"
                />
            </div>
            <div className="font-bold text-xl text-[#815854] ml-6">
                Ready to learn?
            </div>
            <div class="w-full overflow-x-auto whitespace-nowrap mt-5 pl-7">
                <div class="inline-block w-[184px] h-[184px] mr-4 bg-[#815854] rounded-2xl p-4">
                    <Image src={book1} alt="book" />
                    <div className="text-white font-bold text-sm">Reading</div>
                    <div className="text-white text-xs">
                        New books here.<br></br> Let&apos;s read it!
                    </div>
                </div>

                <div class="inline-block w-[184px] h-[184px] mr-4 bg-[#815854] rounded-2xl p-4">
                    <Image src={book2} alt="book" />
                    <div className="text-white font-bold text-sm">Grammar</div>
                    <div className="text-white text-xs">
                        New rules here. <br></br> Let’s learn it!
                    </div>
                </div>

                <div class="inline-block w-[184px] h-[184px] mr-4 bg-[#815854] rounded-2xl p-4">
                    <Image src={book3} alt="book" />
                    <div className="text-white font-bold text-sm">Speaking</div>
                    <div className="text-white text-xs">
                        Community here.<br></br>
                        Let’s speak together!
                    </div>
                </div>
            </div>

            <div className="text-[#815854] font-bold text-xl ml-6  mt-10">Additional materials</div>
            <div className="flex flex-col w-full items-center space-y-3 mt-5">
                <div className="w-[353px] h-[70px] rounded-2xl bg-[#815854] text-white font-bold text-2xl flex justify-center items-center">Sozdik</div>
                <div className="w-[353px] h-[70px] rounded-2xl bg-[#815854] text-white font-bold text-2xl flex justify-center items-center">Books</div>
                <Link href='/chats' className="w-[353px] h-[70px] rounded-2xl bg-[#815854] text-white font-bold text-2xl flex justify-center items-center">Tildes</Link>
            </div>
            <Navigation />
        </div>
    );
};

export default Makta;
