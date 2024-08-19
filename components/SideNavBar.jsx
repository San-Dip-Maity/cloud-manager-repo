import menu from "@/data/menu";
import Image from "next/image";
import React, { useState } from "react";
import CreateFolderModel from "./Folder/CreateFolderModel";
import UploadFileModal from "./File/UploadFileModal";
import { useSession } from "next-auth/react";
import { Router } from "next/router";

const SideNavBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {data:session}=useSession();
    const onMenuClick=(item,index)=>{
        setActiveIndex(index);
        Router.push('/')
    }

  return session &&(
    <>
      <div className="w-56 bg-[#fff] h-screen sticky top-0 z-10 shadow-md shadow-[#505965] p-5">
        <div className="flex justify-center mb-5">
          <Image src="/logo.png" alt="Logo" width={150} height={60}  priority/>
        </div>
        <button className="flex gap-2 items-center   bg-blue-500 p-2 text-white rounded-md px-3 hover:scale-105 transition-all my-2 w-full justify-center" onClick={()=>window.upload_file.showModal()}>
          Add New File
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <button className="flex gap-2 items-center bg-blue-600 p-2 text-white rounded-md px-3 hover:scale-105 transition-all w-full justify-center " onClick={()=>document.getElementById('my_modal_3').showModal()}>
          Create Folder
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>
        </button>

        <div>
          {menu.list.map((item, index) => (
          <h2 key={index} onClick={()=>setActiveIndex(index)} className={`flex gap-2 items-center p-2 px-3 mt-4 rounded-md cursor-pointer  text-gray-600 hover:bg-blue-500 hover:text-white transition-all ${activeIndex === index? 'bg-blue-500 text-slate-50':null}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={item.logo}
                />
              </svg>
              {item.name}
            </h2>
          ))}
        </div>

        <dialog id="my_modal_3" className="modal">
            <CreateFolderModel/>
        </dialog>

        <dialog id="upload_file" className="modal">
            <UploadFileModal 
            closeModal={()=>window.upload_file.close()}/>
        </dialog>
      </div>
    </>
  );
};

export default SideNavBar;
