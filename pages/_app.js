import SideNavBar from "@/components/SideNavBar";
import Storage from "@/components/Storage/Storage";
import Toast from "@/components/Toast";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";
import { ShowToastContext } from "@/context/ShowTostContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [showToastMsg, setShowToastMsg] = useState();
  const [parentFolderId, setParentFolderId] = useState();
  return (
    <SessionProvider session={session}>
      <ParentFolderIdContext.Provider
        value={{ parentFolderId, setParentFolderId }}
      >
        <ShowToastContext.Provider value={{ showToastMsg, setShowToastMsg }}>
          <div className="flex">
            <SideNavBar />
            <div
              className="grid grid-cols-1
      md:grid-cols-3 w-full"
            >
              <div className="col-span-2">
                <Component {...pageProps} />
              </div>
              <div>
                <Storage />
              </div>
            </div>
          </div>
          {showToastMsg ? <Toast msg={showToastMsg} /> : null}
        </ShowToastContext.Provider>
      </ParentFolderIdContext.Provider>
    </SessionProvider>
  );
}
