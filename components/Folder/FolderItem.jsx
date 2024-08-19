import { app } from "@/Config/FirebaseConfig";
import { ShowToastContext } from "@/context/ShowTostContext";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import Image from "next/image";
import React, { useContext } from "react";

const FolderItem = ({ folder }) => {

  const db=getFirestore(app)
  const {showToastMsg,setShowToastMsg}=useContext(ShowToastContext)
  const deleteFolder=async(folder)=>{
    await deleteFolder(doc(db,"Folders",folder.id.toString())).then(resp=>{
      setShowToastMsg('File Deleted!!!')
    })
  }
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center h-32 border-[1px] rounded-lg p-5 hover:scale-105 hover:shadow-md cursor-pointer transition-all duration-75">
        <Image src="/folder.png" alt="folder" width={40} height={40} />
        <h2 className="line-clamp-2 text-xs font-semibold text-center">
          {folder.name}
        </h2>
       
        
      </div>
    </>
  );
};

export default FolderItem;
