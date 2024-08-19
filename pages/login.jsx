import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

function Login() {
    const {data:session}=useSession();
    const router=useRouter();
    useEffect(()=>{
      console.log("User Session",)
      if(session)
      {
        router.push("/")
      }
     
    },[session])
  return (
    <div className='flex justify-center 
    items-center  ml-[0%] md:ml-[50%] flex-col gap-24 h-screen'>
      <Image src='/logo.png'
      alt='logo'
      width={200}
      height={100}
      />
      <h1 className='text-3xl font-bold text-gray-600'>Welcome to Cloud File Manager</h1>
        <button 
        className=' text-white hover:scale-105 transition-all'
        onClick={()=>signIn()}>
            <Image src='/google.png'
            className='rounded-lg'
            alt='google'
            width={300}
            height={300}
            />
            </button>
    </div>
  )
}

export default Login