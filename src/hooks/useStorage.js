import { useState, useEffect } from "react";
import { storage } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { addToFirestoreDB } from "../firebase/manage";

// custom hook useStorage to keep all the logic out the component

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references

    const storageref = ref(storage, `${file.name}`);

    // upload file

    const uploadTask = uploadBytesResumable(storageref, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
          addToFirestoreDB(downloadURL, file.name);
        });
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
