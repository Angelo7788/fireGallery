import React, { useState } from "react";
import ImageView from "../components/ImageView";
import Modal from "../components/Modal";
import Title from "../components/Title";
import UploadForm from "../components/UploadForm";

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  // to handle the img selected
  return (
    <div className="tc mh6">
      <Title />
      <UploadForm />
      <ImageView setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
}

export default App;
