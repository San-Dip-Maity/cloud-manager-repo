import { app } from "@/Config/FirebaseConfig";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";
import { ShowToastContext } from "@/context/ShowTostContext";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";

function UploadFileModal({ closeModal }) {
  const { data: session } = useSession();
  const { parentFolderId, setParentFolderId } = useContext(
    ParentFolderIdContext
  );
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);
  const docId = Date.now();
  const db = getFirestore(app);
  const storage = getStorage(app);
  const onFileUpload = async (file) => {
    console.log("File", file);

    const fileRef = ref(storage, "file/" + file.name);

    uploadBytes(fileRef, file)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then((resp) => {
        getDownloadURL(fileRef).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          await setDoc(doc(db, "files", docId.toString()), {
            name: file.name,
            id: docId,
            type: file.name.split(".")[1],
            size: file.size,
            modifiedAt: file.lastModified,
            createdBy: session.user.email,
            parentFolderId: parentFolderId,
            imageUrl: downloadURL,
          });
          closeModal(true);
          setShowToastMsg("File Uploaded Successfully!");
        });
      });
  };

  return (
    <div>
      <form
        method="dialog"
        className="modal-box p-9 items-center w-96 bg-gray-50"
      >
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">
          ✕
        </button>
        <div
          className="w-full items-center 
        flex flex-col justify-center gap-3 "
        >
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-200   hover:bg-gray-300 transition-all">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 ">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 ">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => onFileUpload(e.target.files[0])}
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UploadFileModal;
