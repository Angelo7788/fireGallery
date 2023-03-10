import React from "react";
import ImageView from "../components/ImageView";
import Title from "../components/Title";
import UploadForm from "../components/UploadForm";

function App() {
  return (
    <div className="tc" >
      <Title/>
      <UploadForm/>
      <ImageView/>
      
    </div>
  );
}

export default App;
