import React from "react";
import useFirestore from "../hooks/useFirestore";
import './styles.css';


const ImageView = ({setSelectedImg}) => {

    const {docs} = useFirestore('imagesUrl');
    console.log('image', docs);

    return (
        <div className="img-grid">
            { docs && docs.map((doc)=>(
                <div 
                    className="img-wrap" 
                    key={doc.id} 
                    onClick={()=>{setSelectedImg(doc.url)}}
                    >
                    <img src={doc.url} alt='uploaded pic' />
                </div>
            ))}
        </div>
    )
}

export default ImageView;
