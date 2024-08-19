import FileList from "@/components/File/FileList";
import FolderList from "@/components/Folder/FolderList";
import SearchBar from "@/components/SearchBar";
import { app } from "@/Config/FirebaseConfig";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";
import { ShowToastContext } from "@/context/ShowTostContext";
import { collection, doc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const FolderDetails = ({folder}) => {
  const router = useRouter();
  const { name, id } = router.query;
  const { data: session } = useSession();
  const {showToastMsg, setShowToastMsg} = useContext(ShowToastContext);

  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext);
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]);

    const db = getFirestore(app);

  useEffect(() => {
    setParentFolderId(id);
    if(session){
        getFolderList();
        getFileList();
    }
  }, [id, session,showToastMsg]);

  const getFolderList=async()=>{
    setFolderList([]);
    const q=query(collection(db,"Folders"),
    where("createBy",'==',session.user.email),
    where("parentFolderId","==",id));
    console.log("InFolderList")
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    setFolderList(folderList=>([...folderList,doc.data()]))
}); 
  }

  const getFileList=async()=>{
    setFileList([]);
    const q = query(collection(db,"files"),
    where("parentFolderId","==",id),
    where("createdBy",'==',session.user.email))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
      setFileList(fileList => ([...fileList, doc.data()]))
    })
  }

  
  return (
    <>
      <div className="p-5">
        <SearchBar />
        <h2 className="text-lg font-bold mt-5 ">{name} 
        </h2>
        
        {folderList.length>0? <FolderList 
        folderList={folderList}
        isBig={false}/>:
        <h2 className='text-gray-400
        text-[16px] mt-5'>No Folder Found</h2>}

        <FileList fileList={fileList}/>
      </div>
    </>
  );
};

export default FolderDetails;
