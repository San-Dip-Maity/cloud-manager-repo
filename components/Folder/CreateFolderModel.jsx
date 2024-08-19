import { app } from "@/Config/FirebaseConfig";
import Image from "next/image";
import {doc, getFirestore, setDoc} from 'firebase/firestore';
import React, { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { ShowToastContext } from "@/context/ShowTostContext";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";

const CreateFolderModel = () => {
    const docId = Date.now().toString()

    const [folderName, setFolderName] = useState();
    const {showToastMsg,setShowToastMsg} = useContext(ShowToastContext)
    const {data:session} = useSession();
    const db = getFirestore(app)
  const {parentFolderId, setParentFolderId} = useContext(ParentFolderIdContext);


    const onCreate = async() => {
        console.log(folderName)
        await setDoc(doc(db,"Folders",Date.now().toString()),{
            name:folderName,
            id:docId,
            createBy: session.user.email,
            parentFolderId: parentFolderId
        })
        setShowToastMsg(folderName + ' Created Successfully... ')
    }

  return (
    <>
      <div>
        <form method="dialog" className="modal-box p-9 items-center bg-white">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div
            className="w-full items-center 
            flex flex-col justify-center gap-3"
          >
            <Image src="/folder.png" alt="folder" width={50} height={50} />
            <input
              type="text"
              placeholder="Folder Name"
              className="p-2 border-[1px] outline-none
                rounded-md bg-gray-200"
                onChange={(e)=>setFolderName(e.target.value)}
            />
            <button
              className="bg-blue-500
          text-white rounded-md p-2 px-3 w-full hover:bg-blue-600"
          onClick={()=>onCreate()}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateFolderModel;
