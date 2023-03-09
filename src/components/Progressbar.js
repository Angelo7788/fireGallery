import React from "react";
import useStorage from "../hooks/useStorage";

const ProgressBar = ({file, setFile}) => {

    const {progress, url} = useStorage(file);
    console.log(url,progress);

    return (
        <div className="ma2">
            progress - {url}
        </div>
    )
}

export default ProgressBar;
