import { useState, useEffect } from "react";
import {storage} from '../firebase/config';

// custom hook useStorage to keep all the logic out the component

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        // references
        const storageRef = storage.ref(file.name);

        storageRef.put(file).on('state_changed', (snapshot) => {
            let percentage = (snapshot.byteTransferred / snapshot.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL();
            setUrl(url);
        })

        // .on method listen the progress

    }, [file]);

    return (progress, url, error)

}

export default useStorage;
