import React, { useState } from "react";
import FolderItem from "./FolderItem";
import { useRouter } from "next/router";
import FolderItemSmall from "./FolderItemSmall";

const FolderList = ({folderList, isBig=true}) => {
  const [activeFolder, setActiveFolder] = useState();
  const router = useRouter();
  
  const onFolderClick = (index, item) => {
    setActiveFolder(index);
    router.push({
      pathname: "/folder/" + item.id,
      query: {
        name: item.name,
        id: item.id,
      },
    });
  };
  return (
    <>
      <div
      className="p-5 mt-5 
    bg-white rounded-lg"
    >
    {isBig?  <h2
        className="text-lg 
        font-bold 
        items-center"
      >
        Recent Folders
        <span
          className="float-right
        text-blue-400 font-semibold
        text-sm cursor-pointer "
        >
          View All
        </span>
      </h2>:null}
      {isBig?   <div
        className="grid grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5 mt-3
        gap-3"
      >
        {folderList.map((item, index) => (
          <div key={index} onClick={() => onFolderClick(index, item)}>
        <FolderItem folder={item} />
          
          </div>
        ))}
      </div>
      :
      <div
      className=" 
      "
    >
      {folderList.map((item, index) => (
        <div key={index} onClick={() => onFolderClick(index, item)}>
      <FolderItemSmall folder={item} />
        
        </div>
      ))}
    </div>
      }
    </div>
    </>
  );
};

export default FolderList;
