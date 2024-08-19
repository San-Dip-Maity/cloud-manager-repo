import { app } from "@/Config/FirebaseConfig";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const StorageInfo = () => {
  const db = getFirestore(app);
  const { data: session } = useSession();
  const [totalSizeUsed, seTtotalSizeUsed] = useState(0)
  let totalSize = 0;
  useEffect(() => {
    if (session) {
      getAllFiles();
    }
  }, [session]);

  const getAllFiles = async () => {
    const q = query(
      collection(db, "files"),
      where("createdBy", "==", session.user.email)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data()["size"]);
      totalSize = totalSize + doc.data()["size"];
    });

    console.log("Total size: ", (totalSize / 1024 ** 2).toFixed(2) + "MB");
    seTtotalSizeUsed((totalSize / 1024 ** 2).toFixed(2) + "MB");
  };

  return (
    <>
      <div className="mt-7">
        <h2 className="text-2xl font-bold">
        {totalSizeUsed}{" "} <span className="text-base font-medium">used of </span> 5 GB
        </h2>
        <div className="w-full bg-gray-200 h-2.5 flex">
          <div className="bg-blue-600 h-2.5 w-1/4"></div>
          <div className="bg-green-600 h-2.5 w-1/3"></div>
          <div className="bg-orange-400 h-2.5 w-2/12"></div>
        </div>
      </div>
    </>
  );
};

export default StorageInfo;
