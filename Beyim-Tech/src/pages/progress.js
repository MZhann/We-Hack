import "../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import back from "../../public/images/back.png";
import dom from "../../public/images/dom.png";

const progress = () => {
    return (
        <div className="w-full h-screen bg-[#F9EBDE]">
            <Link href="/maqta">
                <Image
                    src={back}
                    alt="back"
                    className="mt-14 ml-8 w-[20px] z-10 absolute"
                />
            </Link>

            <div className="h-[120px] w-full bg-[#815854] flex justify-center items-center">
                <div className="text-white font-bold text-3xl mt-4">
                    Progress
                </div>
            </div>
            <svg
                width="393"
                height="1135"
                viewBox="0 0 393 1135"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <ellipse
                    cx="301.5"
                    cy="601.5"
                    rx="450.5"
                    ry="601.5"
                    fill="#429745"
                />
                <path
                    d="M434 486C434 671.568 267.674 822 62.5 822C-142.674 822 -309 671.568 -309 486C-309 300.432 -142.674 150 62.5 150C267.674 150 434 300.432 434 486Z"
                    fill="#5AEE60"
                />
                <path
                    d="M434 486C434 671.568 267.674 822 62.5 822C-142.674 822 -309 671.568 -309 486C-309 300.432 -142.674 150 62.5 150C267.674 150 434 300.432 434 486Z"
                    fill="#5AEE60"
                />
                <path
                    d="M434 486C434 671.568 267.674 822 62.5 822C-142.674 822 -309 671.568 -309 486C-309 300.432 -142.674 150 62.5 150C267.674 150 434 300.432 434 486Z"
                    fill="#5AEE60"
                />
                <path
                    d="M434 486C434 671.568 267.674 822 62.5 822C-142.674 822 -309 671.568 -309 486C-309 300.432 -142.674 150 62.5 150C267.674 150 434 300.432 434 486Z"
                    fill="#8DE490"
                />
                <ellipse
                    cx="307.5"
                    cy="640"
                    rx="317.5"
                    ry="312"
                    fill="#5CC360"
                />
                <path
                    d="M477 941C477 1126.57 310.674 1277 105.5 1277C-99.6738 1277 -266 1126.57 -266 941C-266 755.432 -99.6738 605 105.5 605C310.674 605 477 755.432 477 941Z"
                    fill="#5AEE60"
                />
                <path
                    d="M477 941C477 1126.57 310.674 1277 105.5 1277C-99.6738 1277 -266 1126.57 -266 941C-266 755.432 -99.6738 605 105.5 605C310.674 605 477 755.432 477 941Z"
                    fill="#5AEE60"
                />
                <path
                    d="M477 941C477 1126.57 310.674 1277 105.5 1277C-99.6738 1277 -266 1126.57 -266 941C-266 755.432 -99.6738 605 105.5 605C310.674 605 477 755.432 477 941Z"
                    fill="#5AEE60"
                />
                <path
                    d="M477 941C477 1126.57 310.674 1277 105.5 1277C-99.6738 1277 -266 1126.57 -266 941C-266 755.432 -99.6738 605 105.5 605C310.674 605 477 755.432 477 941Z"
                    fill="#84E487"
                />
                <ellipse cx="357" cy="1116" rx="379" ry="312" fill="#49A24D" />
            </svg>

            <Image
                src={dom}
                alt="dom"
                className="w-[86px] h-[69px] absolute top-40 left-2/3"
            />
            <Image
                src={dom}
                alt="dom"
                className="w-[86px] h-[69px] absolute top-60 left-1/4"
            />
            <Image
                src={dom}
                alt="dom"
                className="w-[86px] h-[69px] absolute top-80 left-10"
            />
            <Image
                src={dom}
                alt="dom"
                className="w-[86px] h-[69px] absolute top-96 left-40"
            />
            <Image
                src={dom}
                alt="dom"
                className="w-[86px] h-[69px] absolute top-[60%] left-60"
            />
            <Image
                src={dom}
                alt="dom"
                className="w-[86px] h-[69px] absolute top-[70%] left-40"
            />
            <Image
                src={dom}
                alt="dom"
                className="w-[86px] h-[69px] absolute top-[85%] left-1/4"
            />
        </div>
    );
};

export default progress;
