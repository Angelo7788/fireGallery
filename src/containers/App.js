import React from "react";
import ImageUrl from "../components/ImageUrl";
import Title from "../components/Title";
import UploadForm from "../components/UploadForm";

function App() {
  return (
    <div className="tc" >
      <Title/>
      <UploadForm/>
      <ImageUrl/>
      
    </div>
  );
}

export default App;
