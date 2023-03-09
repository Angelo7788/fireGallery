import { useState, useEffect } from "react";
import {storage, firestore} from '../firebase/config';
import {ref, uploadBytesResumable, getDownloadURL} from '@firebase/storage';
import {addDoc, collection, serverTimestamp} from '@firebase/firestore';
import { async } from "@firebase/util";

// custom hook useStorage to keep all the logic out the component

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    const addToFirestoreDB = async (downloadURL) => {
        try {
            const docRef = await addDoc(collection(firestore, 'imagesUrl'), {
                url: downloadURL ,
                timestamp: serverTimestamp(),
            });
            console.log('Document ID:', docRef.id);
        } catch {
            console.log('error')
        }
    }

    useEffect(() => {
        // references

        const storageref = ref(storage,`${file.name}` );
        
        // upload file

        // upload direct to firebase storage
        // uploadBytes(storageref, file).then((snapshot) => {
        //     console.log('Uploaded');
        // });

        const uploadTask = uploadBytesResumable(storageref, file);

        uploadTask.on('state_changed',
        (snapshot)=> {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
        },
        (error)=> {
            setError(error);
        },
        ()=> {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
            addToFirestoreDB(downloadURL);
            });
        });

        // .on method listen the progress

    }, [file]);

    return {progress, url, error}

}

export default useStorage;
