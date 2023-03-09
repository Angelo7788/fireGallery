import React, { useEffect } from "react";
import useFirestore from "../hooks/useFirestore";
import useStorage from "../hooks/useStorage";
import '../index.css';


const ProgressBar = ({file, setFile}) => {

    const {progress, url} = useStorage(file);
    const {imagesUrl} = useFirestore();
    
    useEffect(()=> {
        if (url) {
            setFile(null)
        }
    }, [url, setFile]);

    // if url ok means that the file is uploaded so we can set the file to null
    // to remove the progress bar

    return (
        <div 
            className="progress-bar"
            style={{width: progress + '%'}}
        >progress{progress}</div>
    )
}

export default ProgressBar;
