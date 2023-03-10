import React from "react";
import useFirestore from "../hooks/useFirestore";


const ImageView = () => {

    const {docs} = useFirestore('imagesUrl');
    console.log('image', docs);

    return (
        <div>
            images
        </div>
    )
}

export default ImageView;
