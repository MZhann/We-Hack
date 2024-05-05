import Link from 'next/link';

const Navigation = () => {
    return (
        <div className="w-full h-[90px] absolute bottom-0 flex justify-evenly items-center bg-white border-t-2 border-gray-400">
            <Link href='/#' className='hover:underline'>Profile</Link>
            <Link href='/maqta' className='hover:underline'>Maqta</Link>
            <Link href='/progress' className='hover:underline'>Progress</Link>
            <Link href='/chats' className='hover:underline'>Chat</Link>
        </div>
    )
}

export default Navigation;