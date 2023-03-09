import { useState, useEffect } from "react";
import {storage} from '../firebase/config';
import {ref, uploadBytesResumable, getDownloadURL} from '@firebase/storage';

// custom hook useStorage to keep all the logic out the component

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

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
            console.log('Upload is ' + progress + '% done');
            setProgress(progress);
        },
        (error)=> {
            setError(error);
        },
        ()=> {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setUrl(downloadURL);
            });
        });

        // .on method listen the progress

    }, [file]);

    return {progress, url, error}

}

export default useStorage;
