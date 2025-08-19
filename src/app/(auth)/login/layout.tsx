import Image from 'next/image';
import { ReactNode } from 'react';

export default function Login({ children }: { children: ReactNode }) {
    return (
        <div className='flex flex-1 bg-gradient-to-b from-[#E5F2D6] to-[#FFFFFF] h-screen p-1'>
            <div className='w-1/2  bg-[#1F5D57] rounded-[20px] flex justify-center items-center'>
                {children}
            </div>
            <div className='w-1/2 flex justify-center items-center'>
                <Image src={"/assets/logo.png"} height={400} width={400} alt="logo" />
            </div>
        </div >
    );
}
