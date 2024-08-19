import React from "react";
import UserInfo from "./UserInfo";
import StorageInfo from "./StorageInfo";
import { useSession } from "next-auth/react";
import StorageDetailList from "./StorageDetailList";
import StorageUpgradeMsg from "./StorageUpgradeMsg";

const Storage = () => {
  const {data : session} = useSession();
  return session && (
    <div className="ml-2 bg-white p-5 h-full shadow-lg shadow-slate-500">
      <UserInfo />
      <StorageInfo/>
      <StorageDetailList/>
      <StorageUpgradeMsg/>
    </div>
  );
};

export default Storage;
