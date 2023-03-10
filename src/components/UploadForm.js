import React, { useState } from "react";
import ProgressBar from "./Progressbar";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const changeHandler = (event) => {
    // define the type of files that we want to allow
    const types = ["image/png", "image/jpeg"];
    let selected = event.target.files[0];

    // we want to save the selected file only if present

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };

  return (
    <form className="mb4">
      <label>
        <input type="file" onChange={changeHandler} />
        <span>+</span>
      </label>

      <div className="ma2">
        {error && <div> {error} </div>}
        {file && <div> {file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
