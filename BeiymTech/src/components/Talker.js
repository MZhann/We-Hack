import Image from "next/image";

const Talker = ({image, name}) => {
    return (
        <div className="flex flex-col items-center mt-7">
            <div className="w-40 h-40 bg-[#815854] rounded-full flex justify-center items-center overflow-hidden">
                <Image src={image} alt="character" className="w-full h-full object-cover" />
            </div>
            <div className="text-bold text-xl mt-4">{name}</div>

        </div>
    );
};

export default Talker;
