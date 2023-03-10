import React from "react";
import './styles.css';

const Modal = ({selectedImg, setSelectedImg}) => {

    const closeModal = (e) => {
        if (e.target.classList.contains('backdrop')){
        setSelectedImg(null);  
        }   
    }

    return(
        <div className="backdrop" onClick={closeModal} >
            <img src={selectedImg} alt='enlarged pic' />
        </div>
    )
}

export default Modal;
